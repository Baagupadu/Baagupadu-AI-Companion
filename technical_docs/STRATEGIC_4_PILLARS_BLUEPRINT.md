# BAAGUPADU AI COMPANION: STRATEGIC 4-PILLAR MASTER BLUEPRINT
**Enterprise Architecture, Product Design, Security Governance & Go-To-Market Strategy**  
*Document Version: 1.0.0 | Date: October 2026 | Status: Canonical Strategic Blueprint | Project: Baagupadu AI Companion*

---

## Executive Summary & System Overview

The **Baagupadu AI Companion** is an empathetic, context-aware career guidance and life-coaching platform tailored specifically for Indian youth (10th/12th grade, intermediate, diploma, and Tier 2/3 engineering and degree college students). Rather than behaving like a transactional Q&A bot, Baagupadu operates as an emotionally intelligent companion using a multi-agent cognitive architecture, localized offline inference, and multi-layered data security.

This blueprint synthesizes the entire project across four operational pillars:
1. **Card 1: Engineering & AI** (Cognitive Architecture, Local Inference, Hybrid RAG, CI/CD)
2. **Card 2: Product & UX** (Empathetic Personas, 3D Glassmorphic Interface, Tri-Phase Journeys)
3. **Card 3: Security, Risk & FinOps** (PII Scrubbing, CERT-In Audit Logs, DPDP Compliance, Zero-Cost FinOps)
4. **Card 4: Growth & Go-To-Market (GTM)** (Campus Flywheels, Institutional B2B Pilots, Revenue Model, KPIs)

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                              BAAGUPADU 4-PILLAR ARCHITECTURAL MATRIX                                   │
├────────────────────────────────────┬───────────────────────────────────┬───────────────────────────────┤
│  CARD 1: Engineering & AI          │  CARD 2: Product & UX             │  CARD 3: Security, Risk, FinOps│
│  • Multi-Agent LangGraph Engine    │  • 3 Empathetic Companions        │  • PII Redaction & OWASP      │
│  • Local GGUF / vLLM Inference     │  • 3D Glassmorphic Interface      │  • CERT-In 180-Day Audit Log  │
│  • Hybrid RRF + Neo4j GraphRAG     │  • Node-Based Visual Roadmaps     │  • India DPDP Act 2023        │
│  • Zero-Failure CI/CD DevSecOps    │  • Vernacular Multilingual Flow   │  • Zero Cloud Token FinOps    │
├────────────────────────────────────┴───────────────────────────────────┴───────────────────────────────┤
│                                     CARD 4: Growth & Go-To-Market (GTM)                                │
│       • Grassroots B2C Student Viral Loops  • Institutional B2B College SaaS Licensing (₹300-800/yr)    │
│       • Local On-Prem Privacy Selling Point • State Skill Development Partnerships (TASK / B2G)        │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

# 🔷 Card 1: Engineering & AI

### 1.1 Multi-Agent Cognitive Orchestration (LangGraph Engine)
The backend core is structured as an asynchronous finite state machine assembled in [`backend/agent/sahayam_engine.py`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/agent/sahayam_engine.py) using LangGraph’s `StateGraph`. This architecture separates logical planning, generative empathy, and post-response evaluation:

```
                      ┌────────────────────────┐
                      │   Student Chat Input   │
                      └───────────┬────────────┘
                                  │
                                  ▼
                      ┌────────────────────────┐
                      │    Guardrail Agent     │◄── Intercepts Injections & PII Leaks
                      └───────────┬────────────┘
                                  │ (Passed)
                                  ▼
                      ┌────────────────────────┐
                      │     Planner Agent      │◄── Reranks OKF Rules (`gems/nenu_evaru/`)
                      └───────────┬────────────┘
                                  │ (Structured Strategy JSON)
                                  ▼
                      ┌────────────────────────┐
                      │     Executor Agent     │◄── Ingests Top-4 RRF Memories + GraphRAG
                      └───────────┬────────────┘
                                  │
                                  ├──────────────────────────────┐
                                  │ (Streaming SSE Response)     │ (Background Async Dispatch)
                                  ▼                              ▼
                      ┌────────────────────────┐     ┌────────────────────────┐
                      │ Next.js User Interface │     │    Evaluator Agent     │
                      └────────────────────────┘     └───────────┬────────────┘
                                                                 │
                                                                 ▼
                                                     ┌────────────────────────┐
                                                     │ Logs ROUGE-L / Dist-2  │
                                                     └────────────────────────┘
```

* **Guardrail Agent** ([`guardrail_agent.py`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/agent/agents/guardrail_agent.py)): Enforces input safety before expensive LLM execution. Blocks DAN prompts, prompt extractions, system override attempts, and dangerous advice.
* **Planner Agent** ([`planner_agent.py`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/agent/agents/planner_agent.py)): Ingests raw input and matches against Open Knowledge Format (OKF) Markdown files in `gems/nenu_evaru/`. Produces a deterministic JSON plan without conversational fluff.
* **Executor Agent** ([`executor_agent.py`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/agent/agents/executor_agent.py)): Generates the empathetic response following a rhythmic formula:
  $$\text{Response} = \text{Empathetic Validation} + \text{Core Psychological Insight} + \text{Provocative Open Question}$$
* **Evaluator Agent** ([`evaluator_agent.py`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/agent/agents/evaluator_agent.py)): Runs as a non-blocking background task. Computes ROUGE-L (semantic grounding against retrieved knowledge) and Distinct-2 (lexical diversity) to detect repetitiveness, logging to `backend/logs/evaluations.jsonl`.
* **Extractor Agent** ([`extractor_agent.py`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/agent/agents/extractor_agent.py)): Updates student life-stage attributes, educational marks, and preferences in the PostgreSQL `ProfileState` table.
* **Subconscious Agent** ([`subconscious_agent.py`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/agent/agents/subconscious_agent.py)): Monitors latent student sentiments such as exam anxiety, burnout, or parental conflicts.

---

### 1.2 Dual-Inference Strategy (Local Ollama & vLLM Production)
To eliminate recurring API costs and preserve student data privacy, Baagupadu uses local quantized model inference:

* **Development & Edge Deployment**: Powered by **Ollama** running `.gguf` quantized weights:
  * **Empathetic Generation Model**: `baagupadu_model` (Llama-3-8B fine-tuned for youth counseling).
  * **Analytical Reasoning Model**: `qwen2.5:7b` (high schema adherence).
  * **Evaluation Model**: `phi3:mini` (lightweight NLP quality metric scorer).
* **Production Institutional Deployment**:
  * Seamless upgrade to **vLLM** with continuous batching and PagedAttention on institutional NVIDIA GPUs (RTX 4090, A10G, L4).
* **LLM Factory** ([`backend/core/llm_factory.py`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/core/llm_factory.py)): Unified provider abstraction allowing immediate runtime fallbacks to `ollama`, `vllm`, or external providers (`openai`, `gemini`, `anthropic`, `bedrock`).

---

### 1.3 Memory Architecture: Hybrid RRF & Neo4j GraphRAG
* **Reciprocal Rank Fusion (RRF)**:
  Prevents prompt context bloat by fusing sparse full-text keyword retrieval (`to_tsvector` in PostgreSQL) with dense semantic embeddings (`nomic-embed-text-v1.5` 768-dim in `pgvector`):
  $$\text{RRF Score} = \frac{1}{60 + \text{Rank}_{\text{dense}}} + \frac{1}{60 + \text{Rank}_{\text{sparse}}}$$
  Only the Top-4 highest-scoring memories are injected into the active prompt.
* **GraphRAG Cognitive Knowledge Graph**:
  * Modeled in Neo4j (`bolt://localhost:7687`) via `MemoryNode` (entities, skills, fears, aspirations) and `MemoryEdge` (e.g., `FEARS`, `DESIRES`, `STRUGGLES_WITH`).
  * Enables multi-turn associative recall (e.g., recalling that academic anxiety mentioned two weeks ago relates to parental expectations expressed today).

---

### 1.4 DevSecOps CI/CD Automation
Automated GitHub Actions security and quality pipeline ([`.github/workflows/security.yml`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/.github/workflows/security.yml)):
* **Secret Leak Detection**: Direct open-source standalone **Gitleaks** binary (`v8.18.4`) execution on every push (0 leaks allowed).
* **Python SAST**: **Bandit** static application security analysis preventing SQL injections and unsafe deserializations.
* **Dependency Vulnerability Scanning**: **Pip-Audit** checking all Python packages against OSV and PyPA vulnerability databases.
* **Automated Test Suites**:
  * **Backend**: 26 Pytest tests (OWASP headers, PII redaction, red-team prompt injections, endpoints, and audit logging) running in 0.15s.
  * **Frontend**: 6 Vitest unit tests verifying SSE parsing and Zustand store actions in 0.3s.

---

# 🎨 Card 2: Product & UX

### 2.1 The Three Empathetic Companion Personas
Rather than presenting a monolithic, robotic interface, Baagupadu gives students agency through three curated companion personalities ([`frontend/src/lib/companions.ts`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/frontend/src/lib/companions.ts)):

| Companion Persona | Avatar & Color | Communication Philosophy | Primary Psychological Role |
| :--- | :--- | :--- | :--- |
| **The Mentor** *(Srinivas)* | `/avatars/mentor.png`<br>`#2A41E8` | Professional, calm, inspiring, big-picture. | Long-term career roadmap, foundational engineering principles, college options. |
| **The Confidant** *(Sravani)* | `/avatars/confidant.png`<br>`#FF6B8A` | Warm, casual, highly empathetic, judgment-free. | Emotional decompression, exam anxiety, parental pressure, self-doubt. |
| **The Challenger** *(Varun)* | `/avatars/challenger.png`<br>`#00B894` | Sharp, energetic, intense, radically candid. | Breaking comfort zones, technical interview simulation, accountability check. |

*State persistence is maintained client-side via Zustand (`companionStore.ts`).*

---

### 2.2 Cinematic 3D Glassmorphic Interface
* **Framework**: Next.js 16 (App Router), React 19, Tailwind CSS.
* **3D Visual Engine**: Built with React Three Fiber (`@react-three/fiber`), `@react-three/drei`, and `three.js`. Features floating, hardware-accelerated companion meshes that respond to conversational context.
* **Dynamic Micro-Interactions**: Smooth spring physics with `framer-motion`, Lottie animations, and celebratory particle confetti (`canvas-confetti`) when students achieve roadmap milestones.
* **Human-Centered Aesthetic**: Sleek dark mode by default, high-contrast typography, and glassmorphic card overlays that avoid the sterile look of standard corporate enterprise software.

---

### 2.3 Core Product Journeys & Interactive Modules
* **Interactive Conversational Onboarding (`/onboarding`)**:
  * Replaces tedious static forms with conversational profiling.
  * Discovers academic marks, family background, financial constraints, and natural inclinations organically.
* **Live SSE Streamed Chat (`/chat`)**:
  * Sub-second streaming using Markdown rendering (`react-markdown`, `remark-gfm`).
  * Real-time emotional ledger tracking confidence score and phase progression.
  * Voice session mode toggle (`is_voice_session`) with responsive animations.
* **Node-Based Career Roadmaps**:
  * Interactive tree visualization built with `@xyflow/react` and `recharts`.
  * Visualizes alternative paths (e.g., Gate Exam vs. IT Placement vs. MS Abroad vs. Core Engineering).
* **Tri-Phase Psychological Timeline**:
  1. *Phase 1 (Childhood Roots)*: Uncovering early natural curiosities and strengths.
  2. *Phase 2 (Teenage Crossroads)*: Academic streams, peer pressures, and entrance exams.
  3. *Phase 3 (Adult Career Launch)*: Final year placements, interview prep, and industry transitions.
* **Vernacular Code-Mixing**:
  * Native comprehension of Hinglish, Telugu-English (Tenglish), and Indian regional slang, allowing students to express emotional nuance naturally.

---

# 🛡️ Card 3: Security, Risk & FinOps

### 3.1 Data Privacy & Automatic PII Redaction
* **Automated PII Scrubber** ([`backend/core/pii_scrubber.py`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/core/pii_scrubber.py)):
  * Sanitizes prompts *before* they reach the model or logs.
  * Masks 12-digit Indian **Aadhaar cards** (`[REDACTED_AADHAAR]`), 10-character alphanumeric **PAN cards** (`[REDACTED_PAN]`), 10-digit Indian **mobile numbers** (`[REDACTED_PHONE]`), email addresses, and payment cards.
* **Transport & Cryptographic Hardening**:
  * **Clerk OAuth** asymmetric RS256 JWKS verification on all `/api/*` endpoints.
  * **OWASP Security Headers Middleware** ([`backend/core/security_headers.py`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/core/security_headers.py)): Enforces HSTS, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection`, and Content Security Policy (CSP).
  * **Cloudflare Zero Trust Tunnel** (`cloudflared`): Completely closes inbound public server ports, routing encrypted traffic through Cloudflare's global edge network.

---

### 3.2 Enterprise Audit Logging & Regulatory Compliance
* **CERT-In 180-Day Cyber Incident Directive**:
  * Implemented in [`AuditLogService`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/services/audit_service.py).
  * Every security event, RAG retrieval, account deletion, or guardrail block is logged with client IP (`CF-Connecting-IP`), timestamp, category (`SECURITY`, `AUTH`, `DATA_PRIVACY`, `AI_LIFECYCLE`, `ADMIN`), and a cryptographic SHA-256 integrity signature.
  * Retained for a mandatory 180-day period.
* **Digital Personal Data Protection Act (India DPDP Act 2023)**:
  * **Minor Data Protection (Section 9)**: Zero behavioral profiling or targeted advertising for students under 18; verifiable institutional/parental consent trails.
  * **Right to Erasure ("Right to be Forgotten")**: Implemented in `/api/user` endpoint. Permanently deletes student profile data while anonymizing audit logs for statutory compliance.
* **EU AI Act & ISO/IEC 42001 (AIMS)**:
  * Classified under Annex III (Education & Vocational Training - High-Risk AI).
  * Full logging transparency, post-evaluation bias monitoring, and administrative human-in-the-loop review endpoints (`/api/admin/audit-logs`).

---

### 3.3 FinOps & Infrastructure Unit Economics
* **Zero Marginal LLM Cost**:
  * By running quantized weights locally on Ollama or bare-metal vLLM, Baagupadu eliminates third-party token fees ($0.00 per chat session vs. $0.05–$0.15 for commercial GPT-4o APIs).
* **On-Premises Hardware Amortization**:
  * Institutional college labs utilize existing desktop workstation GPUs (e.g., RTX 3060/4090s) during off-peak hours or dedicated rack servers, turning recurring cloud opex into zero-variable-cost infrastructure.
* **Token Optimization via RRF**:
  * Limiting RAG context injection strictly to Top-4 RRF memories saves >70% token overhead per turn compared to naïve chat-history dump approaches.

---

# 🚀 Card 4: Growth & Go-To-Market (GTM)

### 4.1 Market Opportunity & Target Demographics
India graduates over 1.5 million engineers and millions of intermediate/degree students annually, with over **80% classified as unemployable in core tech roles** due to mismatched career choices, lack of mentorship, and exam stress. Private career counseling costs ₹5,000–₹25,000 per student—out of reach for Tier 2/3 families.

```
                    ┌────────────────────────────────────────────────────────┐
                    │               TOTAL ADDRESSABLE MARKET (TAM)           │
                    │         ~40 Million Higher Education Students          │
                    └───────────────────────────┬────────────────────────────┘
                                                │
                                                ▼
                    ┌────────────────────────────────────────────────────────┐
                    │             SERVICEABLE ADDRESSABLE MARKET (SAM)       │
                    │      ~12 Million Technical & Professional Students     │
                    └───────────────────────────┬────────────────────────────┘
                                                │
                                                ▼
                    ┌────────────────────────────────────────────────────────┐
                    │             SERVICEABLE OBTAINABLE MARKET (SOM)        │
                    │  ~1.5 Million Students in AP, Telangana & South India  │
                    └────────────────────────────────────────────────────────┘
```

* **Primary Users (B2C)**: 10th/12th grade students and Tier 2/3 college undergraduates facing placement anxiety and parental expectations.
* **Institutional Buyers (B2B)**: Private engineering colleges, polytechnics, and degree colleges seeking improved placement statistics and NAAC/NBA accreditation scores.
* **Government Partners (B2G)**: State skill development organizations (e.g., TASK - Telangana Academy for Skill and Knowledge, APSSDC).

---

### 4.2 Three-Stage Go-To-Market Execution

```
┌──────────────────────────────────┐     ┌──────────────────────────────────┐     ┌──────────────────────────────────┐
│ STAGE 1: Campus Grassroots (B2C) │ ──► │ STAGE 2: Institutional B2B SaaS  │ ──► │ STAGE 3: State Education (B2G)   │
├──────────────────────────────────┤     ├──────────────────────────────────┤     ├──────────────────────────────────┤
│ • Viral WhatsApp/Telegram Drops  │     │ • Turnkey On-Prem Deployments    │     │ • State Education Board MoUs     │
│ • Shareable Persona Badges       │     │ • ₹300-800 / Student / Year      │     │ • Rural & Vernacular Career Hubs │
│ • Free Conversational Guidance   │     │ • Placement Officer Dashboard    │     │ • District-Level Skill Alignment │
└──────────────────────────────────┘     └──────────────────────────────────┘     └──────────────────────────────────┘
```

1. **Stage 1: Campus Grassroots & Social Loops (B2C)**
   * Seed free access in student WhatsApp/Telegram groups across college campuses.
   * Provide social-shareable **"Career Archetype Cards"** (e.g., *Systems Architect*, *Analytical Problem Solver*, *Creative Technologist*) generated at the end of Onboarding for Instagram Stories and LinkedIn.
2. **Stage 2: Institutional College Pilots (B2B SaaS)**
   * Pitch college management and placement directors on the **"Baagupadu AI Placement Guidance Cell"**.
   * **Key Value Proposition**: Docker container runs directly inside the college server room; student data never leaves the campus (DPDP Act compliant). Placement officers receive batch analytics on aggregate skill deficiencies and placement readiness.
3. **Stage 3: Government & Skill Council Partnerships (B2G)**
   * Partner with state skill agencies (e.g., TASK, APSSDC) to deploy vernacular guidance in rural government degree colleges.

---

### 4.3 Revenue Models & Pricing Architecture

| Model | Target Customer | Pricing Structure | Features Included |
| :--- | :--- | :--- | :--- |
| **Freemium B2C** | Individual Students | Free | Daily core chat with Mentor, Confidant, Challenger, basic roadmaps. |
| **B2C Pro** | Aspiring Job Seekers | ₹199 / month or ₹999 / year | Unlimited voice chats, ATS resume analyzer, company-specific mock interviews, verified industry mentor connect. |
| **Institutional B2B** | Colleges & Universities | **₹300 – ₹800 per student / year** | On-prem Docker deployment, college-wide analytics, placement officer dashboard, custom curriculum roadmaps. |
| **Talent Matchmaking** | Corporate Hiring Partners | Pay-per-hire or subscription | Anonymized skill-verified candidate discovery matching non-metro talent with tech employers. |

---

### 4.4 Growth & Product KPIs
* **Student Retention**: 30-day and 90-day return rate to companion chats.
* **Engagement Depth**: Average turns per session (target: >8 turns/session) and conversational completion rate of Tri-Phase Onboarding (>85%).
* **Efficacy Metrics**: **Self-Efficacy Score (SES)** measured via brief 1-question pulse prompts before and after coaching milestones.
* **B2B Pipeline Health**: College demo-to-pilot conversion rate (>40%) and pilot-to-annual contract rate (>70%).

---

## Complete Traceability Matrix

| Strategic Pillar | Core Architectural Component | File Location in Repository |
| :--- | :--- | :--- |
| **Card 1: Engineering & AI** | LangGraph StateGraph Engine | [`backend/agent/sahayam_engine.py`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/agent/sahayam_engine.py) |
| **Card 1: Engineering & AI** | Multi-Model LLM Factory | [`backend/core/llm_factory.py`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/core/llm_factory.py) |
| **Card 1: Engineering & AI** | Reciprocal Rank Fusion & Knowledge Base | [`backend/knowledge_base/loader.py`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/knowledge_base/loader.py) |
| **Card 1: Engineering & AI** | Automated DevSecOps CI/CD Pipeline | [`.github/workflows/security.yml`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/.github/workflows/security.yml) |
| **Card 2: Product & UX** | Empathetic Companion Personas | [`frontend/src/lib/companions.ts`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/frontend/src/lib/companions.ts) |
| **Card 2: Product & UX** | Real-Time SSE Chat Streaming Client | [`frontend/src/lib/api.ts`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/frontend/src/lib/api.ts) |
| **Card 2: Product & UX** | 3D Cinematic & Glassmorphic Presentation | `frontend/src/app/chat/`, `frontend/src/app/onboarding/` |
| **Card 3: Security & FinOps** | Statutory PII Redaction Engine | [`backend/core/pii_scrubber.py`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/core/pii_scrubber.py) |
| **Card 3: Security & FinOps** | CERT-In 180-Day Immutable Audit Logger | [`backend/services/audit_service.py`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/services/audit_service.py) |
| **Card 3: Security & FinOps** | OWASP Security Headers Middleware | [`backend/core/security_headers.py`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/core/security_headers.py) |
| **Card 3: Security & FinOps** | DPDP Act Minor & Deletion Compliance | `technical_docs/REGULATORY_COMPLIANCE.md` |
| **Card 4: Growth & GTM** | Turnkey On-Premises Container Stack | `docker-compose.yml`, `docker-compose.prod.yml` |
| **Card 4: Growth & GTM** | Institutional Admin Observability | `/api/admin/audit-logs` in [`backend/api.py`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/api.py) |
