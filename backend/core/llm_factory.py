import os
from backend.core.config import config
from langchain_core.language_models.chat_models import BaseChatModel

# Default request timeout in seconds to prevent threads hanging indefinitely if local Ollama/vLLM blocks
LLM_REQUEST_TIMEOUT = float(os.getenv("LLM_REQUEST_TIMEOUT", "45.0"))
LLM_MAX_RETRIES = int(os.getenv("LLM_MAX_RETRIES", "2"))

def get_llm(purpose: str = "chat") -> BaseChatModel:
    provider = config.LLM_PROVIDER
    
    if provider == "ollama":
        from langchain_openai import ChatOpenAI
        if purpose == "chat":
            return ChatOpenAI(
                model=config.OLLAMA_CHAT_MODEL,
                temperature=0.8,
                top_p=0.9,
                presence_penalty=0.6,
                api_key="ollama", # dummy key for local
                base_url=config.OLLAMA_BASE_URL,
                request_timeout=LLM_REQUEST_TIMEOUT,
                max_retries=LLM_MAX_RETRIES
            )
        else:
            return ChatOpenAI(
                model=config.OLLAMA_LOGIC_MODEL,
                temperature=0.1,
                api_key="ollama", # dummy key for local
                base_url=config.OLLAMA_BASE_URL,
                request_timeout=LLM_REQUEST_TIMEOUT,
                max_retries=LLM_MAX_RETRIES
            )
    elif provider == "vllm":
        from langchain_openai import ChatOpenAI
        if purpose == "chat":
            return ChatOpenAI(
                model=config.VLLM_CHAT_MODEL,
                temperature=0.8,
                top_p=0.9,
                presence_penalty=0.6,
                api_key=config.VLLM_API_KEY,
                base_url=config.VLLM_BASE_URL,
                request_timeout=LLM_REQUEST_TIMEOUT,
                max_retries=LLM_MAX_RETRIES
            )
        else:
            return ChatOpenAI(
                model=config.VLLM_CHAT_MODEL,
                temperature=0.1,
                api_key=config.VLLM_API_KEY,
                base_url=config.VLLM_BASE_URL,
                request_timeout=LLM_REQUEST_TIMEOUT,
                max_retries=LLM_MAX_RETRIES
            )
    elif provider == "openai":
        from langchain_openai import ChatOpenAI
        return ChatOpenAI(
            model=os.getenv("OPENAI_CHAT_MODEL", "gpt-4o-mini"),
            temperature=0.7,
            api_key=config.OPENAI_API_KEY or "dummy_key_for_testing",
            request_timeout=LLM_REQUEST_TIMEOUT,
            max_retries=LLM_MAX_RETRIES
        )
    else:
        raise ValueError(f"Unsupported LLM_PROVIDER: {provider}. Options are 'ollama', 'vllm', or 'openai'.")
