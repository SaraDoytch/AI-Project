# middleware/auth_required.py
from functools import wraps
from flask import request, jsonify
import jwt
import os
from dotenv import load_dotenv

load_dotenv()
SECRET = os.getenv("ACCESS_TOKEN_SECRET", "dev-secret")

def auth_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization") or request.headers.get("authorization")
        
        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"error": "Missing or malformed token"}), 401

        token = auth_header.replace("Bearer ", "").strip()
        try:
            decoded = jwt.decode(token, SECRET, algorithms=["HS256"])
            # , options={"require": ["exp"]}
            request.user = decoded
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 403

        return f(*args, **kwargs)
    return decorated


def admin_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization") or request.headers.get("authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"error": "Missing or malformed token"}), 401

        token = auth_header.replace("Bearer ", "").strip()
        try:
            decoded = jwt.decode(token, SECRET, algorithms=["HS256"])
            # , options={"require": ["exp"]}
            print("✅ decoded:", decoded) 
            role = decoded.get("role")
            print("🔑 role:", role)        
            if role != "admin":
                return jsonify({"error": "Forbidden – admin only"}), 403

            request.user = decoded
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 403

        return f(*args, **kwargs)
    return decorated

