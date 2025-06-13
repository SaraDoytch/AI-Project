
from flask import Blueprint, request, jsonify
from controllers.auth_controller import login, register

auth_route = Blueprint('auth', __name__)

@auth_route.route('/register', methods=['POST'])
def register_route():
    return register()

@auth_route.route('/login', methods=['POST'])
def login_route():
    return login()
