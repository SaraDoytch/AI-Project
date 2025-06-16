
from functools import wraps
from flask import request, jsonify
import jwt
import os
from dotenv import load_dotenv

load_dotenv()
SECRET = os.getenv("ACCESS_TOKEN_SECRET", "dev-secret")

def verify_jwt(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization") or request.headers.get("authorization")
        
        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"message": "Unauthorized"}), 401

        token = auth_header.split(" ")[1]
        try:
            decoded = jwt.decode(token, SECRET, algorithms=["HS256"])
            request.user = decoded
        except jwt.InvalidTokenError:
            return jsonify({"message": "Forbidden"}), 403

        return f(*args, **kwargs)
    return decorated
