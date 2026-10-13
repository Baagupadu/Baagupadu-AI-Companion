"""
Student Privacy & PII Redaction Layer for Baagupadu.
Sanitizes personally identifiable information (phone numbers, emails, Indian Govt IDs, cards)
before user text is stored in PostgreSQL pgvector or dispatched to external LLMs.
"""
import re

# Indian & International phone numbers
PHONE_REGEX = re.compile(r'(?:\+?91[\-\s]?)?[6-9]\d{9}\b')

# Email addresses
EMAIL_REGEX = re.compile(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}\b')

# Indian Aadhaar Numbers (exactly 12 digits with optional spaces/hyphens)
AADHAAR_REGEX = re.compile(r'\b[2-9]\d{3}[\s\-]?\d{4}[\s\-]?\d{4}\b(?!\d)')

# Indian PAN Card Numbers (5 letters, 4 digits, 1 letter)
PAN_REGEX = re.compile(r'\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b', re.IGNORECASE)

# Standard Credit / Debit Card Numbers (16 digits with separators)
CARD_REGEX = re.compile(r'\b(?:\d{4}[-\s]?){3}\d{4}\b')


def scrub_pii(text: str) -> str:
    """
    Sanitizes sensitive Personally Identifiable Information (PII) from user input.
    Preserves normal emotional context, queries, and conversational intent.
    """
    if not text or not isinstance(text, str):
        return text

    scrubbed = text
    scrubbed = CARD_REGEX.sub("[CARD_REDACTED]", scrubbed)
    scrubbed = AADHAAR_REGEX.sub("[ID_REDACTED]", scrubbed)
    scrubbed = PAN_REGEX.sub("[ID_REDACTED]", scrubbed)
    scrubbed = PHONE_REGEX.sub("[PHONE_REDACTED]", scrubbed)
    scrubbed = EMAIL_REGEX.sub("[EMAIL_REDACTED]", scrubbed)
    
    return scrubbed
