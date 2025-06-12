
from flask import Blueprint, request, jsonify
from controllers.auth_controller import login, register

auth_route = Blueprint('auth_route', __name__)

@auth_route.route('/register', methods=['POST'])
def register_route():
    return register(request)

@auth_route.route('/login', methods=['POST'])
def login_route():
    return login(request)
