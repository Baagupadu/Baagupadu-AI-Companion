"""
OWASP-Compliant Security Headers Middleware for FastAPI.
Protects against Clickjacking, MIME-Sniffing, XSS, and forces HTTPS.
"""
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response: Response = await call_next(request)
        
        # Prevent Clickjacking (framing attacks)
        response.headers["X-Frame-Options"] = "DENY"
        
        # Prevent MIME-type confusion / sniffing attacks
        response.headers["X-Content-Type-Options"] = "nosniff"
        
        # Enable legacy browser cross-site scripting filter
        response.headers["X-XSS-Protection"] = "1; mode=block"
        
        # Enforce HTTPS across all subdomains (1 year HSTS with preload)
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains; preload"
        
        # Restrict referrer leakage to third-party domains
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        
        # Restrict sensitive browser hardware APIs
        response.headers["Permissions-Policy"] = "camera=(), microphone=(self), geolocation=(), payment=()"
        
        # Cross-Origin Protections
        response.headers["X-Permitted-Cross-Domain-Policies"] = "none"
        
        return response
