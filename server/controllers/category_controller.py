from flask import request, jsonify
from models.Category import Category
from models.SubCategory import SubCategory
from mongoengine import NotUniqueError
from bson import ObjectId

def add_category():
    data = request.get_json()
    name = data.get('name', '').strip()

    # name = data.get('name')

    if not name:
        return jsonify({'error': 'Name is required'}), 400

    # בדיקה אם כבר קיימת קטגוריה עם אותו שם
    existing = Category.objects(name=name).first()
    if existing:
        return jsonify({'error': 'Category already exists'}), 400

    try:
        category = Category(name=name)
        category.save()
        return jsonify({'message': 'Category created', 'id': str(category.id)}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500


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

    # בדיקה אם כבר קיימת תת קטגוריה באותה קטגוריה עם אותו שם
    existing = SubCategory.objects(name=name, category_id=category).first()
    if existing:
        return jsonify({'error': 'SubCategory already exists in this category'}), 400

    try:
        subcategory = SubCategory(name=name, category_id=category)
        subcategory.save()
        return jsonify({'message': 'SubCategory created', 'id': str(subcategory.id)}), 201
    except Exception as e:
        return jsonify({'error': f'Failed to create subcategory: {str(e)}'}), 500



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


def get_category_by_id(id):
    try:
        category = Category.objects(id=id).first()
        if not category:
            return jsonify({'message': 'Category not found'}), 404
        return jsonify({'_id': str(category.id), 'name': category.name})
    except Exception as e:
        print('Error fetching category:', e)
        return jsonify({'message': 'Server error'}), 500


def delete_category(id):
    try:
        category = Category.objects(id=id).first()
        if not category:
            return jsonify({'error': 'Category not found'}), 404

        # מחיקת תתי־קטגוריות של הקטגוריה
        SubCategory.objects(category_id=category).delete()
        
        category.delete()
        return jsonify({'message': 'Category and its subcategories deleted'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def delete_subCategory(sub_id):
    try:
        sub = SubCategory.objects(id=sub_id).first()
        if not sub:
            return jsonify({'error': 'SubCategory not found'}), 404

        sub.delete()
        return jsonify({'message': 'SubCategory deleted'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500



def get_categories_with_subs():
    try:
        categories = Category.objects()
        result = []

        for category in categories:
            sub_categories = SubCategory.objects(category_id=category.id)
            result.append({
                'id': str(category.id),
                'name': category.name,
                'subCategories': [
                    {
                        'id': str(sub.id),
                        'name': sub.name
                    }
                    for sub in sub_categories
                ]
            })

        return result, 200
    except Exception as e:
        return {'error': str(e)}, 500


# הוספתי את שתי הפונקציות הבאות:

def update_category(id):
    try:
        data = request.get_json()
        name = data.get('name', '').strip()
        if not name:
            return jsonify({'error': 'Name is required'}), 400

        category = Category.objects(id=id).first()
        if not category:
            return jsonify({'error': 'Category not found'}), 404

        category.name = name
        category.save()
        return jsonify({'message': 'Category updated'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def update_subCategory(sub_id):
    try:
        data = request.get_json()
        name = data.get('name', '').strip()
        if not name:
            return jsonify({'error': 'Name is required'}), 400

        sub = SubCategory.objects(id=sub_id).first()
        if not sub:
            return jsonify({'error': 'SubCategory not found'}), 404

        sub.name = name
        sub.save()
        return jsonify({'message': 'SubCategory updated'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
