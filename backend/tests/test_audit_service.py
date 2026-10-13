"""
Tests for AuditLogService and Security Observability.
Verifies compliance with DPDP Act, CERT-In logging, and fail-safe operation.
"""
import pytest
import uuid
from unittest.mock import MagicMock
from sqlalchemy import select
from backend.models import User, AuditLog
from backend.services.audit_service import AuditLogService


@pytest.mark.asyncio
async def test_audit_log_service_creates_entry_with_integrity_hash(db_session):
    """Verify AuditLogService creates structured events with valid SHA-256 integrity hash."""
    user_id = f"test_user_{uuid.uuid4()}"
    entry = await AuditLogService.log_event(
        db=db_session,
        action="GUARDRAIL_INTERCEPTION",
        category="SECURITY",
        severity="HIGH",
        user_id=user_id,
        resource_type="chat_message",
        details={"blocked_pattern": "DAN_JAILBREAK", "reason": "System override attempted"}
    )

    assert entry is not None
    assert entry.event_id.startswith("aud_")
    assert entry.action == "GUARDRAIL_INTERCEPTION"
    assert entry.category == "SECURITY"
    assert entry.severity == "HIGH"
    assert entry.user_id == user_id
    assert entry.integrity_hash is not None
    assert len(entry.integrity_hash) == 64 # Standard SHA-256 hex length

    # Verify database persistence
    result = await db_session.execute(select(AuditLog).where(AuditLog.event_id == entry.event_id))
    persisted = result.scalars().first()
    assert persisted is not None
    assert persisted.details["blocked_pattern"] == "DAN_JAILBREAK"


@pytest.mark.asyncio
async def test_client_ip_and_user_agent_extraction(db_session):
    """Verify extraction of Cloudflare proxy IPs and User-Agent headers."""
    mock_request = MagicMock()
    mock_request.headers = {
        "CF-Connecting-IP": "203.0.113.195",
        "User-Agent": "Mozilla/5.0 BaagupaduTestClient/1.0"
    }

    entry = await AuditLogService.log_event(
        db=db_session,
        action="AUTH_LOGIN",
        category="AUTH",
        severity="LOW",
        user_id="test_student_clerk",
        request=mock_request
    )

    assert entry is not None
    assert entry.ip_address == "203.0.113.195"
    assert "BaagupaduTestClient" in entry.user_agent


@pytest.mark.asyncio
async def test_audit_log_service_fail_safe_on_error():
    """Verify AuditLogService catches DB errors and returns None without raising."""
    failing_db = MagicMock()
    failing_db.add.side_effect = RuntimeError("Database connection suddenly dropped")

    # Must NOT raise exception to guarantee zero user interruption
    result = await AuditLogService.log_event(
        db=failing_db,
        action="SYSTEM_CHECK",
        category="SECURITY",
        user_id="test_user"
    )
    assert result is None


@pytest.mark.asyncio
async def test_get_recent_logs_with_filtering(db_session):
    """Verify querying recent logs with category filtering."""
    uid = f"user_{uuid.uuid4().hex[:8]}"
    await AuditLogService.log_event(db=db_session, action="ACT_1", category="SECURITY", user_id=uid)
    await AuditLogService.log_event(db=db_session, action="ACT_2", category="AI_LIFECYCLE", user_id=uid)

    security_logs = await AuditLogService.get_recent_logs(db=db_session, user_id=uid, category="SECURITY")
    assert len(security_logs) == 1
    assert security_logs[0].action == "ACT_1"


@pytest.mark.asyncio
async def test_account_deletion_anonymizes_audit_logs_for_compliance(client, mock_auth, db_session):
    """
    DPDP Act & CERT-In Compliance:
    Deleting user account erases personal data but anonymizes audit logs to maintain security history.
    """
    test_uid = mock_auth
    # Ensure user exists and has audit log
    existing_user = await db_session.get(User, test_uid)
    if not existing_user:
        db_session.add(User(id=test_uid, email="student@example.com"))
        await db_session.commit()

    await AuditLogService.log_event(
        db=db_session,
        action="GUARDRAIL_BLOCK",
        category="SECURITY",
        severity="HIGH",
        user_id=test_uid,
        details={"reason": "Penetration test probe"}
    )

    # Call DELETE /api/profile
    headers = {"Authorization": "Bearer test-student-token"}
    response = await client.delete("/api/profile", headers=headers)
    assert response.status_code == 200

    # User table row must be completely deleted (DPDP Right to Erasure)
    user_res = await db_session.execute(select(User).where(User.id == test_uid))
    assert user_res.scalars().first() is None

    # Audit log must STILL exist, but with user_id anonymized to None (CERT-In audit preservation)
    audit_res = await db_session.execute(select(AuditLog).where(AuditLog.action == "GUARDRAIL_BLOCK"))
    anonymized_audit = audit_res.scalars().first()
    assert anonymized_audit is not None
    assert anonymized_audit.user_id is None
    assert anonymized_audit.details.get("anonymized") is True
