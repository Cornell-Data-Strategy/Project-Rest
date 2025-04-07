from flask import Blueprint, jsonify

ping_bp = Blueprint('ping', __name__)

@ping_bp.route('/ping', methods=['GET'])
def ping():
    """Ping test route to check if the backend is running"""
    return jsonify({'message': 'pong'})