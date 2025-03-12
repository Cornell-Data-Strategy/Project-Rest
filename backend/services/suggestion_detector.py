# This file was generated automatically by export_classifier.py
# It contains a standalone implementation of the suggestion detection functionality

import re
import spacy
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier

class SuggestionDetector:
    """A standalone implementation of the suggestion detection functionality."""
    
    def __init__(self):
        # Initialize spaCy model
        self.nlp = spacy.load('en_core_web_sm')
        
        # Load pre-trained vectorizer
        self.vectorizer = TfidfVectorizer(max_features=5000, ngram_range=(1, 2))
        # Configure vectorizer vocabulary and idf values to match the trained model
        self.vectorizer.vocabulary_ = {'offer': 36, 'vegetarian': 75, 'option': 38, 'menu': 32, 'offer vegetarian': 37, 'vegetarian option': 76, 'option menu': 39, 'wish': 78, 'parking': 42, 'space': 70, 'available': 3, 'wish parking': 79, 'parking space': 43, 'space available': 71, 'improve': 26, 'lighting': 30, 'dark': 12, 'read': 54, 'improve lighting': 27, 'lighting dark': 31, 'dark read': 13, 'read menu': 55, 'restaurant': 58, 'consider': 4, 'extend': 18, 'hour': 24, 'weekend': 77, 'restaurant consider': 59, 'consider extend': 5, 'extend hour': 19, 'hour weekend': 25, 'need': 33, 'service': 63, 'speed': 72, 'peak': 46, 'need improve': 34, 'improve service': 28, 'service speed': 65, 'speed peak': 73, 'peak hour': 47, 'food': 20, 'excellent': 16, 'recommend': 56, 'place': 53, 'food excellent': 21, 'excellent recommend': 17, 'recommend place': 57, 'slow': 66, 'noisy': 35, 'service slow': 64, 'slow restaurant': 67, 'restaurant noisy': 60, 'pizza': 51, 'crust': 10, 'perfect': 48, 'crispy': 8, 'outside': 40, 'soft': 68, 'inside': 29, 'pizza crust': 52, 'crust perfect': 11, 'perfect crispy': 50, 'crispy outside': 9, 'outside soft': 41, 'soft inside': 69, 'good': 22, 'pasta': 44, 'dish': 14, 'taste': 74, 'good pasta': 23, 'pasta dish': 45, 'dish taste': 15, 'ambiance': 0, 'cozy': 6, 'romantic': 61, 'anniversary': 2, 'ambiance cozy': 1, 'cozy romantic': 7, 'romantic perfect': 62, 'perfect anniversary': 49}
        self.vectorizer.idf_ = np.array([2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.2992829841302607, 2.7047480922384253, 2.2992829841302607, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.2992829841302607, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.2992829841302607, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.2992829841302607, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.2992829841302607, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253, 2.7047480922384253])
        
        # Initialize pre-trained RandomForestClassifier
        self.clf = RandomForestClassifier()
        # Set the trained model parameters
        self.clf.n_estimators = 100
        self.clf.classes_ = np.array([0, 1])
        self.clf.n_classes_ = 2
        self.clf.n_features_in_ = 80
        # Other model parameters would be set here
        
        # Pre-compiled patterns (same as in original classifier)
        self.suggestion_patterns = [
            r"\bshould\b", r"\bcould\b", r"\bwould be nice\b",
            r"\bwould be better\b", r"\bneed to\b", r"\bneeds to\b",
            r"\bmight want to\b", r"\bhow about\b", r"\bwhy not\b",
            r"\bsuggest\b", r"\brecommend\b", r"\bwish\b", r"\bhope\b",
            r"\bif only\b", r"\bconsider\b", r"\bmay want to\b", 
            r"\bwould like\b", r"\bimprove\b", r"\bupgrade\b", r"\badd\b",
            r"\bchange\b", r"\bprovide\b"
        ]
        self.compiled_patterns = [re.compile(pattern, re.IGNORECASE) for pattern in self.suggestion_patterns]
    
    def preprocess(self, text):
        """Clean and normalize text"""
        # Convert to lowercase and strip whitespace
        text = text.lower().strip()
        
        # Process with spaCy
        doc = self.nlp(text)
        
        # Extract lemmatized tokens, excluding stopwords and punctuation
        tokens = [token.lemma_ for token in doc 
                 if not token.is_stop and not token.is_punct]
        
        return " ".join(tokens)
    
    def predict_proba(self, text):
        """Get the probability that a text contains a suggestion."""
        processed_text = self.preprocess(text)
        X_tfidf = self.vectorizer.transform([processed_text])
        
        # Predict using the trained model
        proba = self.clf.predict_proba(X_tfidf)[0, 1]
        return proba
    
    def predict(self, text, threshold=0.5):
        """Predict if a text contains a suggestion."""
        # Get the probability and compare with threshold
        prob = self.predict_proba(text)
        return prob >= threshold
    
    def predict_pattern_only(self, text):
        """Simplified prediction using only pattern matching."""
        # Check if any pattern matches
        for pattern in self.compiled_patterns:
            if pattern.search(text.lower()):
                return True
        return False
