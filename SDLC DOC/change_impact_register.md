# Change-Impact Register

This register documents the differences between the current documented architectural intentions (Project Charter, SDD) and the actual codebase implementation.

| Change / Discovery | Documented State | Implemented State | Impact Assessment |
|--------------------|------------------|-------------------|-------------------|
| **Account Deletion Endpoint Mismatch** | Not explicitly documented in SDD | Frontend expects `/api/user`, Backend provides `/api/profile`. | **HIGH:** Privacy requirement (Right to Erasure) is currently broken in integration. Must align routes. |
| **Ollama Model Defaults** | `README.md` says Qwen + Llama + Phi3 | `docker-compose.yml` pulls only `llama3.1:latest` for both logic and chat. | **MEDIUM:** Decreases local VRAM load, but may lose Qwen's specific logical extraction capabilities. |
| **GraphRAG Implementation** | Mentioned loosely in architecture | `MemoryNode` and `MemoryEdge` exist in SQLAlchemy `models.py` but no extraction logic exists in `ingest_knowledge_base.py`. | **LOW:** Unused tables consume minimal resources but add technical debt. |
| **Bedrock vs Ollama Default** | "100% Local AI" | `.env.example` defaults `LLM_PROVIDER` to `bedrock`. | **LOW:** Causes onboarding friction for open-source setup. |
| **Evaluator Output** | SDD mentions Evaluator Agent | `run_evaluation_background` in `api.py` logs to `logs/evaluations.jsonl` rather than DB. | **LOW:** Logs are stored on disk inside container, which may be lost on container restart if not volumed. |
