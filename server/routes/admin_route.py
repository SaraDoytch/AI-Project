from flask import Blueprint, jsonify
from controllers.admin_controller import get_users_with_prompts_controller

admin_bp = Blueprint('admin_bp', __name__,)

@admin_bp.route('/users_with_prompts', methods=['GET'])
def get_users_with_prompts():
    data, error = get_users_with_prompts_controller()
    if error:
        return jsonify({'error': error}), 500
    return jsonify(data), 200
