from flask import Blueprint, request,jsonify
from controllers.prompt_controller import generate_lesson_controller,get_all_prompts, get_prompts_by_user,delete_prompt
from models.Prompt import Prompt

prompt_bp = Blueprint('prompts', __name__)

@prompt_bp.route('/generate', methods=['POST'])
def generate_lesson():
    return generate_lesson_controller()

@prompt_bp.route("/", methods=["GET"])
def route_get_all_prompts():
    data, status = get_all_prompts()
    return jsonify(data), status

@prompt_bp.route("/user/<string:user_id>", methods=["GET"])
def route_get_prompts_by_user(user_id):
    data, status = get_prompts_by_user(user_id)
    return jsonify(data), status


@prompt_bp.route("/<string:prompt_id>", methods=["DELETE"])
def route_delete_prompt(prompt_id):
    data, status = delete_prompt(prompt_id)
    return jsonify(data), status
