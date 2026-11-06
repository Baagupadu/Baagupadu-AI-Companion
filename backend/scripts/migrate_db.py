import asyncio
import sys
import os

# Add project root to python path to resolve imports correctly
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from backend.database import engine, Base, init_db
from backend.models import User, Conversation, Message, ProfileState, LongTermMemory, KnowledgeBaseChunk, MemoryNode, MemoryEdge, AuditLog


async def run_migration():
    if "--force-reset" in sys.argv:
        async with engine.begin() as conn:
            print("WARNING: '--force-reset' specified. Dropping all tables...")
            await conn.run_sync(Base.metadata.drop_all)
            print("Recreating tables with new schema...")
            await conn.run_sync(Base.metadata.create_all)
        print("Database reset complete!")
    else:
        print("Initializing tables and performance indexes (safe, non-destructive)...")
        await init_db()
        print("Safe initialization complete! All tables and HNSW vector indexes are ready.")
        print("(Note: To completely wipe all tables, run with: python scripts/migrate_db.py --force-reset)")

if __name__ == "__main__":
    asyncio.run(run_migration())
