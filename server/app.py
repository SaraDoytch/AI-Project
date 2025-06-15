
# import os
# from flask import Flask
# from flask_cors import CORS
# from dotenv import load_dotenv
# from pymongo import MongoClient
# from routes.auth_route import auth_route  
# from config.cors_options import cors_options
# # from authRoute import auth_bp

  
#  # טוען משתני סביבה
# load_dotenv()

#  # משתנים מהסביבה
# PORT = int(os.getenv("PORT", 7001))
# MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")

#  # יצירת אפליקציה
# app = Flask(__name__)
# CORS(app, resources=cors_options)  # מתאים לגרסה דינמית של CORS

#  # חיבור למסד הנתונים
# def connect_db():
#     try:
#         # client = MongoClient(MONGO_URI)
#         # db = client.get_default_database()
#         client = MongoClient(os.getenv("MONGO_URI"))
#         db = client["Learning"]

#         print("Connected to MongoDB")
#         return db
#     except Exception as e:
#         print("MongoDB connection error:", e)
#         return None

# # התחלה
# print("start...")
# db = connect_db()

# # פרוס את ה-JSON middleware
# app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

# # רשום את הראוטים
# app.register_blueprint(auth_route, url_prefix='/api')

# # הרצת השרת
# if __name__ == "__main__":
#     app.run(port=PORT)

import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from mongoengine import connect  # השתמש ב-mongoengine במקום pymongo

from routes.auth_route import auth_route  
from config.cors_options import cors_options

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

# הרצת השרת
if __name__ == "__main__":
    app.run(port=PORT, debug=True)
