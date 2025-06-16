# from flask import Blueprint,jsonify
# from controllers.category_controller import (add_category, add_subCategory, 
# get_categories,get_subCategoriesById,get_category_by_id,delete_category, delete_subCategory, get_categories_with_subs)

# category_bp = Blueprint('category_bp', __name__)


# @category_bp.route('/withSubs', methods=['GET'])
# def get_with_subs_route():
#     data, status = get_categories_with_subs()
#     return jsonify(data), status

# category_bp.route('/addCategory', methods=['POST'])(add_category)
# category_bp.route('/getCategories', methods=['GET'])(get_categories)
# category_bp.route('/addSubCategory', methods=['POST'])(add_subCategory)
# category_bp.route('/subCategories/<string:category_id>', methods=['GET'])(get_subCategoriesById)
# category_bp.route('/<id>', methods=['GET'])(get_category_by_id)

# category_bp.route('/<string:id>', methods=['DELETE'])(delete_category)
# category_bp.route('/subCategory/<string:sub_id>', methods=['DELETE'])(delete_subCategory)


# # withSubs


from flask import Blueprint, jsonify
from controllers.category_controller import (
    add_category, add_subCategory,
    get_categories, get_subCategoriesById,
    get_category_by_id, delete_category,
    delete_subCategory, get_categories_with_subs,
    update_category, update_subCategory
)

category_bp = Blueprint('category_bp', __name__, )

# קטגוריות
category_bp.route('/', methods=['POST'])(add_category)
category_bp.route('/', methods=['GET'])(get_categories)
category_bp.route('/<string:id>', methods=['GET'])(get_category_by_id)
category_bp.route('/<string:id>', methods=['PUT'])(update_category)
category_bp.route('/<string:id>', methods=['DELETE'])(delete_category)

# תתי־קטגוריות
category_bp.route('/subCategory', methods=['POST'])(add_subCategory)
category_bp.route('/subCategory/<string:sub_id>', methods=['PUT'])(update_subCategory)
category_bp.route('/subCategory/<string:sub_id>', methods=['DELETE'])(delete_subCategory)
category_bp.route('/subCategories/<string:category_id>', methods=['GET'])(get_subCategoriesById)

# קטגוריות עם תתי־קטגוריות
@category_bp.route('/withSubs', methods=['GET'])
def get_with_subs_route():
    data, status = get_categories_with_subs()
    return jsonify(data), status
