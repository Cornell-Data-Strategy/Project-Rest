import re
import numpy as np
import pandas as pd
import spacy
import string
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from sklearn.metrics.pairwise import cosine_similarity

class SuggestionClassifier:
    """
    A hybrid classifier for detecting suggestions in restaurant reviews
    without requiring labeled training data.
    """
    
    def __init__(self):
        self.nlp = spacy.load('en_core_web_sm')
        
        # Rule-based component: 
        self.suggestion_phrases = [
            r'should\s+(?:be|have|consider|try|add|improve|update|fix)',
            r'could\s+(?:be|have|add|improve|update|fix)',
            r'would\s+(?:be|have|like|prefer|recommend|suggest)',
            r'recommend\s+(?:to|that|adding|improving|fixing)',
            r'suggest\s+(?:to|that|adding|improving|fixing)',
            r'(?:needs?|need\s+to)\s+(?:be|have|add|improve|update|fix)',
            r'(?:wish|hope)(?:ed)?\s+(?:they|there|it|the)',
            r'(?:add|improve|update|upgrade|fix|change|enhance)',
            r'if\s+(?:only|they|the).*would',
            r'it\s+would\s+be\s+(?:nice|great|better|helpful)',
            r'(?:please|kindly)\s+(?:add|improve|update|fix)',
            r'(?:don\'t|do\s+not)\s+(?:forget|miss)',
        ]
        
      
        self.patterns = [re.compile(pattern, re.IGNORECASE) for pattern in self.suggestion_phrases]
        

        self.vectorizer = TfidfVectorizer(
            max_features=1000, 
            stop_words='english',
            ngram_range=(1, 2)
        )
        

        self.issue_indicators = set([
            'uncomfortable', 'difficult', 'confusing', 'hard', 'slow', 'crowded',
            'noisy', 'expensive', 'overpriced', 'disappointing', 'lacking', 'missing',
            'insufficient', 'poor', 'terrible', 'horrible', 'worst', 'bad', 'failed',
            'mediocre', 'average', 'cold', 'hot', 'undercooked', 'overcooked'
        ])
        

        self.tfidf_matrix = None
        self.kmeans = None
        self.is_fitted = False
        
    def preprocess(self, text):
        """Clean and normalize text, removes emojis and special characters"""
        text = text.lower().strip()
        

        doc = self.nlp(text)
        
        tokens = [token.lemma_ for token in doc 
                if not token.is_stop and not token.is_punct]
        
        return " ".join(tokens)
    
        
    def rule_based_score(self, text):
        """
        Return a score (0-1) based on linguistic patterns
        that suggest the text contains a suggestion
        """
        # Look for explicit suggestion patterns
        pattern_matches = sum(1 for pattern in self.patterns if pattern.search(text))
        
        # Explicit recommendation keywords
        recommends = re.search(r'(?:recommend|suggest|advise|propose)', text, re.IGNORECASE)
        recommend_score = 0.4 if recommends else 0
        
        # Calculate normalized pattern score (0-0.7)
        pattern_score = min(0.7, pattern_matches * 0.2)
        
        # Check for wish statements (often implicit suggestions)
        wish_score = 0.4 if re.search(r'(?:wish|hope|would like)', text, re.IGNORECASE) else 0
        
        # Check for should/could statements (explicit suggestions)
        modal_score = 0.5 if re.search(r'(?:should|could|must|need to|needs to)', text, re.IGNORECASE) else 0
        
        # Check for conditional statements (if...then, would be better if, etc.)
        conditional_score = 0.3 if re.search(r'if\s+.*(?:would|could|should)', text, re.IGNORECASE) else 0
        
        # Check for question forms that might be implicit suggestions
        question_score = 0.3 if re.search(r'why not\s+(?:add|make|include|offer|try)', text, re.IGNORECASE) else 0
        
        # Check for imperative verbs (add, improve, etc.)
        imperative_score = 0.4 if re.search(r'^(?:add|improve|update|fix|change|enhance|consider|try)', text.lower()) else 0
        

        comparative_score = 0.3 if re.search(r'(?:better|more|easier|faster|improved) (?:if|to|than|with)', text, re.IGNORECASE) else 0
        
        # Count issue indicators
        doc = self.nlp(text.lower())
        issue_count = sum(1 for token in doc if token.lemma_ in self.issue_indicators)
        issue_score = min(0.2, issue_count * 0.07)
        
        # Combine scores - take the maximum of several key indicators, then add smaller contributors
        primary_score = max(pattern_score, modal_score, wish_score, recommend_score, imperative_score)
        secondary_score = conditional_score + question_score + comparative_score + issue_score
        
        total_score = min(1.0, primary_score + secondary_score * 0.5)  # Cap at 1.0
        
        return total_score
    
    def fit_unsupervised(self, reviews):
        """
        Fit an unsupervised model to help identify potential suggestion clusters
        """
        # Preprocess reviews
        processed_reviews = [self.preprocess(review) for review in reviews]
        
        # Convert to TF-IDF features
        self.tfidf_matrix = self.vectorizer.fit_transform(processed_reviews)
        
        # Apply KMeans clustering (assuming one cluster might contain more suggestions)
        self.kmeans = KMeans(n_clusters=3, random_state=42)
        self.kmeans.fit(self.tfidf_matrix)
        
        # Mark as fitted
        self.is_fitted = True
        
        return self
    
    def ml_based_score(self, text):
        """
        Return a score (0-1) based on unsupervised ML techniques
        """
        if not self.is_fitted:
            return 0.0
        
        # Preprocess and vectorize the text
        processed_text = self.preprocess(text)
        text_vector = self.vectorizer.transform([processed_text])
        
        # Get the cluster
        cluster = self.kmeans.predict(text_vector)[0]
        
        # Calculate distance to cluster center (inverse for scoring)
        cluster_center = self.kmeans.cluster_centers_[cluster]
        similarity = cosine_similarity(text_vector, cluster_center.reshape(1, -1))[0][0]
        
        # We'll need to calibrate this over time, but for now:
        # Higher similarity to certain clusters might indicate suggestions
        # Since we don't know which cluster yet, we'll use a flat approach
        return min(0.5, similarity * 0.5)  # Cap at 0.5 to avoid overconfidence
    
    def predict_proba(self, text):
        """
        Predict the probability of a text being a suggestion
        using a combination of rule-based and ML-based approaches
        """
        rule_score = self.rule_based_score(text)
        ml_score = self.ml_based_score(text) if self.is_fitted else 0.0
        
        # Combine scores (rule-based has higher weight initially)
        combined_score = rule_score * 0.7 + ml_score * 0.3
        
        return combined_score
    
    def predict(self, text, threshold=0.4):
        """
        Classify text as suggestion (True) or not (False)
        """
        score = self.predict_proba(text)
        return score >= threshold
