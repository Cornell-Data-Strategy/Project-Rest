# Run this file to test the SuggestionClassifier model
import pickle
from backend.services.SuggestionClassifier_ import SuggestionClassifier


classifier = SuggestionClassifier()
classifier.load_model('fitted_suggestion_classifier.pkl')


review = "I think it would be better if we could add more features."


is_suggestion = classifier.predict(review)
probability = classifier.predict_proba(review)

print(f"Review: '{review}'")
print(f"Suggestion probability: {probability:.2f}")
print(f"Is the review a suggestion? {'Yes' if is_suggestion else 'No'}")


test_reviews = [
    "The food was delicious and I really enjoyed the service.",
    "They should consider adding more vegetarian options to the menu.",
    "We had a wonderful dinner last night.",
    "It would be nice if they offered a loyalty program.",
    "I found a hair in my soup and won't be coming back.",
    "Why not add some live music on the weekends?"
]

print("\nAdditional Test Cases:")
print("-" * 50)
for test_review in test_reviews:
    prob = classifier.predict_proba(test_review)
    suggestion = classifier.predict(test_review)
    print(f"Review: '{test_review}'")
    print(f"Suggestion probability: {prob:.2f}")
    print(f"Is suggestion: {'Yes' if suggestion else 'No'}")
    print("-" * 50)