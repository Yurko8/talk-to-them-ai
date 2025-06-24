from backend.utils import make_session_id

def test_make_session_id():
    assert make_session_id("user 1", "ein-stein") == "user_1_ein-stein"
