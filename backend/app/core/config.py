from pydantic_settings import BaseSettings, SettingsConfigDict
import os

class Settings(BaseSettings):
    # App
    API_PORT: int
    LOG_LEVEL: str

    # PostgreSQL
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    POSTGRES_URL: str

    # Qdrant
    QDRANT_URL: str

    # RabbitMQ
    RABBITMQ_USER: str
    RABBITMQ_PASS: str
    RABBITMQ_URL: str

    # AI Models (Google)
    GOOGLE_API_KEY: str
    EMBEDDING_MODEL: str
    LLM_MODEL: str

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()
