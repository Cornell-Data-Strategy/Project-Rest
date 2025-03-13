# from .googlemaps import GoogleMapsScraper
from backend.services.googlemaps import GoogleMapsScraper
from datetime import datetime, timedelta
import re
import json
import threading
import os
import signal
import subprocess
import platform
import random


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
    Process raw review data to standardize dates and add additional fields.

    Args:
        reviews (list): List of review dictionaries from the scraper

    Returns:
        list: Processed review data ready for database insertion.
    """
    processed_reviews = []
    
    for idx, review in enumerate(reviews):
        try:
            # print(f"Processing review #{idx}")

            # Get and parse the retrieval date (when the review was scraped)
            retrieval_date = review.get('retrieval_date')
            if isinstance(retrieval_date, str):
                try:
                    retrieval_date = datetime.fromisoformat(retrieval_date.replace('Z', '+00:00'))
                except Exception as e:
                    print(f"Error parsing retrieval_date: {review.get('retrieval_date')} - {e}")
                    continue  # Skip this review if retrieval_date cannot be parsed
            if not isinstance(retrieval_date, datetime):
                print("retrieval_date is not a valid datetime. Skipping review.")
                continue

            # Parse the relative date
            relative_date = review.get('relative_date', '')
            calculated_date, time_period_code = parse_relative_date(relative_date, retrieval_date)

            # Ensure calculated_date is a datetime; otherwise, fallback to retrieval_date
            if not isinstance(calculated_date, datetime):
                print("Calculated date is not a datetime. Falling back to retrieval_date.")
                calculated_date = retrieval_date

            # Calculate review_date_estimate (start with the calculated date)
            review_date_estimate = calculated_date

            # Adjust estimate based on time_period_code
            if time_period_code == 1:  # "Just now"
                review_date_estimate = retrieval_date
            elif time_period_code == 0:  # Unknown/Invalid
                review_date_estimate = retrieval_date
            else:
                try:
                    # Introduce a small random offset based on the time unit
                    unit_code = time_period_code // 10  # Extract the unit code
                    quantity = time_period_code % 10      # Extract the quantity
                    # print(f"Unit Code: {unit_code}, Quantity: {quantity}")

                    max_offset_days = 0
                    if unit_code == 2:  # Seconds
                        max_offset_days = 0
                    elif unit_code == 3:  # Minutes
                        max_offset_days = 0
                    elif unit_code == 4:  # Hours
                        max_offset_days = 1
                    elif unit_code == 5:  # Days
                        max_offset_days = 3
                    elif unit_code == 6:  # Weeks
                        max_offset_days = 7
                    elif unit_code == 7:  # Months
                        max_offset_days = 15
                    elif unit_code == 8:  # Years
                        max_offset_days = 90

                    offset = random.randint(-max_offset_days, max_offset_days)
                    # print(f"Offset (days) applied: {offset}")
                    review_date_estimate = calculated_date + timedelta(days=offset)
                except Exception as offset_error:
                    print(f"Error calculating offset: {offset_error}")
                    review_date_estimate = calculated_date
                    
        

            # Build the processed review dictionary with correct types
            processed_review = {
                'source': 'Google',
                'content': review.get('caption', ''),
                'rating': review.get('rating', 0.0),
                'retrieved_at': retrieval_date,
                'review_date': calculated_date,
                'review_date_estimate': review_date_estimate,
                'time_period_code': time_period_code,
                'relative_date_original': relative_date,
                'username': review.get('username', ''),
                'user_review_count': review.get('n_review_user', 0),
                'user_profile_url': review.get('url_user', '')
            }
    
            processed_reviews.append(processed_review)
        except Exception as e:
            print(f"Error processing review #{idx}: {e}")
    
    return processed_reviews

def scrape_reviews_for_business(url):
    """
    Scrape reviews for a business from Google Maps
    
    Args:
        url (str): Google Maps URL for the business
        
    Returns:
        dict: Processed review data
    """
    print("Cleaning existing orphaned processes...")
    cleanup_orphaned_processes(debug=True)
    print("Starting scraper...")
    with GoogleMapsScraper(debug=True) as scraper:
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
    
    #print("Exited context manager")
    #print("Active threads:", threading.enumerate())
    return result


def cleanup_orphaned_processes(debug=False):

    try:
        if platform.system() == "Darwin" or platform.system() == "Linux":
            try:
                chromedriver_pids = subprocess.check_output(["pgrep", "chromedriver"]).decode().strip().split("\n")
                for pid in chromedriver_pids:
                    if pid:
                        os.kill(int(pid), signal.SIGKILL)
                        if debug:
                            print(f"Killed orphaned chromedriver process {pid}")
            except:
                pass
        elif platform.system() == "Windows":
            try:
                os.system("taskkill /f /im chromedriver.exe")
                if debug:
                    print("Killed orphaned chromedriver processes")
            except:
                pass
    except Exception as e:
        if debug:
            print(f"Error cleaning up orphaned processes: {e}")





# Uncomment to test
# if __name__ == '__main__':
#     url = "https://www.google.ca/maps/place/Anna+Comstock+Hall+(Latino+Living+Center)/@42.4559129,-76.4775697,16.04z/data=!4m8!3m7!1s0x89d082217810521b:0x315d3df27fb230b!8m2!3d42.4539109!4d-76.4826287!9m1!1b1!16s%2Fg%2F124yjrzjt?entry=ttu&g_ep=EgoyMDI1MDMwOC4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D"
#     result = scrape_reviews_for_business(url)
#     print(f"Successfully scraped {result['total_reviews']} reviews")