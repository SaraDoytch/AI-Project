
import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from mongoengine import connect  # השתמש ב-mongoengine במקום pymongo

from routes.auth_route import auth_route  
from config.cors_options import cors_options
from routes.category_routes import category_bp

# טען משתני סביבה
load_dotenv()

# משתנים מהסביבה
PORT = int(os.getenv("PORT", 7001))
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/Learning")  # ודא שיש שם בסיס נתונים

# יצירת אפליקציה
app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app, resources=cors_options)

# התחברות למסד הנתונים דרך mongoengine
def connect_db():
    try:
        connect(host=MONGO_URI)
        print("✅ Connected to MongoDB")
    except Exception as e:
        print("❌ MongoDB connection error:", e)

# התחלה
print("🚀 Starting Flask App...")
connect_db()

# פרוס JSON יפה
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

# רישום ראוטים
app.register_blueprint(auth_route, url_prefix='/api')
app.register_blueprint(category_bp, url_prefix='/api/categories')

# הרצת השרת
if __name__ == "__main__":
    app.run(port=PORT, debug=True)
