from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.agent import create_agent
from app.schemas import AskRequest, AskResponse
from langchain_community.chat_message_histories import RedisChatMessageHistory
from app.config import REDIS_URL


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
        session_id = f"{req.user_id}:{req.character_id}"
        agent = create_agent(req.character_id)

        result = agent.invoke(
            {"input": req.question},
            config={"configurable": {"session_id": session_id}}
        )

        return {"answer": result.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/clear_memory")
def clear_memory(user_id: str, character_id: str):
    session_id = f"{user_id}:{character_id}"
    history = RedisChatMessageHistory(session_id=session_id, url=REDIS_URL)
    history.clear()
    return {"status": "cleared"}