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