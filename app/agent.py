from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_openai import ChatOpenAI
from langchain_community.chat_message_histories import RedisChatMessageHistory
from langchain_core.prompts import MessagesPlaceholder
from app.prompts import CHARACTER_PROMPTS
from app.config import OPENAI_API_KEY, REDIS_URL
from typing import Callable

def create_agent(character_id: str) -> RunnableWithMessageHistory:
    if character_id not in CHARACTER_PROMPTS:
        raise ValueError(f"Unknown character ID: {character_id}")

    persona = CHARACTER_PROMPTS[character_id]

    prompt = ChatPromptTemplate.from_messages([
        ("system", persona),
        MessagesPlaceholder(variable_name="chat_history"),
        ("user", "{input}")
    ])

    llm = ChatOpenAI(
        temperature=0.7,
        model="gpt-3.5-turbo",
        api_key=OPENAI_API_KEY
    )

    chain = prompt | llm

    def get_history(session_id: str):
        return RedisChatMessageHistory(session_id=session_id, url=REDIS_URL)

    # ✅ Pass 'chain' as positional argument
    return RunnableWithMessageHistory(
        chain,
        get_session_history=get_history,
        input_messages_key="input",
        history_messages_key="chat_history"
    )
