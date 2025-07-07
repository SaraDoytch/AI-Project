from flask import Blueprint, jsonify
from controllers.category_controller import (
    add_category, add_subCategory,
    get_categories, get_subCategoriesById,
    get_category_by_id, delete_category,
    delete_subCategory, get_categories_with_subs,
    update_category, update_subCategory
)
from flasgger.utils import swag_from

category_bp = Blueprint('category_bp', __name__)

# קטגוריות
@category_bp.route('/', methods=['POST'])
@swag_from('../docs/category/add_category.yml')
def add_category_route():
    return add_category()

@category_bp.route('/', methods=['GET'])
@swag_from('../docs/category/get_categories.yml')
def get_categories_route():
    return get_categories()

@category_bp.route('/<string:id>', methods=['GET'])
@swag_from('../docs/category/get_category_by_id.yml')
def get_category_by_id_route(id):
    return get_category_by_id(id)

@category_bp.route('/<string:id>', methods=['PATCH'])
@swag_from('../docs/category/update_category.yml')
def update_category_route(id):
    return update_category(id)

@category_bp.route('/<string:id>', methods=['DELETE'])
@swag_from('../docs/category/delete_category.yml')
def delete_category_route(id):
    return delete_category(id)

# תתי־קטגוריות
@category_bp.route('/subCategory', methods=['POST'])
@swag_from('../docs/category/add_subCategory.yml')
def add_sub_category_route():
    return add_subCategory()

@category_bp.route('/subCategory/<string:sub_id>', methods=['PATCH'])
@swag_from('../docs/category/update_subCategory.yml')
def update_sub_category_route(sub_id):
    return update_subCategory(sub_id)

@category_bp.route('/subCategory/<string:sub_id>', methods=['DELETE'])
@swag_from('../docs/category/delete_subCategory.yml')
def delete_sub_category_route(sub_id):
    return delete_subCategory(sub_id)

@category_bp.route('/subCategories/<string:category_id>', methods=['GET'])
@swag_from('../docs/category/get_subCategoriesById.yml')
def get_sub_categories_by_id_route(category_id):
    return get_subCategoriesById(category_id)

# קטגוריות עם תתי־קטגוריות
@category_bp.route('/withSubs', methods=['GET'])
@swag_from('../docs/category/get_categories_with_subs.yml')
def get_with_subs_route():
    data, status = get_categories_with_subs()
    return jsonify(data), status
