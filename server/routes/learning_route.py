from flask import Blueprint, request
from controllers.learning_controller import generate_lesson_controller

learning_bp = Blueprint('learning', __name__)

@learning_bp.route('/generate', methods=['POST'])
def generate_lesson():
    return generate_lesson_controller()
