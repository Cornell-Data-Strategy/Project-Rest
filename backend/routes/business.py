from flask import Blueprint, request, jsonify
from backend.models.database import db
from backend.models.business import Business

business_bp = Blueprint('businesses', __name__)

@business_bp.route('/', methods=['POST'])
def create_business():
    """Create a new business profile"""
    data = request.get_json()
    # TODO Function logic here
    return jsonify({'business_id': 1})

@business_bp.route('/<int:business_id>', methods=['GET'])
def get_business(business_id):
    """Get business details by ID"""
    # TODO  Function logic here
    return jsonify({'business': 'business_data'})