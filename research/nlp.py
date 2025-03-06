import os
from google.cloud import language_v1
import csv
import json 
import matplotlib.pyplot as plt

def batch_analyze_reviews(reviews):
    """
    Process reviews in batches to improve performance when calling Google NLP API.
    
    Args:
        reviews (list): List of review dictionaries with source, content, rating, etc.
                        Format: {
                            "source": str,
                            "content": str,
                            "rating": float,
                            "retrieved_at": str,
                            "review_date": str,
                            "time_period_code": int,
                            "relative_date_original": str,
                            "username": str,
                            "user_review_count": str,
                            "user_profile_url": str
                        }
    
    Returns:
        list: Processed review data with additional fields:
              - sentiment_score: float, rounded to second decimal place
              - sentiment_description: str ("Positive", "Negative", or "Neutral")
              - topics: list of identified topics
              - contains_suggestion: bool
    """
   # TODO
   # use helper functions to process
    pass


# returns the review with sentiment score
# score range is inclusive [-1,1]
def tag_review(review):
    # check if review has content
    # if not content use stars to give

    # if content use google nlp to give score
    pass


def is_suggestion(review):
    pass



def analyze_sentiment(text_content):
    client = language_v1.LanguageServiceClient()
    
    document = language_v1.Document(
        content=text_content,
        type_=language_v1.Document.Type.PLAIN_TEXT
    )
    
    sentiment = client.analyze_sentiment(request={'document': document}).document_sentiment
    entities = client.analyze_entities(request={'document': document}).entities
    
    sentiment_description = "Positive" if sentiment.score > 0 else "Negative" if sentiment.score < 0 else "Neutral"
    
    return {
        'sentiment_score': sentiment.score,
        'sentiment_magnitude': sentiment.magnitude,
        'sentiment_description': sentiment_description,
        'entities': [(entity.name, entity.type_.name, entity.salience) for entity in entities]
    }





data =   {
    "source": str,
    "content": str,
    "rating": float,
    "retrieved_at": str,
    "review_date": str,
    "time_period_code": int,
    "relative_date_original": str,
    "username": str,
    "user_review_count": str,
    "user_profile_url": str
}

data =   {
    "source": str,
    "content": str,
    "rating": float,
    "retrieved_at": str,
    "review_date": str,
    "time_period_code": int,
    "relative_date_original": str,
    "username": str,
    "user_review_count": str,
    "user_profile_url": str,
    "score": 1
}

