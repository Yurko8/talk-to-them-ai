import pytest
from httpx import AsyncClient, ASGITransport

from backend.main import app


@pytest.mark.asyncio
async def test_fun_fact(monkeypatch):
    async def fake_fact(name: str) -> str:
        return "A very fun fact."

    monkeypatch.setattr("backend.main.generate_dynamic_fact", fake_fact)

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        resp = await ac.post("/fun_fact", json={"character_name": "einstein"})
    assert resp.status_code == 200
    assert resp.json() == {"character_name": "einstein", "fun_fact": "A very fun fact."}


@pytest.mark.asyncio
async def test_ask_scientist(monkeypatch):
    class DummyResult:
        def __init__(self):
            self.content = "Hello!"
            self.response_metadata = {"token_usage": {"total_tokens": 5}}

    class DummyAgent:
        async def ainvoke(self, *_args, **_kwargs):
            return DummyResult()

    monkeypatch.setattr("backend.main.create_agent", lambda *_: DummyAgent())

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        resp = await ac.post(
            "/ask",
            json={"user_id": "u1", "character_id": "einstein", "question": "Hi"},
        )
    assert resp.status_code == 200
    data = resp.json()
    assert data["answer"] == "Hello!"
    assert data["tokens_used"] == 5
