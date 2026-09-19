import os
import jwt
from dotenv import load_dotenv
from fastapi import Request, HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

load_dotenv()

security = HTTPBearer()

ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
# For production Clerk validation
CLERK_JWKS_URL = os.getenv("CLERK_JWKS_URL", "")

jwks_client = jwt.PyJWKClient(CLERK_JWKS_URL) if CLERK_JWKS_URL else None

async def verify_token(credentials: HTTPAuthorizationCredentials = Security(security)):
    token = credentials.credentials
    try:
        if ENVIRONMENT == "development":
            if token.startswith("test-"):
                return token.replace("test-", "")
            
            # For MVP/Local development, decode the Clerk JWT to extract user_id (sub) without signature verification
            decoded_token = jwt.decode(token, options={"verify_signature": False})
            user_id = decoded_token.get("sub")
            if not user_id:
                raise HTTPException(status_code=401, detail="Invalid token structure")
            return user_id

        # STRICT PRODUCTION VALIDATION
        if not jwks_client:
            print("ERROR: CLERK_JWKS_URL is not set in production!")
            raise HTTPException(status_code=500, detail="Server configuration error")
            
        signing_key = jwks_client.get_signing_key_from_jwt(token)
        # Note: In a full production setup, you should also verify 'audience' (aud) if configured in Clerk.
        decoded_token = jwt.decode(
            token,
            signing_key.key,
            algorithms=["RS256"],
            options={"verify_signature": True, "verify_exp": True}
        )
        
        user_id = decoded_token.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token structure")
            
        return user_id
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except Exception as e:
        print(f"Token verification error: {e}")
        raise HTTPException(status_code=401, detail="Could not validate credentials")
