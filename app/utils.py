import re

def make_session_id(user_id: str, character_id: str) -> str:
    raw = f"{user_id}:{character_id}"
    return re.sub(r"[^a-zA-Z0-9_-]", "_", raw)