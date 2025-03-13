from backend.services.SuggestionClassifier_ import SuggestionClassifier
import pickle  # Import pickle

def create_training_data():
    suggestion_reviews = []
    non_suggestion_reviews = []

    with open('sugg_train.txt', 'r') as f:
        for line in f:
            suggestion_reviews.append(line.strip())

    with open('non_sugg_train.txt', 'r') as f:
        for line in f:
            non_suggestion_reviews.append(line.strip())

    # Combine all reviews
    all_reviews = suggestion_reviews + non_suggestion_reviews
    true_labels = [1] * len(suggestion_reviews) + [0] * len(non_suggestion_reviews)
    
    return all_reviews, true_labels

def train_classifier():
    """Train the classifier and return it"""
    classifier = SuggestionClassifier()
    reviews, _ = create_training_data()
    classifier.fit_unsupervised(reviews)
    return classifier

trained_classifier = train_classifier()

# Save the trained classifier to a pickle file
with open('suggestion_detector.pkl', 'wb') as f:
    pickle.dump(trained_classifier, f)

print("Trained classifier has been saved to suggestion_detector.pkl")

# No need to run train_classifier() again in the main block, it's already done above