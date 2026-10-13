# TECH STACK SPECIFICATION — BAAGUPADU ECOSYSTEM
**How Baagupadu builds Web, Mobile, and Agentic AI Guidance Systems**  
*Document Version: 1.0.0 | Date: October 2026 | Status: Living Architectural Specification*

---

## Executive Overview

Baagupadu is an AI-powered career guidance, self-discovery, and mentoring ecosystem. The platform couples an empathetic, Socratic psychological coaching engine (**Sahayam**) with deep cognitive frameworks (**Nenu Evaru**), Open Knowledge Format (OKF) retrieval, and a Hybrid GraphRAG cognitive memory engine.

Everything runs on a unified, high-performance architecture: **Next.js 16 + React 19** with interactive 3D avatars on the front end, **FastAPI + LangGraph** behind it, **PostgreSQL (pgvector)** and **Neo4j** for hybrid relational, vector, and knowledge graph storage, and **Clerk** for seamless authentication. Services ship as isolated Docker containers deployable via self-hosted bare metal (Coolify / Docker Compose) or cloud infrastructure.

```
┌───────────────────────────────────────────────────────────────────────────────────┐
│                               BAAGUPADU ARCHITECTURE                              │
├─────────────────┬──────────────────┬──────────────────┬───────────────────────────┤
│   7 Core Layers │ 4 Active Modules │ 5 LLM Providers  │ Hybrid GraphRAG           │
│   Shared Stack  │ Across Ecosystem │ Unified Gateway  │ pgvector (Dense) + Neo4j  │
└─────────────────┴──────────────────┴──────────────────┴───────────────────────────┘
```

### Core Ecosystem Platforms
* **Sahayam AI Companion:** Socratic, emotionally-attuned career & life coach.
* **Nenu Evaru Self-Discovery Engine:** Psychometric profiling and cognitive belief mapping.
* **Dynamic Career Compass & Roadmaps:** Node-based visual career pathways and milestone tracking.
* **Mentor Connect & Institutional Portal:** Bridging students with verified industry mentors and career counseling centers.

---

### Every Product Shares One Stack: From Sign-In to Knowledge Graph

| Layer | Technologies & Implementations | Status |
| :--- | :--- | :--- |
| **Clients** | Next.js 16 (App Router), React 19, TypeScript, React Three Fiber (3D Avatar), React Native (Expo mobile) | `Current (Web)` / `Roadmap (Mobile)` |
| **Identity** | Clerk Single Sign-On (OIDC, Social logins, Session tokens), FastAPI PyJWKClient JWT validation | `Active` |
| **Services** | FastAPI (Async ASGI), LangGraph cyclic multi-agent state machines, Uvicorn, n8n workflow engine | `Active` |
| **AI & Agents** | Multi-Provider Gateway (Claude 3.5, Gemini 1.5, GPT-4o, Llama 3.1 8B via Ollama/vLLM), LangGraph orchestration | `Active` |
| **Data & Memory** | PostgreSQL 15/16 + `pgvector` (Vector RAG), Neo4j 5.23 (Dynamic Ego-GraphRAG), OKF Markdown Store | `Active` |
| **Platform** | Docker & Docker Compose, Cloudflare Zero Trust Tunnels, Coolify / Self-Managed Linux VPS, GitHub Actions CI | `Active` |

---

### How a Request Moves Through the System

```
[ Student / User App ] 
         │ (Next.js 16 / React Native)
         ▼
[ Clerk Authentication ] ─── Validates JWT Bearer Token
         │
         ▼
[ FastAPI Gateway (/api/chat) ] ─── Streaming SSE Response
         │
         ▼
[ LangGraph Sahayam Engine ]
    ├── 1. PlannerAgent (Intent, Psychometric Stage & Sub-goal Generation)
    ├── 2. Hybrid Retrieval:
    │       ├── pgvector (Dense Semantic Search on 1,845 OKF Knowledge Chunks)
    │       └── Neo4j (Cypher Ego-Graph Traversal of User Mental Graph)
    ├── 3. ExecutorAgent (Context synthesis, empathetic Socratic response)
    ├── 4. ExtractorAgent (Extracts user entities/traits & commits graph edges to Neo4j)
    └── 5. Roadmap / Synthesis Node (Compiles visual milestones & action plans)
         │
         ▼
[ Client UI (3D Avatar, React Flow Roadmaps, Markdown Stream) ]
```

---

## 01. Frontend and Mobile

Modern, accessible web and mobile clients built with TypeScript, fluid micro-interactions, responsive 3D graphics, and real-time streaming.

### Web Frameworks & Runtime
* **Next.js 16 (App Router):** `[Current]` Server-side rendering, layout streaming, and route isolation.
* **React 19:** `[Current]` Core UI component model and optimistic UI transitions.
* **Vite / React:** `[Roadmap]` Lightweight embeddable widgets for university and institutional portals.

### Language
* **TypeScript 5:** `[Current]` Strict static typing shared across API contracts, state stores, and UI components.

### UI & Styling System
* **Tailwind CSS v4:** `[Current]` Next-gen CSS engine with custom design tokens and fluid typography.
* **Lucide React:** `[Current]` Consistent, lightweight SVG icon system.
* **Framer Motion & Lottie React:** `[Current]` Micro-interactions, conversational bubble springs, and onboarding animations.
* **Glassmorphism Design System:** `[Current]` Premium dark/light themes with backdrop filters and translucent cards.

### State & Data Fetching
* **Zustand:** `[Current]` Lightweight global client state (`useChatStore`, `useAuthStore`, `useProfileStore`).
* **TanStack Query (React Query v5):** `[Current]` Server cache management, automated refetching, and query invalidation.
* **Axios & Fetch API:** `[Current]` Authenticated HTTP client with Bearer token interceptors and SSE stream readers.
* **idb-keyval (IndexedDB):** `[Current]` Client-side persistent offline caching for session history and audio buffers.

### Forms & Validation
* **React Hook Form:** `[Current]` Uncontrolled form performance for onboarding and psychometric assessments.
* **Zod:** `[Current]` Runtime type inference and validation for form inputs and API payloads.

### Rich Content, 3D & Visualization
* **Three.js & React Three Fiber (`@react-three/fiber`, `@react-three/drei`):** `[Current]` Interactive real-time 3D AI avatar that reacts to conversational sentiment.
* **React Flow (`@xyflow/react`):** `[Current]` Interactive, zoomable visual career roadmap trees and milestone nodes.
* **Recharts:** `[Current]` Radar charts for psychometric dimensions, skills radar, and career aptitude scores.
* **React Markdown & Remark GFM:** `[Current]` Streaming markdown rendering with tables, blockquotes, and code snippets.
* **Canvas Confetti:** `[Current]` Milestone celebration and goal achievement celebrations.

### Real-Time & Audio
* **Server-Sent Events (SSE):** `[Current]` Low-latency token-by-token streaming from the FastAPI backend.
* **Web Audio API & MediaRecorder:** `[Current]` Voice chat input capturing and waveform visualization.
* **WebSockets / Socket.IO:** `[Roadmap]` Live peer mentoring and collaborative mentor-student whiteboard sessions.

### Mobile Application
* **React Native (Expo):** `[Roadmap]` Cross-platform iOS and Android mobile app sharing TypeScript models and business logic.
* **Expo EAS (Expo Application Services):** `[Roadmap]` Cloud builds and automated app store submission.
* **Expo Notifications & Secure Storage:** `[Roadmap]` Push reminders for daily self-reflection, offline encrypted tokens, and biometric authentication (FaceID/Fingerprint).

---

## 02. Backend, APIs and Data

Asynchronous, high-throughput backend services powering the multi-agent cognitive loop and dual-database memory systems.

### Languages & Frameworks
* **Python 3.11 & 3.12:** `[Current]` Core backend runtime for machine learning, agent graphs, and async APIs.
* **FastAPI:** `[Current]` High-performance ASGI framework with native async/await, Pydantic validation, and automatic OpenAPI generation.
* **Uvicorn:** `[Current]` Asynchronous web server running worker processes.

### Agent Orchestration & Graph Engine
* **LangGraph:** `[Current]` Stateful, cyclic graph orchestration engine coordinating the Sahayam cognitive agent loop (`planner -> evaluator -> search -> executor -> extraction`).
* **LangChain Core & Community:** `[Current]` Abstractions for prompt templates, chat model wrappers, and vector store retrieval.
* **LangChain Neo4j:** `[Current]` Native integration with Neo4j graph databases for knowledge graph Cypher queries.

### Relational & Vector Databases
* **PostgreSQL 15/16:** `[Current]` System of record for users, profile demographics, chat sessions, message logs, and assessment scores.
* **pgvector Extension:** `[Current]` Storing 384-dimensional vector embeddings of 1,845 Open Knowledge Format (OKF) coaching chunks with HNSW/IVFFlat cosine indexing.
* **SQLAlchemy 2.0 (Asyncpg):** `[Current]` Asynchronous Python ORM for database queries and schema management.
* **Alembic:** `[Roadmap]` Version-controlled database schema migrations.

### Graph Database (GraphRAG Memory)
* **Neo4j 5.23.0:** `[Current]` Dedicated labeled property graph database storing the user's dynamic mental model:
  * Nodes: `User`, `Concept`, `Struggle`, `Strength`, `Aspiration`, `LimitingBelief`.
  * Relationships: `HAS_STRUGGLE`, `HOLDS_BELIEF`, `EXHIBITS_STRENGTH`, `ASPIRES_TO`.
  * Cypher Ego-Graph Traversal: Enables the AI agent to traverse 1st and 2nd-degree connections to retrieve deep context.

### Object Storage & Document Parsing
* **Local Volumes / Docker Storage:** `[Current]` Storing session logs and temporary artifacts.
* **AWS S3 / MinIO (S3-Compatible):** `[Roadmap]` Permanent storage for user-uploaded resumes, voice audio notes, and exported PDF reports.
* **PyPDF, pdfplumber & python-docx:** `[Current / In-Use]` Ingesting and parsing resumes and educational transcripts.
* **ReportLab & Playwright (HTML-to-PDF):** `[Roadmap]` Automated export of high-resolution psychometric assessment and career roadmap PDFs.

### Background Jobs & Scheduling
* **n8n (Self-Hosted):** `[Current]` Automated workflows for scheduled student check-in triggers, webhook notifications, and external CRM sync.
* **Celery + Redis / APScheduler:** `[Roadmap]` Distributed asynchronous background queues for heavy batch tasks (e.g., deep transcript analysis, weekly summary generation).

---

## 03. Cloud, Hosting and DevOps

Self-sovereign, cost-effective infrastructure that can run entirely on on-premise GPU servers (e.g., college lab hardware) or scale to hybrid cloud.

### Containerization & Orchestration
* **Docker & Docker Compose:** `[Current]` Multi-container blueprint running PostgreSQL, Neo4j, Ollama, n8n, Adminer, Cloudflare Tunnel, Backend, and Frontend.
* **Multi-Stage Dockerfiles:** `[Current]` Minimized container footprints with non-root security.

### Deployment Targets
* **Self-Managed Linux VPS / On-Premise GPU Server:** `[Current]` Deployment of heavy Ollama/vLLM LLM engines and persistent databases.
* **Coolify:** `[Roadmap]` Self-hosted open-source PaaS on VPS for Git-push automated deployments.
* **Vercel:** `[Roadmap]` Edge-distributed preview environments for Next.js frontend releases.

### Reverse Proxy, TLS & Networking
* **Cloudflare Tunnel (`cloudflared`):** `[Current]` Zero Trust secure public exposure without opening inbound router ports, with automatic SSL and DDoS shielding.
* **Caddy / Nginx:** `[Roadmap]` Reverse proxy with automated Let's Encrypt TLS certificates for self-hosted domain routing.

### Version Control & CI/CD
* **GitHub:** `[Current]` Code hosting, branch protection, pull requests, and peer reviews.
* **GitHub Actions:** `[Roadmap]` Automated test pipelines (Pytest, ESLint, TypeScript check) and multi-arch Docker image builds pushed to GitHub Container Registry (GHCR).

### Monitoring, Observability & Local Dev
* **Adminer:** `[Current]` Lightweight web UI for PostgreSQL administration.
* **Neo4j Browser:** `[Current]` Visual graph exploration on port 7474.
* **Sentry:** `[Roadmap]` Production error and crash monitoring for both frontend and backend.
* **Prometheus & Grafana:** `[Roadmap]` Server resource monitoring (GPU VRAM utilization, query latencies, token generation throughput).
* **Dozzle:** `[Roadmap]` Lightweight real-time web-based Docker log viewer.

---

## 04. AI, Automation and Cognitive Engine

A multi-tiered, cost-efficient AI architecture supporting cloud frontier models and fully local offline open-source LLMs.

### LLM Providers (Multi-Model Gateway)
* **AWS Bedrock:** `[Current]` Anthropic Claude 3.5 Sonnet (for deep psychometric reasoning and synthesis) and Claude 3.5 Haiku.
* **Google Gemini:** `[Current]` Gemini 1.5 Pro and Gemini 1.5 Flash via Google Generative AI SDK for large-context transcript synthesis.
* **OpenAI:** `[Current]` GPT-4o and GPT-4o-mini fallback.
* **Local Self-Hosted (Ollama):** `[Current]`
  * `Meta-Llama-3.1-8B-Instruct` (Quantized Q4_K_M GGUF) for zero-cost conversational coaching.
  * `Qwen 2.5 7B` for structural JSON extraction and planning.
  * `Phi-3 Mini` for real-time evaluator judge validation.
* **Production High-Throughput (vLLM):** `[Roadmap]` Dedicated vLLM inference server on university GPU hardware with continuous batching and PagedAttention.

### Cognitive Architecture & Knowledge Representation
* **Open Knowledge Format (OKF):** `[Current]` Standardized markdown files with deterministic YAML frontmatter (`id`, `title`, `domain`, `category`, `tags`, `target_audience`, `difficulty`) parsed and indexed into vector embeddings.
* **Hybrid GraphRAG Engine:** `[Current]`
  * Semantic Search: Cosine vector similarity on `all-MiniLM-L6-v2` dense embeddings.
  * Ego-Graph Expansion: Graph traversal in Neo4j retrieving interconnected psychological patterns (e.g. impostor syndrome linked to family expectation).

### Voice & Multi-Modal AI
* **Speech-to-Text (STT):**
  * Web Speech API: `[Current]` Client-side zero-latency transcription.
  * OpenAI Whisper / Whisper.cpp: `[Roadmap]` High-accuracy multilingual Indian accent transcription (English, Telugu, Hindi).
* **Text-to-Speech (TTS):**
  * Web Speech Synthesis: `[Current]` Basic browser voice generation.
  * ElevenLabs / Edge-TTS: `[Roadmap]` Warm, empathetic, human-grade conversational voice for Sahayam.

### Messaging, Notifications & Integrations
* **n8n Workflows:** `[Current]` Connecting chat events to webhooks and automation sequences.
* **Resend / ZeptoMail:** `[Roadmap]` Transactional onboarding emails, assessment reports, and passwordless authentication alerts.
* **WhatsApp Cloud API:** `[Roadmap]` Daily reflective nudges ("How was your study goal today?") and mentor session reminders.
* **Razorpay / Stripe:** `[Roadmap]` Payments gateway for premium 1-on-1 career mentor sessions and certified assessment reports.

---

## 05. Security, Privacy and Compliance

Given that Baagupadu handles sensitive psychological thoughts, insecurities, and career anxieties, privacy is built as a zero-compromise foundation.

### Identity & Access Control
* **Clerk Identity Platform:** `[Current]` Multi-factor authentication, social OAuth (Google, GitHub), email magic links, and secure session cookies.
* **JWT JWKS Verification:** `[Current]` Backend cryptographic token verification using Clerk's public JSON Web Key Sets (JWKS) via `PyJWKClient`.
* **Tenant & User Data Isolation:** `[Current]` Strict row-level isolation where every database query filters on the authenticated user's ID (`sub`).

### API Safety & Protection
* **SlowAPI Rate Limiting:** `[Current]` IP and user-based token bucket rate limits preventing LLM API exhaustion and denial-of-service.
* **Strict CORS & Header Policies:** `[Current]` Restricting origins to trusted frontend domains with HTTPOnly and SameSite cookies.
* **Input Sanitization & Schema Validation:** `[Current]` Pydantic models ensuring no prompt injection or corrupted payloads reach the agent engine.

### Psychological Safety & AI Guardrails
* **Emotional Crisis Detection:** `[Current]` Built-in evaluator triggers detecting acute emotional distress or self-harm keywords, instantly providing verified helpline resources and pausing career queries.
* **Non-Directive Socratic Guardrails:** `[Current]` Prompt rules preventing the AI from prescribing rigid life decisions; enforcing reflective questioning.
* **PII Redaction:** `[Roadmap]` Automated regex and NER redaction of phone numbers, addresses, and sensitive identifiers before embedding generation.

---

## 06. Team Tools and Engineering Practices

* **Code Hosting & Reviews:** GitHub (Feature branch workflows, e.g. `feature/sreekar-graphrag-okf`, Pull Requests with CI checks).
* **Testing & Quality Assurance:**
  * Backend: `pytest`, `pytest-asyncio`, live integration test probes (`test_graphrag.py`, `test_api.py`).
  * Frontend: `eslint`, `prettier`, TypeScript compilation (`tsc --noEmit`).
  * Code Quality: `ruff` (fast Python linting), `mypy` (static type checking).
* **AI Pair Programming & Architecture:** Antigravity IDE (Multi-agent pair programming), Claude, Google Gemini.
* **Project & Roadmap Management:** GitHub Projects & Notion boards with priority triage.
* **Knowledge & Prompt Vault:** Git-tracked `gems/nenu_evaru/` repository containing all psychological frameworks, prompts, and OKF guidelines.

---

## Summary Matrix: Current vs. Future Roadmap

| Domain | Current Stack (Active Now) | Future Roadmap Stack (Planned) |
| :--- | :--- | :--- |
| **Frontend Web** | Next.js 16, React 19, Tailwind v4, Lucide | Embeddable React/Vite widgets for colleges |
| **Mobile** | Responsive Web App (PWA-ready) | React Native (Expo) iOS & Android apps |
| **3D & Visuals** | Three.js (R3F 3D Avatar), React Flow, Recharts | Photorealistic Blendshape facial lip-sync |
| **Backend API** | FastAPI, Uvicorn, LangGraph | Microservices separation for heavy analytics |
| **Relational Data**| PostgreSQL 15/16 + asyncpg | PgBouncer connection pooling, read replicas |
| **Vector Search** | `pgvector` with 384-d `all-MiniLM-L6-v2` | Hybrid BM25 sparse + dense vector re-ranking |
| **Knowledge Graph**| Neo4j 5.23 (Cypher ego-graph extraction) | Automated graph community clustering & summarization |
| **LLMs (Cloud)** | AWS Bedrock (Claude 3.5), Gemini 1.5, GPT-4o | Specialized fine-tuned Indian coaching models |
| **LLMs (Local)** | Ollama (Llama 3.1 8B, Qwen 2.5, Phi-3 Mini) | vLLM cluster with multi-GPU continuous batching |
| **Voice AI** | Web Speech API, MediaRecorder | Whisper multilingual STT + ElevenLabs TTS |
| **Identity** | Clerk (OIDC, JWT via JWKS) | College institutional SSO (SAML / Google Workspace) |
| **Automation** | n8n (Self-hosted workflows) | WhatsApp Cloud API daily reflective nudges |
| **Deployment** | Docker Compose + Cloudflare Tunnel | Coolify self-hosted PaaS on dedicated GPU servers |
| **Payments** | Not enabled (Free student tier) | Razorpay & Stripe for expert human mentor sessions |
