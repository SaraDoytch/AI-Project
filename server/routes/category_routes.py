from flask import Blueprint
from controllers.category_controller import add_category, add_subCategory, get_categories,get_subCategoriesById

category_bp = Blueprint('category_bp', __name__)

category_bp.route('/addCategory', methods=['POST'])(add_category)
category_bp.route('/getCategories', methods=['GET'])(get_categories)
category_bp.route('/addSubCategory', methods=['POST'])(add_subCategory)
category_bp.route('/subcategories/<string:category_id>', methods=['GET'])(get_subCategoriesById)
