from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from backend.models.database import db
from backend.models.user import User
from flask_jwt_extended import create_access_token

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    """Authenticate user and return access token"""
    data = request.get_json()
    # TODO Function logic here
    return jsonify({'token': 'access_token'})

@auth_bp.route('/register', methods=['POST'])
def register():
    """Register new user"""
    data = request.get_json()
    # TODO Function logic here
    return jsonify({'message': 'User registered successfully'})