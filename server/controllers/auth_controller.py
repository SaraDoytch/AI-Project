

from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from models.User import User
import jwt
import os
from datetime import datetime
from mongoengine.errors import NotUniqueError

SECRET_KEY = os.getenv("ACCESS_TOKEN_SECRET", "dev-secret")

def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "All fields are required"}), 400

    user = User.objects(email=email).first()
    if not user:
        return jsonify({"message": "Unauthorized - user not found"}), 401

    if not check_password_hash(user.password, password):
        return jsonify({"message": "Unauthorized - wrong password"}), 401

    # user_info = {
    #     "id": str(user.id),
    #     "firstName": user.firstName,
    #     "lastName": user.lastName,
    #     "email": user.email,
    #     "phone": user.phone,
    #     "created_at": str(user.created_at)
    # }
    user_info = {
        "id": str(user.id),
        "firstName": user.firstName,
        "lastName": user.lastName,
        "email": user.email,
        "phone": user.phone,
        "role": user.role,  # ← הוספה חשובה!
        "created_at": str(user.created_at)
}

    print("🧪 user.role =", user.role)

    token = jwt.encode(user_info, SECRET_KEY, algorithm="HS256")
    return jsonify({"user": user_info, "accessToken": token}), 200



def register():
    try:
        data = request.get_json()
        print("📥 Received data:", data)

        firstName = data.get("firstName")
        lastName = data.get("lastName")
        phone = data.get("phone")
        email = data.get("email")
        password = data.get("password")
        role = data.get("role", "user")  # מקבל את ה-role, או 'user' כברירת מחדל

        if not firstName or not lastName or not phone or not email or not password:
            return jsonify({"message": "All fields are required!"}), 400

        hashed_password = generate_password_hash(password)
        user = User(
            firstName=firstName,
            lastName=lastName,
            phone=phone,
            email=email,
            password=hashed_password,
            role=role
        )
        user.save()

        user_info = {
            "id": str(user.id),
            "firstName": firstName,
            "lastName": lastName,
            "phone": phone,
            "email": email,
            "role": role,
            "created_at": str(user.created_at)
        }

        token = jwt.encode(user_info, SECRET_KEY, algorithm="HS256")
        return jsonify({"accessToken": token, "user": user_info}), 201

    except NotUniqueError:
        return jsonify({"message": "Email already exists"}), 409

    except Exception as e:
        print("🔥 Exception during registration:", e)
        return jsonify({"message": "Internal server error", "error": str(e)}), 500
