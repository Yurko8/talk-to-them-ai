from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_openai import ChatOpenAI
from langchain_community.chat_message_histories import RedisChatMessageHistory
from langchain_core.prompts import MessagesPlaceholder
from .prompts import CHARACTER_PROMPTS
from .settings import settings
from .utils import make_session_id

def create_agent(character_id: str, user_id: str) -> RunnableWithMessageHistory:
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
        api_key=settings.openai_api_key,
    )

    chain = prompt | llm

    def get_history(_: str): 
        return RedisChatMessageHistory(
            session_id=make_session_id(user_id, character_id),
            url=settings.redis_url,
        )

    return RunnableWithMessageHistory(
        chain,
        get_session_history=get_history,
        input_messages_key="input",
        history_messages_key="chat_history"
    )