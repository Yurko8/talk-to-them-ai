# app/main.py

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.agent import create_agent
from app.schemas import AskRequest, AskResponse
from langchain.memory import ConversationBufferMemory

app = FastAPI(title="Talk to Them AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


memory_store = {}  

@app.post("/ask", response_model=AskResponse)
def ask_scientist(req: AskRequest):
    try:
        key = f"{req.user_id}:{req.character_id}"


        if key not in memory_store:
            memory_store[key] = ConversationBufferMemory(
                return_messages=True,
                memory_key="chat_history"
            )

        memory = memory_store[key]
        agent_bundle = create_agent(req.character_id, memory)

        context = memory.load_memory_variables({})
        result = agent_bundle["chain"].invoke({
            "input": req.question,
            "chat_history": context.get("chat_history", [])
        })
        memory.save_context({"input": req.question}, {"output": result.content})

        return {"answer": result.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
