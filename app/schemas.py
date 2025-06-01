# app/schemas.py
from pydantic import BaseModel

class AskRequest(BaseModel):
    user_id: str
    character_id: str
    question: str

class AskResponse(BaseModel):
    answer: str
