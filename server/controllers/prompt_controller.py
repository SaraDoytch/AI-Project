from flask import jsonify
from models.Prompt import Prompt
from models.User import User
from models.Category import Category
from models.SubCategory import SubCategory
from services.openai_service import get_lesson_from_ai
from mongoengine import DoesNotExist
from flask import request
from mongoengine.errors import DoesNotExist
import traceback
from socket_instance import socketio


def generate_lesson_controller():
    data = request.json
    print("📥 Received data:", data)

    try:
        user = User.objects.get(id=data['user_id'])
        print("✅ User found:", user.email)
        category = Category.objects.get(id=data['category_id'])
        print("✅ Category found:", category.name)
        sub_category = SubCategory.objects.get(id=data['sub_category_id'])
        print("✅ Sub-category found:", sub_category.name)

        prompt_text = data.get('prompt', '').strip()
        if not prompt_text:
            prompt_text = "שאלה כללית על הנושא שנבחר"

        # שלב הקריאה ל-AI — עלול להיכשל
        try:
            response_text = get_lesson_from_ai(category.name, sub_category.name, prompt_text)
            print("📚 AI Response:", response_text)
        except Exception as ai_error:
            print("❌ שגיאה מה-AI:", ai_error)
            return jsonify({"error": "שגיאה ביצירת השיעור מה-AI"}), 500

        # נשמור רק אם לא הייתה שגיאה ב־AI
        prompt_doc = Prompt(
            user_id=user,
            category_id=category,
            sub_category_id=sub_category,
            prompt=prompt_text,
            response=response_text
        )
        prompt_doc.save()
        socketio.emit('new_lesson_created')
        return jsonify(serialize_prompt(prompt_doc)), 201

    except DoesNotExist:
        print("❌ אחד המרכיבים לא נמצא ב־DB")
        return jsonify({"error": "User, category או sub-category לא נמצאו"}), 404
    except Exception as e:
        print("💥 Exception:", e)
        return jsonify({"error": str(e)}), 500


def serialize_prompt(prompt):
    try:
        category_id = str(prompt.category_id.id)
        category_name = prompt.category_id.name
    except Exception:
        category_id = None
        category_name = ""

    try:
        sub_category_id = str(prompt.sub_category_id.id)
        sub_category_name = prompt.sub_category_id.name
    except Exception:
        sub_category_id = None
        sub_category_name = ""

    try:
        user_id = str(prompt.user_id.id)
        firstName = f"{prompt.user_id.firstName}"
        lastName = f"{prompt.user_id.lastName}"

    except Exception:
        user_id = None
        firstName = ""
        lastName = ""

    return {
        "id": str(prompt.id),
        "user_id": user_id,
        "firstName": firstName,
        "lastName": lastName,
        "category_id": category_id,
        "category_name": category_name,
        "sub_category_id": sub_category_id,
        "sub_category_name": sub_category_name,
        "prompt": prompt.prompt,
        "response": prompt.response,
        "created_at": prompt.created_at.isoformat(),
    }


def get_all_prompts():
    try:
        prompts = Prompt.objects().select_related()
        return [serialize_prompt(p) for p in prompts], 200
    except Exception as e:
        traceback.print_exc()
        return {"error": str(e)}, 500

def get_prompts_by_user(user_id):
    try:
        try:
            User.objects.get(id=user_id)
        except DoesNotExist:
            return {"error": "User not found"}, 404

        prompts = Prompt.objects(user_id=user_id).select_related()
        return [serialize_prompt(p) for p in prompts], 200
    except Exception as e:
        return {"error": str(e)}, 500


def delete_prompt(prompt_id):
    try:
        prompt = Prompt.objects(id=prompt_id).first()
        if not prompt:
            return {"error": "Prompt not found"}, 404
        prompt.delete()
        socketio.emit('prompt_deleted')
        return {"message": "Prompt deleted"}, 200
    except Exception as e:
        return {"error": str(e)}, 500
