"""
Automated Audit Log Archival Script.
Fulfills Indian CERT-In cybersecurity directive requiring 180-day secure log retention.
Exports logs older than a configurable threshold to compressed JSONL archives.
"""
import sys
import os
import asyncio
import json
import gzip
from datetime import datetime, timedelta, timezone

# Ensure project root is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

from sqlalchemy import select
from backend.database import AsyncSessionLocal
from backend.models import AuditLog


async def archive_old_logs(days_threshold: int = 30, output_dir: str = "backend/logs/archives"):
    """
    Extracts audit logs older than `days_threshold`, exports to compressed JSONL (.jsonl.gz),
    and leaves active logs in the database.
    """
    os.makedirs(output_dir, exist_ok=True)
    cutoff = datetime.now(timezone.utc) - timedelta(days=days_threshold)
    timestamp_str = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")
    archive_path = os.path.join(output_dir, f"audit_archive_{timestamp_str}.jsonl.gz")

    async with AsyncSessionLocal() as db:
        result = await db.execute(
            select(AuditLog)
            .where(AuditLog.timestamp < cutoff)
            .order_by(AuditLog.timestamp.asc())
        )
        logs = result.scalars().all()
        if not logs:
            print(f"No audit logs older than {days_threshold} days found.")
            return archive_path, 0

        print(f"Found {len(logs)} audit entries older than {cutoff.isoformat()}. Archiving...")
        with gzip.open(archive_path, "wt", encoding="utf-8") as f:
            for item in logs:
                entry = {
                    "event_id": item.event_id,
                    "timestamp": item.timestamp.isoformat() if item.timestamp else None,
                    "user_id": item.user_id,
                    "action": item.action,
                    "category": item.category,
                    "severity": item.severity,
                    "ip_address": item.ip_address,
                    "user_agent": item.user_agent,
                    "resource_type": item.resource_type,
                    "resource_id": item.resource_id,
                    "details": item.details,
                    "integrity_hash": item.integrity_hash,
                }
                f.write(json.dumps(entry) + "\n")

        print(f"Successfully archived {len(logs)} logs to {archive_path}.")
        return archive_path, len(logs)


if __name__ == "__main__":
    threshold = int(sys.argv[1]) if len(sys.argv) > 1 else 30
    asyncio.run(archive_old_logs(threshold))
