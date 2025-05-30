# Time Period Code Documentation

## Overview

The Time Period Code is a numeric representation system designed to encode relative time expressions (such as "2 years ago", "a month ago", etc.) into simple integer values. This system provides a standardized way to represent and filter temporal data extracted from Google Maps reviews or similar sources where exact dates are not provided.

## Purpose

Google Maps and many other review platforms use relative time expressions rather than exact dates to indicate when reviews were posted. These expressions (like "3 months ago" or "a year ago") present challenges for:

1. Data storage
2. Temporal analysis
3. Filtering by time periods
4. Comparing reviews across different time ranges

The Time Period Code system addresses these challenges by converting these relative expressions into numeric codes that can be easily stored, indexed, and queried in a database.

## Code Structure

Each Time Period Code is a 2-digit integer with the following structure:

```
[Unit Code][Quantity]
```

Where:
- **Unit Code** (first digit): Represents the time unit mentioned in the expression
- **Quantity** (second digit): Represents the numeric value in the time expression

### Unit Codes

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

### Quantity

The quantity ranges from 1-9, where:
- Exact quantities 1-8 are represented directly
- Quantities greater than 9 are represented as 9

### Special Cases

- **"Just now"** or **"moments ago"**: Encoded as `1`
- **"a" or "an"** (e.g., "a month ago"): The quantity is treated as 1
- **Invalid or unrecognized** time expressions: Encoded as `0`

## Examples

| Time Expression | Time Period Code | Explanation |
|-----------------|-----------------|-------------|
| "Just now" | 1 | Special case for immediate events |
| "2 minutes ago" | 32 | Unit=Minutes (3), Quantity=2 |
| "1 hour ago" | 41 | Unit=Hours (4), Quantity=1 |
| "5 days ago" | 55 | Unit=Days (5), Quantity=5 |
| "a week ago" | 61 | Unit=Weeks (6), Quantity=1 |
| "3 months ago" | 73 | Unit=Months (7), Quantity=3 |
| "1 year ago" | 81 | Unit=Years (8), Quantity=1 |
| "12 years ago" | 89 | Unit=Years (8), Quantity=9 (capped) |

## Implementation

The Time Period Code is generated by the `parse_relative_date()` function, which takes a relative date string and the retrieval date as inputs:

```python
def parse_relative_date(relative_date, retrieval_date):
    """
    Convert relative date expressions into an actual datetime and a numeric code.
    
    Args:
        relative_date (str): Relative date string (e.g., "2 years ago")
        retrieval_date (datetime): When the review was retrieved
        
    Returns:
        datetime: The calculated review date
        int: A code representing the time period
    """
    # Implementation details...
```

## Usage in Queries

The Time Period Code enables efficient filtering in database queries:

```sql
-- Find all reviews from the last month
SELECT * FROM reviews WHERE time_period_code BETWEEN 71 AND 79;

-- Find all reviews from the last year
SELECT * FROM reviews WHERE time_period_code BETWEEN 81 AND 89;

-- Find very recent reviews (hours or less)
SELECT * FROM reviews WHERE time_period_code < 50;
```

## Advantages

1. **Compact Storage**: A single integer value instead of storing the full text expression
2. **Efficient Querying**: Simple numeric comparisons for filtering by time periods
3. **Standardization**: Consistent representation across different languages and expressions
4. **Analysis Ready**: Makes temporal analysis more straightforward

## Limitations

1. **Approximation**: The calculated dates are approximations based on the retrieval date
2. **Granularity**: Limited to representing quantities up to 9
3. **Ambiguity**: Some platforms may use different relative time expressions
4. **No Exact Dates**: This system is designed for relative expressions only, not exact dates

## Integration with Review Data

When processing review data, both the calculated date and Time Period Code are stored:

```python
processed_review = {
    'source': 'Google',
    'content': review.get('caption', ''),
    'rating': review.get('rating', 0.0),
    'retrieved_at': retrieval_date,
    'review_date': calculated_date,  # Approximate date based on relative expression
    'time_period_code': time_period_code,  # The numeric code for filtering
    'relative_date_original': relative_date,  # Original expression for reference
    # Additional fields...
}
```

This approach provides both human-readable dates and efficient numeric codes for querying and analysis.