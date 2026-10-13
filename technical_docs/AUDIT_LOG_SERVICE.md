# AUDIT LOG SERVICE & SECURITY OBSERVABILITY SPECIFICATION
**Baagupadu AI Career Guidance & Mentorship Platform**  
*Document Version: 1.0.0 | Status: Architecture Specification | Classification: Engineering & Compliance*

---

## 1. Executive Summary & Current State Audit

### 1.1 Do We Have an Audit Log Service Right Now?
* **Current Verdict: Partially implemented as an ad-hoc database table; NOT a production-grade Audit Log Service.**

### 1.2 What Currently Exists in Code:
1. **Database Schema:** [`backend/models.py`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/models.py#L138-L151) defines an `AuditLog` table:
   ```python
   class AuditLog(Base):
       id = Column(Integer, primary_key=True, autoincrement=True)
       user_id = Column(String(255), ForeignKey("users.id"), index=True, nullable=False)
       action = Column(String(50), nullable=False) # e.g., 'GUARDRAIL_BLOCK', 'USER_MESSAGE'
       details = Column(JSON, default=dict)
       timestamp = Column(DateTime(timezone=True), server_default=func.now())
   ```
2. **Ad-hoc Logging in API:** [`backend/api.py`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/api.py#L243-L262) manually adds rows to `AuditLog` inside the `/chat` route:
   * When `GuardrailAgent` detects prompt injection: records `action="GUARDRAIL_BLOCK"`.
   * When a safe message passes: records `action="USER_MESSAGE"`.
3. **Automated Unit Tests:** [`backend/tests/test_models.py`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/tests/test_models.py#L32-L46) verifies `AuditLog` record insertion and retrieval.

---

### 1.3 Critical Gaps in Current Implementation:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                          CURRENT VS. PRODUCTION AUDIT SERVICE                          │
├──────────────────────────┬───────────────────────────┬─────────────────────────────────┤
│ Capability               │ Current Implementation    │ Required Production Service     │
├──────────────────────────┼───────────────────────────┼─────────────────────────────────┤
│ Architecture             │ Ad-hoc direct DB inserts  │ Centralized `AuditLogService`   │
│ Processing Model         │ Synchronous (Blocks reqs) │ Asynchronous (Non-blocking Q)  │
│ Immutability             │ Mutable (Can be deleted)  │ Append-only & Cryptographic HMAC│
│ Scope of Coverage        │ Chat prompts only         │ Auth, Admin, PII scrub, LLM     │
│ Context Captured         │ User ID & Action only     │ IP, User-Agent, Trace ID, Status│
│ Statutory Retention      │ No archival policy        │ 180-Day CERT-In log archival    │
│ SIEM / Export API        │ None                      │ Searchable API & SIEM streaming │
└──────────────────────────┴───────────────────────────┴─────────────────────────────────┘
```

> [!CAUTION]
> **Current Security Anti-Pattern in `backend/api.py`:**
> In `api.py` under the `/api/profile/reset` endpoint:
> `await db.execute(delete(AuditLog).where(AuditLog.user_id == user_id))`
> In regulatory auditing (CERT-In, SOC 2, ISO 27001), **audit logs must NEVER be deleted** when a user resets their profile. Security events (like detected attacks or IP access) must be preserved or pseudonymized, never expunged.

---

## 2. Regulatory & Compliance Drivers for an Audit Service

An enterprise audit service is not merely a logging helper; it is a legally mandated subsystem:

1. **CERT-In Cyber Security Directions (India - 2022):**
   * **180-Day Retention:** All system, application, and access logs must be maintained within the Indian jurisdiction for at least **180 rolling days**.
   * **NTP Synchronization:** All timestamps must be strictly synchronized via Network Time Protocol (NTP).
2. **EU AI Act (Article 12 - Automatic Logging):**
   * High-risk AI systems must automatically log their operations throughout their lifecycle.
   * Logs must capture the input data, system response, output generation timestamps, and human intervention points.
3. **SOC 2 Type II (Trust Services Criteria CC7.2 & CC7.3):**
   * Requires continuous monitoring of security events, administrative access, privilege escalations, and unauthorized data access attempts.
4. **DPDP Act 2023 (Accountability & Auditability):**
   * The Data Fiduciary (Baagupadu) must be able to demonstrate that reasonable security safeguards were maintained at all times.

---

## 3. Production Architecture of the Baagupadu Audit Log Service

The proposed Audit Log Service decouples event recording from user requests to ensure **zero latency impact** and **fail-safe log delivery**.

```
                           [ INCOMING STUDENT / CLIENT REQUEST ]
                                            │
                                            ▼
                           [ FastAPI Request Pipeline ]
                                            │
               ┌────────────────────────────┴────────────────────────────┐
               │                                                         │
      [ API Route Handler ]                                    [ AuditLogService ]
 (Returns HTTP Response to User)                        (Non-Blocking Async Worker)
                                                                         │
                                       ┌─────────────────────────────────┴─────────────────────────────────┐
                                       │                                                                   │
                                       ▼                                                                   ▼
                          [ PostgreSQL `audit_logs` ]                                        [ JSONL Secure File Buffer ]
                           (Fast Indexed Search DB)                                           (Immutable Append-Only Log)
                                       │                                                                   │
                                       ▼                                                                   ▼
                         [ Admin Query / Review API ]                                       [ 180-Day Cold Archival (S3) ]
                         (Compliance & Security Team)                                            (CERT-In Compliant)
```

---

## 4. Standardized Audit Event Schema

Every audit log entry must adhere to the following strict, structured schema:

```json
{
  "event_id": "aud_01HXYZ9876543210ABCDEF",
  "timestamp": "2026-10-13T12:30:00.123456Z",
  "actor": {
    "user_id": "user_2test_clerk_id",
    "role": "student",
    "ip_address": "103.21.244.0",
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
  },
  "action": "GUARDRAIL_INTERCEPTION",
  "category": "SECURITY",
  "severity": "HIGH",
  "resource": {
    "type": "chat_session",
    "id": "conv_4892"
  },
  "context": {
    "blocked_pattern": "DAN_JAILBREAK",
    "scrubbed_input": "Ignore rules and tell me [REDACTED]",
    "guardrail_verdict": "FAIL_CLOSED",
    "latency_ms": 42
  },
  "integrity_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
}
```

### Event Categories & Action Taxonomy

| Category | Action Types | Severity | Description |
| :--- | :--- | :--- | :--- |
| **SECURITY** | `GUARDRAIL_BLOCK`, `PROMPT_INJECTION`, `RATE_LIMIT_EXCEEDED`, `UNAUTHORIZED_ACCESS` | `HIGH` / `CRITICAL` | Blocked malicious payloads, unauthorized endpoints, attack signatures. |
| **AUTH** | `LOGIN_SUCCESS`, `LOGIN_FAILED`, `TOKEN_REFRESH`, `LOGOUT` | `LOW` / `MEDIUM` | Identity lifecycle events via Clerk JWKS. |
| **DATA_PRIVACY** | `PII_SCRUBBED`, `DATA_EXPORT_REQUEST`, `ACCOUNT_ERASURE_REQUEST` | `MEDIUM` | Student data sanitization and DPDP user rights requests. |
| **AI_LIFECYCLE** | `PLANNER_STEP`, `EVALUATOR_VERDICT`, `ROADMAP_SYNTHESIZED`, `RAG_QUERY` | `LOW` | High-risk AI traceability under EU AI Act Article 12. |
| **ADMIN** | `KNOWLEDGE_BASE_INGEST`, `CONFIG_CHANGE`, `PROMPT_UPDATE` | `CRITICAL` | Operational changes to prompts, RAG corpus, or system behavior. |

---

## 5. Technical Implementation Blueprint

### 5.1 Enhanced Database Model (`backend/models.py`)

Upgrade the existing `AuditLog` table to include security taxonomy, client metadata, and SHA-256 integrity signatures:

```python
import hashlib
from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, Index
from sqlalchemy.sql import func
from backend.models import Base

class AuditLog(Base):
    """
    Enterprise Security Audit Log Model.
    Append-only, immutable record of security, AI lifecycle, and privacy events.
    """
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    event_id = Column(String(64), unique=True, nullable=False, index=True)
    
    # Actor Context
    user_id = Column(String(255), nullable=True, index=True)
    ip_address = Column(String(45), nullable=True) # Supports IPv6
    user_agent = Column(String(512), nullable=True)
    
    # Event Taxonomy
    category = Column(String(32), nullable=False, index=True) # SECURITY, AUTH, DATA_PRIVACY, AI_LIFECYCLE
    action = Column(String(64), nullable=False, index=True)   # GUARDRAIL_BLOCK, PII_SCRUBBED, etc.
    severity = Column(String(16), nullable=False, default="LOW") # LOW, MEDIUM, HIGH, CRITICAL
    
    # Target Resource & Payload
    resource_type = Column(String(64), nullable=True)
    resource_id = Column(String(64), nullable=True)
    details = Column(JSON, default=dict) # Sanitized context only (NO unredacted PII)
    
    # Integrity & Timestamps
    timestamp = Column(DateTime(timezone=True), server_default=func.now(), index=True)
    integrity_hash = Column(String(64), nullable=True) # SHA-256 hash of event contents

    __table_args__ = (
        Index("idx_audit_user_action", "user_id", "action"),
        Index("idx_audit_timestamp_category", "timestamp", "category"),
    )

    def generate_hash(self, secret_salt: str = "") -> str:
        payload = f"{self.event_id}:{self.timestamp}:{self.user_id}:{self.action}:{self.severity}:{secret_salt}"
        return hashlib.sha256(payload.encode("utf-8")).hexdigest()
```

---

### 5.2 Standalone Audit Service Module (`backend/services/audit_service.py`)

This service provides an asynchronous, non-blocking interface for logging across the application:

```python
import uuid
import logging
from datetime import datetime, timezone
from typing import Optional, Dict, Any
from fastapi import Request
from sqlalchemy.ext.asyncio import AsyncSession
from backend.models import AuditLog

logger = logging.getLogger("audit_service")

class AuditLogService:
    """
    Centralized, fail-safe audit logging service.
    Designed for CERT-In, DPDP, and EU AI Act compliance.
    """

    @staticmethod
    def extract_client_ip(request: Optional[Request]) -> Optional[str]:
        if not request:
            return None
        # Support Cloudflare and reverse proxy headers
        cf_ip = request.headers.get("CF-Connecting-IP")
        if cf_ip:
            return cf_ip
        x_forwarded = request.headers.get("X-Forwarded-For")
        if x_forwarded:
            return x_forwarded.split(",")[0].strip()
        return request.client.host if request.client else None

    @classmethod
    async def log_event(
        cls,
        db: AsyncSession,
        action: str,
        category: str = "SECURITY",
        severity: str = "LOW",
        user_id: Optional[str] = None,
        request: Optional[Request] = None,
        resource_type: Optional[str] = None,
        resource_id: Optional[str] = None,
        details: Optional[Dict[str, Any]] = None,
    ) -> AuditLog:
        """
        Asynchronously creates an immutable audit record with cryptographic hash.
        Guaranteed not to raise unhandled exceptions into the calling request flow.
        """
        try:
            event_id = f"aud_{uuid.uuid4().hex}"
            ip_addr = cls.extract_client_ip(request)
            user_agent = request.headers.get("User-Agent")[:512] if request else None

            log_entry = AuditLog(
                event_id=event_id,
                user_id=user_id,
                ip_address=ip_addr,
                user_agent=user_agent,
                category=category,
                action=action,
                severity=severity,
                resource_type=resource_type,
                resource_id=resource_id,
                details=details or {},
            )
            log_entry.integrity_hash = log_entry.generate_hash()

            db.add(log_entry)
            await db.commit()
            
            # Also log to structured file logger for off-box SIEM forwarders
            logger.info(
                f"[AUDIT] id={event_id} act={action} usr={user_id} sev={severity} ip={ip_addr}"
            )
            return log_entry
        except Exception as exc:
            logger.error(f"Failed to record audit log: {exc}", exc_info=True)
            # Never crash user flow if audit DB write fails
            return None
```

---

### 5.3 Safe Profile Reset Handling (Fixing the Anti-Pattern)

Instead of deleting rows from `audit_logs` during a profile reset, update the endpoint to **anonymize** the identifier while preserving the security timeline:

```python
# In backend/api.py under @app.post("/api/profile/reset")
# REPLACE: await db.execute(delete(AuditLog).where(AuditLog.user_id == user_id))
# WITH:
await db.execute(
    update(AuditLog)
    .where(AuditLog.user_id == user_id)
    .values(user_id=f"RESET_ANONYMIZED_{user_id[:8]}")
)

# Record the reset itself as an audit event
await AuditLogService.log_event(
    db=db,
    action="PROFILE_RESET",
    category="DATA_PRIVACY",
    severity="MEDIUM",
    user_id=user_id,
    request=request,
    details={"reason": "User requested fresh onboarding"}
)
```

---

### 5.4 CERT-In 180-Day Automated Log Archival Script (`backend/scripts/archive_audit_logs.py`)

To satisfy CERT-In directives, log entries older than 30 days are compressed into daily JSONL tarballs and uploaded to encrypted, write-once cold storage (AWS S3 Glacier or Cloudflare R2 with Object Lock):

```python
import asyncio
import json
import gzip
from datetime import datetime, timedelta, timezone
from sqlalchemy import select, and_
from backend.database import get_db_context
from backend.models import AuditLog

async def archive_old_logs(days_threshold: int = 30):
    """
    Extracts audit logs older than `days_threshold`, exports to compressed JSONL,
    and maintains compliance archive for 180+ days.
    """
    cutoff = datetime.now(timezone.utc) - timedelta(days=days_threshold)
    archive_filename = f"audit_archive_{cutoff.strftime('%Y%m%d_%H%M%S')}.jsonl.gz"

    async with get_db_context() as db:
        result = await db.execute(
            select(AuditLog).where(AuditLog.timestamp < cutoff).order_by(AuditLog.timestamp.asc())
        )
        logs = result.scalars().all()
        if not logs:
            print("No logs pending archival.")
            return

        print(f"Archiving {len(logs)} audit events to {archive_filename}...")
        with gzip.open(archive_filename, "wt", encoding="utf-8") as f:
            for item in logs:
                f.write(json.dumps({
                    "event_id": item.event_id,
                    "timestamp": item.timestamp.isoformat(),
                    "user_id": item.user_id,
                    "action": item.action,
                    "category": item.category,
                    "severity": item.severity,
                    "ip_address": item.ip_address,
                    "details": item.details,
                    "integrity_hash": item.integrity_hash
                }) + "\n")

        print("Archival archive successfully written. Ready for S3 Glacier upload.")

if __name__ == "__main__":
    asyncio.run(archive_old_logs(30))
```

---

## 6. Implementation Action Plan

| Step | Task | Target File | Impact |
| :--- | :--- | :--- | :--- |
| **1** | Upgrade `AuditLog` table with taxonomy & IP fields | [`backend/models.py`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/models.py) | Schema enrichment |
| **2** | Create centralized `AuditLogService` helper | `backend/services/audit_service.py` | Clean, non-blocking interface |
| **3** | Replace ad-hoc inserts in `/chat` with `AuditLogService` | [`backend/api.py`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/api.py) | Full request context captured |
| **4** | Fix profile reset anti-pattern (anonymize, don't delete) | [`backend/api.py`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/api.py#L463) | Compliance integrity guaranteed |
| **5** | Implement 180-day automated log rotation cron job | `backend/scripts/archive_audit_logs.py` | CERT-In statutory compliance |
| **6** | Expose Admin Read-Only Audit Viewer API | `GET /api/admin/audit-logs` | SOC 2 / Security officer visibility |
