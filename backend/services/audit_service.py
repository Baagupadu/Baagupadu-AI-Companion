"""
AuditLogService: Centralized, enterprise-grade security & observability logging service.
Designed for compliance with India's DPDP Act 2023, EU AI Act Article 12, and CERT-In directives.
"""
import uuid
import logging
from typing import Optional, Dict, Any, List
from fastapi import Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from backend.models import AuditLog

logger = logging.getLogger("baagupadu.audit")


class AuditLogService:
    """
    Centralized, fail-safe audit logging service.
    Guarantees non-blocking execution, SHA-256 integrity signatures,
    and client proxy IP extraction.
    """

    @staticmethod
    def extract_client_ip(request: Optional[Request]) -> Optional[str]:
        """
        Extracts real client IP address handling reverse proxies and Cloudflare headers.
        """
        if not request:
            return None
        # Check Cloudflare connecting IP
        cf_ip = request.headers.get("CF-Connecting-IP")
        if cf_ip:
            return cf_ip.strip()
        # Check standard X-Forwarded-For
        x_forwarded = request.headers.get("X-Forwarded-For")
        if x_forwarded:
            return x_forwarded.split(",")[0].strip()
        # Check X-Real-IP
        x_real_ip = request.headers.get("X-Real-IP")
        if x_real_ip:
            return x_real_ip.strip()
        # Fall back to client host
        return request.client.host if request.client else None

    @staticmethod
    def extract_user_agent(request: Optional[Request]) -> Optional[str]:
        """
        Safely extracts and truncates the User-Agent header.
        """
        if not request:
            return None
        ua = request.headers.get("User-Agent")
        return ua[:512] if ua else None

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
    ) -> Optional[AuditLog]:
        """
        Asynchronously creates an immutable audit record with cryptographic hash.
        Guaranteed fail-safe: does NOT raise unhandled exceptions into the user flow.
        """
        try:
            event_id = f"aud_{uuid.uuid4().hex}"
            ip_addr = cls.extract_client_ip(request)
            user_agent = cls.extract_user_agent(request)

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
            await db.refresh(log_entry)

            logger.info(
                f"[AUDIT] id={event_id} act={action} cat={category} sev={severity} usr={user_id} ip={ip_addr}"
            )
            return log_entry
        except Exception as exc:
            logger.error(f"Audit log recording error: {exc}", exc_info=True)
            # Fail-safe: do not crash user request flow if logging encounters a DB issue
            return None

    @classmethod
    async def get_recent_logs(
        cls,
        db: AsyncSession,
        limit: int = 50,
        user_id: Optional[str] = None,
        category: Optional[str] = None,
    ) -> List[AuditLog]:
        """
        Retrieves recent audit logs with optional filters for compliance reporting.
        """
        try:
            query = select(AuditLog).order_by(desc(AuditLog.timestamp)).limit(limit)
            if user_id:
                query = query.where(AuditLog.user_id == user_id)
            if category:
                query = query.where(AuditLog.category == category)
            result = await db.execute(query)
            return result.scalars().all()
        except Exception as exc:
            logger.error(f"Failed to query audit logs: {exc}", exc_info=True)
            return []
