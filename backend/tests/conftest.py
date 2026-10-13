"""
Test Fixtures and Configuration for Baagupadu Backend Tests.
Sets up in-memory database, mock authorization, and async HTTP test client.
"""
import pytest
import os
import sys

# Ensure repository root and backend directory are in path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# Set environment to development/test
os.environ["ENVIRONMENT"] = "development"
os.environ["DATABASE_URL"] = "sqlite+aiosqlite:///:memory:"

from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

from backend.database import Base, get_db
from backend.api import app
from backend.auth import verify_token

TEST_DATABASE_URL = "sqlite+aiosqlite:///:memory:"

test_engine = create_async_engine(TEST_DATABASE_URL, echo=False)
TestSessionLocal = sessionmaker(test_engine, class_=AsyncSession, expire_on_commit=False)


@pytest.fixture(scope="session", autouse=True)
async def prepare_database():
    """Create all database tables in in-memory SQLite before running tests."""
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)


@pytest.fixture
async def db_session():
    """Provides an isolated database session per test."""
    async with TestSessionLocal() as session:
        yield session


@pytest.fixture
def mock_auth():
    """Overrides Clerk verify_token to return a fixed test user ID."""
    async def _mock_verify():
        return "test_student_user_123"
    
    app.dependency_overrides[verify_token] = _mock_verify
    yield "test_student_user_123"
    app.dependency_overrides.pop(verify_token, None)


@pytest.fixture
async def client(db_session):
    """Provides an authenticated async HTTP test client."""
    async def _override_get_db():
        yield db_session

    app.dependency_overrides[get_db] = _override_get_db
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as ac:
        yield ac
    app.dependency_overrides.pop(get_db, None)
