from datetime import datetime, timedelta, timezone
from flask import Blueprint, request, jsonify
from backend.services.scraper import scrape_reviews_for_business
from backend.services.llm import process_reviews
from backend.models.database import db
from backend.models.review import Review
from openai import OpenAI
import os

reviews_bp = Blueprint('reviews', __name__)

@reviews_bp.route('/analyze_reviews', methods=['POST'])
def analyze_reviews():
    """Analyze a batch of reviews using Google NLP"""
    data = request.get_json()
    reviews = data.get('reviews', [])
    results = process_reviews(reviews)
    return jsonify(results)

# @reviews_bp.route('/scrape', methods=['POST'])
# def initiate_scraping():
#     """Initiate review scraping for a business URL across specified platforms"""
#     data = request.get_json()
#     business_url = data.get('business_url')
#     platforms = data.get('platforms', ['google', 'yelp'])
#     # Function logic here
#     return jsonify({'job_id': 'scraping_job_id'})



@reviews_bp.route('/<int:business_id>', methods=['GET'])
def get_reviews(business_id):
    """Get reviews for a business with optional filters"""
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    platform = request.args.get('platform')
    # Function logic here
    return jsonify({'reviews': []})



OPENROUTER_API_KEY = "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"

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENROUTER_API_KEY,
)

TIMEFRAMES = {
    'last week': timedelta(weeks=1),
    'last month': timedelta(days=30),
    'last six month': timedelta(days=182),
    'last year': timedelta(days=365),
}


@reviews_bp.route('/<int:business_id>/summary', methods=['GET'])
def summarize_reviews_by_timeframe(business_id):
    """Generate review summary for a business based on a timeframe"""
    timeframe = request.args.get('timeframe', '').lower()

    if timeframe not in TIMEFRAMES:
        return jsonify({"error": "Invalid timeframe. Use one of: 'last week', 'last month', 'last six month', 'last year'"}), 400

    since_date = datetime.now(timezone.utc) - TIMEFRAMES[timeframe]

    reviews = Review.query.filter(
        Review.business_id == business_id,
        Review.review_date_estimate >= since_date
    ).all()

    if not reviews:
        return jsonify({"message": "No reviews found in this timeframe."})

    #prompt
    prompt_text = "Give a one paragraph summary analyzing the following restaurant reviews to provide insights on common complaints, suggestions for improvement, and recurring themes:\n\n"
    for review in reviews:
        content = review.content or "[No Content]"
        sentiment = review.sentiment_description or "unknown"
        prompt_text += f"Review: {content}\nSentiment: {sentiment}\n\n"

    # Call OpenRouter DeepSeek R1
    try:
        completion = client.chat.completions.create(
            extra_body={},
            model="deepseek/deepseek-r1:free",
            messages=[
                {"role": "system", "content": "You are a restaurant owner wanting to understand insights on customer feedback."},
                {"role": "user", "content": prompt_text},
            ]
        )

        analysis = completion.choices[0].message.content
        return jsonify({"analysis": analysis})

    except Exception as e:
        return jsonify({"error": f"Failed to generate summary: {str(e)}"}), 500