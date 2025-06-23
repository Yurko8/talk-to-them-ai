import re
import openai
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def make_session_id(user_id: str, character_id: str) -> str:
    raw = f"{user_id}:{character_id}"
    return re.sub(r"[^a-zA-Z0-9_-]", "_", raw)

def generate_dynamic_fact(name: str) -> str:
    prompt = (
        f"Tell me one fun, quirky, and surprising fact about {name}. "
        f"Make it something people probably don't know. Keep it short (1–2 sentences), informal, and interesting."
    )

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You're a witty AI that delivers curious trivia about famous historical figures."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.9,
        max_tokens=80
    )

    return response.choices[0].message.content.strip()
