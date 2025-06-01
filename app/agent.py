from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from app.prompts import CHARACTER_PROMPTS
from app.config import OPENAI_API_KEY

def create_agent(character_id: str, memory: ConversationBufferMemory):
    if character_id not in CHARACTER_PROMPTS:
        raise ValueError(f"Unknown character ID: {character_id}")

    persona = CHARACTER_PROMPTS[character_id]

    prompt = ChatPromptTemplate.from_messages([
        ("system", persona),
        ("human", "{input}")
    ])

    llm = ChatOpenAI(
        temperature=0.7,
        model="gpt-3.5-turbo",
        api_key=OPENAI_API_KEY
    )

    chain = prompt | llm

    return {
        "chain": chain,
        "memory": memory
    }
