from flask import Blueprint, request,jsonify
from controllers.prompt_controller import generate_lesson_controller,get_all_prompts, get_prompts_by_user,delete_prompt
from models.Prompt import Prompt
from flasgger.utils import swag_from

prompt_bp = Blueprint('prompts', __name__)

@prompt_bp.route('/generate', methods=['POST'])
@swag_from('../docs/prompt/generate_lesson.yml')
def generate_lesson():
    return generate_lesson_controller()

@prompt_bp.route("/", methods=["GET"])
@swag_from('../docs/prompt/get_all_prompts.yml')
def route_get_all_prompts():
    data, status = get_all_prompts()
    return jsonify(data), status

@prompt_bp.route("/user/<string:user_id>", methods=["GET"])
@swag_from('../docs/prompt/get_prompts_by_user.yml')
def route_get_prompts_by_user(user_id):
    data, status = get_prompts_by_user(user_id)
    return jsonify(data), status


@prompt_bp.route("/<string:prompt_id>", methods=["DELETE"])
@swag_from('../docs/prompt/delete_prompt.yml')
def route_delete_prompt(prompt_id):
    data, status = delete_prompt(prompt_id)
    return jsonify(data), status
