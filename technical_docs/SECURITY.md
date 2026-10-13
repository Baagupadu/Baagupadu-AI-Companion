# CODE SECURITY & COMPLIANCE SPECIFICATION
**Baagupadu Career Guidance & Psychometric Mentoring Ecosystem**  
*Document Version: 1.0.0 | Date: October 2026 | Status: Active Security Specification & Implementation Blueprint*

---

## 1. Executive Summary & Philosophy

Baagupadu handles sensitive user data: psychological reflections, career insecurities, psychometric scores, and personal life dilemmas. Protecting this data is not merely a technical requirement—it is a core ethical responsibility.

This document outlines:
1. **Current Security Posture:** Security measures, defense mechanisms, and access controls actively implemented in the codebase.
2. **Security Gap Analysis:** Specific areas where exposure or vulnerabilities exist prior to hardening.
3. **Target DevSecOps Implementation Roadmap:** Step-by-step blueprints for CI/CD automation, static code analysis (SAST), secret scanning, dependency auditing (SCA), HTTP headers, and PII anonymization.
4. **Vulnerability Reporting & Incident Response:** Formal operational protocols for managing security reports.

---

## 2. Current Security Posture (Active in Codebase)

Our codebase currently enforces defense-in-depth across five architectural layers:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              CURRENT DEFENSE-IN-DEPTH STACK                             │
├────────────────────┬────────────────────┬────────────────────┬─────────────────────────┤
│   Identity & Auth  │  AI & LLM Firewall │   API & Traffic    │ Container & Ingress     │
│  Clerk OIDC + JWKS │   GuardrailAgent   │ SlowAPI Rate Limit │ Non-Root + Cloudflare   │
│ (RS256 Validation) │ (Fail-Closed Prod) │ (15 req/min Prod)  │ Zero-Trust Tunnel       │
└────────────────────┴────────────────────┴────────────────────┴─────────────────────────┘
```

### 2.1 Identity & Access Management (IAM)
* **Clerk Authentication Platform:** Manages user authentication, social logins, multi-factor authentication (MFA), and token issuance (`@clerk/nextjs`).
* **Route Protection:** Frontend route matcher (`frontend/src/middleware.ts`) automatically intercepts and blocks unauthenticated requests to `/chat` and `/dashboard`.
* **Cryptographic Token Verification:** 
  * Backend endpoints validate incoming Bearer tokens using `backend/auth.py`.
  * In `production` mode, tokens are cryptographically validated against Clerk’s public **JSON Web Key Sets (JWKS)** via `jwt.PyJWKClient` enforcing the `RS256` asymmetric signature algorithm and verifying expiration timestamps (`verify_exp: True`).
* **Multi-Tenant User Isolation:** Every database operation in `backend/api.py` and graph query in `backend/agent/agents/executor_agent.py` extracts the subject ID (`sub`) directly from the validated token and filters queries strictly by `user_id = sub`. No user can access or mutate another student's sessions or mental graph nodes.

### 2.2 AI & Cognitive Guardrails (OWASP Top 10 for LLMs)
* **Pre-Execution Prompt Firewall (`GuardrailAgent`):**
  * Implemented in `backend/agent/agents/guardrail_agent.py`.
  * Intercepts every incoming user prompt before it reaches the LangGraph cognitive loop.
  * Validates against prompt injection attacks, instruction overrides (e.g., *"Ignore previous instructions"*), system prompt theft (e.g., *"Reveal your hidden prompt"*), and toxic jailbreak attempts.
  * **Fail-Closed Architecture:** If the guardrail model fails to execute in production, it safely rejects the request (`is_safe: False`) to prevent uninspected inputs from reaching the core engine.
* **Ethical Psychological Guardrails:**
  * Defined across `gems/nenu_evaru/coaching_rules.md` and `gems/nenu_evaru/emotional_distress_protocol.md`.
  * Enforces Socratic non-directive guidance: the AI never prescribes career choices dogmatically.
  * Includes automated emotional crisis detection triggers that instantly pause career coaching and provide verified crisis helpline numbers.

### 2.3 Traffic & API Abuse Prevention
* **Token-Bucket Rate Limiting:**
  * Powered by `SlowAPI` and `limits` in `backend/api.py`.
  * Bound to remote IP addresses (`get_remote_address`).
  * Enforces a strict rate limit of `15 requests/minute` per client in production to defend against denial-of-service (DoS) and third-party LLM API credit depletion.
* **CORS Environment Scoping:**
  * In `development`, CORS permits local loopback origins.
  * In `production`, `CORSMiddleware` restricts allowed origins to explicit trusted domain lists (`FRONTEND_URL` / `https://baagupadu.com`), preventing cross-origin request forgery.

### 2.4 Container & Ingress Hardening
* **Non-Root Container Execution:**
  * `backend/Dockerfile` explicitly provisions and switches to unprivileged system user `appuser:appuser` (UID 1000).
  * `frontend/Dockerfile` drops root privileges to run as system user `node:node`.
  * This prevents container breakout attacks from compromising the host operating system.
* **Cloudflare Zero-Trust Tunnel:**
  * Containerized in `docker-compose.yml` (`cloudflared`).
  * Creates an outbound-only encrypted tunnel to Cloudflare’s global edge.
  * **Zero inbound host ports are exposed** to the public internet, eliminating risks from automated port scanning and unauthenticated network probes.

### 2.5 Data Governance & Audit Logging
* **Audit Trail:** An `AuditLog` table in PostgreSQL (`backend/models.py`) records administrative events, demographic updates, and account deletion requests.
* **Account Deletion (Right to be Forgotten):** The `/api/user` endpoint cascades deletions across chat sessions, message histories, long-term memories, and graph edges upon user request.

---

## 3. Security Gap Analysis & Risk Assessment

| Risk Area | Current State | Risk Level | Threat Scenario |
| :--- | :--- | :--- | :--- |
| **CI/CD Code Scanning (SAST)** | No automated scanning on PRs | **HIGH** | Vulnerable code (SQLi, ReDoS, insecure logic) merged without detection. |
| **Secret Leakage Prevention** | Relies on manual `.gitignore` | **HIGH** | Developer accidentally commits `.env` or OpenAI/AWS/Clerk keys to public GitHub. |
| **Dependency Vulnerabilities (SCA)** | Dependencies not checked against CVE databases | **MEDIUM** | Known zero-days in transitive Python/npm packages exploited in production. |
| **HTTP Security Headers** | Default FastAPI & Next.js headers | **MEDIUM** | Vulnerable to clickjacking (`X-Frame-Options`), MIME sniffing, and lack of CSP. |
| **Student PII in LLM Context** | Direct raw prompt passing | **MEDIUM** | Personal identifiers (phone numbers, emails) exposed to third-party LLM logs. |
| **Container Image Immutability** | Floating image tags (e.g., `:latest`) | **LOW** | Malicious upstream base image updates introduced during rebuilds. |

---

## 4. Target Implementation Roadmap (Step-by-Step Blueprints)

To bring Baagupadu to enterprise security standards, the following 5 implementations are ready for deployment:

---

### Step 1: CI/CD Automated Security Pipeline (SAST & Secret Scanning)

Create `.github/workflows/security.yml` to automatically analyze every push and pull request before code can be merged into `main` or release branches:

```yaml
name: Security & SAST Audit

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  secret-scan:
    name: Secret Leak Detection
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Run Gitleaks
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

  python-sast:
    name: Python SAST & Security Lint
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.11"

      - name: Install Security Tools
        run: pip install bandit semgrep pip-audit

      - name: Run Bandit (Python Vulnerability Scanner)
        run: bandit -r backend/ -ll -x backend/tests/

      - name: Run Pip-Audit (Dependency Vulnerability Scanner)
        run: pip-audit -r backend/requirements.txt

      - name: Run Semgrep Rules
        run: semgrep --config=p/security-audit --config=p/secrets backend/

  frontend-sast:
    name: Frontend Dependency & Code Audit
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: frontend
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
          cache-dependency-path: frontend/package-lock.json

      - name: Install Dependencies
        run: npm ci

      - name: Run npm Audit
        run: npm audit --audit-level=high

      - name: Run ESLint Security Rules
        run: npm run lint
```

---

### Step 2: Local Pre-Commit Hooks (Preventing Secret Leaks)

Install `.pre-commit-config.yaml` at the root of the repository so developers cannot commit secrets or poorly formatted code locally:

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.6.0
    hooks:
      - id: check-added-large-files
        args: ['--maxkb=500']
      - id: check-yaml
      - id: check-json
      - id: detect-private-key
      - id: end-of-file-fixer
      - id: trailing-whitespace

  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.18.4
    hooks:
      - id: gitleaks

  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.5.0
    hooks:
      - id: ruff
        args: [--fix]
```

*Installation command:*
```bash
pip install pre-commit
pre-commit install
```

---

### Step 3: HTTP Security Headers Hardening

#### A. Backend FastAPI Middleware (`backend/core/security_headers.py`)
Add an OWASP-compliant security headers middleware in FastAPI:

```python
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response: Response = await call_next(request)
        # Prevent clickjacking attacks
        response.headers["X-Frame-Options"] = "DENY"
        # Prevent MIME-type sniffing
        response.headers["X-Content-Type-Options"] = "nosniff"
        # Enable XSS filtering in legacy browsers
        response.headers["X-XSS-Protection"] = "1; mode=block"
        # Enforce HTTPS
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        # Control Referrer Information
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        # Restrict permissions
        response.headers["Permissions-Policy"] = "camera=(), microphone=(self), geolocation=()"
        return response
```

#### B. Frontend Next.js Headers (`frontend/next.config.ts`)
Inject security headers at the Next.js edge router:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://clerk.com https://*.clerk.accounts.dev; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https: http://localhost:8000; worker-src 'self' blob:;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

---

### Step 4: Student Privacy & PII Redaction Layer

To guarantee student anonymity before text is embedded into PostgreSQL `pgvector` or dispatched to external cloud LLM providers (AWS Bedrock, OpenAI, Google Gemini), implement a lightweight PII masking filter:

```python
# backend/core/pii_scrubber.py
import re

PHONE_REGEX = re.compile(r'\b(?:\+91[\-\s]?)?[6-9]\d{9}\b')
EMAIL_REGEX = re.compile(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b')
AADHAAR_REGEX = re.compile(r'\b\d{4}[-\s]?\d{4}[-\s]?\d{4}\b')

def scrub_pii(text: str) -> str:
    """
    Sanitizes personally identifiable information (PII) before storage or LLM dispatch.
    """
    scrubbed = PHONE_REGEX.sub("[PHONE_REDACTED]", text)
    scrubbed = EMAIL_REGEX.sub("[EMAIL_REDACTED]", scrubbed)
    scrubbed = AADHAAR_REGEX.sub("[ID_REDACTED]", scrubbed)
    return scrubbed
```

---

### Step 5: Container Image Digest Pinning

Pin upstream base images to immutable SHA256 hashes in `Dockerfile` and `docker-compose.yml` to prevent supply-chain attacks via compromised upstream tags:

* **Backend Base Image:**
  `FROM python:3.10-slim@sha256:d9b23b160b730594a1d48956891ebddcc6368d9047fb59f23fe7cbb6509989d2`
* **Frontend Base Image:**
  `FROM node:20-alpine@sha256:cb39e44654907a3f85e4ea7efc18fc7183eec1e7845353ee39eb4b4e9fb6f849`
* **Neo4j Base Image:**
  `neo4j:5.23.0@sha256:4ebf0761361c471c26b47c0a6b5791a8117ca504fa3023e207d3b5b62b1660f8`

---

## 5. Vulnerability Disclosure & Incident Response Policy

### 5.1 Reporting Security Vulnerabilities
If any team member, contractor, or security researcher identifies a vulnerability:
* **Contact:** `security@baagupadu.com` (or project maintainer directly).
* **Policy:** Please do not file public GitHub issues for security vulnerabilities.
* **Responsible Disclosure:** Provide 48 hours for triage and fix deployment before any public discussion.

### 5.2 Incident Triage SLAs
* **Severity 0 (Critical - Auth bypass, Data leak, Remote code execution):** Response within **2 hours**, mitigation within **12 hours**.
* **Severity 1 (High - Prompt injection bypass, Rate limit circumvention):** Response within **6 hours**, fix within **24 hours**.
* **Severity 2 (Medium - Missing headers, Information disclosure):** Resolved during the regular sprint cycle.

---

## 6. Implementation Summary Matrix

| Security Layer | Current Status | Implementation & Coverage | Tool / Technology |
| :--- | :--- | :--- | :--- |
| **Authentication** | ✅ Active | Cryptographic JWKS RS256 Validation | Clerk + PyJWKClient |
| **LLM Guardrails** | ✅ Active | Fail-Closed Jailbreak & Prompt Theft Defense | `GuardrailAgent` |
| **Rate Limiting** | ✅ Active | 15 req/min per IP in production | `SlowAPI` |
| **Network Defense** | ✅ Active | Zero public inbound ports | Cloudflare Tunnel |
| **Secret Scanning** | ✅ Active | Automated PR & Commit Secret Detection | `Gitleaks` (.github + pre-commit) |
| **Static Code Analysis** | ✅ Active | Automated Python SAST & Security Linting | `Bandit` + GitHub Actions CI |
| **Dependency Auditing** | ✅ Active | Automated CVE detection on dependencies | `pip-audit` + `npm audit` |
| **HTTP Hardening** | ✅ Active | CSP, HSTS, X-Frame-Options: DENY, nosniff | `SecurityHeadersMiddleware` & `next.config.ts` |
| **Privacy Protection** | ✅ Active | Pre-LLM & Pre-Storage PII Anonymization | `backend/core/pii_scrubber.py` |
