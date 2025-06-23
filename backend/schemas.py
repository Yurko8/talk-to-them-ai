from pydantic import BaseModel, Field
from typing import Optional

class AskRequest(BaseModel):
    user_id: str = Field(..., max_length=50)
    character_id: str
    question: str = Field(..., max_length=1000)

class AskResponse(BaseModel):
    answer: str
    character_id: str
    model: str
    tokens_used: Optional[int] = None
    
class FunFactRequest(BaseModel):
    character_name: str
