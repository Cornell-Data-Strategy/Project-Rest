from flask import Blueprint, request, jsonify
from backend.models.database import db
from backend.models.user import User
from backend.models.review import Review
from flask_jwt_extended import create_access_token
from datetime import datetime, timezone
from backend.models.business import Business
from backend.services.scraper import scrape_reviews_for_business
from backend.services.review import process_reviews
auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    """Authenticate user and return access token"""
    data = request.get_json()
    

    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Missing required fields'}), 400
    
    user = User.query.filter_by(email=data['email']).first()
    if not user or not user.check_password(data['password']):
        return jsonify({'error': 'Invalid email or password'}), 401
    
    access_token = create_access_token(identity=user.id)

    
    return jsonify({
    'token': access_token,
    'user': user.to_dict()  
    }), 200


@auth_bp.route('/register', methods=['POST'])
def register():
    """Register new user and business"""
    data = request.get_json()
    
    if not data or not data.get('email') or not data.get('password') or not data.get('first_name') or not data.get('last_name'):
        return jsonify({'error': 'Missing required user fields'}), 400
    
    if not data.get('business') or not data.get('business').get('name') or not data.get('business').get('url'):
        return jsonify({'error': 'Missing required business fields'}), 400
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'User with this email already exists'}), 409
    
    try:
        new_user = User(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            created_at=datetime.now(timezone.utc)
        )
        new_user.set_password(data['password'])

        # adding new_user to the session and flush so its ID gets generated.
        db.session.add(new_user)
        db.session.flush()

        business_data = data.get('business')
        new_business = Business(
            name=business_data['name'],
            url=business_data['url'],
            location=business_data.get('location'),
            business_type=business_data.get('business_type'),
            user_id=new_user.id
        )

        # adding and flush new_business to generate its id
        db.session.add(new_business)
        db.session.flush()
        
        # query the reviews HERE
        try:
            print("scraping reviews")
            scraped_data = scrape_reviews_for_business(business_data['url'])
            # pass this to a function
            reviews_data = scraped_data.get('reviews', [])
        except Exception as scrape_error:
            # Log the error but continue with registration
            print(f"Error scraping reviews: {scrape_error}")
            reviews_data = []  # Empty list if scraping fails
        
        # process the reviews
        print("processing the reviews")
        #process_reviews(reviews_data, new_business.id)
        db.session.commit()

        return jsonify({
            'message': 'Registration successful',
            'user': new_user.to_dict(),
            'business': new_business.to_dict()
        }), 201

    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({'error': 'Something went wrong'}), 500