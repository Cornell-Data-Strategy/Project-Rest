from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from flask_migrate import Migrate
import os
from datetime import timedelta
from backend.routes.user import user_bp
from backend.routes.dashboard import dashboard_bp
import datetime

print(datetime.datetime.now())
from flask_jwt_extended import JWTManager

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


def create_app(config_name="development"):
    """Create and configure the Flask application"""
    app = Flask(__name__)

    # Configure the app
    app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-secret-key")
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project_rest.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = os.environ.get(
        "JWT_SECRET_KEY", "dev-jwt-secret-key"
    )
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)  # token expiration
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(
        days=30
    )  # refresh token expiration
    app.config["GOOGLE_CLOUD_API_KEY"] = os.environ.get(
        "GOOGLE_CLOUD_API_KEY", "dev-google-cloud-api-key"
    )
    app.config["SESSION_COOKIE_HTTPONLY"] = True
    app.config["SESSION_COOKIE_SECURE"] = False  # Set to True in production
    app.config["SESSION_COOKIE_SAMESITE"] = "Lax"  # 'Strict' in production
    app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(days=7)

    # Enable CORS for specific origin
    frontend_origin = os.environ.get(
        "FRONTEND_ORIGIN", "http://localhost:5173"
    )  # Frontend origin from .env
    CORS(
        app,
        resources={
            r"/*": {
                "origins": frontend_origin,
                "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
                "allow_headers": ["Content-Type", "Authorization"],
                "supports_credentials": True,
            }
        },
    )

    # Initialize database
    init_db(app)

    migrate = Migrate(app, db)

    # Initialize JWT
    jwt = JWTManager(app)

    # Register blueprints of the other route
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(business_bp, url_prefix="/api/business")
    app.register_blueprint(reviews_bp, url_prefix="/api/reviews")
    app.register_blueprint(analytics_bp, url_prefix="/api/analytics")
    app.register_blueprint(ping_bp, url_prefix="/api")
    app.register_blueprint(user_bp, url_prefix="/api/user")
    app.register_blueprint(dashboard_bp, url_prefix="/api/dashboard")

    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({"error": "Not found"}), 404

    @app.errorhandler(500)
    def server_error(error):
        return jsonify({"error": "Internal server error"}), 500

    @app.route("/")
    def index():
        return jsonify(
            {"message": " Project REST API", "version": "0.1.0", "status": "online"}
        )

    return app


app = create_app()


with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True, port=8000)
