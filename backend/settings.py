from pydantic import BaseSettings, Field

class Settings(BaseSettings):
    openai_api_key: str = Field("dummy", env="OPENAI_API_KEY")
    redis_url: str = Field("redis://localhost:6379", env="REDIS_URL")

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()
