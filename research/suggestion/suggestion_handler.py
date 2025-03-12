import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import confusion_matrix, classification_report
from suggestion_classifier import SuggestionClassifier

class SuggestionDetectionPipeline:
    """
    A pipeline for handling restaurant review suggestion detection
    with evaluation and visualization capabilities
    """
    
    def __init__(self, threshold=0.4):
        self.classifier = SuggestionClassifier()
        self.threshold = threshold
        
    def load_data(self, file_path):
        """Load data from CSV file"""
        if file_path.endswith('.csv'):
            return pd.read_csv(file_path)
        else:
            raise ValueError("Unsupported file format. Please use CSV.")
            
    def process_reviews(self, reviews):
        """
        Process a list of reviews and classify suggestions
        
        Args:
            reviews: List of review texts or pandas Series
            
        Returns:
            DataFrame with review texts and suggestion classification
        """
        # Convert to list if pandas Series
        if isinstance(reviews, pd.Series):
            reviews = reviews.tolist()
            
        # Fit the unsupervised model if it hasn't been fitted
        if not self.classifier.is_fitted:
            self.classifier.fit_unsupervised(reviews)
            
        # Process each review
        results = []
        for review in reviews:
            probability = self.classifier.predict_proba(review)
            is_suggestion = probability >= self.threshold
            
            results.append({
                "review_text": review,
                "suggestion_probability": probability,
                "is_suggestion": is_suggestion
            })
            
        return pd.DataFrame(results)
    
    def analyze_aspects(self, reviews_df, review_text_col="review_text"):
        """
        Extract key aspects from suggestions using basic NLP
        
        Args:
            reviews_df: DataFrame with review texts
            review_text_col: Column containing review text
            
        Returns:
            DataFrame with aspect analysis for suggestions
        """
        # Filter to only suggestions
        suggestions = reviews_df[reviews_df['is_suggestion']]
        
        
        aspects = {
            'food': ['food', 'dish', 'meal', 'menu', 'portion', 'taste', 'flavor', 'spicy', 
                    'dessert', 'breakfast', 'lunch', 'dinner'],
            'service': ['service', 'staff', 'waiter', 'waitress', 'server', 'manager', 'host', 
                       'hostess', 'employee', 'customer service'],
            'ambiance': ['ambiance', 'atmosphere', 'decor', 'music', 'noise', 'seating', 
                        'table', 'chair', 'lighting', 'interior'],
            'price': ['price', 'value', 'expensive', 'cheap', 'affordable', 'cost', 
                     'overpriced', 'discount', 'deal'],
            'cleanliness': ['clean', 'dirty', 'hygiene', 'bathroom', 'restroom', 'floor', 
                          'kitchen', 'sanitary'],
            'location': ['location', 'parking', 'accessibility', 'neighborhood', 'area', 
                       'street', 'entrance']
        }
        
        # Initialize aspect columns
        for aspect in aspects:
            suggestions[f'aspect_{aspect}'] = 0
            
        # Process each suggestion
        for idx, row in suggestions.iterrows():
            review = row[review_text_col].lower()
            
            # Check for each aspect
            for aspect, keywords in aspects.items():
                for keyword in keywords:
                    if keyword in review:
                        suggestions.at[idx, f'aspect_{aspect}'] = 1
                        break
        
        return suggestions
    
    def visualize_results(self, results_df):
        """
        Create visualizations of suggestion classification results
        
        Args:
            results_df: DataFrame with processed review data
        """
        # Create figure with subplots
        fig, axs = plt.subplots(2, 2, figsize=(15, 12))
        
        # Plot 1: Distribution of suggestion probabilities
        sns.histplot(results_df['suggestion_probability'], bins=20, ax=axs[0, 0])
        axs[0, 0].set_title('Distribution of Suggestion Probabilities')
        axs[0, 0].set_xlabel('Probability')
        axs[0, 0].set_ylabel('Count')
        axs[0, 0].axvline(self.threshold, color='red', linestyle='--', 
                         label=f'Threshold ({self.threshold})')
        axs[0, 0].legend()
        
        # Plot 2: Pie chart of suggestions vs. non-suggestions
        suggestion_counts = results_df['is_suggestion'].value_counts()
        if len(suggestion_counts) > 0:
            axs[0, 1].pie(suggestion_counts, 
                         labels=['Non-Suggestion', 'Suggestion'] if suggestion_counts.index[0] == False 
                         else ['Suggestion', 'Non-Suggestion'],
                         autopct='%1.1f%%', startangle=90)
            axs[0, 1].set_title('Proportion of Suggestions')
        else:
            axs[0, 1].text(0.5, 0.5, 'No suggestions detected', 
                          horizontalalignment='center', verticalalignment='center')
            axs[0, 1].set_title('Proportion of Suggestions')
            axs[0, 1].axis('off')
        
        if 'aspect_food' in results_df.columns:
            aspect_cols = [col for col in results_df.columns if col.startswith('aspect_')]
            aspect_counts = results_df[aspect_cols].sum().sort_values(ascending=False)
            
            sns.barplot(x=aspect_counts.values, y=[col.replace('aspect_', '') for col in aspect_counts.index], 
                      ax=axs[1, 0])
            axs[1, 0].set_title('Aspects Mentioned in Suggestions')
            axs[1, 0].set_xlabel('Count')
            axs[1, 0].set_ylabel('Aspect')
        else:
            axs[1, 0].set_title('Aspect Analysis Not Available')
            axs[1, 0].axis('off')
        

        suggestions = results_df[results_df['is_suggestion']].sort_values(
            by='suggestion_probability', ascending=False)
        
        axs[1, 1].axis('off')
        axs[1, 1].set_title('Top Suggestions (Highest Probability)')
        
        if not suggestions.empty:
            top_suggestions = suggestions.head(5)
            suggestion_text = ""
            
            for i, (_, row) in enumerate(top_suggestions.iterrows()):
                suggestion_text += f"{i+1}. \"{row['review_text'][:100]}{'...' if len(row['review_text']) > 100 else ''}\"\n"
                suggestion_text += f"   Probability: {row['suggestion_probability']:.2f}\n\n"
                
            axs[1, 1].text(0, 0.9, suggestion_text, fontsize=9, 
                          verticalalignment='top', wrap=True)
        
        plt.tight_layout()
        return fig
    
    def evaluate_with_human_labels(self, results_df, true_labels):
        """
        Evaluate the classifier using human-labeled data
        
        Args:
            results_df: DataFrame with processed review data
            true_labels: List or array of true binary labels
            
        Returns:
            Classification report and confusion matrix
        """
        # Verify input
        if len(true_labels) != len(results_df):
            raise ValueError("Length of true_labels must match number of reviews")

        predicted_labels = results_df['is_suggestion'].values

        cm = confusion_matrix(true_labels, predicted_labels)

        report = classification_report(true_labels, predicted_labels, output_dict=True)

        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6))
        

        sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', ax=ax1,
                   xticklabels=['Non-Suggestion', 'Suggestion'],
                   yticklabels=['Non-Suggestion', 'Suggestion'])
        ax1.set_title('Confusion Matrix')
        ax1.set_ylabel('True Label')
        ax1.set_xlabel('Predicted Label')
        
        # Plot metrics
        metrics = {
            'Precision': report['True']['precision'] if 'True' in report else report['1']['precision'],
            'Recall': report['True']['recall'] if 'True' in report else report['1']['recall'],
            'F1-Score': report['True']['f1-score'] if 'True' in report else report['1']['f1-score'],
            'Accuracy': report['accuracy']
        }
        
        sns.barplot(x=list(metrics.keys()), y=list(metrics.values()), ax=ax2)
        ax2.set_title('Classification Metrics')
        ax2.set_ylim(0, 1)
        
        for i, v in enumerate(metrics.values()):
            ax2.text(i, v + 0.05, f'{v:.2f}', ha='center')
            
        plt.tight_layout()
        
        return {
            'confusion_matrix': cm,
            'classification_report': report,
            'figure': fig
        }


# Example usage
if __name__ == "__main__":
    # Sample dataset
    reviews = [
        "The food was excellent, I highly recommend the pasta!",
        "They should offer more vegetarian options.",
        "It would be great if they could open earlier on weekends.",
        "The service was slow and the waiters were unfriendly.",
        "I wish they had more parking spaces available.",
        "The steak was cooked to perfection and the wine selection was fantastic.",
        "Consider adding some healthier choices to the menu.",
        "Why not offer a happy hour special on weekdays?",
        "The restaurant was too noisy and tables were too close together.",
        "They need to improve their reservation system, we waited 30 minutes despite having a reservation."
    ]
    
    # Initialize the pipeline
    pipeline = SuggestionDetectionPipeline(threshold=0.4)
    
    # Process reviews
    results = pipeline.process_reviews(reviews)
    
    # Analyze aspects
    results_with_aspects = pipeline.analyze_aspects(results)
    
    # Visualize
    fig = pipeline.visualize_results(results_with_aspects)
    
    # If we had human labels, we could evaluate
    # For demonstration, let's create some mock "true" labels
    mock_true_labels = [
        False,  # Regular positive review
        True,   # Should offer more options
        True,   # Would be great if
        False,  # Complaint without suggestion
        True,   # Wish they had
        False,  # Regular positive review
        True,   # Consider adding
        True,   # Why not offer
        False,  # Complaint without suggestion
        True,   # Need to improve
    ]
    
    # Evaluate with mock labels
    evaluation = pipeline.evaluate_with_human_labels(results, mock_true_labels)
    
    # Print results
    print("Suggestion Classification Results:")
    print(results[['review_text', 'suggestion_probability', 'is_suggestion']])
    
    print("\nEvaluation with Mock Human Labels:")
    print(f"Accuracy: {evaluation['classification_report']['accuracy']:.2f}")
    print(f"Precision: {evaluation['classification_report']['True' if 'True' in evaluation['classification_report'] else '1']['precision']:.2f}")
    print(f"Recall: {evaluation['classification_report']['True' if 'True' in evaluation['classification_report'] else '1']['recall']:.2f}")
    print(f"F1-Score: {evaluation['classification_report']['True' if 'True' in evaluation['classification_report'] else '1']['f1-score']:.2f}")