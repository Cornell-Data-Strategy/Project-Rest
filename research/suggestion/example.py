import pandas as pd
from suggestion_classifier import SuggestionClassifier

# Initialize classifier
classifier = SuggestionClassifier()

# Sample restaurant reviews - mix of suggestions and non-suggestions
reviews = [
    "The food was excellent, I would recommend this place.",
    "They should offer more vegetarian options on the menu.",
    "The service was slow and the restaurant was too noisy.",
    "I wish they had more parking spaces available.",
    "You could improve the lighting, it was too dark to read the menu.",
    "The pizza crust was perfect, crispy on the outside and soft inside."
]


classifier.fit_unsupervised(reviews)


results = []
for review in reviews:
    probability = classifier.predict_proba(review)
    is_suggestion = classifier.predict(review, threshold=0.3)
    results.append({
        "review": review,
        "probability": probability,
        "is_suggestion": is_suggestion
    })


results_df = pd.DataFrame(results)


print("\nSuggestion Classification Results:")
print("---------------------------------")
for i, row in results_df.iterrows():
    print(f"Review: {row['review']}")
    print(f"Suggestion probability: {row['probability']:.2f}")
    print(f"Is suggestion: {'Yes' if row['is_suggestion'] else 'No'}")
    print("---------------------------------")


print(f"\nTotal reviews: {len(results_df)}")
print(f"Suggestions detected: {results_df['is_suggestion'].sum()}")
print(f"Detection rate: {results_df['is_suggestion'].mean()*100:.1f}%")