from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required, current_user
from backend.models.database import db
from backend.models.user import User
from backend.models.review import Review
from datetime import datetime, timezone
from backend.models.business import Business
from backend.services.scraper import scrape_reviews_for_business
from backend.services.review import process_reviews
auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/login', methods=['POST'])
def login():
    """Authenticate user and return access token"""
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    user = User.query.filter_by(email=email).first()
    if user is None or not user.check_password(password):
        return jsonify({'error': 'Invalid email or password'}), 401
    
    # Log in user with Flask-Login
    login_user(user, remember=True)
    
    # Return user info without JWT token (session cookie is used)
    return jsonify({
        'user': user.to_dict()
    })


@auth_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'})


@auth_bp.route('/user', methods=['GET'])
@login_required
def get_user():
    return jsonify(current_user.to_dict())


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
        
      
        try:
            print("scraping reviews")
            scraped_data = scrape_reviews_for_business(business_data['url'])
            reviews_data = scraped_data.get('reviews', [])
        except Exception as scrape_error:
            print(f"Error scraping reviews: {scrape_error}")
            return jsonify({'error': 'Error scraping reviews'}), 500
            reviews_data = []  # Empty list if scraping fails
        
        # process the reviews
        print("processing the reviews")
        process_reviews(reviews_data, new_business.id)
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