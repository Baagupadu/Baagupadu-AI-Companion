# Software Requirements Specification (SRS)
**Project Title:** Baagupadu (బాగుపడు)
**Document Identifier:** BGP-SRS-001
**Version Number:** 1.0
**Release Status:** Initial Baseline
**Preparation Date:** 2026-10-03
**Authors and Contributors:** Baagupadu Team
**Reviewers:** TBD
**Approvers:** TBD
**Confidentiality Classification:** Internal Use Only

## Document Control
### Revision History
| Version | Date | Description | Author |
|---------|------|-------------|--------|
| 1.0 | 2026-10-03 | Initial Standards-Aligned SRS created from repository evidence | Engineering Team |

### Approval
| Role | Name | Signature | Date |
|------|------|-----------|------|
| Project Vision Holder | TBD | TBD | TBD |
| Executive Sponsor | TBD | TBD | TBD |
| System Architect | TBD | TBD | TBD |

---

## 1. Introduction
### 1.1 Purpose of the SRS
This Software Requirements Specification (SRS) details the functional, non-functional, security, privacy, and AI-specific requirements for the Baagupadu mentoring ecosystem. It provides the definitive baseline for development, testing, and validation, conforming to ISO/IEC/IEEE 29148:2018 and ISO/IEC 25010:2023.

### 1.2 Product Purpose
Baagupadu ("To Prosper & Better Oneself") is an AI-powered mentoring and career guidance ecosystem. It acts as an empathetic, context-aware psychological AI mentor ("Sahayam") that guides users through a six-phase self-discovery journey to produce a synthesized persona and career roadmap. The system is classified as an educational support platform and non-clinical mentoring tool.

### 1.3 Project Scope
The scope encompasses a Next.js frontend web application, a FastAPI backend, a LangGraph-based multi-agent orchestration engine, local Ollama-based LLM inference, and a PostgreSQL database utilizing pgvector for RAG. Future expansions (mobile apps, enterprise/B2B models) are out of scope for this MVP.

### 1.4 Intended Audience
This document is intended for:
- Developers and System Architects
- Quality Assurance and Testing Teams
- Privacy and Security Engineers
- Project Sponsors and Vision Holders
- College IT Administrators (for deployment planning)

### 1.5 Document Conventions
- **Shall** indicates a mandatory requirement.
- **Should** indicates a highly desirable but not strictly mandatory capability.
- **May** indicates an optional capability.
- Requirement Identifiers follow the format `FR-XXX-001` or `NFR-XXX-001`.

### 1.6 Definitions, Acronyms, and Abbreviations
- **API:** Application Programming Interface
- **JSON:** JavaScript Object Notation
- **JWT:** JSON Web Token
- **LLM:** Large Language Model
- **RAG:** Retrieval-Augmented Generation
- **TBD:** To Be Determined
- **RRF:** Reciprocal Rank Fusion

### 1.7 References
- ISO/IEC/IEEE 29148:2018 - Requirements Engineering
- ISO/IEC 25010:2023 - Product Quality Model
- NIST AI Risk Management Framework

---

## 2. Product and System Context
### 2.1 Business and User Problem
Target users face an "Information Paradox"—confusion and decision paralysis caused by too much generic career content. Users lack personalized, deep mentorship to align their identity with career choices.

### 2.2 Product Goals and Outcomes
- Provide accessible, conversational career mentorship.
- Synthesize user traits into a structured persona.
- Generate personalized career roadmaps.

### 2.3 System Boundary and External Systems
The system operates primarily within a self-contained environment (Docker on local or college servers) to ensure privacy.
External systems include:
- **Clerk Authentication Service:** For user identity management.
- **NCS Portal (Proposed):** Potential future integration.

### 2.4 High-Level Operating Concept
Users interact with a 3D web UI. Their messages are sent to a backend orchestrator that utilizes specialized LLM agents (Planner, Guardrail, Executor, Synthesizer, Extractor, Evaluator) to maintain an empathetic conversation, validate safety, and extract long-term traits into a vector database for session continuity.

### 2.5 Major Components
- **Frontend:** Next.js 16 App Router, React Three Fiber, Zustand.
- **Backend:** FastAPI, LangGraph, SQLAlchemy.
- **Database:** PostgreSQL 15 with pgvector.
- **AI Inference:** Ollama (local) or vLLM (production).

### 2.6 Deployment Context
- **Local/Development:** Local workstation via Docker Compose.
- **Production:** College-hosted internal bare-metal servers equipped with NVIDIA GPUs, accessible via Cloudflare Zero Trust Tunnels.

### 2.7 Assumptions, Dependencies, and Constraints
- **Assumptions:** Users have reliable internet access to reach the college network.
- **Dependencies:** Clerk for authentication.
- **Constraints:** Must use open-weight LLMs (Llama 3.1, Qwen 2.5) to run locally on college infrastructure without paid API dependencies for core chat.

---

## 3. Stakeholders and User Classes
- **Student / End User:** Seeks career clarity. Needs an intuitive, non-judgmental interface and absolute privacy guarantees.
- **Platform Administrator:** Manages prompts, knowledge bases, and system health. Has no access to raw, un-anonymized chat histories.
- **College IT Administrator:** Deploys and monitors the Docker infrastructure.
- **Evaluator / Researcher:** Evaluates model performance via aggregated, anonymized metrics (e.g., ROUGE-L).

---

## 4. Operating Environment
- **Client:** Modern web browser supporting WebGL (for R3F).
- **Backend Server:** Python 3.11+, minimum 48GB VRAM (e.g., 1x A6000), 16-Core CPU, 64GB RAM for production vLLM deployment.
- **Database Server:** PostgreSQL 15+.

---

## 5. Functional Requirements

### 5.1 Authentication and Onboarding
| Req ID | Description | Fit Criterion / Verification |
|--------|-------------|------------------------------|
| FR-AUTH-001 | The system shall authenticate users via Clerk OAuth/Email. | User successfully logs in and receives a valid JWT. |
| FR-AUTH-002 | The system shall allow users to delete their account and all associated data. | Invoking the account deletion API removes user from `users`, `conversations`, `messages`, `profile_state`, and `long_term_memory`. |

### 5.2 Conversation and Multi-Agent Orchestration
| Req ID | Description | Fit Criterion / Verification |
|--------|-------------|------------------------------|
| FR-CONV-001 | The system shall maintain session isolation; new sessions start with a blank psychological profile. | `ProfileState` is empty for a newly initialized `conversation_id`. |
| FR-CONV-002 | The system shall orchestrate conversations using a finite state machine (LangGraph) consisting of Planner, Evaluator, Executor, and Extractor agents. | Logs demonstrate routing through LangGraph nodes per user turn. |
| FR-CONV-003 | The system shall execute background extraction to update the user's Persona without blocking the response. | `ProfileState.persona` updates after response delivery. |

### 5.3 Knowledge Retrieval and Memory
| Req ID | Description | Fit Criterion / Verification |
|--------|-------------|------------------------------|
| FR-RAG-001 | The system shall retrieve the top-4 relevant memories using Reciprocal Rank Fusion (Keyword + Vector search). | RAG logs confirm maximum of 4 injected contexts. |
| FR-RAG-002 | The system shall embed all knowledge base chunks and long-term memories using the `nomic-embed-text-v1.5` model (768 dimensions). | Database schema strictly enforces 768-dimensional vector column. |

### 5.4 Safety and Guardrails
| Req ID | Description | Fit Criterion / Verification |
|--------|-------------|------------------------------|
| FR-SAFE-001 | The system shall evaluate user input through a Guardrail Agent before generating a response. | Unsafe input returns a block message and logs a `GUARDRAIL_BLOCK` event. |
| FR-SAFE-002 | The system shall refrain from making medical diagnoses or prescribing medication. | Prompt templates explicitly forbid diagnosis. |

---

## 6. External Interface Requirements
- **Frontend-Backend API:** RESTful JSON endpoints (e.g., `/api/chat`, `/api/profile`, `/api/reset`).
- **Inference Interface:** Uses Ollama API (`http://ollama:11434/v1`) in dev; vLLM API (`/v1`) in production.

---

## 7. Data Requirements
- **Users Table:** Stores Clerk ID, demographics (JSONB).
- **Conversations Table:** Tracks session lifecycles.
- **Messages Table:** Stores raw dialogue.
- **ProfileState Table:** Stores `session_progress`, `life_stage_data`, `persona`, and `guidance` (JSON).
- **LongTermMemory Table:** Stores extracted traits with 768-dim `pgvector` embeddings.
- **KnowledgeBaseChunk Table:** Stores RAG document chunks with 768-dim embeddings.
- **MemoryNode/Edge Tables:** Supports GraphRAG concepts.
- **AuditLog Table:** Logs system and security events (e.g., `GUARDRAIL_BLOCK`).

---

## 8. Business Rules
- **BR-001:** Session Data Isolation. Conversations are strictly isolated. Starting a "New Chat" resets the in-memory context entirely.
- **BR-002:** Safe Escalation. Any detection of self-harm triggers the guardrail to prevent standard psychological processing and instead provide emergency resources.

---

## 9. Non-Functional and Quality Requirements (ISO/IEC 25010)

### 9.1 Performance Efficiency
- **NFR-PERF-001:** The API shall support a chat rate limit of 15 requests/minute in production.
- **NFR-PERF-002:** The system shall respond to chat queries within a controlled TBD latency threshold (measured as first-token latency).

### 9.2 Reliability
- **NFR-REL-001:** The system shall implement background extraction to ensure the main chat flow does not fail if extraction times out.

### 9.3 Security and Privacy
- **NFR-SEC-001:** All API requests except public webhooks must supply a valid JWT Bearer token validated against the Clerk JWKS.
- **NFR-PRIV-001:** The system shall provide a hard-delete endpoint that cascades deletion across all tables.

---

## 10. AI and Mental-Wellbeing Safety
- **NFR-AI-001 (Grounding):** Responses must be constrained by the psychological frameworks stored in the RAG knowledge base.
- **NFR-AI-002 (Refusal):** The Guardrail Agent shall detect and intercept adversarial prompt injections.

---

## 11. Deployment and Operational Requirements
- **Deploy-001:** The system shall be deployable via Docker Compose.
- **Deploy-002:** College deployment shall utilize vLLM for inference to support concurrent users via PagedAttention and continuous batching.
- **Deploy-003:** External access shall be tunneled securely via Cloudflare Zero Trust (cloudflared) without exposing inbound server ports.

---

## 12. Use Cases
### UC-01: Conversational Chat
**Actor:** Student
**Trigger:** User sends a message in the chat UI.
**Flow:**
1. UI sends POST to `/api/chat`.
2. Guardrail agent verifies safety.
3. LangGraph retrieves RRF context, generates response.
4. Response streams to client.
5. Extractor and Evaluator agents run in the background.
**Exception Flow:** If guardrail fails, log Audit event and return refusal.

---

## 13. Traceability, Risks, and Open Decisions
(See accompanying artifact deliverables for Traceability Matrix, Change Impact Register, and TBD Register)
