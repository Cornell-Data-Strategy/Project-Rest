# Project REST API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

### Register User with Business

Register a new user account with an associated business.

**URL**: `/auth/register`  
**Method**: `POST`  
**Auth required**: No

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "first_name": "John",
  "last_name": "Smith",
  "business": {
    "name": "John's Restaurant",
    "url": "https://example.com/johns",
    "location": "123 Main St, Anytown, USA",
    "business_type": "restaurant"
  }
}


To login :

{
  "email": "newemail@example.com",
  "password": "newpassword123"
}

Make sure to get the token first from login and then use it to access
user profile or anything about the businesses
