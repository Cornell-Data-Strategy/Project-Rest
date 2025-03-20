from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
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
    
    # Create JWT tokens
    access_token = create_access_token(identity=str(user.id))
    refresh_token = create_refresh_token(identity=str(user.id))
    
    return jsonify({
        'access_token': access_token,
        'refresh_token': refresh_token,
        'user': user.to_dict()
    })


@auth_bp.route('/logout', methods=['POST'])
def logout():
    return jsonify({'message': 'Logged out successfully'})


@auth_bp.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    current_user_id = get_jwt_identity()
    try:
        user_id = int(current_user_id)
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
            
        return jsonify(user.to_dict())
    except Exception as e:
        return jsonify({'error': f'Error retrieving user: {str(e)}'}), 500


@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    """Refresh the access token using refresh token"""
    current_user_id = get_jwt_identity()
    access_token = create_access_token(identity=current_user_id)
    return jsonify(access_token=access_token)


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
            reviews_data = []  # Empty list if scraping fails
        
        # process the reviews
        print("processing the reviews")
        process_reviews(reviews_data, new_business.id)
        db.session.commit()

        # Create tokens for new user
        access_token = create_access_token(identity=str(new_user.id))
        refresh_token = create_refresh_token(identity=str(new_user.id))

        return jsonify({
            'message': 'Registration successful',
            'access_token': access_token,
            'refresh_token': refresh_token,
            'user': new_user.to_dict(),
            'business': new_business.to_dict()
        }), 201

    except Exception as e:
        print(e)
        db.session.rollback()
        return jsonify({'error': 'Something went wrong'}), 500