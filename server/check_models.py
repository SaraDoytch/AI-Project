# # # import os
# # # from dotenv import load_dotenv
# # # from openai import OpenAI
# # # import httpx

# # # print("✔ check_models.py was executed")

# # # load_dotenv()

# # api_key = os.getenv("OPENAI_API_KEY")
# # # client = OpenAI(api_key=api_key,http_client=httpx.Client(verify=False))

# # # try:
# # #     # הדפסת המודלים הזמינים לחשבון שלך
# # #     models = client.models.list()
# # #     for model in models.data:
# # #         print(model.id)
# # # except Exception as e:
# # #     print("שגיאה: ",e)


# # from openai import OpenAI
# # from httpx import Timeout
# # import os
# # from dotenv import load_dotenv

# # load_dotenv()
# # api_key = os.getenv("OPENAI_API_KEY")
# # # client = OpenAI(api_key=api_key, timeout=Timeout(30.0))
# # client = OpenAI(
# #     api_key=api_key,
# #     timeout=Timeout(30.0),
# #     http_client=httpx.Client(verify="C:/AI-Project/server/cacert.pem")
# # )

# # try:
# #     models = client.models.list()
# #     print("📦 Models:", [m.id for m in models.data])
# # except Exception as e:
# #     print("❌ שגיאת חיבור:", e)

# import os
# import httpx
# import certifi
# import ssl

# api_key = os.getenv("OPENAI_API_KEY")

# try:
#     ssl_context = ssl.create_default_context(cafile=certifi.where())

#     headers = {
#         "Authorization": f"Bearer {api_key}"
#     }

#     response = httpx.get(
#         "https://api.openai.com/v1/models",
#         headers=headers,
#         timeout=10.0,
#         # verify=ssl_context
#         verify=False

#     )

#     print("✅ הצליח:", response.status_code)
#     print(response.json())

# except Exception as e:
#     print("❌ שגיאה:", e)

# import os
# import httpx
# import certifi
# import ssl
# from dotenv import load_dotenv

# load_dotenv()
# api_key = os.getenv("OPENAI_API_KEY")

# try:
#     ssl_context = ssl.create_default_context(cafile=certifi.where())

#     headers = {
#         "Authorization": f"Bearer {api_key}"
#     }

#     response = httpx.get(
#         "https://api.openai.com/v1/models",
#         headers=headers,
#         timeout=10.0,
#         verify=ssl_context
#     )

#     print("✅ הצליח:", response.status_code)
#     print(response.json())

# except Exception as e:
#     print("❌ שגיאה:", e)


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
        verify=False  # אם תרצי – בהמשך להחזיר ל-verify=ssl_context
    )

    print("✅ הצליח:", response.status_code)
    print(response.json())

except Exception as e:
    print("❌ שגיאה:", e)
