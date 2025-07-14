from flask import Blueprint, jsonify
from controllers.admin_controller import get_users_with_prompts_controller
from flasgger.utils import swag_from
from middleware.auth_required import admin_required

admin_bp = Blueprint('admin_bp', __name__,)

@admin_bp.route('/users_with_prompts', methods=['GET'])
@swag_from('../docs/admin/users_with_prompts.yml')
@admin_required
def get_users_with_prompts():
    data, error = get_users_with_prompts_controller()
    if error:
        return jsonify({'error': error}), 500
    return jsonify(data), 200
