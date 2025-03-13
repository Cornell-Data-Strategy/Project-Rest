from flask import Blueprint, request, jsonify
from backend.models.database import db
from backend.models.user import User
from backend.models.review import Review
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime, timezone

user_bp = Blueprint('user', __name__)

@user_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_user_profile():
    """
    Get the profile of the currently logged in user
    
    Returns:
        200: User profile data
        401: Unauthorized if user is not logged in
    """
    # Get user ID from the JWT token
    current_user_id = get_jwt_identity()
    
    # Find the user in database
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    # Return user profile data
    return jsonify(user.to_dict()), 200

@user_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_user_profile():
    """
    Update the profile of the currently logged in user
    
    JSON Payload:
        first_name (str, optional): User's first name
        last_name (str, optional): User's last name
        email (str, optional): User's email
    
    Returns:
        200: Updated user profile data
        400: Bad request if validation fails
        401: Unauthorized if user is not logged in
    """
    pass