# PRODUCTION DEPLOYMENT & LAUNCH GUIDE: BAAGUPADU.COM
**Domain:** `baagupadu.com` *(Registered on Hostinger)*  
**Release Branch:** `main`  
**Classification:** DevOps, Security, DNS & Production Operations  
**Date:** October 2026 | Version: 1.0.0

---

## 1. Executive Deployment Architecture

To display **`baagupadu.com`** live on the internet with enterprise security, sub-second latency, and zero token costs, the system utilizes a modern decoupled architecture:

```
                                  ┌─────────────────────────────┐
                                  │      Hostinger Registrar    │
                                  │       (baagupadu.com)       │
                                  └──────────────┬──────────────┘
                                                 │
                                DNS A & CNAME Records
                                                 │
                   ┌─────────────────────────────┴─────────────────────────────┐
                   │                                                           │
                   ▼ (baagupadu.com, www)                                      ▼ (api.baagupadu.com)
     ┌───────────────────────────┐                               ┌───────────────────────────┐
     │      Frontend Hosting     │                               │      Backend Hosting      │
     │      (Vercel / Edge)      │                               │   (VPS / Render / Railway)│
     │  Next.js 16 (App Router)  │                               │       FastAPI + Uvicorn   │
     └─────────────┬─────────────┘                               └─────────────┬─────────────┘
                   │                                                           │
                   │ Client HTTPS Requests                                     │ SQL / Vector
                   │ (Bearer JWT Token)                                        ▼
                   │                                             ┌───────────────────────────┐
                   │                                             │   PostgreSQL + pgvector   │
                   │                                             │   (Neon / Railway / VPS)  │
                   │                                             └───────────────────────────┘
                   ▼                                                           │
     ┌───────────────────────────┐                                             ▼
     │   Clerk Auth (Production) │                               ┌───────────────────────────┐
     │   clerk.baagupadu.com     │                               │   Ollama / vLLM Inference │
     │   (RS256 JWKS Validation) │                               │   (Llama-3-8B / Qwen 2.5) │
     └───────────────────────────┘                               └───────────────────────────┘
```

---

## 2. Choosing Your Hosting Deployment Strategy

There are two primary ways to deploy `baagupadu.com` depending on what Hostinger plan you purchased:

### Option A: The Gold Standard (Recommended for Speed, Security & Free Scaling)
* **Frontend (`baagupadu.com`)**: Deployed on **Vercel** (Free tier). Next.js is built by Vercel; this provides automatic SSL, global Edge CDN, image optimization, and zero maintenance.
* **Backend (`api.baagupadu.com`)**: Deployed on **Railway / Render / Fly.io** or a cloud VPS.
* **Database**: Managed PostgreSQL with `pgvector` on **Neon.tech** or **Supabase** (both have generous free tiers supporting pgvector).
* **Cost**: $0 / month (or minimal compute).
* **Hostinger's Role**: DNS Manager (directing `baagupadu.com` to Vercel and `api.baagupadu.com` to your backend).

### Option B: All-in-One Hostinger VPS (Docker Compose)
* If you purchased a **Hostinger VPS (KVM Ubuntu 22.04 / 24.04)**:
  * You run Docker Compose on the VPS (`frontend`, `backend`, `db` with pgvector, and `ollama`).
  * Nginx or Cloudflare Tunnel routes traffic:
    * `baagupadu.com` & `www.baagupadu.com` $\rightarrow$ `http://localhost:3000`
    * `api.baagupadu.com` $\rightarrow$ `http://localhost:8000`
* *Note: Standard Hostinger "Shared Web Hosting" (cPanel/PHP) cannot run Next.js 16 + FastAPI + PostgreSQL pgvector. If you only bought shared hosting + domain, use Option A with Hostinger DNS.*

---

## 3. Hostinger DNS Zone Configuration

Log into your **Hostinger Control Panel** $\rightarrow$ **Domains** $\rightarrow$ **`baagupadu.com`** $\rightarrow$ **DNS / Nameservers**:

### If Using Option A (Vercel Frontend + Cloud Backend):
| Type | Name / Host | Points to / Value | TTL | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` | `76.76.21.21` | 300 (or Default) | Routes apex `baagupadu.com` to Vercel |
| **CNAME** | `www` | `cname.vercel-dns.com` | 300 | Routes `www.baagupadu.com` to Vercel |
| **CNAME** | `api` | `<your-backend-host>.railway.app` *(or Render URL)* | 300 | Routes `api.baagupadu.com` to Backend |
| **CNAME** | `clerk` | `accounts.clerk.services` *(if custom Clerk domain)* | 300 | Custom Clerk Auth Domain |

### If Using Option B (Hostinger VPS with Docker Compose):
| Type | Name / Host | Points to / Value | TTL | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` | `<YOUR_VPS_PUBLIC_IP>` | 300 | Directs apex domain to VPS |
| **A** | `www` | `<YOUR_VPS_PUBLIC_IP>` | 300 | Directs www subdomain to VPS |
| **A** | `api` | `<YOUR_VPS_PUBLIC_IP>` | 300 | Directs API subdomain to VPS |

---

## 4. Clerk Authentication: Transitioning to Production

In development, Clerk runs on `pk_test_...`. For live production on `baagupadu.com`:

1. **Open Clerk Dashboard** ([dashboard.clerk.com](https://dashboard.clerk.com)).
2. Switch your instance from **Development** to **Production** (or create a Production application).
3. Under **Configure** $\rightarrow$ **Domains**:
   * Add your primary domain: `baagupadu.com`.
   * (Optional) Set up DNS records provided by Clerk in Hostinger for seamless branded sign-ins (`clerk.baagupadu.com`).
4. Under **API Keys**, obtain your production keys:
   * `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: (starts with live publishable prefix)
   * `CLERK_SECRET_KEY`: (starts with live secret prefix)
5. Note your **JWKS URL**:
   * Format: `https://<your-instance>.clerk.accounts.dev/.well-known/jwks.json` (or `https://clerk.baagupadu.com/.well-known/jwks.json`).
   * This is required by the FastAPI backend to verify user tokens cryptographically using RS256.

---

## 5. Complete Production Environment Variables (`.env`)

### 5.1 Frontend Production `.env` (Set in Vercel / Docker)
```env
# Clerk Authentication (Live Keys)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<YOUR_CLERK_PUBLISHABLE_KEY>
CLERK_SECRET_KEY=<YOUR_CLERK_SECRET_KEY>

# Clerk Redirect Routes
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/login
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/chat
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Backend API Endpoint
NEXT_PUBLIC_BACKEND_URL=https://api.baagupadu.com
```

### 5.2 Backend Production `.env` (Set in Backend Server / VPS)
```env
# Runtime Environment
ENVIRONMENT=production

# CORS Allowed Origins (Comma-separated for apex and www)
FRONTEND_URL=https://baagupadu.com,https://www.baagupadu.com

# Clerk Asymmetric Cryptographic Validation (RS256 JWKS)
CLERK_JWKS_URL=https://<your-instance>.clerk.accounts.dev/.well-known/jwks.json

# Database Connection (PostgreSQL 15+ with pgvector)
# Must use asyncpg dialect: postgresql+asyncpg://
DATABASE_URL=postgresql+asyncpg://<db_user>:<db_password>@<db_host>:5432/baagupadu

# LLM Provider Configuration
# Options: ollama, vllm, openai, gemini, bedrock
LLM_PROVIDER=openai
OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>
OPENAI_CHAT_MODEL=gpt-4o-mini

# If using local Ollama on VPS/Dedicated Server:
# LLM_PROVIDER=ollama
# OLLAMA_BASE_URL=http://localhost:11434/v1
# OLLAMA_CHAT_MODEL=baagupadu_model
# OLLAMA_LOGIC_MODEL=qwen2.5:7b
```

---

## 6. Step-by-Step Deployment Instructions

### Step 1: Deploy Frontend to Vercel (10 Minutes)
1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account (`Baagupadu` or personal).
2. Click **"Add New..."** $\rightarrow$ **"Project"**.
3. Import the repository: `Baagupadu/Baagupadu-AI-Companion`.
4. Configure the project:
   * **Framework Preset**: Next.js
   * **Root Directory**: `frontend` *(click Edit and select `frontend`)*
   * **Build Command**: `npm run build`
   * **Output Directory**: `.next`
   * **Install Command**: `npm ci --legacy-peer-deps`
5. Under **Environment Variables**, paste the keys from Section 5.1:
   * `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   * `CLERK_SECRET_KEY`
   * `NEXT_PUBLIC_BACKEND_URL` = `https://api.baagupadu.com`
6. Click **Deploy**.
7. Once deployed, go to **Settings** $\rightarrow$ **Domains**:
   * Add `baagupadu.com` and `www.baagupadu.com`.
   * Vercel will display the exact DNS records to paste into Hostinger.

### Step 2: Deploy Backend & Database
1. Create a PostgreSQL instance with `pgvector` enabled (on Neon.tech, Supabase, or Railway).
2. Connect to the database and ensure the vector extension is created:
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```
3. Deploy the backend service (Railway / Render / VPS):
   * **Root Directory**: `backend`
   * **Build Command**: `pip install -r requirements.txt`
   * **Start Command**: `uvicorn api:app --host 0.0.0.0 --port 8000`
   * Add all Backend Environment Variables from Section 5.2.
4. Run initial database migration & knowledge ingestion:
   ```bash
   python scripts/migrate_db.py
   python scripts/ingest_knowledge_base.py
   ```
5. Assign your custom domain `api.baagupadu.com` in your backend hosting platform.

### Step 3: Link Hostinger DNS
1. Open Hostinger $\rightarrow$ **DNS Zone Editor**.
2. Add the `A` and `CNAME` records as outlined in Section 3.
3. Allow 15–30 minutes for global DNS propagation.
4. Test with:
   ```bash
   dig +short baagupadu.com
   curl -I https://baagupadu.com
   ```

---

## 7. Security & Pre-Flight Verification Checklist

Before announcing `baagupadu.com` publicly, verify every item below:

- [ ] **HTTPS / SSL Active**: Accessing `http://baagupadu.com` automatically redirects to `https://baagupadu.com` with a valid certificate.
- [ ] **OWASP Security Headers Verified**:
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains`
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
- [ ] **CORS Properly Locked**: Verify that API requests from `https://baagupadu.com` and `https://www.baagupadu.com` are permitted, while arbitrary third-party origins are blocked.
- [ ] **Rate Limiting Active**: `/api/chat` throttles excessive automated traffic (`15/minute` in production) via SlowAPI.
- [ ] **PII Scrubbing Tested**: Verify that sending an Indian phone number or Aadhaar card in chat results in `[REDACTED_PHONE]` / `[REDACTED_AADHAAR]` in database logs.
- [ ] **CERT-In 180-Day Audit Logs**: Verify that `/api/admin/audit-logs` records every sign-in and chat event with a SHA-256 integrity hash and real client IP.
- [ ] **Right to Erasure Working**: Verify that calling `deleteUserAccount()` permanently deletes user conversations and anonymizes audit logs.
- [ ] **Zero Secret Leaks**: Verified by Gitleaks in CI with 0 API keys or private tokens in source code.
