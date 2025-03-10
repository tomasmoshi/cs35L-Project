import re
from rake_nltk import Rake

def generate_tags(content, top_n=10):
    """
    Automatically generate tags from content using hashtag extraction and RAKE keyword extraction.
    """
    # Extract hashtags (e.g. "#example" becomes "example")
    hashtags = re.findall(r"#(\w+)", content)
    hashtags = [tag.lower() for tag in hashtags]
    print("Extracted hashtags:", hashtags)  # Debug print

    # Use RAKE to extract keywords from the content
    rake_extractor = Rake()
    rake_extractor.extract_keywords_from_text(content)
    rake_keywords = rake_extractor.get_ranked_phrases()
    print("RAKE keywords:", rake_keywords)  # Debug print

    # Take the top N RAKE keywords (if available)
    top_keywords = rake_keywords[:top_n] if len(rake_keywords) >= top_n else rake_keywords

    # Combine both lists and remove duplicates
    auto_tags = list(set(hashtags + top_keywords))
    print("Auto-generated tags:", auto_tags)  # Debug print
    return auto_tags

