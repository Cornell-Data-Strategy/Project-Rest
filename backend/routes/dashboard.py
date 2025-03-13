from flask import Blueprint, request, jsonify
from backend.models.database import db
from backend.models.business import Business
from backend.models.review import Review
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import func, desc

dashboard_bp = Blueprint('dashboard', __name__)

# Main Dashboard Data Route
@dashboard_bp.route('/business/<int:business_id>/summary', methods=['GET'])
@jwt_required()
def get_business_summary(business_id):
    """
    Get summary metrics for business dashboard
    
    Returns:
        - Business name and overall rating
        - Review count 
        - Average rating - meaning take all the ratings and average them
        - Overall sentiment score - take all the sentiment scores and average them
        - Most mentioned topic - take all the topics and count them, most mentioned topic
    """
    pass

# Sentiment Analysis Section
# @dashboard_bp.route('/business/<int:business_id>/sentiment/analysis', methods=['GET'])
# @jwt_required()
# def get_sentiment_analysis(business_id):
#     """
#     Get sentiment analysis data for visualization
    
#     Query Params:
#         period (str, optional): Time period for analysis (week, month, quarter, year)
    
#     Returns:
#         Sentiment trends and distribution data for visualization
#     """
#     pass

# Recent Reviews Section
@dashboard_bp.route('/business/<int:business_id>/reviews/recent', methods=['GET'])
@jwt_required()
def get_recent_reviews(business_id):
    """
    Get most recent reviews for a business
    
    Query Params:
        limit (int, optional): Number of reviews to return (default 5)
    
    Returns:
        List of recent reviews with user info, content, rating, and topics
    """
    pass

# Rating Distribution Section
@dashboard_bp.route('/business/<int:business_id>/ratings/distribution', methods=['GET'])
@jwt_required()
def get_rating_distribution(business_id):
    """
    Get distribution of ratings (1-5 stars)
    
    Query Params:
        period (str, optional): Time period for analysis (week, month, quarter, year)
    
    Returns:
        Count of reviews for each rating value
    """
    pass


# Review Segmentation Section
@dashboard_bp.route('/business/<int:business_id>/reviews/segments', methods=['GET'])
@jwt_required()
def get_review_segments(business_id):
    """
    Get review segmentation data
    
    Returns:
        Categorized segments of reviews (Highly Positive, Regular Visitor, etc.)
    """
    pass

# Critical Reviews Section
@dashboard_bp.route('/business/<int:business_id>/reviews/critical', methods=['GET'])
@jwt_required()
def get_critical_reviews(business_id):
    """
    Get critical (negative) reviews, which are the most recent and lowest ratine and sentiment score
    
    Query Params:
        limit (int, optional): Number of reviews to return (default 5)
    
    Returns:
        List of critical reviews 
    """
    pass

# Topic-specific Ratings
@dashboard_bp.route('/business/<int:business_id>/topics/ratings', methods=['GET'])
@jwt_required()
def get_topic_ratings(business_id):
    """
    Get ratings for specific business topics. So youll have to query the db for all topics and return 
    the top 5 most mentioned one. after you find the top 5, you can then query the db for the ratings for
    each of the top 5 topics and return the average rating for each of the top 5 topics.
    
    Returns:
        Ratings for key topics (Food Quality, Service, Price, Cleanliness, Waittime). Make it easy to parse
    """
    pass
