from flask import Blueprint, request, jsonify
from backend.services.scraper import scrape_reviews_for_business
from backend.services.llm import process_reviews
from backend.models.database import db
from backend.models.review import Review
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend.models.business import Business
from sqlalchemy import func

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
    
@reviews_bp.route('/<int:business_id>/topics-frequency', methods=['GET'])
@jwt_required()
def get_topics_frequency(business_id):
    """Get the frequency of topics from all reviews for a business
    
    Returns the top 4 most frequently mentioned topics across all reviews.
    Each topic has a count, color, and a descriptive text.
    """
    # Get current user
    current_user_id = get_jwt_identity()
    
    # Find the business and verify ownership
    business = Business.query.filter_by(id=business_id, user_id=current_user_id).first()
    if not business:
        return jsonify({"error": "Business not found or access denied"}), 404
    
    # Get all reviews for this business
    reviews = Review.query.filter_by(business_id=business_id).all()
    
    # Count topic frequencies
    topic_counts = {}
    
    for review in reviews:
        if not review.topics:
            continue
            
        # Parse topics
        if isinstance(review.topics, str):
            topics = [topic.strip() for topic in review.topics.split(',')]
        else:
            topics = [review.topics]
        
        for topic in topics:
            if not topic:
                continue
                
            # Update topic counts
            topic_counts[topic] = topic_counts.get(topic, 0) + 1
    
    # Get top 4 topics by frequency
    top_topics = sorted(topic_counts.items(), key=lambda x: x[1], reverse=True)[:4]
    
    # Define colors for the top topics (updated colors)
    colors = ["#3B82F6", "#F59E42", "#10B981", "#F43F5E"]
    
    # Prepare the response
    topic_data = []
    for i, (topic, count) in enumerate(top_topics):
        topic_data.append({
            "type": topic,
            "count": count,
            "color": colors[i % len(colors)],
            "description": f"{topic} was mentioned in {count} reviews"
        })
    
    return jsonify({
        "topics": topic_data,
        "total_reviews": len(reviews)
    }), 200