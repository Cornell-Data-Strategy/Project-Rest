import os
from google.cloud import language_v1
import csv
import json 
import matplotlib.pyplot as plt

# Replace with your service account key path
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = './service-account-key.json'

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


# returns the review with sentiment_score and sentiment_description
# score range is inclusive [-1,1]
# sentinment description is positive, negative, or netural
def tag_review(review):
    # check if review has content
    # if content use google nlp averaged with star rating to give score
    map = [-0.9, -0.7, 0, 0.7, 0.9]
    rating = review["rating"]
    value_star= map[rating-1]
    if review.get("content") and len(review["content"])>0:
        content = review["content"]
        result = analyze_sentiment(content)
        value_content = result["sentiment_score"]
        value = (value_content+value_star)/2
    # if not content use stars to give
    else:
        value = value_star
    sentiment_description = "Positive" if value > 0 else "Negative" if value < 0 else "Neutral"
    review["score"] = value
    review["sentiment_description"] = sentiment_description
    return review


# returns the review with topics
def get_topics(review):
    if review.get("content") and len(review["content"])>0:
        content = review["content"]
        result = analyze_sentiment(content)
        entities = result["entities"]
        sorted_entities = sorted(entities, key=lambda e: e[2], reverse=True)
        if len(sorted_entities)>3:
            topics = [e[0] for e in sorted_entities[0:3]]
        else:
            topics = entity_names = [e[0] for e in sorted_entities]
        review["topics"] = topics
    return review

def is_suggestion(review):
    pass


#help function to use google NLP
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
    "content": "The food is okay, but the location is good and it could taste better and slow service but good cake.",
    "rating": 5,
    "retrieved_at": str,
    "review_date": str,
    "time_period_code": int,
    "relative_date_original": str,
    "username": str,
    "user_review_count": str,
    "user_profile_url": str
}




answer = get_topics(data)
print(answer)
