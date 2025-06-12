
import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from pymongo import MongoClient
from routes.auth_route import auth_route  
from config.cors_options import cors_options  
 # טוען משתני סביבה
load_dotenv()

 # משתנים מהסביבה
PORT = int(os.getenv("PORT", 7001))
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/mydb")

 # יצירת אפליקציה
app = Flask(__name__)
CORS(app, resources=cors_options)  # מתאים לגרסה דינמית של CORS

 # חיבור למסד הנתונים
def connect_db():
    try:
        client = MongoClient(MONGO_URI)
        db = client.get_default_database()
        print("Connected to MongoDB")
        return db
    except Exception as e:
        print("MongoDB connection error:", e)
        return None

 # התחלה
print("start...")
db = connect_db()

 # פרוס את ה-JSON middleware
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

 # רשום את הראוטים
app.register_blueprint(auth_route, url_prefix='/api')

 # הרצת השרת
if __name__ == "__main__":
    app.run(port=PORT)
