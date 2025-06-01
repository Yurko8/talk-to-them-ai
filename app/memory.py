from langchain.memory import ConversationBufferMemory
from langchain.memory.chat_message_histories import InMemoryChatMessageHistory

memory_store = {}

def get_memory(user_id: str, character_id: str):
    key = f"{user_id}:{character_id}"
    if key not in memory_store:
        memory_store[key] = ConversationBufferMemory(
            memory_key="chat_history",
            return_messages=True,
            chat_memory=InMemoryChatMessageHistory()
        )
    return memory_store[key]
