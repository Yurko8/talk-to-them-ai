from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from langchain_community.chat_message_histories import RedisChatMessageHistory
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import logging

from agent import create_agent
from schemas import AskRequest, AskResponse, FunFactRequest
from utils import make_session_id, generate_dynamic_fact


logging.basicConfig(level=logging.INFO)


app = FastAPI(title="Talk to Them AI")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_methods=["*"],
    allow_headers=["*"],
)

# rate limiter
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter

#Handle rate limit errors
@app.exception_handler(RateLimitExceeded)
def rate_limit_handler(request: Request, exc):
    return JSONResponse(status_code=429, content={"detail": "Rate limit exceeded"})

#Health check endpoint
@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/ask", response_model=AskResponse)
@limiter.limit("5/minute")
def ask_scientist(req: AskRequest, request: Request):
    try:
        session_id = make_session_id(req.user_id, req.character_id)
        logging.info(f"Request from {req.user_id} to {req.character_id}: {req.question}")

        try:
            agent = create_agent(req.character_id, req.user_id)
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))

        result = agent.invoke(
            {"input": req.question},
            config={"configurable": {"session_id": session_id}}
        )

        content = result.content
        metadata = getattr(result, "response_metadata", {})
        tokens_used = metadata.get("token_usage", {}).get("total_tokens", 0)

        return AskResponse(
            answer=content,
            character_id=req.character_id,
            model="gpt-3.5-turbo",
            tokens_used=tokens_used
        )

    except Exception as e:
        logging.exception("Unhandled error in /ask")
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/fun_fact")
def fun_fact(req: FunFactRequest):
    try:
        fact = generate_dynamic_fact(req.character_name)
        return {"character_name": req.character_name, "fun_fact": fact}
    except Exception as e:
        logging.exception("Error generating fun fact")
        raise HTTPException(status_code=500, detail="Could not generate fun fact")