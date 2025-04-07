import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import pickle
import spacy
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score


class SuggestionClassifier:
    """A classifier that identifies suggestions in text."""
    
    def __init__(self):
        """Initialize the classifier."""
        # Load spaCy model for text processing
        self.nlp = spacy.load('en_core_web_sm')
        
        # Initialize TF-IDF vectorizer
        self.vectorizer = TfidfVectorizer(max_features=5000, ngram_range=(1, 2))
        
        # Initialize classifier
        self.clf = RandomForestClassifier(n_estimators=100, random_state=42)
        
        # Suggestion patterns and keywords
        self.suggestion_patterns = [
            r"\bshould\b",
            r"\bcould\b",
            r"\bwould be nice\b",
            r"\bwould be better\b",
            r"\bneed to\b",
            r"\bneeds to\b",
            r"\bmight want to\b",
            r"\bhow about\b",
            r"\bwhy not\b",
            r"\bsuggest\b",
            r"\brecommend\b",
            r"\bwish\b",
            r"\bhope\b",
            r"\bif only\b",
            r"\bconsider\b",
            r"\bmay want to\b",
            r"\bwould like\b",
            r"\bimprove\b",
            r"\bupgrade\b",
            r"\badd\b",
            r"\bchange\b",
            r"\bprovide\b"
        ]
        
        # Compile patterns for faster matching
        self.compiled_patterns = [re.compile(pattern, re.IGNORECASE) for pattern in self.suggestion_patterns]
        
        # Is the model fitted?
        self.is_fitted = False
    
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
    
    def _create_labeled_data(self, texts):
        """Create weakly labeled data based on pattern matching."""
        X = []
        y = []
        
        for text in texts:
            processed_text = self.preprocess(text)
            X.append(processed_text)
            
            # Check if any pattern matches
            is_suggestion = 0
            for pattern in self.compiled_patterns:
                if pattern.search(text.lower()):
                    is_suggestion = 1
                    break
            
            y.append(is_suggestion)
        
        return X, y
    
    def fit_unsupervised(self, texts):
        """Train the classifier using weak supervision."""
        X, y = self._create_labeled_data(texts)
        
        # Transform text data into TF-IDF features
        X_tfidf = self.vectorizer.fit_transform(X)
        
        # Train the classifier
        self.clf.fit(X_tfidf, y)
        self.is_fitted = True
        
        # Return the proportion of suggestions found for reference
        return sum(y) / len(y)
    
    def predict(self, text, threshold=0.5):
        """Predict if a text contains a suggestion."""
        if not self.is_fitted:
            raise ValueError("The classifier has not been trained yet. Call fit_unsupervised first.")
        
        # Get the probability and compare with threshold
        prob = self.predict_proba(text)
        return prob >= threshold
    
    def predict_proba(self, text):
        """Get the probability that a text contains a suggestion."""
        if not self.is_fitted:
            raise ValueError("The classifier has not been trained yet. Call fit_unsupervised first.")
        
        processed_text = self.preprocess(text)
        X_tfidf = self.vectorizer.transform([processed_text])
        
        # Get the probability of the positive class (suggestion)
        proba = self.clf.predict_proba(X_tfidf)[0, 1]
        return proba
    
    def evaluate(self, texts, true_labels):
        """Evaluate the classifier on labeled data."""
        if not self.is_fitted:
            raise ValueError("The classifier has not been trained yet. Call fit_unsupervised first.")
        
        predictions = [self.predict(text) for text in texts]
        
        # Calculate evaluation metrics
        accuracy = accuracy_score(true_labels, predictions)
        report = classification_report(true_labels, predictions)
        conf_matrix = confusion_matrix(true_labels, predictions)
        
        return {
            'accuracy': accuracy,
            'report': report,
            'confusion_matrix': conf_matrix
        }
    
    def load_model(self, filepath):
        """Load the trained model from a file.
        
        This method supports both loading:
        1. A complete SuggestionClassifier object (the entire class instance)
        2. A tuple of (vectorizer, clf) components
        """
        with open(filepath, 'rb') as file:
            loaded_data = pickle.load(file)
            
            # Check if the loaded data is a SuggestionClassifier object
            if isinstance(loaded_data, SuggestionClassifier):
                # Copy all attributes from the loaded classifier
                self.vectorizer = loaded_data.vectorizer
                self.clf = loaded_data.clf
                self.is_fitted = loaded_data.is_fitted
                # No need to copy patterns as they are already defined in __init__
            elif isinstance(loaded_data, tuple) and len(loaded_data) == 2:
                # If it's a tuple of (vectorizer, clf)
                self.vectorizer, self.clf = loaded_data
                self.is_fitted = True
            else:
                raise ValueError("The loaded model file has an unexpected format.")

    def save_model(self, filepath):
        """Save the trained model to a file."""
        if not self.is_fitted:
            raise ValueError("The classifier has not been trained yet. Nothing to save.")
            
        with open(filepath, 'wb') as file:
            # Save the complete classifier object
            pickle.dump(self, file)