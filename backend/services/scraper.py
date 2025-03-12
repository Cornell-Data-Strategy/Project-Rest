# from .googlemaps import GoogleMapsScraper
from backend.services.googlemaps import GoogleMapsScraper
from datetime import datetime, timedelta
import re
import json
import threading


def parse_relative_date(relative_date, retrieval_date):
    """
    Convert relative date expressions like '2 years ago', 'a month ago', etc.
    into an actual datetime object based on the retrieval date.
    
    Args:
        relative_date (str): Relative date string from Google Maps
        retrieval_date (datetime): When the review was retrieved
        
    Returns:
        datetime: The calculated review date
        int: A code representing the time period (useful for filtering/analysis)
    """
    if not relative_date:
        return retrieval_date, 0  # Default to retrieval date if missing
    
    # Handle "just now" or similar expressions
    if "just now" in relative_date.lower() or "moments ago" in relative_date.lower():
        return retrieval_date, 1
    
    # Extract number and time unit using regex
    match = re.match(r'(\d+|a|an)\s+(second|minute|hour|day|week|month|year)s?\s+ago', relative_date.lower())
    if not match:
        return retrieval_date, 0  # Return retrieval date if pattern doesn't match
    
    quantity, unit = match.groups()
    
    # Convert words like 'a' or 'an' to 1
    if quantity in ['a', 'an']:
        quantity = 1
    else:
        quantity = int(quantity)
    
    # Map time units to timedelta arguments and period codes
    time_units = {
        'second': ('seconds', 2),
        'minute': ('minutes', 3),
        'hour': ('hours', 4),
        'day': ('days', 5),
        'week': ('weeks', 6),
        'month': ('days', 7),  # Approximate months as 30 days
        'year': ('days', 8)    # Approximate years as 365 days
    }
    
    delta_unit, period_code = time_units.get(unit, ('days', 0))
    
    # Special handling for months and years to better approximate actual time
    if unit == 'month':
        delta_args = {delta_unit: quantity * 30}
    elif unit == 'year':
        delta_args = {delta_unit: quantity * 365}
    else:
        delta_args = {delta_unit: quantity}
    
    # Calculate the actual date
    calculated_date = retrieval_date - timedelta(**delta_args)
    
    # Return both the calculated date and a period code
    # Period code format: single digit representing the unit, followed by quantity
    # e.g., 81 for "1 year ago", 52 for "2 days ago"
    return calculated_date, period_code * 10 + (quantity if quantity < 10 else 9)

def process_review_data(reviews):
    """
    Process raw review data to standardize dates and add additional fields
    
    Args:
        reviews (list): List of review dictionaries from the scraper
        
    Returns:
        list: Processed review data ready for database insertion
    """
    processed_reviews = []
    
    for review in reviews:
        # Get the retrieval date (when the review was scraped)
        retrieval_date = review.get('retrieval_date') 
        if isinstance(retrieval_date, str):
            retrieval_date = datetime.fromisoformat(retrieval_date.replace('Z', '+00:00'))
        
        # Parse the relative date
        relative_date = review.get('relative_date', '')
        calculated_date, time_period_code = parse_relative_date(relative_date, retrieval_date)
        
        # Create processed review with standardized fields
        processed_review = {
            'source': 'Google',
            'content': review.get('caption', ''),
            'rating': review.get('rating', 0.0),
            'retrieved_at': retrieval_date,
            'review_date': calculated_date,
            'time_period_code': time_period_code,  # Store the code for filtering/analysis
            'relative_date_original': relative_date,  # Keep original for reference
            'username': review.get('username', ''),
            'user_review_count': review.get('n_review_user', 0),
            'user_profile_url': review.get('url_user', '')
        }
        
        processed_reviews.append(processed_review)
    
    return processed_reviews

def scrape_reviews_for_business(url):
    """
    Scrape reviews for a business from Google Maps
    
    Args:
        url (str): Google Maps URL for the business
        
    Returns:
        dict: Processed review data
    """
    print("Starting scraper...")
    with GoogleMapsScraper(debug=False) as scraper:
        print("Getting reviews...")
        raw_reviews = scraper.get_all_reviews(url)

        print(f"Scraped {len(raw_reviews.get('reviews', []))} reviews")
        
        # Extract just the reviews array from the response
        reviews = raw_reviews.get('reviews', [])
        
        print("Processing review data...")
        # Process the raw review data
        processed_reviews = process_review_data(reviews)
        
        print("Creating result dictionary...")
        # Create the result dictionary
        result = {
            'place_url': url,
            'total_reviews': len(processed_reviews),
            'reviews': processed_reviews,
            'scraped_at': datetime.now().isoformat()
        }
        
        print("Saving to file...")
        # Save to file for debugging/backup 
        with open('all_reviews.json', 'w', encoding='utf-8') as f:
            json.dump(result, f, ensure_ascii=False, indent=4, default=str)

        print("Finished within context manager")
    
    print("Exited context manager")
    print("Active threads:", threading.enumerate())
    return result

# Uncomment to test
if __name__ == '__main__':
    url = "https://www.google.ca/maps/place/Anna+Comstock+Hall+(Latino+Living+Center)/@42.4559129,-76.4775697,16.04z/data=!4m8!3m7!1s0x89d082217810521b:0x315d3df27fb230b!8m2!3d42.4539109!4d-76.4826287!9m1!1b1!16s%2Fg%2F124yjrzjt?entry=ttu&g_ep=EgoyMDI1MDMwOC4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D"
    result = scrape_reviews_for_business(url)
    print(f"Successfully scraped {result['total_reviews']} reviews")