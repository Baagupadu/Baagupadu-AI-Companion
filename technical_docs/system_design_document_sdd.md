# Comprehensive Software Design Document (SDD)
**Project Name:** Baagupadu AI Companion (MVP v1.0)
**Document Version:** 2.0 (Detailed Expansion)
**Date:** October 2026
**Prepared For:** Executive Board & Engineering Team

---

## 1. Introduction

### 1.1 Purpose
The purpose of this Comprehensive Software Design Document (SDD) is to provide an exhaustive architectural blueprint and detailed design specifications for the Baagupadu AI Companion system. This document adheres to enterprise IT standards and serves as the definitive reference for developers, technical managers, DevOps engineers, and stakeholders to understand the system's architecture, data flows, security protocols, and operational constraints.

### 1.2 Scope
This document covers the Minimum Viable Product (MVP v1.0) of Baagupadu in its entirety. It details the interaction between the Next.js 3D web frontend, the asynchronous FastAPI backend, the LangGraph multi-agent orchestration layer, the local LLM inference engine (Ollama), and the relational/vector database layer (PostgreSQL with `pgvector`).

### 1.3 Definitions and Acronyms
- **LLM:** Large Language Model
- **RAG:** Retrieval-Augmented Generation
- **OKF:** Open Knowledge Format (Google Cloud specification for Markdown knowledge routing)
- **RRF:** Reciprocal Rank Fusion
- **VDI:** Virtual Desktop Infrastructure
- **JWT:** JSON Web Token
- **GGUF:** GPT-Generated Unified Format (quantized model format for CPU/GPU efficiency)
- **vLLM:** A high-throughput and memory-efficient LLM inference and serving engine.

---

## 2. System Overview
Baagupadu is an empathetic, context-aware AI career and life companion. Unlike traditional static chatbots that follow rigid decision trees, Baagupadu utilizes a dynamic Multi-Agent architecture to separate psychological reasoning, empathetic execution, and post-generation evaluation. 

To eliminate external API costs, protect sensitive user psychology data (PII), and bypass strict rate limits, the system features a fully local, privacy-first offline LLM inference engine.

---

## 3. System Architecture

### 3.1 High-Level Architectural Design
The system follows a decoupled, microservices-oriented architecture using a client-server model, orchestrated locally via Docker Compose.

**Key Architectural Tiers:**
1. **Presentation Tier (Client):** Built on Next.js 16 (App Router), this tier utilizes React Three Fiber (R3F) and Framer Motion to render high-fidelity, hardware-accelerated 3D UI components. It manages local state via Zustand and communicates with the backend via Axios.
2. **Application/Orchestration Tier (Backend):** Built on FastAPI. It handles HTTP requests, authenticates them via JWT, and delegates complex state management to LangGraph.
3. **Inference Tier (AI Engine):** Powered by Ollama. It provides highly optimized local execution of quantized (`.gguf`) Large Language Models.
4. **Data Tier (Persistence):** Powered by PostgreSQL 15. It handles both structured relational data (user accounts) and high-dimensional vector embeddings (`pgvector`) via the `asyncpg` driver.

### 3.2 Design Rationale & Technology Choices
- **Multi-Model Orchestration:** Single-model architectures often suffer from "mixed intents" (e.g., trying to plan a psychological intervention while simultaneously generating an empathetic response). To prevent this, workloads are split across three distinct models: 
    - **Logic/Routing:** `qwen2.5:latest` (Excellent at strict reasoning and structured outputs).
    - **Empathetic Generation:** custom `baagupadu_model` (A Llama 3 8B model heavily fine-tuned on Gen-Z empathy).
    - **Evaluation:** `phi3:mini` (Lightweight model for calculating metrics like ROUGE-L).
- **FastAPI over Django/Flask:** FastAPI natively supports `asyncio`, which is critical for handling long-running WebSocket connections and asynchronous LLM streaming without blocking the main server thread.

---

## 4. Data Design & Memory Architecture

### 4.1 Database Architecture (Entity-Relationship)
The system utilizes PostgreSQL 15, managed via SQLAlchemy 2.0 (Async mode). 

**Core Entities & Schemas:**
- `users`: 
    - `id` (UUID, Primary Key)
    - `clerk_id` (String, Unique)
    - `demographics` (JSONB) - Stores dynamic user data without rigid schema migrations.
    - `preferences` (JSONB)
- `sessions`: 
    - `id` (UUID, Primary Key)
    - `user_id` (Foreign Key -> users.id)
    - `current_phase` (Enum: Childhood, Teenage, Adulthood)
    - `emotional_valence` (Float) - Tracks user sentiment over time.
- `long_term_memory`: 
    - `id` (UUID, Primary Key)
    - `session_id` (Foreign Key -> sessions.id)
    - `content` (Text) - The actual conversational turn.
    - `embedding` (Vector: 768 dimensions) - Indexed via `pgvector` HNSW (Hierarchical Navigable Small World) index for ultra-fast ANN (Approximate Nearest Neighbor) search.

### 4.2 Data Flow & Retrieval Strategy (Reciprocal Rank Fusion)
To prevent "context bloat" (where injecting too much chat history causes the LLM to forget its system prompt), the system implements **Reciprocal Rank Fusion (RRF)**. 

**Execution Flow:**
1. **Input:** User sends a message (e.g., "I feel lost in my career").
2. **Keyword Search:** The database executes a `to_tsvector` full-text search against `long_term_memory`.
3. **Vector Search:** The input is embedded via `nomic-embed-text-v1.5`. The database calculates Cosine Distance against all stored vectors.
4. **Fusion:** The ranks from both searches are mathematically combined: `RRF Score = 1 / (k + Keyword_Rank) + 1 / (k + Vector_Rank)`.
5. **Injection:** Only the Top-4 highest-scoring memories are injected into the Executor Agent's prompt, guaranteeing high relevance with minimal token usage.

---

## 5. Component Design & Agent Orchestration

### 5.1 Orchestration Component (LangGraph)
The core backend logic is structured as a finite state machine (StateGraph) via LangChain/LangGraph.

- **Node 1: Planner Agent** 
    - **Role:** Analytical extraction.
    - **Action:** Ingests user input and reads OKF (Open Knowledge Format) Markdown rules from `gems/nenu_evaru/`. It determines the psychological intent and outputs a strict JSON strategy.
- **Node 2: Executor Agent** 
    - **Role:** Generative execution.
    - **Action:** Ingests the JSON strategy from the Planner and the Top-4 RRF memories. Executes response generation using the custom fine-tuned `baagupadu_model`. It follows a strict rhythmic output format (Validation -> Insight -> Question).
- **Node 3: Evaluator Agent** 
    - **Role:** Quality Assurance.
    - **Action:** Runs asynchronously *after* the response is sent to the user. Computes standard NLP metrics (ROUGE-L and Distinct-2) to track conversational degradation and logs them to `backend/logs/evaluations.jsonl`.

### 5.2 Network & Security Component
- **Authentication:** The Next.js frontend utilizes Clerk for OAuth. The backend FastAPI server utilizes `PyJWT` to decode and cryptographically verify the Clerk edge-tokens on every API request.
- **Rate Limiting:** Managed via `SlowAPI` (memory-backed). It limits requests to `/api/chat` to prevent denial-of-service (DoS) attacks against the GPU/CPU inference engine, ensuring stable performance.
- **Contractor Security:** All remote UI/UX freelancers are mandated to operate within **GitHub Codespaces** (a Cloud Development Environment) restricted to the `frontend/` branch, ensuring zero source-code leakage to local personal computers.

---

## 6. Human Interface Design (Frontend)

### 6.1 UI/UX Principles
The frontend strictly adheres to a "glassmorphism" and 3D cinematic aesthetic, drawing heavily from Apple-style scroll-jacking and fluid micro-animations.
- **Libraries:** `@react-three/fiber` (R3F), `three.js`, `framer-motion`.
- **UX Directive:** The interface must not resemble a B2B SaaS dashboard. It must feel fluid, dynamic, and "alive." The emotional ledger and phase progression widgets must update seamlessly without jarring page reloads.

---

## 7. Deployment, Scalability, & Infrastructure

### 7.1 Local Development Environment (MVP)
- **Containerization:** Orchestrated via `docker-compose.yml`.
- **Services Running:** 
    - `db`: `pgvector:pg15` (Port 5433)
    - `backend`: FastAPI (Port 8000)
    - `frontend`: Next.js (Port 3000)
    - `ollama`: LLM Engine (Port 11434)
    - `adminer`: Database GUI (Port 8080)
    - `n8n`: Webhook Automation (Port 5678)
    - `cloudflared`: Secure tunneling for public webhook testing.

### 7.2 Production Environment Strategy (College Deployment)
- **Hardware Profile:** College-hosted internal bare-metal servers equipped with NVIDIA GPUs (e.g., L4, A10g, or RTX 4090s).
- **Inference Engine Upgrade:** For production, we will transition from Ollama (which relies on `.gguf` for CPU/Edge efficiency) to **vLLM**. 
    - **Rationale:** vLLM utilizes PagedAttention and continuous batching. This allows a single GPU to handle dozens of concurrent student requests simultaneously with extreme high-throughput, which Ollama cannot natively support.
    - **Format Change:** The custom fine-tuned model will be exported from GGUF to `.safetensors` or AWQ format for vLLM compatibility.
- **Network Tunneling:** Cloudflare Tunnels (Zero Trust) will be used to expose the local college infrastructure securely to the internet without opening inbound firewall ports or exposing IP addresses to DDoS attacks.
