from models.database import db

class Business(db.Model):
    """Data model for a business entity"""
    __tablename__ = 'business'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=True)
    business_type = db.Column(db.String(50), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    reviews = db.relationship('Review', back_populates='business_ref', lazy=True)
    user = db.relationship('User', back_populates='businesses')

    def to_dict(self):
        """Convert business model to dictionary"""
        return {
            'id': self.id,
            'name': self.name,
            'url': self.url,
            'location': self.location,
            'business_type': self.business_type,
        }