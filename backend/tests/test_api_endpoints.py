"""
Integration Tests for FastAPI Endpoints and Auth Boundaries.
"""
import pytest
from httpx import AsyncClient, ASGITransport
from backend.api import app


@pytest.mark.asyncio
async def test_unauthenticated_request_rejected():
    """Verify that requests missing Bearer tokens are rejected."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as client:
        response = await client.post("/api/reset", json={})
        # FastAPI HTTPBearer returns 403 Forbidden or 401 Unauthorized when credentials missing
        assert response.status_code in [401, 403]


@pytest.mark.asyncio
async def test_authenticated_profile_reset(client, mock_auth):
    """Verify that authenticated users can reset their active chat session."""
    headers = {"Authorization": "Bearer test-student-token"}
    response = await client.post("/api/reset", headers=headers, json={})
    assert response.status_code == 200
    data = response.json()
    assert "status" in data
    assert data["status"] in ["success", "ok", "reset"] or "message" in data


@pytest.mark.asyncio
async def test_authenticated_demographics_update(client, mock_auth):
    """Verify updating student demographics stores valid structured profile data."""
    headers = {"Authorization": "Bearer test-student-token"}
    payload = {
        "full_name": "Sree Test",
        "location": "Hyderabad, Telangana",
        "age_range": "20-22",
        "current_status": "Undergraduate",
        "desired_role": "AI Engineer",
        "primary_goal": "Transition into Tech"
    }
    response = await client.post("/api/profile/demographics", headers=headers, json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data.get("status") == "success"
