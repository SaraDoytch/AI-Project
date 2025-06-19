
import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from mongoengine import connect  
from routes.auth_route import auth_route  
from config.cors_options import cors_options
from routes.category_routes import category_bp
from routes.prompt_route import prompt_bp
from routes.admin_route import admin_bp
import certifi

# טען משתני סביבה
load_dotenv()

# משתנים מהסביבה
PORT = int(os.getenv("PORT", 7001))
MONGO_URI = os.getenv("MONGO_URI", "mongodb://backend:27017/Prompt")  

# יצירת אפליקציה
app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app, resources=cors_options)


connect(
    host=MONGO_URI,
    tlsCAFile=certifi.where()
)



# התחברות למסד הנתונים דרך mongoengine
def connect_db():
    try:
        connect(host=MONGO_URI,tlsCAFile=certifi.where())
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
app.register_blueprint(prompt_bp, url_prefix='/api/prompts')
app.register_blueprint(admin_bp, url_prefix='/api/admin')

# הרצת השרת
if __name__ == "__main__":
    # app.run(port=PORT, debug=True)
    app.run(host="0.0.0.0", port=PORT, debug=True)

