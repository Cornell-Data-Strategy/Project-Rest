from flask import Blueprint, request, jsonify
from backend.models.database import db
from backend.models.business import Business
from backend.models.review import Review
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import func, desc
from datetime import datetime, timedelta
import json

dashboard_bp = Blueprint('dashboard', __name__)

# Helper function to get date range based on period
def get_date_range(period):
    today = datetime.utcnow()
    if period == 'week':
        start_date = today - timedelta(days=7)
    elif period == 'month':
        start_date = today - timedelta(days=30)
    elif period == 'quarter':
        start_date = today - timedelta(days=90)
    elif period == 'year':
        start_date = today - timedelta(days=365)
    else:  # Default to all time
        start_date = datetime(1970, 1, 1)
    
    return start_date, today

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
    current_user_id = get_jwt_identity()
    business = Business.query.get(business_id)
    
    if not business:
        return jsonify({"error": "Business not found"}), 404
    
    if business.user_id != current_user_id:
        return jsonify({"error": "Access denied"}), 403
    
    # Get review count
    review_count = Review.query.filter_by(business_id=business_id).count()
    
    # Calculate average rating
    avg_rating_result = db.session.query(func.avg(Review.rating)).filter(Review.business_id == business_id).first()
    avg_rating = round(avg_rating_result[0], 1) if avg_rating_result[0] else 0
    
    # Calculate average sentiment score
    avg_sentiment_result = db.session.query(func.avg(Review.sentiment_score)).filter(Review.business_id == business_id).first()
    avg_sentiment = round(avg_sentiment_result[0], 2) if avg_sentiment_result[0] else 0
    
    # Find most mentioned topic
    topics_count = {}
    reviews = Review.query.filter_by(business_id=business_id).all()
    
    for review in reviews:
        if review.topics:
            # Parse topics from JSON string if stored as string
            try:
                if isinstance(review.topics, str):
                    review_topics = json.loads(review.topics)
                else:
                    review_topics = review.topics
                
                for topic in review_topics:
                    topics_count[topic] = topics_count.get(topic, 0) + 1
            except:
                # Skip if topics can't be parsed
                pass
    
    most_mentioned_topic = max(topics_count.items(), key=lambda x: x[1])[0] if topics_count else None
    
    return jsonify({
        "business_name": business.name,
        "review_count": review_count,
        "average_rating": avg_rating,
        "sentiment_score": avg_sentiment,
        "most_mentioned_topic": most_mentioned_topic,
        "topics_count": topics_count
    }), 200

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
    current_user_id = get_jwt_identity()
    business = Business.query.get(business_id)
    
    if not business or business.user_id != current_user_id:
        return jsonify({"error": "Access denied"}), 403
    
    limit = request.args.get('limit', 5, type=int)
    
    reviews = Review.query.filter_by(business_id=business_id) \
                         .order_by(Review.date.desc()) \
                         .limit(limit) \
                         .all()
    
    return jsonify({
        "reviews": [review.to_dict() for review in reviews]
    }), 200

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
    current_user_id = get_jwt_identity()
    business = Business.query.get(business_id)
    
    if not business or business.user_id != current_user_id:
        return jsonify({"error": "Access denied"}), 403
    
    period = request.args.get('period', 'all')
    start_date, end_date = get_date_range(period)
    
    # Query for ratings distribution
    rating_counts = db.session.query(
        Review.rating, func.count(Review.id)
    ).filter(
        Review.business_id == business_id,
        Review.date >= start_date,
        Review.date <= end_date
    ).group_by(Review.rating).all()
    
    # Format results
    distribution = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
    for rating, count in rating_counts:
        distribution[rating] = count
    
    return jsonify({
        "rating_distribution": distribution,
        "period": period
    }), 200

# Review Segmentation Section
@dashboard_bp.route('/business/<int:business_id>/reviews/segments', methods=['GET'])
@jwt_required()
def get_review_segments(business_id):
    """
    Get review segmentation data
    
    Returns:
        Categorized segments of reviews (Highly Positive, Regular Visitor, etc.)
    """
    current_user_id = get_jwt_identity()
    business = Business.query.get(business_id)
    
    if not business or business.user_id != current_user_id:
        return jsonify({"error": "Access denied"}), 403
    
    # Get all reviews for this business
    reviews = Review.query.filter_by(business_id=business_id).all()
    
    # Initialize segments
    segments = {
        "highly_positive": 0,  # 5-star ratings with positive sentiment
        "highly_negative": 0,  # 1-2 star ratings with negative sentiment
        "mixed_feedback": 0,   # 3-star ratings or reviews with mixed sentiment
        "detailed_reviews": 0,  # Reviews with longer text content
        "recent_trend": 0     # Reviews from the last 30 days
    }
    
    # Current date for calculating recency
    current_date = datetime.utcnow()
    recent_threshold = current_date - timedelta(days=30)
    
    for review in reviews:
        # Highly positive segment
        if review.rating == 5 and review.sentiment_score >= 0.7:
            segments["highly_positive"] += 1
        
        # Highly negative segment
        if review.rating <= 2 and review.sentiment_score <= -0.3:
            segments["highly_negative"] += 1
        
        # Mixed feedback
        if review.rating == 3 or (review.sentiment_score > -0.3 and review.sentiment_score < 0.3):
            segments["mixed_feedback"] += 1
        
        # Detailed reviews (more than 100 characters)
        if len(review.text) > 100:
            segments["detailed_reviews"] += 1
        
        # Recent trend
        if review.date >= recent_threshold:
            segments["recent_trend"] += 1
    
    return jsonify({
        "segments": segments
    }), 200

# Critical Reviews Section
@dashboard_bp.route('/business/<int:business_id>/reviews/critical', methods=['GET'])
@jwt_required()
def get_critical_reviews(business_id):
    """
    Get critical (negative) reviews, which are the most recent and lowest rating and sentiment score
    
    Query Params:
        limit (int, optional): Number of reviews to return (default 5)
    
    Returns:
        List of critical reviews 
    """
    current_user_id = get_jwt_identity()
    business = Business.query.get(business_id)
    
    if not business or business.user_id != current_user_id:
        return jsonify({"error": "Access denied"}), 403
    
    limit = request.args.get('limit', 5, type=int)
    
    # Get negative reviews (rating <= 3 and negative sentiment)
    critical_reviews = Review.query.filter(
        Review.business_id == business_id,
        Review.rating <= 3,
        Review.sentiment_score < 0
    ).order_by(
        Review.date.desc()
    ).limit(limit).all()
    
    return jsonify({
        "critical_reviews": [review.to_dict() for review in critical_reviews]
    }), 200

# Topic-specific Ratings
@dashboard_bp.route('/business/<int:business_id>/topics/ratings', methods=['GET'])
@jwt_required()
def get_topic_ratings(business_id):
    """
    Get ratings for specific business topics. So you'll have to query the db for all topics and return 
    the top 5 most mentioned one. after you find the top 5, you can then query the db for the ratings for
    each of the top 5 topics and return the average rating for each of the top 5 topics.
    
    Returns:
        Ratings for key topics (Food Quality, Service, Price, Cleanliness, Waittime). Make it easy to parse
    """
    current_user_id = get_jwt_identity()
    business = Business.query.get(business_id)
    
    if not business or business.user_id != current_user_id:
        return jsonify({"error": "Access denied"}), 403
    
    # Get all reviews for this business
    reviews = Review.query.filter_by(business_id=business_id).all()
    
    # Count topic occurrences
    topic_counts = {}
    topic_ratings = {}
    topic_review_counts = {}
    
    for review in reviews:
        if review.topics:
            try:
                # Parse topics from JSON string if stored as string
                if isinstance(review.topics, str):
                    review_topics = json.loads(review.topics)
                else:
                    review_topics = review.topics
                
                for topic in review_topics:
                    # Count occurrences
                    topic_counts[topic] = topic_counts.get(topic, 0) + 1
                    
                    # Sum ratings for averaging later
                    topic_ratings[topic] = topic_ratings.get(topic, 0) + review.rating
                    topic_review_counts[topic] = topic_review_counts.get(topic, 0) + 1
            except:
                # Skip if topics can't be parsed
                pass
    
    # Find top 5 topics by occurrence
    top_topics = sorted(topic_counts.items(), key=lambda x: x[1], reverse=True)[:5]
    
    # Calculate average rating for each top topic
    topic_avg_ratings = {}
    for topic, count in top_topics:
        if topic_review_counts.get(topic, 0) > 0:
            avg_rating = round(topic_ratings[topic] / topic_review_counts[topic], 1)
            topic_avg_ratings[topic] = {
                'average_rating': avg_rating,
                'mention_count': count
            }
    
    return jsonify({
        "topic_ratings": topic_avg_ratings
    }), 200

# New endpoint: Sentiment Trend over time
@dashboard_bp.route('/business/<int:business_id>/sentiment/trend', methods=['GET'])
@jwt_required()
def get_sentiment_trend(business_id):
    """
    Get sentiment trend over time
    
    Query Params:
        period (str, optional): Time period for analysis (week, month, quarter, year)
        interval (str, optional): Grouping interval (day, week, month)
    
    Returns:
        Time series data of sentiment scores
    """
    current_user_id = get_jwt_identity()
    business = Business.query.get(business_id)
    
    if not business or business.user_id != current_user_id:
        return jsonify({"error": "Access denied"}), 403
    
    period = request.args.get('period', 'month')
    interval = request.args.get('interval', 'day')
    start_date, end_date = get_date_range(period)
    
    # Get reviews in the date range
    reviews = Review.query.filter(
        Review.business_id == business_id,
        Review.date >= start_date,
        Review.date <= end_date
    ).all()
    
    # Organize data by interval
    trend_data = {}
    
    for review in reviews:
        if interval == 'day':
            key = review.date.strftime('%Y-%m-%d')
        elif interval == 'week':
            # Get the Monday of the week
            monday = review.date - timedelta(days=review.date.weekday())
            key = monday.strftime('%Y-%m-%d')
        elif interval == 'month':
            key = review.date.strftime('%Y-%m')
        
        if key not in trend_data:
            trend_data[key] = {
                'total_sentiment': 0,
                'count': 0,
                'avg_sentiment': 0
            }
        
        trend_data[key]['total_sentiment'] += review.sentiment_score
        trend_data[key]['count'] += 1
    
    # Calculate averages
    for key in trend_data:
        if trend_data[key]['count'] > 0:
            trend_data[key]['avg_sentiment'] = round(
                trend_data[key]['total_sentiment'] / trend_data[key]['count'], 
                2
            )
    
    # Convert to time series format
    time_series = [
        {
            'date': key,
            'avg_sentiment': data['avg_sentiment'],
            'review_count': data['count']
        }
        for key, data in sorted(trend_data.items())
    ]
    
    return jsonify({
        "sentiment_trend": time_series,
        "period": period,
        "interval": interval
    }), 200

# New endpoint: Competitor Analysis
@dashboard_bp.route('/business/<int:business_id>/competitor-analysis', methods=['GET'])
@jwt_required()
def get_competitor_analysis(business_id):
    """
    Compare business metrics with similar businesses in the database
    
    Returns:
        Comparative metrics between the business and similar businesses
    """
    current_user_id = get_jwt_identity()
    business = Business.query.get(business_id)
    
    if not business or business.user_id != current_user_id:
        return jsonify({"error": "Access denied"}), 403
    
    # Find similar businesses by type
    similar_businesses = Business.query.filter(
        Business.business_type == business.business_type,
        Business.id != business_id
    ).all()
    
    # Business metrics
    business_metrics = {
        'avg_rating': 0,
        'avg_sentiment': 0,
        'review_count': 0
    }
    
    # Calculate metrics for the business
    reviews = Review.query.filter_by(business_id=business_id).all()
    business_metrics['review_count'] = len(reviews)
    
    if business_metrics['review_count'] > 0:
        total_rating = sum(review.rating for review in reviews)
        total_sentiment = sum(review.sentiment_score for review in reviews)
        business_metrics['avg_rating'] = round(total_rating / business_metrics['review_count'], 1)
        business_metrics['avg_sentiment'] = round(total_sentiment / business_metrics['review_count'], 2)
    
    # Competition metrics
    competition_metrics = {
        'avg_rating': 0,
        'avg_sentiment': 0,
        'review_count': 0,
        'business_count': len(similar_businesses)
    }
    
    # Calculate metrics for competitors
    total_comp_rating = 0
    total_comp_sentiment = 0
    total_comp_reviews = 0
    
    for comp_business in similar_businesses:
        comp_reviews = Review.query.filter_by(business_id=comp_business.id).all()
        comp_review_count = len(comp_reviews)
        total_comp_reviews += comp_review_count
        
        if comp_review_count > 0:
            total_comp_rating += sum(review.rating for review in comp_reviews)
            total_comp_sentiment += sum(review.sentiment_score for review in comp_reviews)
    
    if total_comp_reviews > 0:
        competition_metrics['avg_rating'] = round(total_comp_rating / total_comp_reviews, 1)
        competition_metrics['avg_sentiment'] = round(total_comp_sentiment / total_comp_reviews, 2)
        competition_metrics['review_count'] = total_comp_reviews
    
    # Calculate performance indicators
    performance = {
        'rating_vs_competition': business_metrics['avg_rating'] - competition_metrics['avg_rating'],
        'sentiment_vs_competition': business_metrics['avg_sentiment'] - competition_metrics['avg_sentiment'],
        'percentile': 0
    }
    
    # Return the analysis
    return jsonify({
        "business": business_metrics,
        "competition": competition_metrics,
        "performance": performance
    }), 200

# New endpoint: Review Response Suggestions
@dashboard_bp.route('/business/<int:business_id>/reviews/<int:review_id>/response-suggestion', methods=['GET'])
@jwt_required()
def get_response_suggestion(business_id, review_id):
    """
    Generate a suggested response for a specific review
    
    Returns:
        Suggested response text based on review content and sentiment
    """
    current_user_id = get_jwt_identity()
    business = Business.query.get(business_id)
    
    if not business or business.user_id != current_user_id:
        return jsonify({"error": "Access denied"}), 403
    
    review = Review.query.get(review_id)
    if not review or review.business_id != business_id:
        return jsonify({"error": "Review not found"}), 404
    
    # Generate response template based on sentiment and rating
    response = ""
    
    if review.rating >= 4:  # Positive review
        response = (
            f"Thank you for your wonderful {review.rating}-star review! We're thrilled to hear "
            f"you enjoyed your experience at {business.name}. We work hard to provide excellent "
            f"service and we're glad it showed. We look forward to serving you again soon!"
        )
    elif review.rating == 3:  # Neutral review
        response = (
            f"Thank you for taking the time to share your feedback. We appreciate your {review.rating}-star "
            f"review and your honest assessment of your experience at {business.name}. We're constantly "
            f"working to improve, and your feedback helps us know where we can do better. We hope to "
            f"have the opportunity to exceed your expectations on your next visit."
        )
    else:  # Negative review
        response = (
            f"Thank you for bringing this to our attention. We sincerely apologize that your experience "
            f"at {business.name} didn't meet your expectations. We would appreciate the opportunity to "
            f"discuss this further and make things right. Please contact us directly at [your contact info] "
            f"so we can address your concerns personally. Your satisfaction is our priority, and we're "
            f"committed to doing better."
        )
    
    return jsonify({
        "review": review.to_dict(),
        "suggested_response": response
    }), 200

# New endpoint: Customer Behavior Insights
@dashboard_bp.route('/business/<int:business_id>/customer-insights', methods=['GET'])
@jwt_required()
def get_customer_insights(business_id):
    """
    Get insights about customer behavior and trends
    
    Returns:
        Data about peak review times, customer loyalty indicators, etc.
    """
    current_user_id = get_jwt_identity()
    business = Business.query.get(business_id)
    
    if not business or business.user_id != current_user_id:
        return jsonify({"error": "Access denied"}), 403
    
    # Get all reviews
    reviews = Review.query.filter_by(business_id=business_id).all()
    
    # Initialize insights
    insights = {
        "peak_days": {
            "Monday": 0, 
            "Tuesday": 0, 
            "Wednesday": 0, 
            "Thursday": 0,
            "Friday": 0, 
            "Saturday": 0, 
            "Sunday": 0
        },
        "peak_months": {
            "January": 0, "February": 0, "March": 0, "April": 0,
            "May": 0, "June": 0, "July": 0, "August": 0,
            "September": 0, "October": 0, "November": 0, "December": 0
        },
        "repeat_customers": 0,
        "first_time_visitors": 0,
        "loyal_customers": 0  # Customers with multiple 4-5 star reviews
    }
    
    # Customer tracking dictionary
    customers = {}
    
    for review in reviews:
        # Track peak days
        if review.date:
            day_name = review.date.strftime('%A')
            insights["peak_days"][day_name] += 1
            
            # Track peak months
            month_name = review.date.strftime('%B')
            insights["peak_months"][month_name] += 1
        
        # Track customer behavior if reviewer_id exists
        if hasattr(review, 'reviewer_id') and review.reviewer_id:
            if review.reviewer_id not in customers:
                customers[review.reviewer_id] = {
                    'count': 0,
                    'high_ratings': 0
                }
                
            customers[review.reviewer_id]['count'] += 1
            
            if review.rating >= 4:
                customers[review.reviewer_id]['high_ratings'] += 1
    
    # Calculate customer insights
    for customer_id, data in customers.items():
        if data['count'] == 1:
            insights['first_time_visitors'] += 1
        else:
            insights['repeat_customers'] += 1
            
        if data['count'] >= 2 and data['high_ratings'] >= 2:
            insights['loyal_customers'] += 1
    
    return jsonify({
        "customer_insights": insights
    }), 200