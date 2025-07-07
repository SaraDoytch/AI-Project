import os
from dotenv import load_dotenv

load_dotenv()

def get_env_var(key: str) -> str:
    value = os.getenv(key)
    if not value:
        raise EnvironmentError(f"❌ Missing required environment variable: {key}")
    return value

class Config:
    SECRET_KEY = get_env_var("ACCESS_TOKEN_SECRET")
    MONGO_URI = get_env_var("MONGO_URI")
    MONGO_DB_NAME = os.getenv("MONGO_DB_NAME", "Prompt")
    PORT = int(os.getenv("PORT", 7001))
    ENV = os.getenv("ENV", "development")
