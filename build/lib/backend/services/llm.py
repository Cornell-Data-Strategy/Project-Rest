from datetime import datetime
from google.cloud import language_v1
from backend.models.review import Review
from backend.models.database import db
from flask import current_app

def analyze_sentiment(text_content):
    client = language_v1.LanguageServiceClient(
        client_options={"api_key": current_app.config['GOOGLE_CLOUD_API_KEY']}
    )
    
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

def process_reviews(reviews):
    results = []

    for review in reviews:
        analysis = analyze_sentiment(review['content'])

        # Handle null values for retrieved_at and review_date
        if review['retrieved_at']:
            retrieved_at = datetime.strptime(review['retrieved_at'], '%Y-%m-%dT%H:%M:%SZ')
        else:
            retrieved_at = None

        if review['review_date']:
            review_date = datetime.fromisoformat(review['review_date'])
            review_date_timestamp = int(review_date.strftime('%s'))
        else:
            review_date_timestamp = None

        review_entry = Review(
            source=review['source'],
            content=review['content'],
            rating=review['rating'],
            retrieved_at=retrieved_at,
            review_date=review_date_timestamp,
            username=review['username'],
            user_review_count=review['user_review_count'],
            user_profile_url=review['user_profile_url'],
            business_id=review['business_id'],
            senti_score=analysis['sentiment_score'],
            is_suggestion=False,  # default value TODO update this
            topics=','.join([entity[0] for entity in analysis['entities'][:3]])  # top 3 ranked topics
        )
        db.session.add(review_entry)
        review_dict = review_entry.to_dict()
        review_dict.update({
            'senti_score': analysis['sentiment_score'],
            'topics': ','.join([entity[0] for entity in analysis['entities'][:3]])
        })
        results.append(review_dict)

    db.session.commit()
    return results

def summarize_reviews(reviews):
    summaries = []
    for review in reviews:
        summary = "" # TODO Implement LLM summarization
        summaries.append(summary)
    return summaries

def highlight_reviews(reviews):
    highlights = []
    for review in reviews:
        # TODO Implement LLM highlight extraction
        highlight = ""
        highlights.append(highlight)
    return highlights