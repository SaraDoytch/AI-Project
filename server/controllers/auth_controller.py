 # routes/auth_route.py

from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta

load_dotenv()
auth_route = Blueprint("auth", __name__)

 # התחברות למסד הנתונים (בהנחה שנעשה כבר ב-app.py)
client = MongoClient(os.getenv("MONGO_URI"))
db = client.get_default_database()
users_collection = db["users"]

SECRET_KEY = os.getenv("ACCESS_TOKEN_SECRET", "dev-secret")  # שימי לב לוודא שזה קיים

 # 🟢 LOGIN
@auth_route.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "All fields are required"}), 400

    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"message": "Unauthorized1"}), 401

    if not check_password_hash(user["password"], password):
        return jsonify({"error": "Unauthorized2"}), 401

    user_info = {
        "_id": str(user["_id"]),
        "userName": user["userName"],
        "phone": user["phone"],
        "email": user["email"],
        "hasCar": user.get("hasCar"),
        "driveringLicense": user.get("driveringLicense"),
        "gender": user["gender"],
        "driverSuggestions": user.get("driverSuggestions", []),
        "passengerSuggestions": user.get("passengerSuggestions", []),
        "createdAt": user.get("createdAt")
    }

    token = jwt.encode(user_info, SECRET_KEY, algorithm="HS256")
    return jsonify({"user": user_info, "accessToken": token}), 200

 # 🟡 REGISTER
@auth_route.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    userName = data.get("userName")
    phone = data.get("phone")
    email = data.get("email")
    password = data.get("password")
    hasCar = data.get("hasCar")
    gender = data.get("gender")
    driveringLicense = data.get("driveringLicense")

    if not userName or not phone or not email or not password or not gender:
        return jsonify({"message": "All fields are required!"}), 400

    if hasCar and not driveringLicense:
        return jsonify({"message": "מספר רישיון נדרש כאשר יש רכב"}), 400

    if users_collection.find_one({"email": email}):
        return jsonify({"message": "duplicate email"}), 409

    hashed_password = generate_password_hash(password)

    user_object = {
        "userName": userName,
        "phone": phone,
        "email": email,
        "password": hashed_password,
        "hasCar": hasCar,
        "gender": gender,
        "driveringLicense": driveringLicense if hasCar else None,
        "createdAt": datetime.utcnow()
    }

    result = users_collection.insert_one(user_object)
    if not result.inserted_id:
        return jsonify({"message": "invalid user received"}), 400

    user_info = {
        "_id": str(result.inserted_id),
        "userName": userName,
        "email": email,
        "phone": phone,
        "hasCar": hasCar,
        "gender": gender,
        "driveringLicense": driveringLicense if hasCar else None
    }

    token = jwt.encode(user_info, SECRET_KEY, algorithm="HS256")
    return jsonify({"accessToken": token, "user": user_info}), 201
