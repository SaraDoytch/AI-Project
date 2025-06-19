# # backend/Dockerfile

# # בסיס עם Python
# FROM python:3.11

# # תיקיית עבודה בתוך הקונטיינר
# WORKDIR /app

# # העתקת קבצי הפרויקט
# COPY . /app

# # התקנת התלויות
# RUN pip install --no-cache-dir -r requirements.txt
# # RUN apt-get update && apt-get install -y ca-certificates
# RUN apt-get update && \
#     apt-get install -y ca-certificates curl gnupg && \
#     update-ca-certificates

# # חשיפת פורט 7002 (ברירת מחדל ל-Flask)
# EXPOSE 7002

# COPY .env .env

# # הפעלת השרת
# CMD ["python", "app.py"]


# שלב 1: בסיס עם פייתון
FROM python:3.11-slim

# התקנת תעודות SSL (חובה לחיבור ל-MongoDB Atlas)
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    libssl-dev \
    libffi-dev \
    ca-certificates && \
    update-ca-certificates && \
    apt-get clean

# הגדרת תיקייה בקונטיינר
WORKDIR /app

# העתקת הקבצים
COPY . /app

# התקנת התלויות
RUN pip install --no-cache-dir -r requirements.txt

# פתיחת הפורט
EXPOSE 7002

# הרצת האפליקציה
CMD ["python", "app.py"]

