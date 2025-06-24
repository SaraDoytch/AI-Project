from flask import Blueprint, jsonify
from controllers.category_controller import (
    add_category, add_subCategory,
    get_categories, get_subCategoriesById,
    get_category_by_id, delete_category,
    delete_subCategory, get_categories_with_subs,
    update_category, update_subCategory
)

category_bp = Blueprint('category_bp', __name__)

# קטגוריות
@category_bp.route('/', methods=['POST'])
def add_category_route():
    return add_category()

@category_bp.route('/', methods=['GET'])
def get_categories_route():
    return get_categories()

@category_bp.route('/<string:id>', methods=['GET'])
def get_category_by_id_route(id):
    return get_category_by_id(id)

@category_bp.route('/<string:id>', methods=['PATCH'])
def update_category_route(id):
    return update_category(id)

@category_bp.route('/<string:id>', methods=['DELETE'])
def delete_category_route(id):
    return delete_category(id)

# תתי־קטגוריות
@category_bp.route('/subCategory', methods=['POST'])
def add_sub_category_route():
    return add_subCategory()

@category_bp.route('/subCategory/<string:sub_id>', methods=['PATCH'])
def update_sub_category_route(sub_id):
    return update_subCategory(sub_id)

@category_bp.route('/subCategory/<string:sub_id>', methods=['DELETE'])
def delete_sub_category_route(sub_id):
    return delete_subCategory(sub_id)

@category_bp.route('/subCategories/<string:category_id>', methods=['GET'])
def get_sub_categories_by_id_route(category_id):
    return get_subCategoriesById(category_id)

# קטגוריות עם תתי־קטגוריות
@category_bp.route('/withSubs', methods=['GET'])
def get_with_subs_route():
    data, status = get_categories_with_subs()
    return jsonify(data), status
