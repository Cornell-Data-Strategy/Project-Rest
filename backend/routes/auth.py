from flask import Blueprint, request, jsonify
from models.database import db
from models.user import User
from models.review import Review
from flask_jwt_extended import create_access_token
from datetime import datetime, timezone
from models.business import Business

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
        
        # fake reviews for now, later invoke the scraping from the utils
        reviews_data = [
            {
                'source': 'Google',
                'content': 'The best',
                'rating': 5.0,
                'retrieved_at': datetime(2025, 2, 28, 17, 21, 31, 818351, tzinfo=timezone.utc),
                'review_date': datetime(2025, 2, 23, tzinfo=timezone.utc),
                'username': 'coolguy78521',
                'user_review_count': 0,
                'user_profile_url': 'https://www.google.com/maps/contrib/108248640721491614783/reviews?hl=en'
            },
            {
                'source': 'Google',
                'content': 'Good',
                'rating': 5.0,
                'retrieved_at': datetime(2025, 2, 28, 17, 21, 31, 819834, tzinfo=timezone.utc),
                'review_date': datetime(2025, 2, 23, tzinfo=timezone.utc),
                'username': 'Yamil Hurtado',
                'user_review_count': 0,
                'user_profile_url': 'https://www.google.com/maps/contrib/105565421685024824085/reviews?hl=en'
            },
            {
                'source': 'Google',
                'content': 'Excellent pizza in NEW YORK and service',
                'rating': 5.0,
                'retrieved_at': datetime(2025, 2, 28, 17, 21, 31, 820172, tzinfo=timezone.utc),
                'review_date': datetime(2025, 2, 23, tzinfo=timezone.utc),
                'username': 'ABEL YAMIL HURTADO MAZON',
                'user_review_count': 1,
                'user_profile_url': 'https://www.google.com/maps/contrib/109084635403838943723/reviews?hl=en'
            },
            {
                'source': 'Google',
                'content': 'Very delicious and made me full. The staff were really nice and polite. Clean place with friendly faces. 10/10 would recommend',
                'rating': 5.0,
                'retrieved_at': datetime(2025, 2, 28, 17, 21, 31, 820502, tzinfo=timezone.utc),
                'review_date': datetime(2025, 2, 23, tzinfo=timezone.utc),
                'username': 'انس الشغدري',
                'user_review_count': 21,
                'user_profile_url': 'https://www.google.com/maps/contrib/103561383041732287970/reviews?hl=en'
            }
        ]

        for review_data in reviews_data:
            new_review = Review(
                source=review_data['source'],
                content=review_data['content'],
                rating=review_data['rating'],
                retrieved_at=review_data['retrieved_at'],
                review_date=review_data['review_date'],
                username=review_data['username'],
                user_review_count=review_data['user_review_count'],
                user_profile_url=review_data['user_profile_url'],
                business_id=new_business.id
            )
            db.session.add(new_review)
        
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