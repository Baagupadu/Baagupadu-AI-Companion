import os
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set. Please check your .env file.")

# Create the async engine connected to PostgreSQL with production-grade pooling and self-healing resilience
if DATABASE_URL.startswith("sqlite"):
    engine = create_async_engine(DATABASE_URL, echo=False)
else:
    DB_POOL_SIZE = int(os.getenv("DB_POOL_SIZE", "20"))
    DB_MAX_OVERFLOW = int(os.getenv("DB_MAX_OVERFLOW", "30"))
    DB_POOL_TIMEOUT = int(os.getenv("DB_POOL_TIMEOUT", "30"))
    DB_POOL_RECYCLE = int(os.getenv("DB_POOL_RECYCLE", "1800"))

    engine = create_async_engine(
        DATABASE_URL,
        echo=False,
        pool_size=DB_POOL_SIZE,
        max_overflow=DB_MAX_OVERFLOW,
        pool_timeout=DB_POOL_TIMEOUT,
        pool_recycle=DB_POOL_RECYCLE,
        pool_pre_ping=True,  # Proactively tests connection health to eliminate stale sockets
    )
AsyncSessionLocal = async_sessionmaker(
    bind=engine, class_=AsyncSession, expire_on_commit=False
)

Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

from sqlalchemy import text

async def init_db():
    """
    Initializes the database by creating all tables and optimizing performance indexes.
    """
    async with engine.begin() as conn:
        if not DATABASE_URL.startswith("sqlite"):
            await conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector;"))
        await conn.run_sync(Base.metadata.create_all)
        
        # Optimize vector tables with HNSW cosine indexes for low-latency similarity queries
        if not DATABASE_URL.startswith("sqlite"):
            try:
                await conn.execute(text("""
                    CREATE INDEX IF NOT EXISTS idx_ltm_hnsw_cosine 
                    ON long_term_memory 
                    USING hnsw (embedding vector_cosine_ops) 
                    WITH (m = 16, ef_construction = 64);
                """))
                await conn.execute(text("""
                    CREATE INDEX IF NOT EXISTS idx_kb_hnsw_cosine 
                    ON knowledge_base_chunks 
                    USING hnsw (embedding vector_cosine_ops) 
                    WITH (m = 16, ef_construction = 64);
                """))
            except Exception as idx_err:
                # If older pgvector or permissions prevent HNSW, log and continue safely
                print(f"Notice: Vector HNSW index setup deferred/skipped: {idx_err}", flush=True)
