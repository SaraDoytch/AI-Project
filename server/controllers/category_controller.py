from flask import request, jsonify
from models.Category import Category
from models.SubCategory import SubCategory
from mongoengine import NotUniqueError

def add_category():
    data = request.get_json()
    name = data.get('name')

    if not name:
        return jsonify({'error': 'Name is required'}), 400

    try:
        category = Category(name=name)
        category.save()
        return jsonify({'message': 'Category created', 'id': str(category.id)}), 201
    except NotUniqueError:
        return jsonify({'error': 'Category already exists'}), 400

def get_categories():
    categories = Category.objects()
    return jsonify([
        {'_id': str(cat.id), 'name': cat.name}
        for cat in categories
    ])

def add_subCategory():
    data = request.get_json()
    name = data.get('name')
    category_id = data.get('category_id')

    if not name or not category_id:
        return jsonify({'error': 'Name and category_id are required'}), 400

    category = Category.objects(id=category_id).first()
    if not category:
        return jsonify({'error': 'Category not found'}), 404

    subcategory = SubCategory(name=name, category_id=category)
    subcategory.save()
    return jsonify({'message': 'SubCategory created', 'id': str(subcategory.id)}), 201



# def get_subCategoriesById(category_id):
#     try:
#         # בדיקה אם הקטגוריה קיימת
#         category = Category.objects(id=category_id).first()
#         if not category:
#             return jsonify({"error": "Category not found"}), 404
        
#         # שליפת תת הקטגוריות לפי קטגוריה
#         subcategories = Subcategory.objects(category=category)  # בהנחה שיש שדה category ב-Subcategory
        
#         # המרת תת הקטגוריות למבנה JSON
#         result = []
#         for sub in subcategories:
#             result.append({
#                 "id": str(sub.id),
#                 "name": sub.name,
#             })
        
#         return jsonify(result), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# def get_categories():
#     categories = Category.objects()
#     return jsonify([
#         {'id': str(cat.id), 'name': cat.name}
#         for cat in categories
#     ]), 200

# def get_subcategories_by_category_id(category_id):
#     try:
#         category = Category.objects(id=category_id).first()
#         if not category:
#             return jsonify({'error': 'Category not found'}), 404

#         subcategories = SubCategory.objects(category_id=category)
#         return jsonify([
#             {
#                 "_id": str(sub.id),
#                 "name": sub.name,
#                 "category_id": str(sub.category_id.id)
#             } for sub in subcategories
#         ]), 200

#     except Exception as e:
#         return jsonify({'error': str(e)}), 500
def get_subCategoriesById(category_id):
    try:
        category = Category.objects(id=category_id).first()
        if not category:
            return jsonify({'error': 'Category not found'}), 404

        subcategories = SubCategory.objects(category_id=category)
        return jsonify([
            {
                "_id": str(sub.id),
                "name": sub.name,
                "category_id": str(sub.category_id.id)
            } for sub in subcategories
        ])
    except Exception as e:
        return jsonify({'error': str(e)}), 500