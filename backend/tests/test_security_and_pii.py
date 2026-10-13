"""
Unit & Integration Tests for Student Privacy (PII Scrubber) and OWASP Security Headers.
"""
import pytest
from httpx import AsyncClient, ASGITransport
from backend.api import app
from backend.core.pii_scrubber import scrub_pii


class TestPIIScrubber:
    def test_phone_number_redaction(self):
        cases = [
            ("Call me at 9876543210 please", "Call me at [PHONE_REDACTED] please"),
            ("My number is +91 9123456789", "My number is [PHONE_REDACTED]"),
            ("WhatsApp on 8888888888", "WhatsApp on [PHONE_REDACTED]"),
        ]
        for raw, expected in cases:
            assert scrub_pii(raw) == expected

    def test_email_redaction(self):
        cases = [
            ("Send notes to student@gmail.com", "Send notes to [EMAIL_REDACTED]"),
            ("Contact rahul.sharma@college.ac.in today", "Contact [EMAIL_REDACTED] today"),
        ]
        for raw, expected in cases:
            assert scrub_pii(raw) == expected

    def test_aadhaar_number_redaction(self):
        cases = [
            ("Aadhaar: 2345 6789 0123", "Aadhaar: [ID_REDACTED]"),
            ("ID is 9876-5432-1098", "ID is [ID_REDACTED]"),
        ]
        for raw, expected in cases:
            assert scrub_pii(raw) == expected

    def test_pan_card_redaction(self):
        cases = [
            ("My PAN is ABCDE1234F", "My PAN is [ID_REDACTED]"),
            ("pan number BKZPR9988X for KYC", "pan number [ID_REDACTED] for KYC"),
        ]
        for raw, expected in cases:
            assert scrub_pii(raw) == expected

    def test_card_number_redaction(self):
        raw = "Card 4111-2222-3333-4444 used for counseling payment"
        assert scrub_pii(raw) == "Card [CARD_REDACTED] used for counseling payment"

    def test_normal_text_preservation(self):
        normal_text = "I feel confused about whether I should pursue Computer Science or Graphic Design."
        assert scrub_pii(normal_text) == normal_text

    def test_null_and_empty_handling(self):
        assert scrub_pii("") == ""
        assert scrub_pii(None) is None


@pytest.mark.asyncio
async def test_owasp_security_headers_on_all_responses():
    """Verify that SecurityHeadersMiddleware injects strict OWASP defense headers."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as client:
        response = await client.get("/docs")
        
        assert response.status_code == 200
        headers = response.headers
        
        # Clickjacking defense
        assert headers.get("X-Frame-Options") == "DENY"
        # MIME sniffing defense
        assert headers.get("X-Content-Type-Options") == "nosniff"
        # XSS filter defense
        assert headers.get("X-XSS-Protection") == "1; mode=block"
        # Enforced HTTPS
        assert "max-age=31536000" in headers.get("Strict-Transport-Security", "")
        # Referrer isolation
        assert headers.get("Referrer-Policy") == "strict-origin-when-cross-origin"
        # Restrict hardware permissions
        assert "camera=()" in headers.get("Permissions-Policy", "")
