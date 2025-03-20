export interface Review {
    id: number;
    source: string;
    content: string | null;
    rating: number | null;
    retrieved_at: string;
    review_date: number | null;
    review_date_estimate: string;
    username: string | null;
    user_review_count: number | null;
    user_profile_url: string | null;
    business_id: number;
    senti_score: number;
    sentiment_magnitude: number;
    sentiment_description: string;
    is_suggestion: boolean;
    topics: string | null;
}

export interface Business {
    id: number;
    name: string;
    url: string;
    location: string | null;
    business_type: string | null;
    created_at: string;
    reviews?: Review[]; // Optional because it might not be included in all responses
}

export interface UserData {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    created_at: string;
    businesses: Business[];
}
