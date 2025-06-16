# from flask import jsonify
# from models.Prompt import Prompt
# from models.User import User
# from models.Category import Category
# from models.SubCategory import SubCategory
# from services.openai_service import get_lesson_from_ai
# from mongoengine import DoesNotExist
# from flask import request



# def generate_lesson_controller():
#     data = request.json
#     print("📥 Received data:", data)

#     try:
#         user = User.objects.get(id=data['user_id'])
#         print("✅ User found:", user.email)
#         category = Category.objects.get(id=data['category_id'])
#         print("✅ Category found:", category.name)
#         sub_category = SubCategory.objects.get(id=data['sub_category_id'])
#         print("✅ Sub-category found:", sub_category.name)

#         # prompt_text = data['prompt']
#         prompt_text = data.get('prompt', '')

#         print("✏️ Prompt text:", prompt_text)

#         response_text = get_lesson_from_ai(category.name, sub_category.name, prompt_text)
#         print("📚 AI Response:", response_text)

#         prompt_doc = Prompt(
#             user_id=user,
#             category_id=category,
#             sub_category_id=sub_category,
#             prompt=prompt_text,
#             response=response_text
#         )
#         prompt_doc.save()

#         return jsonify({"lesson": response_text}), 201

#     except DoesNotExist:
#         print("❌ אחד המרכיבים לא נמצא ב־DB")
#         return jsonify({"error": "User or category not found"}), 404
#     except Exception as e:
#         print("💥 Exception:", e)
#         return jsonify({"error": str(e)}), 500
