from backend.models.database import db
from datetime import datetime

class Review(db.Model):
    """Data model for a review from any platform"""
    id = db.Column(db.Integer, primary_key=True)
    source = db.Column(db.String(50), nullable=False)  # e.g., 'Yelp', 'Google'
    content = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Float, nullable=True)
    date_posted = db.Column(db.DateTime, default=datetime.utcnow)
    business_id = db.Column(db.Integer, db.ForeignKey('business.id'), nullable=False)
    business = db.relationship('Business', back_populates='reviews')