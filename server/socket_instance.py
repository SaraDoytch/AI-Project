from flask_socketio import SocketIO

# socketio = SocketIO(cors_allowed_origins="*")

socketio = SocketIO(async_mode='eventlet', cors_allowed_origins="*")
