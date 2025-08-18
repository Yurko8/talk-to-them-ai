from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8"
    )

    openai_api_key: str = Field(..., env="OPENAI_API_KEY")
    redis_url: str = Field(..., env="REDIS_URL")

settings = Settings()
