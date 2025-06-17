# backend/Dockerfile

# בסיס עם Python
FROM python:3.11

# תיקיית עבודה בתוך הקונטיינר
WORKDIR /app

# העתקת קבצי הפרויקט
COPY . /app

# התקנת התלויות
RUN pip install --no-cache-dir -r requirements.txt

# חשיפת פורט 5000 (ברירת מחדל ל-Flask)
EXPOSE 7002

# הפעלת השרת
CMD ["python", "app.py"]

