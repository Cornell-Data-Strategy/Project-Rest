from flask import Blueprint, request, jsonify
from backend.models.database import db
from backend.models.business import Business
from backend.models.review import Review
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import func, desc
from datetime import datetime, timedelta
import json

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
    # Get current user
    current_user_id = get_jwt_identity()
    
    # Find the business and verify ownership
    business = Business.query.filter_by(id=business_id, user_id=current_user_id).first()
    if not business:
        return jsonify({"error": "Business not found or access denied"}), 404
    
    # Get reviews for this business
    reviews = Review.query.filter_by(business_id=business_id).all()
    
    # Calculate metrics
    review_count = len(reviews)
    
    # Calculate average rating
    ratings = [review.rating for review in reviews if review.rating is not None]
    avg_rating = sum(ratings) / len(ratings) if ratings else 0
    
    # Calculate overall sentiment score
    sentiment_scores = [review.senti_score for review in reviews]
    avg_sentiment = sum(sentiment_scores) / len(sentiment_scores) if sentiment_scores else 0
    
    # Find most mentioned topics
    topic_counts = {}
    for review in reviews:
        if review.topics:
            # Split topics if stored as comma-separated string
            if isinstance(review.topics, str):
                review_topics = review.topics.split(',')
            else:
                review_topics = [review.topics]
                
            for topic in review_topics:
                topic = topic.strip()
                if topic:
                    topic_counts[topic] = topic_counts.get(topic, 0) + 1
    
    most_mentioned_topic = None
    max_count = 0
    for topic, count in topic_counts.items():
        if count > max_count:
            most_mentioned_topic = topic
            max_count = count
    
    # Prepare response
    summary = {
        "business": {
            "id": business.id,
            "name": business.name,
            "business_type": business.business_type,
            "location": business.location
        },
        "review_count": review_count,
        "average_rating": round(avg_rating, 1),
        "overall_sentiment_score": round(avg_sentiment, 2),
        "most_mentioned_topic": most_mentioned_topic,
        "topic_counts": topic_counts
    }
    
    return jsonify(summary), 200

# Sentiment Analysis Section
@dashboard_bp.route('/business/<int:business_id>/sentiment/analysis', methods=['GET'])
@jwt_required()
def get_sentiment_analysis(business_id):
    """
    Get sentiment analysis data for visualization
    
    Query Params:
        period (str, optional): Time period for analysis (week, month, quarter, year)
    
    Returns:
        Sentiment trends and distribution data for visualization
    """
    # Get current user
    current_user_id = get_jwt_identity()
    
    # Find the business and verify ownership
    business = Business.query.filter_by(id=business_id, user_id=current_user_id).first()
    if not business:
        return jsonify({"error": "Business not found or access denied"}), 404
    
    # Get period from query params (default to month)
    period = request.args.get('period', 'month')
    
    # Set date range based on period
    now = datetime.now()
    if period == 'week':
        start_date = now - timedelta(days=7)
    elif period == 'month':
        start_date = now - timedelta(days=30)
    elif period == 'quarter':
        start_date = now - timedelta(days=90)
    elif period == 'year':
        start_date = now - timedelta(days=365)
    else:
        return jsonify({"error": "Invalid period specified"}), 400
    
    # Get reviews within the date range
    reviews = Review.query.filter(
        Review.business_id == business_id,
        Review.review_date_estimate >= start_date
    ).order_by(Review.review_date_estimate).all()
    
    # Sentiment over time data
    sentiment_trends = []
    time_buckets = {}
    
    # Generate time buckets based on period
    if period == 'week':
        # Daily buckets for week
        for i in range(7):
            bucket_date = now - timedelta(days=6-i)
            time_buckets[bucket_date.strftime('%Y-%m-%d')] = {
                'date': bucket_date.strftime('%Y-%m-%d'),
                'avg_sentiment': 0,
                'review_count': 0
            }
    elif period == 'month':
        # Weekly buckets for month
        for i in range(4):
            bucket_date = now - timedelta(days=28-i*7)
            time_buckets[bucket_date.strftime('%Y-%m-%d')] = {
                'date': bucket_date.strftime('%Y-%m-%d'),
                'avg_sentiment': 0,
                'review_count': 0
            }
    elif period == 'quarter':
        # Monthly buckets for quarter
        for i in range(3):
            bucket_date = now - timedelta(days=90-i*30)
            time_buckets[bucket_date.strftime('%Y-%m')] = {
                'date': bucket_date.strftime('%Y-%m'),
                'avg_sentiment': 0,
                'review_count': 0
            }
    else:  # year
        # Quarterly buckets for year
        for i in range(4):
            bucket_date = now - timedelta(days=365-i*90)
            time_buckets[bucket_date.strftime('%Y-Q%d' % ((bucket_date.month-1)//3+1))] = {
                'date': bucket_date.strftime('%Y-Q%d' % ((bucket_date.month-1)//3+1)),
                'avg_sentiment': 0,
                'review_count': 0
            }
    
    # Aggregate sentiment data into buckets
    for review in reviews:
        bucket_key = None
        review_date = review.review_date_estimate
        
        if period == 'week':
            bucket_key = review_date.strftime('%Y-%m-%d')
        elif period == 'month':
            # Find the closest weekly bucket
            for key in time_buckets:
                if abs((datetime.strptime(key, '%Y-%m-%d') - review_date).days) < 7:
                    bucket_key = key
                    break
        elif period == 'quarter':
            bucket_key = review_date.strftime('%Y-%m')
        else:  # year
            quarter = (review_date.month-1)//3+1
            bucket_key = review_date.strftime('%Y-Q%d' % quarter)
        
        if bucket_key in time_buckets:
            bucket = time_buckets[bucket_key]
            bucket['avg_sentiment'] = (bucket['avg_sentiment'] * bucket['review_count'] + review.senti_score) / (bucket['review_count'] + 1)
            bucket['review_count'] += 1
    
    # Convert buckets to list for response
    sentiment_trends = list(time_buckets.values())
    
    # Sentiment distribution data
    sentiment_distribution = {
        'positive': 0,
        'neutral': 0,
        'negative': 0
    }
    
    for review in reviews:
        sentiment = review.sentiment_description.lower()
        if sentiment in sentiment_distribution:
            sentiment_distribution[sentiment] += 1
    
    # Prepare response
    analysis = {
        "sentiment_trends": sentiment_trends,
        "sentiment_distribution": sentiment_distribution,
        "total_reviews": len(reviews),
        "period": period
    }
    
    return jsonify(analysis), 200

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
    # Get current user
    current_user_id = get_jwt_identity()
    
    # Find the business and verify ownership
    business = Business.query.filter_by(id=business_id, user_id=current_user_id).first()
    if not business:
        return jsonify({"error": "Business not found or access denied"}), 404
    
    # Get limit from query params (default to 5)
    try:
        limit = int(request.args.get('limit', 5))
    except ValueError:
        limit = 5
    
    # Get most recent reviews
    reviews = Review.query.filter_by(business_id=business_id).order_by(
        Review.review_date_estimate.desc()
    ).limit(limit).all()
    
    # Format reviews for response
    recent_reviews = []
    for review in reviews:
        recent_reviews.append({
            "id": review.id,
            "content": review.content,
            "rating": review.rating,
            "source": review.source,
            "review_date": review.review_date_estimate,
            "username": review.username,
            "sentiment_score": review.senti_score,
            "sentiment_description": review.sentiment_description,
            "topics": review.topics,
            "is_suggestion": review.is_suggestion
        })
    
    return jsonify({"reviews": recent_reviews}), 200

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
    # Get current user
    current_user_id = get_jwt_identity()
    
    # Find the business and verify ownership
    business = Business.query.filter_by(id=business_id, user_id=current_user_id).first()
    if not business:
        return jsonify({"error": "Business not found or access denied"}), 404
    
    # Get period from query params (default to all time)
    period = request.args.get('period', 'all')
    
    # Set date range based on period
    now = datetime.now()
    if period == 'week':
        start_date = now - timedelta(days=7)
    elif period == 'month':
        start_date = now - timedelta(days=30)
    elif period == 'quarter':
        start_date = now - timedelta(days=90)
    elif period == 'year':
        start_date = now - timedelta(days=365)
    elif period == 'all':
        start_date = datetime(1970, 1, 1)  # earliest possible date
    else:
        return jsonify({"error": "Invalid period specified"}), 400
    
    # Get reviews within the date range
    reviews = Review.query.filter(
        Review.business_id == business_id,
        Review.review_date_estimate >= start_date
    ).all()
    
    # Initialize rating distribution
    distribution = {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0
    }
    
    # Count reviews by rating
    for review in reviews:
        if review.rating is not None:
            # Round to nearest integer and convert to string
            rating_key = str(round(review.rating))
            if rating_key in distribution:
                distribution[rating_key] += 1
    
    # Calculate total reviews
    total_reviews = sum(distribution.values())
    
    # Calculate percentages
    percentages = {}
    for rating, count in distribution.items():
        percentages[rating] = round((count / total_reviews * 100), 1) if total_reviews > 0 else 0
    
    # Prepare response
    response = {
        "distribution": distribution,
        "percentages": percentages,
        "total_reviews": total_reviews,
        "period": period
    }
    
    return jsonify(response), 200

# Review Segmentation Section
@dashboard_bp.route('/business/<int:business_id>/reviews/segments', methods=['GET'])
@jwt_required()
def get_review_segments(business_id):
    """
    Get review segmentation data
    
    Returns:
        Categorized segments of reviews (Highly Positive, Regular Visitor, etc.)
    """
    # Get current user
    current_user_id = get_jwt_identity()
    
    # Find the business and verify ownership
    business = Business.query.filter_by(id=business_id, user_id=current_user_id).first()
    if not business:
        return jsonify({"error": "Business not found or access denied"}), 404
    
    # Get all reviews for this business
    reviews = Review.query.filter_by(business_id=business_id).all()
    
    # Define segments
    segments = {
        "highly_positive": {
            "name": "Highly Positive",
            "description": "Reviews with 5-star ratings and positive sentiment",
            "reviews": []
        },
        "generally_positive": {
            "name": "Generally Positive",
            "description": "Reviews with 4-star ratings and positive/neutral sentiment",
            "reviews": []
        },
        "mixed": {
            "name": "Mixed Feedback",
            "description": "Reviews with 3-star ratings or neutral sentiment",
            "reviews": []
        },
        "critical": {
            "name": "Critical",
            "description": "Reviews with low ratings (1-2 stars) or negative sentiment",
            "reviews": []
        },
        "suggestions": {
            "name": "Suggestions",
            "description": "Reviews containing improvement suggestions",
            "reviews": []
        }
    }
    
    # Categorize reviews into segments
    for review in reviews:
        review_dict = {
            "id": review.id,
            "content": review.content,
            "rating": review.rating,
            "sentiment_score": review.senti_score,
            "review_date": review.review_date_estimate,
            "username": review.username
        }
        
        # Add to suggestions segment if flagged
        if review.is_suggestion:
            segments["suggestions"]["reviews"].append(review_dict)
        
        # Categorize based on rating and sentiment
        if review.rating is not None:
            if review.rating >= 4.5 and review.sentiment_description.lower() == "positive":
                segments["highly_positive"]["reviews"].append(review_dict)
            elif review.rating >= 3.5 and review.sentiment_description.lower() in ["positive", "neutral"]:
                segments["generally_positive"]["reviews"].append(review_dict)
            elif review.rating >= 2.5 or review.sentiment_description.lower() == "neutral":
                segments["mixed"]["reviews"].append(review_dict)
            else:
                segments["critical"]["reviews"].append(review_dict)
        else:
            # If no rating, categorize based on sentiment only
            sentiment = review.sentiment_description.lower()
            if sentiment == "positive":
                segments["generally_positive"]["reviews"].append(review_dict)
            elif sentiment == "neutral":
                segments["mixed"]["reviews"].append(review_dict)
            elif sentiment == "negative":
                segments["critical"]["reviews"].append(review_dict)
    
    # Add counts to each segment
    for segment_key, segment in segments.items():
        segment["count"] = len(segment["reviews"])
        # Limit reviews to 5 most recent for response
        segment["reviews"] = sorted(segment["reviews"], 
                                   key=lambda x: x["review_date"], 
                                   reverse=True)[:5]
    
    return jsonify({"segments": segments}), 200

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
    # Get current user
    current_user_id = get_jwt_identity()
    
    # Find the business and verify ownership
    business = Business.query.filter_by(id=business_id, user_id=current_user_id).first()
    if not business:
        return jsonify({"error": "Business not found or access denied"}), 404
    
    # Get limit from query params (default to 5)
    try:
        limit = int(request.args.get('limit', 5))
    except ValueError:
        limit = 5
    
    # Get all reviews for this business
    reviews = Review.query.filter_by(business_id=business_id).all()
    
    # Sort reviews by a combination of recency, low rating, and negative sentiment
    def critical_score(review):
        # Reviews with lower ratings and sentiment scores should rank higher
        # More recent reviews should also rank higher
        rating_factor = 5 - (review.rating or 3)  # Default to 3 if None
        sentiment_factor = 1 - review.senti_score
        
        # Calculate days since review (more recent = higher score)
        days_ago = (datetime.now() - review.review_date_estimate).days
        recency_factor = max(0, 365 - days_ago) / 365  # Scale to 0-1, higher for more recent
        
        # Combine factors (weighted sum)
        return (0.4 * rating_factor) + (0.4 * sentiment_factor) + (0.2 * recency_factor)
    
    # Sort reviews by critical score
    critical_reviews = sorted(reviews, key=critical_score, reverse=True)[:limit]
    
    # Format reviews for response
    result = []
    for review in critical_reviews:
        result.append({
            "id": review.id,
            "content": review.content,
            "rating": review.rating,
            "source": review.source,
            "review_date": review.review_date_estimate,
            "username": review.username,
            "sentiment_score": review.senti_score,
            "sentiment_description": review.sentiment_description,
            "topics": review.topics,
            "critical_score": critical_score(review)
        })
    
    return jsonify({"critical_reviews": result}), 200

# Topic-specific Ratings
@dashboard_bp.route('/business/<int:business_id>/topics/ratings', methods=['GET'])
@jwt_required()
def get_topic_ratings(business_id):
    """
    Get ratings for specific business topics. Query the db for all topics and return 
    the top 5 most mentioned ones. Then query the db for the ratings for
    each of the top 5 topics and return the average rating for each of the top 5 topics.
    
    Returns:
        Ratings for key topics (Food Quality, Service, Price, Cleanliness, Waittime)
    """
    # Get current user
    current_user_id = get_jwt_identity()
    
    # Find the business and verify ownership
    business = Business.query.filter_by(id=business_id, user_id=current_user_id).first()
    if not business:
        return jsonify({"error": "Business not found or access denied"}), 404
    
    # Get all reviews for this business
    reviews = Review.query.filter_by(business_id=business_id).all()
    
    # Count topic mentions and track ratings
    topic_counts = {}
    topic_ratings = {}
    topic_sentiment = {}
    
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
            
            # Update topic ratings
            if review.rating is not None:
                if topic not in topic_ratings:
                    topic_ratings[topic] = []
                topic_ratings[topic].append(review.rating)
            
            # Update topic sentiment
            if topic not in topic_sentiment:
                topic_sentiment[topic] = []
            topic_sentiment[topic].append(review.senti_score)
    
    # Get top 5 topics by mention count
    top_topics = sorted(topic_counts.items(), key=lambda x: x[1], reverse=True)[:5]
    
    # Calculate average ratings and sentiment for top topics
    topic_analysis = []
    for topic, count in top_topics:
        ratings = topic_ratings.get(topic, [])
        avg_rating = sum(ratings) / len(ratings) if ratings else None
        
        sentiments = topic_sentiment.get(topic, [])
        avg_sentiment = sum(sentiments) / len(sentiments) if sentiments else None
        
        topic_analysis.append({
            "topic": topic,
            "mention_count": count,
            "average_rating": round(avg_rating, 1) if avg_rating is not None else None,
            "average_sentiment": round(avg_sentiment, 2) if avg_sentiment is not None else None,
            "review_count": len(ratings)
        })
    
    # Prepare response
    response = {
        "top_topics": topic_analysis,
        "total_reviews": len(reviews)
    }
    
    return jsonify(response), 200