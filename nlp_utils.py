import re
from sentence_transformers import SentenceTransformer, util

# Load model for semantic similarity
model = SentenceTransformer('all-MiniLM-L6-v2')

def detect_intent_and_career(user_input, career_info):
    text = user_input.lower().strip()
    
    # 1. Handle Exit
    if any(re.search(rf'\b{w}\b', text) for w in ["bye", "exit", "quit"]):
        return "exit", None

    # 2. Career Extraction (Contextual Analysis)
    keys = list(career_info.keys())
    corpus = []
    for k in keys:
        data = career_info[k]
        # Weight the Career Name + Tags + Description for better semantic overlap
        search_blob = f"{k} {' '.join(data.get('tags', []))} {' '.join(data.get('description', []))}"
        corpus.append(search_blob.lower())
    
    corpus_embeddings = model.encode(corpus, convert_to_tensor=True)
    query_embedding = model.encode(text, convert_to_tensor=True)
    
    hits = util.semantic_search(query_embedding, corpus_embeddings, top_k=1)
    score = hits[0][0]['score']
    matched_key = keys[hits[0][0]['corpus_id']]

    # 3. Intent Detection
    intent = "full_profile"  # Default for interest statements
    intent_map = {
        "skills": [r"skills?", r"requirements", r"needed"],
        "course_links": [r"course", r"links?", r"where to learn"],
        "growth": [r"progress", r"growth", r"career path", r"progression"],
        "estimated_salary": [r"salary", r"earn", r"pay", r"income"],
        "estimated_budget": [r"budget", r"cost"],
        "entrance_exams_required": [r"exams?", r"test", r"clear"],
        "related_careers": [r"related", r"suggest", r"similar"]
    }

    for key, patterns in intent_map.items():
        if any(re.search(p, text) for p in patterns):
            intent = key
            break
            
    # FIX: Lower threshold for "I love/I enjoy" type statements to capture semantic interests
    interest_indicators = ["love", "enjoy", "want to be", "interested in", "like"]
    threshold = 0.25 if any(word in text for word in interest_indicators) else 0.40
    
    if score < threshold:
        return intent, None
        
    return intent, matched_key