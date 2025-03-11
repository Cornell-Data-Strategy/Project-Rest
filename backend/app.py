from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
import os

load_dotenv()

from backend.models.database import db, init_db
from backend.models.business import Business
from backend.models.review import Review
from backend.models.user import User

# Import routes
from backend.routes.auth import auth_bp
from backend.routes.businesses import business_bp
from backend.routes.reviews import reviews_bp
from backend.routes.analytics import analytics_bp
from backend.routes.ping import ping_bp

def create_app(config_name='development'):
    """Create and configure the Flask application"""
    app = Flask(__name__)
    
    # Configure the app
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key')
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///project_rest.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'dev-jwt-secret-key')
    app.config['GOOGLE_CLOUD_API_KEY'] = os.environ.get('GOOGLE_CLOUD_API_KEY', 'dev-google-cloud-api-key')
    
    # Enable CORS
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    CORS(app, supports_credentials=True)
    
    # Initialize JWT
    jwt = JWTManager(app)
    
    # Initialize database
    init_db(app)

    migrate = Migrate(app, db)
    
    # Register blueprints of the other route
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(business_bp, url_prefix='/api/businesses')
    app.register_blueprint(reviews_bp, url_prefix='/api/reviews')
    app.register_blueprint(analytics_bp, url_prefix='/api/analytics')
    app.register_blueprint(ping_bp, url_prefix='/api')

    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Not found'}), 404
    
    @app.errorhandler(500)
    def server_error(error):
        return jsonify({'error': 'Internal server error'}), 500
    
   
    @app.route('/')
    def index():
        return jsonify({
            'message': ' Project REST API',
            'version': '0.1.0',
            'status': 'online'
        })
    
    return app


app = create_app()

if __name__ == '__main__':
    app.run(debug=True, port=8000)