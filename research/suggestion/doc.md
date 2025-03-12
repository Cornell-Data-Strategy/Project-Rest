# Restaurant Review Suggestion Classifier
## Implementation Guide

This document provides guidance on implementing and improving the restaurant review suggestion classifier for Project REST.

## Overview

The suggestion classifier identifies reviews that contain actionable recommendations for improvement. Unlike sentiment analysis which simply categorizes reviews as positive or negative, suggestion mining extracts specific recommendations that can drive business improvements.

### Key Benefits

- Automatically surfaces actionable feedback from customer reviews
- Helps prioritize which improvements would have the most impact
- Reduces manual review time by filtering out non-suggestion content
- Groups suggestions by aspect (food, service, ambiance, etc.)

## Implementation Architecture

The classifier uses a hybrid approach combining rule-based pattern matching with unsupervised machine learning:

1. **Rule-Based Component**: Detects explicit suggestions using linguistic patterns
2. **Unsupervised ML Component**: Identifies implicit suggestions using clustering
3. **Combined Scoring System**: Integrates both approaches for final classification

### Design Considerations

- **No LLM Dependency**: This solution works entirely locally without API costs
- **No Labeled Data Required**: Can be used immediately without training data
- **Lightweight Implementation**: Uses efficient libraries that work on standard hardware
- **Improvable Over Time**: Can be refined as human-labeled data becomes available

## Getting Started

### Prerequisites

```
pip install pandas numpy scikit-learn spacy matplotlib seaborn
python -m spacy download en_core_web_sm
```

### Basic Usage

```python
from suggestion_classifier import SuggestionClassifier
from suggestion_handler import SuggestionDetectionPipeline

# Initialize the pipeline
pipeline = SuggestionDetectionPipeline(threshold=0.4)

# Process a collection of reviews
reviews = ["Great food!", "They should offer more vegetarian options."]
results = pipeline.process_reviews(reviews)

# Analyze aspects mentioned in suggestions
results_with_aspects = pipeline.analyze_aspects(results)

# Visualize results
fig = pipeline.visualize_results(results_with_aspects)
```

## Files in this Package

1. **suggestion_classifier.py**: Core classification logic using hybrid approach
2. **suggestion_handler.py**: Pipeline for processing, analyzing and visualizing results
3. **usage_example.py**: Example script showing how to use the classifier

## Improving Accuracy Over Time

Without starting with labeled data, the classifier's initial accuracy will be moderate. Here's how to improve it:

### 1. Collect Human Feedback

Export classification results to CSV and have team members review a subset:

```python
results.to_csv('suggestion_classification_results.csv', index=False)
```

Have reviewers mark each classification as correct or incorrect.

### 2. Evaluate Current Performance

Use human-labeled data to evaluate the classifier:

```python
human_labels = [True, False, True, ...]  # From reviewer feedback
evaluation = pipeline.evaluate_with_human_labels(results, human_labels)
```

### 3. Adjust Thresholds and Patterns

Based on evaluation:
- Adjust the classification threshold (default is 0.4)
- Add new patterns to the rule-based component
- Refine aspect categories

### 4. Iterative Improvement

As more labeled data becomes available:
- Consider training a supervised classifier (RandomForest, SVM)
- Use a small portion of data for validation
- Continue collecting feedback and refining

## Integration with Project REST

This classifier is designed to work as part of the broader Project REST system:

1. **Data Collection**: Integrates with web scraping to process reviews
2. **Analysis Pipeline**: Feeds into the NLP analytics components
3. **Visualization**: Generates insights for the reporting dashboard

## Limitations and Future Improvements

Current limitations:
- Moderate accuracy on implicit suggestions
- English language only
- No cross-domain adaptation

Future improvements:
- Add support for multiple languages
- Implement supervised learning once enough labeled data exists
- Expand aspect analysis with more detailed categories
- Add time-based trend analysis for suggestions

## Evaluation Metrics

When evaluating the classifier with labeled data, focus on these metrics:

- **Precision**: Percentage of predicted suggestions that are actually suggestions
- **Recall**: Percentage of actual suggestions that are correctly identified
- **F1-Score**: Harmonic mean of precision and recall
- **Balanced Accuracy**: For handling imbalanced datasets