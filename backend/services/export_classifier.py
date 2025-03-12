
from backend.services.SuggestionClassifier_ import SuggestionClassifier

import re
import spacy
import numpy as np

# Create the training data (same as in the notebook)
def create_training_data():
    suggestion_reviews = [
        "They should offer more vegetarian options on the menu.",
        "I wish they had more parking spaces available.",
        "You could improve the lighting, it was too dark to read the menu.",
        "The restaurant should consider extending their hours on weekends.",
        "They need to improve their service speed during peak hours.",
        # Add more examples as needed
    ]

    non_suggestion_reviews = [
        "The food was excellent, I would recommend this place.",
        "The service was slow and the restaurant was too noisy.",
        "The pizza crust was perfect, crispy on the outside and soft inside.",
        "I had the best pasta dish I've ever tasted here.",
        "The ambiance was cozy and romantic, perfect for our anniversary.",
        # Add more examples as needed
    ]

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

# Train the classifier
trained_classifier = train_classifier()

# Now, create a file with the exported model
with open('suggestion_detector.py', 'w') as f:
    f.write("""# This file was generated automatically by export_classifier.py
# It contains a standalone implementation of the suggestion detection functionality

import re
import spacy
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier

class SuggestionDetector:
    \"\"\"A standalone implementation of the suggestion detection functionality.\"\"\"
    
    def __init__(self):
        # Initialize spaCy model
        self.nlp = spacy.load('en_core_web_sm')
        
        # Load pre-trained vectorizer
        self.vectorizer = TfidfVectorizer(max_features=5000, ngram_range=(1, 2))
        # Configure vectorizer vocabulary and idf values to match the trained model
        self.vectorizer.vocabulary_ = {params}
        self.vectorizer.idf_ = np.array({idf_values})
        
        # Initialize pre-trained RandomForestClassifier
        self.clf = RandomForestClassifier()
        # Set the trained model parameters
        self.clf.n_estimators = {n_estimators}
        self.clf.classes_ = np.array({classes})
        self.clf.n_classes_ = {n_classes}
        self.clf.n_features_in_ = {n_features}
        # Other model parameters would be set here
        
        # Pre-compiled patterns (same as in original classifier)
        self.suggestion_patterns = [
            r"\\bshould\\b", r"\\bcould\\b", r"\\bwould be nice\\b",
            r"\\bwould be better\\b", r"\\bneed to\\b", r"\\bneeds to\\b",
            r"\\bmight want to\\b", r"\\bhow about\\b", r"\\bwhy not\\b",
            r"\\bsuggest\\b", r"\\brecommend\\b", r"\\bwish\\b", r"\\bhope\\b",
            r"\\bif only\\b", r"\\bconsider\\b", r"\\bmay want to\\b", 
            r"\\bwould like\\b", r"\\bimprove\\b", r"\\bupgrade\\b", r"\\badd\\b",
            r"\\bchange\\b", r"\\bprovide\\b"
        ]
        self.compiled_patterns = [re.compile(pattern, re.IGNORECASE) for pattern in self.suggestion_patterns]
    
    def preprocess(self, text):
        \"\"\"Clean and normalize text\"\"\"
        # Convert to lowercase and strip whitespace
        text = text.lower().strip()
        
        # Process with spaCy
        doc = self.nlp(text)
        
        # Extract lemmatized tokens, excluding stopwords and punctuation
        tokens = [token.lemma_ for token in doc 
                 if not token.is_stop and not token.is_punct]
        
        return " ".join(tokens)
    
    def predict_proba(self, text):
        \"\"\"Get the probability that a text contains a suggestion.\"\"\"
        processed_text = self.preprocess(text)
        X_tfidf = self.vectorizer.transform([processed_text])
        
        # Predict using the trained model
        proba = self.clf.predict_proba(X_tfidf)[0, 1]
        return proba
    
    def predict(self, text, threshold=0.5):
        \"\"\"Predict if a text contains a suggestion.\"\"\"
        # Get the probability and compare with threshold
        prob = self.predict_proba(text)
        return prob >= threshold
    
    def predict_pattern_only(self, text):
        \"\"\"Simplified prediction using only pattern matching.\"\"\"
        # Check if any pattern matches
        for pattern in self.compiled_patterns:
            if pattern.search(text.lower()):
                return True
        return False
""".format(
    params=repr(trained_classifier.vectorizer.vocabulary_),
    idf_values=repr(trained_classifier.vectorizer.idf_.tolist()),
    n_estimators=trained_classifier.clf.n_estimators,
    classes=repr(trained_classifier.clf.classes_.tolist()),
    n_classes=len(trained_classifier.clf.classes_),
    n_features=trained_classifier.clf.n_features_in_,
    # Add other necessary parameters here
))

    print("Generated suggestion_detector.py with the exported model")
    print("You can now import this module directly in your application without pickle loading")

if __name__ == "__main__":
    train_classifier()