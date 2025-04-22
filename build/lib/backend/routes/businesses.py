from flask import Blueprint, request, jsonify
from backend.models.database import db
from backend.models.business import Business
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.models.review import Review

business_bp = Blueprint("business", __name__)


@business_bp.route("/<int:business_id>", methods=["GET"])
@jwt_required()
def get_business(business_id):
    """
    Get details for a specific business

    Path Params:
        business_id (int): ID of the business

    Returns:
        200: Business details
        401: Unauthorized if user is not logged in
        403: Forbidden if business doesn't belong to user
        404: Not found if business doesn't exist
    """
    # Get current user
    current_user_id = get_jwt_identity()
    business = Business.query.get(business_id)

    # If the business does not exist
    if not business:
        return jsonify({"error": "Business not found"}), 404

    # If the business does not belong to the user
    if business.owner_id != current_user_id:
        return jsonify({"error": "Forbidden: Business does not belong to user"}), 403

    return jsonify(business.to_dict()), 200


@business_bp.route("/<int:business_id>", methods=["PUT"])
@jwt_required()
def update_business(business_id):
    """
    Update a business

    Path Params:
        business_id (int): ID of the business

    JSON Payload:
        name (str, optional): Business name
        location (str, optional): Business location
        business_type (str, optional): Type of business

    Returns:
        200: Updated business details
        400: Bad request if validation fails
        401: Unauthorized if user is not logged in
        403: Forbidden if business doesn't belong to user
        404: Not found if business doesn't exist
    """
    # Get current user
    current_user_id = get_jwt_identity()
    business = Business.query.get(business_id)

    # If the business does not exist
    if not business:
        return jsonify({"error": "Business not found"}), 404

    # If the business does not belong to the user
    if business.owner_id != current_user_id:
        return jsonify({"error": "Forbidden: Business does not belong to user"}), 403

    # Get JSON data from request
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    # Update business fields if provided
    if "name" in data:
        business.name = data["name"]

    if "location" in data:
        business.location = data["location"]

    if "business_type" in data:
        business.business_type = data["business_type"]

    # Save changes to database
    try:
        db.session.commit()
        return jsonify(business.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Failed to update profile: {str(e)}"}), 500


@business_bp.route("/<int:business_id>", methods=["DELETE"])
@jwt_required()
def delete_business(business_id):
    """
    Delete a business, this should also delete all reviews associated with the business

    Path Params:
        business_id (int): ID of the business

    Returns:
        204: No content on success
        401: Unauthorized if user is not logged in
        403: Forbidden if business doesn't belong to user
        404: Not found if business doesn't exist
    """
    # Get current user
    current_user_id = get_jwt_identity()
    business = Business.query.get(business_id)

    # If the business does not exist
    if not business:
        return jsonify({"error": "Business not found"}), 404

    # If the business does not belong to the user
    if business.owner_id != current_user_id:
        return jsonify({"error": "Forbidden: Business does not belong to user"}), 403

    try:
        # Delete related reviews
        for review in business.reviews:
            db.session.delete(review)

        # Delete business
        db.session.delete(business)
        db.session.commit()
        return "", 204  # No content
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Failed to delete business: {str(e)}"}), 500


# returns average rating for restruant
@business_bp.route("/<int:business_id>/rating", methods=["GET"])
@jwt_required()
def get_business_rating(business_id):
    """
    Get the average rating for a business

    Path Params:
        business_id (int): ID of the business

    Returns:
        200: Average rating
        401: Unauthorized if user is not logged in
        404: Not found if business doesn't exist
    """

    # check data first
    if not business_id:
        return jsonify({"error": "Business ID is required"}), 400

    # get business
    business = Business.query.get(business_id)
    if not business:
        return jsonify({"error": "Business not found"}), 404

    reviews = Review.query.filter_by(business_id=business_id).all()
    average_rating = sum(review.rating for review in reviews) / len(reviews)
    return jsonify({"average_rating": average_rating}), 200
