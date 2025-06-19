# AI-Project

AI Learning Platform
פלטפורמת למידה אינטראקטיבית המאפשרת למשתמשים לבחור תחום עניין (קטגוריה ותת-קטגוריה), 
לשאול שאלה חופשית ולקבל שיעור מותאם מבוסס AI.


Technologies Used

Frontend:
React (Vite)
Redux Toolkit + RTK Query
TypeScript
MUI (Material-UI)
React Router
Zod

Backend:
Flask (Python)
Flask-CORS
MongoEngine (MongoDB ORM)
OpenAI API

Database:
MongoDB


Setup Instructions
1. Clone the Repository

git clone https://github.com/SaraDoytch/AI-Project.git
cd AI-Project


2. Backend Setup (/server)

cd server
npm install
הרץ את השרת:
python app.py


3. Frontend Setup (/client)

cd ../client
npm install

הרץ את ה-Client:
npm run dev


Assumptions Made
משתמשים יכולים לבחור קטגוריה ותת-קטגוריה או לשאול שאלה פתוחה.
שאלות נשלחות ל-OpenAI API ונשמרות בבסיס הנתונים.
ממשק ניהול (למנהל בלבד) מאפשר הוספת קטגוריות ותתי קטגוריות ולנהל אותם,
וכן צפיה במשתמשים ובשיעורים שיצרו.