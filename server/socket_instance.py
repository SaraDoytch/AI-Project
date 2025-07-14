# from flask_socketio import SocketIO

# # socketio = SocketIO(cors_allowed_origins="*")

# socketio = SocketIO(async_mode='eventlet', cors_allowed_origins="*")
# # socketio = SocketIO(async_mode='gevent', cors_allowed_origins="*")
from flask_socketio import SocketIO

socketio = SocketIO(async_mode='threading', cors_allowed_origins="*")
