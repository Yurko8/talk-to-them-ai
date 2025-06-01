from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.agent import create_agent
from app.schemas import AskRequest, AskResponse
from langchain_community.chat_message_histories import RedisChatMessageHistory
from app.config import REDIS_URL
from app.utils import make_session_id


app = FastAPI(title="Talk to Them AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/ask", response_model=AskResponse)
def ask_scientist(req: AskRequest):
    try:
        session_id = make_session_id(req.user_id, req.character_id)

        try:
            agent = create_agent(req.character_id)
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))

        result = agent.invoke(
            {"input": req.question},
            config={"configurable": {"session_id": session_id}}
        )

        content = result.content
        metadata = getattr(result, "response_metadata", {})

        return AskResponse(
            answer=content,
            character_id=req.character_id,
            model="gpt-3.5-turbo",
            tokens_used=metadata.get("token_usage", {}).get("total_tokens")
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))