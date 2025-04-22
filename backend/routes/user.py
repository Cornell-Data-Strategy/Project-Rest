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
    # Get user ID from the JWT token
    current_user_id = get_jwt_identity()
    
    # Find the user in database
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    # Get JSON data from request
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    # Update user fields if provided in request
    if 'first_name' in data:
        user.first_name = data['first_name']
    
    if 'last_name' in data:
        user.last_name = data['last_name']
    
    if 'email' in data:
        # Check if email already exists for another user
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user and existing_user.id != current_user_id:
            return jsonify({"error": "Email already in use"}), 400
        user.email = data['email']
    
    # Save changes to database
    try:
        db.session.commit()
        return jsonify(user.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Failed to update profile: {str(e)}"}), 500
    
@user_bp.route('/business-reviews', methods=['GET'])
@jwt_required()
def get_user_business_reviews():
    """Get all reviews for businesses owned by the current user"""
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    

    businesses = user.businesses 
    
    all_reviews = []
    for business in businesses:
        reviews = Review.query.filter_by(business_id=business.id).all()
        business_reviews = []
        for review in reviews:
            review_dict = review.to_dict()
            review_dict['business_name'] = business.name  # Add business name to each review
            business_reviews.append(review_dict)
        
        all_reviews.extend(business_reviews)
    
    return jsonify({"reviews": all_reviews}), 200

@user_bp.route('/business-reviews/stats', methods=['GET'])
@jwt_required()
def get_user_review_stats():
    """Get statistics about reviews for the user's businesses"""
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    businesses = user.businesses  # Assuming this relationship exists
    
    stats = {
        'total_businesses': len(businesses),
        'total_reviews': 0,
        'average_rating': 0,
        'sentiment_breakdown': {
            'positive': 0,
            'neutral': 0,
            'negative': 0
        },
        'by_business': []
    }
    
    all_ratings = []
    
    for business in businesses:
        # Get reviews for this business
        reviews = Review.query.filter_by(business_id=business.id).all()
        
        business_stats = {
            'id': business.id,
            'name': business.name,
            'review_count': len(reviews),
            'average_rating': 0,
            'sentiment_breakdown': {
                'positive': 0,
                'neutral': 0,
                'negative': 0
            }
        }
        
        # Calculate business-specific stats
        business_ratings = []
        for review in reviews:
            stats['total_reviews'] += 1
            
            # Track ratings
            if review.rating:
                all_ratings.append(review.rating)
                business_ratings.append(review.rating)
            
            # Track sentiment
            sentiment = review.sentiment_description.lower()
            if sentiment in stats['sentiment_breakdown']:
                stats['sentiment_breakdown'][sentiment] += 1
                business_stats['sentiment_breakdown'][sentiment] += 1
        
        # Calculate average rating for this business
        if business_ratings:
            business_stats['average_rating'] = sum(business_ratings) / len(business_ratings)
        
        stats['by_business'].append(business_stats)
    
    # Calculate overall average rating
    if all_ratings:
        stats['average_rating'] = sum(all_ratings) / len(all_ratings)
    
    return jsonify(stats), 200

@user_bp.route('/change-password', methods=['PUT'])
@jwt_required()
def change_password():
    """Change user password with verification of current password"""
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    data = request.get_json()
    if not data or not data.get('current_password') or not data.get('new_password'):
        return jsonify({"error": "Missing required fields"}), 400
    
    if not user.check_password(data['current_password']):
        return jsonify({"error": "Current password is incorrect"}), 401
    
    user.set_password(data['new_password'])
    db.session.commit()
    return jsonify({"message": "Password updated successfully"}), 200


@user_bp.route('/account', methods=['DELETE'])
@jwt_required()
def delete_account():
    """Delete user account (requires password confirmation)"""
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    data = request.get_json()
    if not data or not data.get('password'):
        return jsonify({"error": "Password confirmation required"}), 400
    
    if not user.check_password(data['password']):
        return jsonify({"error": "Password is incorrect"}), 401
    
    try:
        # Delete related businesses (should cascade to reviews if set up correctly)
        for business in user.businesses:
            db.session.delete(business)
        
        # Delete user
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "Account deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Failed to delete account: {str(e)}"}), 500
