import eventlet
eventlet.monkey_patch()
import socket

print("Eventlet version:", eventlet.__version__)
print("Is eventlet monkey patched for 'socket' module:", eventlet.patcher.is_monkey_patched(socket))

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
from socket_instance import socketio
from config.config import Config 

PORT=Config.PORT
app = Flask(__name__)
app.config["DEBUG"] = True
app.config["SECRET_KEY"] = Config.SECRET_KEY

CORS(app, **cors_options)

socketio.init_app(app, cors_allowed_origins="*")

@socketio.on('connect')
def handle_connect():
    print('🔌 Client connected!')

def connect_db():
    try:
        connect(host=Config.MONGO_URI)
        print("✅ Connected to MongoDB (via mongoengine)")
    except Exception as e:
        print("❌ MongoDB connection error:", e)

print("🚀 Starting Flask App...")
print(f"🌍 Running in {Config.ENV} mode")

connect_db()

app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

app.register_blueprint(auth_route, url_prefix='/api')
app.register_blueprint(category_bp, url_prefix='/api/categories')
app.register_blueprint(prompt_bp, url_prefix='/api/prompts')
app.register_blueprint(admin_bp, url_prefix='/api/admin')

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=PORT)
