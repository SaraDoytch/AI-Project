
from flask import Blueprint, request, jsonify
from controllers.auth_controller import login, register
from flasgger.utils import swag_from

auth_route = Blueprint('auth', __name__)

@auth_route.route('/register', methods=['POST'])
@swag_from('../docs/auth/register.yml')
def register_route():
    return register()

@auth_route.route('/login', methods=['POST'])
@swag_from('../docs/auth/login.yml')
def login_route():
    return login()
