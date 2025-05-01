from flask import Blueprint, request, jsonify
from backend.services.scraper import scrape_reviews_for_business
from backend.services.llm import process_reviews
from backend.models.database import db
from backend.models.review import Review

reviews_bp = Blueprint('reviews', __name__)

@reviews_bp.route('/analyze_reviews', methods=['POST'])
def analyze_reviews():
    """Analyze a batch of reviews using Google NLP"""
    data = request.get_json()
    reviews = data.get('reviews', [])
    results = process_reviews(reviews)
    return jsonify(results)



@reviews_bp.route('/<int:business_id>', methods=['GET'])
def get_reviews(business_id):
    """Get reviews for a business with optional filters"""
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    platform = request.args.get('platform')
    # Function logic here
    return jsonify({'reviews': []})

@reviews_bp.route('/<int:business_id>/ratings-distribution', methods=['GET'])
def get_ratings_distribution(business_id):
    """Get the distribution of ratings for a business"""
    from sqlalchemy import func
    
    # Get reviews with non-null ratings for the specified business
    query_results = db.session.query(
        Review.rating,
        func.count(Review.id).label('count')
    ).filter(
        Review.business_id == business_id,
        Review.rating.isnot(None)  # Exclude null ratings
    ).group_by(
        Review.rating
    ).all()
    
    # Convert the query results to the expected format
    total_reviews = sum(count for _, count in query_results)
    ratings_data = []
    
    # Ensure we have entries for all ratings 1-5, even if there are no reviews with that rating
    for rating in range(1, 6):
        count = next((c for r, c in query_results if r == rating), 0)
        percentage = (count / total_reviews * 100) if total_reviews > 0 else 0
        
        ratings_data.append({
            "rating": rating,
            "count": count,
            "percentage": percentage
        })
    
    return jsonify({
        "ratings": ratings_data,
        "total_reviews": total_reviews
    })