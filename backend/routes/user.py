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
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    # Update fields if provided
    if 'first_name' in data:
        user.first_name = data['first_name']
    
    if 'last_name' in data:
        user.last_name = data['last_name']
    
    if 'email' in data:
        # Check if email is already in use by another user
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user and existing_user.id != current_user_id:
            return jsonify({"error": "Email already in use"}), 400
        
        user.email = data['email']
    
    # Update last_modified timestamp
    user.updated_at = datetime.now(timezone.utc)
    
    try:
        db.session.commit()
        return jsonify(user.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@user_bp.route('/password', methods=['PUT'])
@jwt_required()
def change_password():
    """
    Change the password of the currently logged in user
    
    JSON Payload:
        current_password (str): User's current password
        new_password (str): User's new password
    
    Returns:
        200: Success message
        400: Bad request if validation fails
        401: Unauthorized if current password is incorrect
    """
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    data = request.get_json()
    
    if not data or not data.get('current_password') or not data.get('new_password'):
        return jsonify({"error": "Missing required fields"}), 400
    
    # Verify current password
    if not user.check_password(data['current_password']):
        return jsonify({"error": "Current password is incorrect"}), 401
    
    # Set new password
    user.set_password(data['new_password'])
    user.updated_at = datetime.now(timezone.utc)
    
    try:
        db.session.commit()
        return jsonify({"message": "Password updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@user_bp.route('/dashboard', methods=['GET'])
@jwt_required()
def get_user_dashboard():
    """
    Get a summary of all businesses owned by the user
    
    Returns:
        200: Summary of all businesses
        401: Unauthorized if user is not logged in
    """
    current_user_id = get_jwt_identity()
    
    # Get all businesses owned by the user
    businesses = Business.query.filter_by(user_id=current_user_id).all()
    
    if not businesses:
        return jsonify({"businesses": []}), 200
    
    business_summaries = []
    
    for business in businesses:
        # Get total review count
        review_count = Review.query.filter_by(business_id=business.id).count()
        
        # Calculate average rating
        avg_rating_result = db.session.query(func.avg(Review.rating)).filter(Review.business_id == business.id).first()
        avg_rating = round(avg_rating_result[0], 1) if avg_rating_result[0] else 0
        
        # Get recent reviews
        recent_reviews = Review.query.filter_by(business_id=business.id) \
                                   .order_by(Review.date.desc()) \
                                   .limit(3) \
                                   .all()
        
        business_summaries.append({
            "id": business.id,
            "name": business.name,
            "business_type": business.business_type,
            "review_count": review_count,
            "average_rating": avg_rating,
            "recent_reviews": [review.to_dict() for review in recent_reviews]
        })
    
    return jsonify({
        "businesses": business_summaries
    }), 200

@user_bp.route('/notifications/settings', methods=['GET', 'PUT'])
@jwt_required()
def notification_settings():
    """
    Get or update notification settings for the user
    
    JSON Payload (for PUT):
        email_notifications (bool, optional): Enable/disable email notifications
        notification_types (dict, optional): Types of notifications to receive
    
    Returns:
        200: Current notification settings or success message
        400: Bad request if validation fails
    """
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    if request.method == 'GET':
        # Return current notification settings
        settings = {
            "email_notifications": getattr(user, 'email_notifications', True),
            "notification_types": getattr(user, 'notification_types', {
                "new_reviews": True,
                "critical_reviews": True,
                "rating_changes": True,
                "weekly_summary": True
            })
        }
        return jsonify(settings), 200
    
    else:  # PUT method
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        # Update notification settings
        if 'email_notifications' in data:
            user.email_notifications = data['email_notifications']
        
        if 'notification_types' in data:
            # Merge with existing settings if any
            current_types = getattr(user, 'notification_types', {})
            current_types.update(data['notification_types'])
            user.notification_types = current_types
        
        try:
            db.session.commit()
            return jsonify({"message": "Notification settings updated"}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 400