from backend.models.database import db
from datetime import datetime, timezone


class Review(db.Model):
    __tablename__ = "review"
    """Data model for a review from any platform"""
    id = db.Column(db.Integer, primary_key=True)
    source = db.Column(db.String(50), nullable=False)
    content = db.Column(db.Text, nullable=True)  # for empty reviews i guess
    rating = db.Column(db.Float, nullable=True)
    retrieved_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    # right now we are scrape a relative data, for example 'a month ago'
    # so we need a function that will convert this to a date
    review_date = db.Column(db.Integer, nullable=True)

    username = db.Column(db.String(50), nullable=True)

    # their account review count
    user_review_count = db.Column(db.Integer, nullable=True)

    # account page
    user_profile_url = db.Column(db.String(255), nullable=True)

    business_id = db.Column(db.Integer, db.ForeignKey("business.id"), nullable=False)
    business_ref = db.relationship("Business", back_populates="reviews")

    # sentiment score
    senti_score = db.Column(db.Float, nullable=False)

    sentiment_magnitude = db.Column(db.Float, nullable=False)

    # positive, negative, neutral
    sentiment_description = db.Column(db.String(50), nullable=False)
    # check
    is_suggestion = db.Column(db.Boolean, nullable=False)
    # topics that the review focuses on, maximum 3 topics
    topics = db.Column(db.String, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'source': self.source,
            'content': self.content,
            'rating': self.rating,
            'retrieved_at': self.retrieved_at,
            'review_date': self.review_date,
            'username': self.username,
            'user_review_count': self.user_review_count,
            'user_profile_url': self.user_profile_url,
            'business_id': self.business_id,
            'senti_score': self.senti_score,
            'is_suggestion': self.is_suggestion,
            'topics': self.topics
        }