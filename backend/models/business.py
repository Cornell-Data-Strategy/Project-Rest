from backend.models.database import db

class Business(db.Model):
    """Data model for a business entity"""
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=True)
    business_type = db.Column(db.String(50), nullable=True)
    reviews = db.relationship('Review', backref='business', lazy=True)