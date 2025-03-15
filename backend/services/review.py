# this file should process the scrapped reviews by adding the appropriate tags and topics,
#  then should should also have a method to send batch of reviews to deepseek and get a summar

from google.cloud import language_v1
from datetime import datetime, timezone
from backend.models.review import Review
from backend.models.database import db

import random
import os
import time
import pickle

with open('services/suggestion_detector.pkl', 'rb') as f:
    suggestion_detector = pickle.load(f)


def process_reviews(reviews_data, business_id):
    """Process scraped reviews and add them to the database.
    
    Args:
        reviews_data: A list of dictionaries containing review data
        business_id: The ID of the business to associate with the reviews
    """
    print(f"Starting to process {len(reviews_data)} reviews")

    
    for review_data in reviews_data:  
        #print(f"Processing review: {review_data}")  
        try:

            # Create new review object
            new_review = Review(
                source=review_data.get('source', 'Google'),
                content=review_data.get('content', ''),
                rating=review_data.get('rating', 0.0),
                retrieved_at=review_data.get('retrieval_date', datetime.now(timezone.utc)),
                review_date=review_data.get('time_period_code', 0),
                username=review_data.get('username', ''),
                user_review_count=review_data.get('n_review_user', 0),
                user_profile_url=review_data.get('user_profile_url', ''),
                review_date_estimate=review_data.get('review_date_estimate', datetime.now(timezone.utc)), 
                business_id=business_id

            )
            
            # Mock sentiment analysis
            new_review = analyze_sentiment_mock(new_review)
            
            try:
                if new_review.content:
                    content = new_review.content.lower().strip()   
                    is_suggestion = suggestion_detector.predict(content)
                    new_review.is_suggestion = is_suggestion
                else:
                    new_review.is_suggestion = False

            except Exception as predict_error:
                print(f"Error predicting suggestion: {predict_error}")
                new_review.is_suggestion = False

            
            db.session.add(new_review)
            
        except Exception as review_error:
            print(f"Error processing review: {review_error}")
    
    # Commit all reviews at once
    try:

        db.session.commit()
        print(f"Successfully committed  reviews to database")
    except Exception as commit_error:
        db.session.rollback()
        print(f"Error committing reviews to database: {commit_error}")



def analyze_sentiment(review):
    """
    Analyzes the sentiment of a given review and extracts the top entities.
    This function uses the Google Cloud Natural Language API to analyze the sentiment
    of the review content and extract entities. It then updates the review object with
    the sentiment score, sentiment magnitude, sentiment description, and top entities.
    Args:
        Review (object): An object representing the review. It must have a 'content' attribute
                         containing the text of the review.
    Returns:
        Review (updated): The updated review object with additional attributes
    """
    client = language_v1.LanguageServiceClient()
    
    document = language_v1.Document(
        content=review.content,
        type_=language_v1.Document.Type.PLAIN_TEXT
    )
    
    sentiment = client.analyze_sentiment(request={'document': document}).document_sentiment
    entities = client.analyze_entities(request={'document': document}).entities
    
    # Determine sentiment description based on sentiment score
    if sentiment.score > 0.25:
        sentiment_description = "Positive"
    elif sentiment.score < -0.25:
        sentiment_description = "Negative"
    else:
        sentiment_description = "Neutral"
    
    # Extract top 3 entities
    top_entities = [(entity.name, entity.type_.name, entity.salience) for entity in entities[:3]]
    
    # Add sentiment analysis fields to the review object
    review.senti_score = sentiment.score
    review.sentiment_magnitude = sentiment.magnitude
    review.sentiment_description = sentiment_description
    review.topics = ', '.join([entity[0] for entity in top_entities])
    
    return review


def analyze_sentiment_mock(review):
    """
    Mock function to analyze the sentiment of a given review and extract the top entities.
    This function generates random sentiment scores, magnitudes, descriptions, and topics.
    Args:
        Review (object): An object representing the review. It must have a 'content' attribute
                         containing the text of the review.
    Returns:
        Review (updated): The updated review object with additional attributes
    """
    # Generate random sentiment score and magnitude
    sentiment_score = random.uniform(-1, 1)
    sentiment_magnitude = random.uniform(0, 2)

    # Determine sentiment description based on sentiment score
    if sentiment_score > 0.25:
        sentiment_description = "Positive"
    elif sentiment_score < -0.25:
        sentiment_description = "Negative"
    else:
        sentiment_description = "Neutral"

    # Generate random topics
    topics = ["service", "food", "ambiance", "price", "location"]
    top_entities = random.sample(topics, min(3, len(topics)))

    # Add sentiment analysis fields to the review object
    review.senti_score = sentiment_score
    review.sentiment_magnitude = sentiment_magnitude
    review.sentiment_description = sentiment_description
    review.topics = ', '.join(top_entities)

    return review