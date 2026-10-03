# Requirements Traceability Matrix (RTM)

This matrix maps the requirements defined in the SRS to the source project documents and implementation artifacts to ensure complete coverage.

| Requirement ID | Description | Source Document / Origin | Implementation File / Module |
|----------------|-------------|--------------------------|------------------------------|
| **FR-AUTH-001** | Clerk Authentication | `Baagupadu_Project_Charter.md` | `frontend/src/middleware.ts` & `backend/api.py` (`verify_token`) |
| **FR-AUTH-002** | Account Deletion | DPDP Compliance Goal | `backend/api.py` (`@app.delete("/api/profile")`) |
| **FR-CONV-001** | Session Isolation | `system_design_document_sdd.md` | `backend/models.py` (`Conversation`, `ProfileState`) |
| **FR-CONV-002** | LangGraph Orchestration | `system_design_document_sdd.md` | `backend/agent/sahayam_engine.py` |
| **FR-CONV-003** | Background Extraction | `system_design_document_sdd.md` | `backend/api.py` (`run_extraction_background`) |
| **FR-RAG-001** | Top-4 Memory RRF | `user_flow/architecture.md` | `backend/database.py` or Memory Retrieval Module |
| **FR-RAG-002** | 768-Dim Embeddings | `system_design_document_sdd.md` | `backend/scripts/ingest_knowledge_base.py` |
| **FR-SAFE-001** | Guardrail Evaluation | `Baagupadu_Project_Charter.md` (Safety) | `backend/agent/agents/guardrail_agent.py` |
| **FR-SAFE-002** | No Medical Diagnosis | `system_design_document_sdd.md` | `gems/nenu_evaru/prompts/` |
| **NFR-PERF-001**| 15 req/min Rate Limit | `system_design_document_sdd.md` | `backend/api.py` (`limiter`) |
| **NFR-SEC-001** | JWT Authorization | `system_design_document_sdd.md` | `backend/auth.py` |
| **NFR-PRIV-001**| Hard Deletion Cascade | Privacy Engineering Goals | `backend/api.py` (`delete_account`) |
| **NFR-AI-001**  | RAG Grounding | `Baagupadu_Project_Charter.md` | `backend/agent/sahayam_engine.py` |
| **Deploy-001**  | Docker Compose | `README.md` | `docker-compose.yml` |
| **Deploy-002**  | vLLM for Production | `technical_feasibility_report.md` | `backend/.env.example` |
| **Deploy-003**  | Cloudflare Tunnels | `technical_architecture_diagram.md`| `docker-compose.yml` (`cloudflared`) |
