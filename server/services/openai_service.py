import os
import httpx
from dotenv import load_dotenv

# טען את מפתח ה-API מהסביבה
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("🔑 OPENAI_API_KEY לא מוגדר בקובץ .env")

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

# פונקציה לשליפת שיעור מ-AI
def get_lesson_from_ai(category, sub_category, prompt_text):
    # יצירת ההנחיה עבור המורה
    full_prompt = (
        f"אתה מורה מקצועי שמעביר שיעורים קצרים. "
        f"כתוב שיעור ברור, מעניין וקריא באורך 8–10 שורות "
        f"בנושא '{category}' ותת-נושא '{sub_category}'. "
    )

    if prompt_text.strip():
        full_prompt += f"התייחס גם לשאלה של התלמיד: {prompt_text}. "

    full_prompt += (
        "השיעור צריך להיות בעברית פשוטה וברורה, מתאים לתלמידים סקרנים. "
        "כלול עובדות חשובות או דוגמאות מעשירות שיעשו את הנושא מובן ונעים לקריאה. "
        "אין צורך במילים מסובכות או מונחים אקדמיים — כתוב בטון ידידותי וברור."
    )

    try:
        response = httpx.post(
            "https://api.openai.com/v1/chat/completions",
            headers=headers,
            json={
                "model": "gpt-4o",
                "messages": [
                    {"role": "user", "content": full_prompt}
                ],
                "max_tokens": 500,
                "temperature": 0.7
            },
            timeout=20.0,
            verify=False  # אפשר להסיר אם SSL תקין
        )

        data = response.json()
        if response.status_code != 200:
            print("❌ שגיאה מהשרת:", data)
            return f"שגיאה ביצירת שיעור: {data.get('error', {}).get('message', 'לא ידועה')}"

        return data["choices"][0]["message"]["content"]

    except Exception as e:
        print("💥 שגיאה:", e)
        return "אירעה שגיאה ביצירת השיעור מה-AI."
