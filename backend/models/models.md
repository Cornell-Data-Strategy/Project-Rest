# Project REST - Database Models Documentation

This document provides details about the database models used in Project REST, a tool for analyzing restaurant reviews from various platforms using natural language processing.

## Overview

Project REST uses SQLAlchemy as the ORM (Object-Relational Mapping) with Flask-SQLAlchemy extension to manage database operations. The models represent the core data structures of the application:

1. **User** - Authentication and business ownership
2. **Business** - Restaurant or hospitality business data
3. **Review** - Customer reviews from various platforms

## Database Initialization

Database connection is initialized in the `database.py` module:

```python
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()

def init_db(app):
    """Initialize database connection and create tables if needed"""
    db.init_app(app)  
    migrate.init_app(app, db)  
    
    with app.app_context():
        db.create_all()
        print("Database tables created successfully")
```

The `init_db` function should be called from your Flask application's initialization to set up the database connection and create tables.

## User Model

The User model handles authentication and business ownership.

```python
class User(db.Model):
    __tablename__ = 'user'
    """User model for authentication"""
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), index=True, unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    businesses = db.relationship('Business', back_populates='user', lazy=True)
```

### Fields:
- `id`: Unique identifier
- `first_name`: User's first name
- `last_name`: User's last name
- `email`: Email address (unique, indexed)
- `password_hash`: Securely stored password hash
- `created_at`: UTC timestamp of account creation
- `businesses`: Relationship to businesses owned by this user

### Methods:
- `set_password(password)`: Securely hash and store password
- `check_password(password)`: Verify password against stored hash
- `to_dict()`: Convert user data to dictionary for API responses

## Business Model

The Business model represents a restaurant or hospitality business.

```python
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
```

### Fields:
- `id`: Unique identifier
- `name`: Business name
- `url`: Business website or online listing URL
- `location`: Physical address or location description
- `business_type`: Category (e.g., "Restaurant", "Cafe", "Bar")
- `user_id`: Foreign key to the owner user
- `reviews`: Relationship to reviews for this business
- `user`: Relationship to the user who owns this business

### Methods:
- `to_dict()`: Convert business data to dictionary for API responses

## Review Model

The Review model stores customer reviews collected from various platforms.

```python
class Review(db.Model):
    __tablename__ = 'review'
    """Data model for a review from any platform"""
    id = db.Column(db.Integer, primary_key=True)
    source = db.Column(db.String(50), nullable=False)  
    content = db.Column(db.Text, nullable=True)
    rating = db.Column(db.Float, nullable=True) 
    retrieved_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    review_date = db.Column(db.Integer, nullable=True) 
    username = db.Column(db.String(50), nullable=True)
    user_review_count = db.Column(db.Integer, nullable=True)
    user_profile_url = db.Column(db.String(255), nullable=True)
    business_id = db.Column(db.Integer, db.ForeignKey('business.id'), nullable=False)
    business_ref = db.relationship('Business', back_populates='reviews')
```

### Fields:
- `id`: Unique identifier
- `source`: Platform source (e.g., "Google", "Yelp")
- `content`: Review text content
- `rating`: Numerical rating (e.g., 1-5 stars)
- `retrieved_at`: UTC timestamp when review was retrieved
- `review_date`: Time Period Code (see below)
- `username`: Reviewer's username or display name
- `user_review_count`: Number of reviews by this user
- `user_profile_url`: Link to reviewer's profile page
- `business_id`: Foreign key to the business being reviewed
- `business_ref`: Relationship to the business being reviewed

### Methods:
- `to_dict()`: Convert review data to dictionary for API responses

## Time Period Code System

The `review_date` field uses a numeric encoding system to represent relative time expressions commonly found in review platforms (e.g., "3 months ago", "a year ago").

### Code Structure

Each Time Period Code is a 2-digit integer with the following structure:
```
[Unit Code][Quantity]
```

#### Unit Codes (First Digit)
| Unit Code | Time Unit |
|-----------|-----------|
| 1 | Just Now / Moments Ago |
| 2 | Seconds |
| 3 | Minutes |
| 4 | Hours |
| 5 | Days |
| 6 | Weeks |
| 7 | Months |
| 8 | Years |
| 0 | Unknown/Invalid |

#### Quantity (Second Digit)
- Values 1-8: Exact quantities
- 9: Quantities greater than 8

### Examples
| Time Expression | Time Period Code | Explanation |
|-----------------|-----------------|-------------|
| "Just now" | 1 | Special case for immediate events |
| "2 minutes ago" | 32 | Unit=Minutes (3), Quantity=2 |
| "a week ago" | 61 | Unit=Weeks (6), Quantity=1 |
| "3 months ago" | 73 | Unit=Months (7), Quantity=3 |
| "12 years ago" | 89 | Unit=Years (8), Quantity=9 (capped) |

### Advantages
1. Compact storage (single integer)
2. Efficient querying for time-based filtering
3. Standardization across different expressions
4. Easy to use in temporal analysis

### Example Queries
```sql
-- Find all reviews from the last month
SELECT * FROM reviews WHERE review_date BETWEEN 71 AND 79;

-- Find all reviews from the last year
SELECT * FROM reviews WHERE review_date BETWEEN 81 AND 89;

-- Find very recent reviews (hours or less)
SELECT * FROM reviews WHERE review_date < 50;
```

## Relationships Overview

```
User (1) ----< Business (1) ----< Review (Many)
```

- A User can own multiple Businesses
- A Business can have multiple Reviews
- Each Review belongs to exactly one Business
- Each Business belongs to exactly one User

## Implementation Notes

1. All timestamps are stored in UTC
2. Password authentication uses Werkzeug's secure hashing
3. All models implement a `to_dict()` method for API serialization
4. The database uses lazy loading for relationships to optimize query performance