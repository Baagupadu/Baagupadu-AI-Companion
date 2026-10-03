# TBD, Assumptions, and Open Decisions Register

This register highlights unresolved conflicts, assumptions, and pending decisions discovered during the documentation audit.

| ID | Category | Description / Conflict | Impact | Action Required |
|----|----------|------------------------|--------|-----------------|
| **TBD-001** | Discrepancy | **LLM Model Selection:** `README.md` specifies `qwen2.5:7b` (Logic), `llama3.1:8b` (Chat), and `phi3:mini` (Eval). However, `docker-compose.yml` and `.env.example` strictly define `llama3.1:latest` for both Chat and Logic. | AI response formatting/quality may differ from design intentions. | Engineering to finalize and unify model configuration across Docker and documentation. |
| **TBD-002** | Discrepancy | **Deletion API Endpoint:** `frontend/src/lib/api.ts` calls `DELETE /api/user` for account deletion, but `backend/api.py` exposes this route as `@app.delete("/api/profile")`. | Account deletion feature is broken in the frontend. | Rename endpoint in frontend or backend to match. |
| **TBD-003** | Assumption | **vLLM Integration:** `docker-compose.yml` comments suggest vLLM for production, but no vLLM container is defined natively in the compose file. | Deployment to college server requires manual vLLM configuration. | Provide a dedicated `docker-compose.prod.yml` that includes vLLM. |
| **TBD-004** | Discovery | **GraphRAG Schema:** `models.py` contains `MemoryNode` and `MemoryEdge` tables for GraphRAG relationships, but the `README.md` and SDD heavily emphasize `pgvector` only. | Undocumented feature exists in the schema. | Update system architecture to document GraphRAG or remove the tables if deprecated. |
| **TBD-005** | Discovery | **LLM Provider Default:** `backend/.env.example` defaults to `LLM_PROVIDER=bedrock`, which conflicts with the "100% Local AI via Ollama" project vision stated in the Project Charter. | Developer confusion during initial setup. | Update `.env.example` default to `ollama`. |
