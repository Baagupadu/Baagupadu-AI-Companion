"""
Unit Tests for Database Models and Multi-Tenant User Isolation.
"""
import pytest
import uuid
from sqlalchemy.future import select
from backend.models import User, Conversation, Message, AuditLog, KnowledgeBaseChunk


@pytest.mark.asyncio
async def test_user_and_conversation_creation(db_session):
    """Test creating user and conversation models."""
    user_id = f"test_user_{uuid.uuid4()}"
    user = User(id=user_id)
    db_session.add(user)
    await db_session.flush()

    conv = Conversation(user_id=user.id)
    db_session.add(conv)
    await db_session.flush()

    # Query back
    result = await db_session.execute(select(Conversation).where(Conversation.user_id == user_id))
    retrieved = result.scalars().first()
    assert retrieved is not None
    assert retrieved.user_id == user_id


@pytest.mark.asyncio
async def test_audit_log_recording(db_session):
    """Test audit log creation for tracking security and lifecycle actions."""
    user_id = f"test_user_{uuid.uuid4()}"
    audit = AuditLog(
        user_id=user_id,
        action="GUARDRAIL_BLOCK",
        details={"reason": "Prompt injection detected", "blocked_input": "DAN attack"}
    )
    db_session.add(audit)
    await db_session.flush()

    result = await db_session.execute(select(AuditLog).where(AuditLog.user_id == user_id))
    entry = result.scalars().first()
    assert entry is not None
    assert entry.action == "GUARDRAIL_BLOCK"
    assert entry.details["reason"] == "Prompt injection detected"


@pytest.mark.asyncio
async def test_knowledge_base_chunk_model(db_session):
    """Test KnowledgeBaseChunk model storing knowledge base content and metadata."""
    chunk_kwargs = {
        "content": "Socratic career exploration guide for software engineering.",
        "source_file": "router.md",
        "phase": "trust",
        "chunk_index": 0
    }
    if hasattr(KnowledgeBaseChunk, "okf_metadata"):
        chunk_kwargs["okf_metadata"] = {
            "id": "KB-CAR-001",
            "title": "Software Engineering Career Compass",
            "domain": "careers",
        }

    chunk = KnowledgeBaseChunk(**chunk_kwargs)
    db_session.add(chunk)
    await db_session.flush()

    result = await db_session.execute(select(KnowledgeBaseChunk).limit(1))
    retrieved = result.scalars().first()
    assert retrieved is not None
    assert "software" in retrieved.content.lower()
    assert retrieved.source_file == "router.md"
