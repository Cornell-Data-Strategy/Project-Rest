from backend.models.database import db
from datetime import datetime, timezone

class Insight(db.Model):
    __tablename__ = 'insight'
    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey('business.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            'id': self.id,
            'business_id': self.business_id,
            'content': self.content,
            'created_at': self.created_at,
        }
