import eventlet
eventlet.monkey_patch()

import os
from flask_socketio import SocketIO
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
from socket_instance import socketio

# טען משתני סביבה
load_dotenv()

# משתנים מהסביבה
PORT = int(os.getenv("PORT", 7001))
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/Prompt")  

# יצירת אפליקציה
app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app, resources=cors_options)
socketio.init_app(app, cors_allowed_origins="*")
@socketio.on('connect')
def handle_connect():
    print('🔌 Client connected!')


# התחברות למסד הנתונים דרך mongoengine
def connect_db():
    try:
        connect( host=MONGO_URI)
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
    # socketio.run(app, debug=True, port=PORT, host="0.0.0.0")
    socketio.run(app, host="0.0.0.0", port=PORT)