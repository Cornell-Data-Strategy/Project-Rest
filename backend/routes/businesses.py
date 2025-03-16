from flask import Blueprint, request, jsonify
from backend.models.database import db
from backend.models.business import Business
from flask_jwt_extended import jwt_required, get_jwt_identity

business_bp = Blueprint('business', __name__)





@business_bp.route('/<int:business_id>', methods=['GET'])
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
    pass



@business_bp.route('/<int:business_id>', methods=['PUT'])
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
    pass



@business_bp.route('/<int:business_id>', methods=['DELETE'])
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
    pass

