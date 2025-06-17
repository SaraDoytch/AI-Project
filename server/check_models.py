import os
import httpx
import certifi
import ssl
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

try:
    ssl_context = ssl.create_default_context(cafile=certifi.where())

    headers = {
        "Authorization": f"Bearer {api_key}"
    }

    response = httpx.get(
        "https://api.openai.com/v1/models",
        headers=headers,
        timeout=10.0,
        # verify=False 
    )

    print("✅ הצליח:", response.status_code)
    print(response.json())

except Exception as e:
    print("❌ שגיאה:", e)
