


from lime.lime_tabular import LimeTabularExplainer
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import random


import joblib
import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer

import os
import json
import requests
from dotenv import load_dotenv
import time 


# =========================================================
# APP CONFIG
# =========================================================

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# =========================================================
# LOAD ML MODELS (CAREER PREDICTION)
# =========================================================

# =========================================================
# LOAD CS/IT ML MODELS & DATA
# =========================================================


model = joblib.load("xgb_model_final.joblib")
label_encoder = joblib.load("label_encoder_final.joblib")
# Load dataset for LIME
lime_data = pd.read_csv("csit_riasec_interest_dataset_final.csv")

X_lime = lime_data[["R", "I", "A", "S", "E", "C"]]

explainer = LimeTabularExplainer(
    training_data=X_lime.values,
    feature_names=X_lime.columns.tolist(),
    class_names=label_encoder.classes_,
    mode="classification"
)


# CS/IT careers metadata
careers = pd.read_csv("careers_csit.csv")

# SBERT embeddings for CS/IT careers
embeddings = np.load("career_embeddings_csit.npy")

# SBERT model metadata
sbert_meta = joblib.load("sbert_meta.joblib")
sbert = SentenceTransformer(sbert_meta["model_name"])


try:
    import faiss
    faiss_index = faiss.read_index("career_faiss.index")
    use_faiss = True
except:
    from sklearn.neighbors import NearestNeighbors
    nn = NearestNeighbors(n_neighbors=10, metric="cosine").fit(embeddings)
    use_faiss = False


# =========================================================
# REQUEST MODELS
# =========================================================


class QuizAnswers(BaseModel):
    Q1: int
    Q2: int
    Q3: int
    Q4: int
    Q5: int
    Q6: int
    Q7: int
    Q8: int
    Q9: int
    Q10: int
    Q11: int
    Q12: int
    Q13: int
    Q14: int
    Q15: int
    Q16: int
    Q17: int
    Q18: int
    Q19: int
    Q20: int
    Q21: int
    Q22: int
    Q23: int
    Q24: int
    free_text: str | None = None

class RIASECInput(BaseModel):
    R: float
    I: float
    A: float
    S: float
    E: float
    C: float


class RoadmapRequest(BaseModel):
    career: str


class RoadmapResponse(BaseModel):
    career: str
    roadmap: list
    source: str


# =========================================================
# CAREER PREDICTION API
# =========================================================
# -----------------------------
# Career → Interest mapping
# -----------------------------
career_to_interest = {
    "UI/UX Designer": "Design",
    "Frontend Developer": "Design",
    "Product Designer": "Design",
    "Game Developer": "Technical",

    "Backend Developer": "Technical",
    "Full Stack Developer": "Technical",
    "DevOps Engineer": "Technical",
    "Systems Engineer": "Technical",
    "Mobile App Developer": "Technical",
    "Site Reliability Engineer": "Technical",

    "Data Analyst": "Data",
    "Data Scientist": "Data",
    "Machine Learning Engineer": "Data",
    "AI Engineer": "Data",
    "Big Data Engineer": "Data",

    "Product Manager": "Management",
    "Technical Program Manager": "Management",
    "Tech Lead": "Management",
    "Solutions Architect": "Management",

    "QA Engineer": "QualitySupport",
    "Automation Test Engineer": "QualitySupport",
    "IT Support Engineer": "QualitySupport",

    "Cybersecurity Analyst": "SecurityCloud",
    "Security Engineer": "SecurityCloud",
    "Cloud Engineer": "SecurityCloud"
}

careers["interest_label"] = careers["title"].map(career_to_interest)
careers["interest_label"] = careers["interest_label"].str.strip().str.lower()
missing = careers[careers["interest_label"].isna()]["title"].unique()
if len(missing) > 0:
    print("⚠️ Unmapped careers found:", missing)

@app.post("/quiz/score")
def quiz_score(data: QuizAnswers):
    # RIASEC score buckets
    scores = {
        "R": 0,
        "I": 0,
        "A": 0,
        "S": 0,
        "E": 0,
        "C": 0
    }

    # Question → Trait mapping (ORDER MATTERS)
    question_traits = [
        "R","R","R","R",
        "I","I","I","I",
        "A","A","A","A",
        "S","S","S","S",
        "E","E","E","E",
        "C","C","C","C"
    ]

    answers = data.dict(exclude={"free_text"})

    for i, trait in enumerate(question_traits):
        q_key = f"Q{i+1}"
        scores[trait] += answers[q_key]

    return scores


def normalize_riasec_to_avg(riasec: dict):
    """
    Converts cumulative RIASEC scores into average scores.

    Example:
    If each trait has 4 questions (1 to 5 scale):
    cumulative R max = 20
    average R will be between 1 to 5
    """

    trait_question_count = 4  # because you have 4 questions per trait

    avg = {}
    for t in ["R", "I", "A", "S", "E", "C"]:
        # avg[t] = riasec[t] / trait_question_count
        avg[t] = (riasec.get(t, 0) or 0) / trait_question_count


    return avg





@app.post("/predict")
def predict(riasec: dict):

    # STEP 1: Normalize
    riasec_avg = normalize_riasec_to_avg(riasec)

    # STEP 2: Prepare input
    X_input = np.array([[ 
        riasec_avg["R"], riasec_avg["I"], riasec_avg["A"],
        riasec_avg["S"], riasec_avg["E"], riasec_avg["C"]
    ]])

    # STEP 3: Model prediction
    probs = model.predict_proba(X_input)[0]
    interest_labels = label_encoder.classes_

    # STEP 4: Weighted scoring
    interest_to_traits = {
        "Technical": ["R", "I"],
        "Data": ["R", "I"],
        "Design": ["A", "I"],
        "Management": ["E", "S"],
        "QualitySupport": ["S", "C"],
        "SecurityCloud": ["R", "S"]
    }

    weighted_scores = []

    for i, interest in enumerate(interest_labels):
        traits = interest_to_traits.get(interest, [])
        trait_score = sum(riasec_avg.get(t, 0) for t in traits)

        combined_score = trait_score + (float(probs[i]) * 0.1)

        weighted_scores.append({
            "interest": interest,
            "score": combined_score,
            "confidence": float(probs[i])
        })

    weighted_scores.sort(key=lambda x: x["score"], reverse=True)

    top_3_interests = weighted_scores[:3]
    top_interest = weighted_scores[0]["interest"]

    # =========================
    # 🔥 STEP 5: LIME EXPLANATION
    # =========================
    exp = explainer.explain_instance(
        X_input[0],
        model.predict_proba,
        num_features=6
    )

    lime_explanation = []

    for feature, weight in exp.as_list():
        lime_explanation.append({
            "feature": feature,
            "impact": round(weight, 4)
        })

    # =========================
    # STEP 6: SIMPLE XAI (your old)
    # =========================
    sorted_traits = sorted(riasec_avg.items(), key=lambda x: x[1], reverse=True)

    top_traits = sorted_traits[:2]
    low_traits = sorted_traits[-2:]

    interest_explanation = {
        "predicted_interest": top_interest,
        "confidence": round(weighted_scores[0]["confidence"] * 100, 2),
        "top_traits": top_traits,
        "low_traits": low_traits,
        "reason": f"High scores in {top_traits[0][0]} and {top_traits[1][0]} traits influenced this prediction."
    }

    # =========================
    # STEP 7: Career suggestions
    # =========================
    # =========================
# STEP 7: Career suggestions
# =========================
    matched_careers = careers[careers["interest_label"] == top_interest.lower()]
    suggestions = []

    if not matched_careers.empty:
        career_texts = (
        matched_careers["title"] + ". " +
        matched_careers["description"] + ". Category: " +
        matched_careers["category"]
        ).tolist()

        career_embs = sbert.encode(
        career_texts,
        convert_to_numpy=True,
        normalize_embeddings=True
        )

        query_text = (
        f"{top_interest} career. "
        f"R: {riasec_avg['R']}, I: {riasec_avg['I']}, A: {riasec_avg['A']}, "
        f"S: {riasec_avg['S']}, E: {riasec_avg['E']}, C: {riasec_avg['C']}"
        )

        query_emb = sbert.encode(
        [query_text],
        convert_to_numpy=True,
        normalize_embeddings=True
        )

        sims = np.dot(career_embs, query_emb.T).squeeze()
        top_indices = sims.argsort()[-3:][::-1]

        for idx in top_indices:
            row = matched_careers.iloc[idx]

            similarity_score = float(sims[idx])  # SBERT
            model_conf = weighted_scores[0]["confidence"]  # ML confidence

             # Trait score based on interest
            traits = interest_to_traits.get(top_interest, [])
            trait_score = sum(riasec_avg.get(t, 0) for t in traits) / len(traits)

            # 🔥 FINAL COMBINED SCORE
            final_score = (
            (similarity_score * 0.4) +
            (model_conf * 0.4) +
            ((trait_score / 5) * 0.2)
            )

            match_score = round(final_score * 100, 2)

            suggestions.append({
            "id": int(row["career_id"]),
            "title": row["title"],
            "description": row["description"],
            "category": row["category"],
            "match_score": match_score,
            "xai": {
            "reason": f"Strong match with your {top_interest} interest and personality traits",
            "model_confidence": round(model_conf * 100, 2),
            "similarity_score": round(similarity_score * 100, 2)
            }
            })

        # for idx in top_indices:
        #     row = matched_careers.iloc[idx]

        #     #  FIX: define similarity_score
        #     similarity_score = float(sims[idx])

        #     suggestions.append({
        #     "id": int(row["career_id"]),
        #     "title": row["title"],
        #     "description": row["description"],
        #     "category": row["category"],
        #     match_score = ((similarity_score * 0.4) + (weighted_scores[0]["confidence"] * 0.4) + (trait_score / 10 * 0.2))
        #     # "match_score": round(similarity_score * 100, 2),
        #     "explanation": (
        #         f"This career matches your {top_interest} interest "
        #         f"based on similarity score and your RIASEC traits."
        #     )
        #     })
   
            

    # =========================
    # FINAL RESPONSE
    # =========================
    return {
        "top_interest": top_interest,
        "top_3_interests": top_3_interests,
        "suggestions": suggestions,
        "explanation": interest_explanation,
        "lime_explanation": lime_explanation   # 🔥 NEW
    }




# =========================================================
# ROADMAP GENERATOR (HF + CACHE)
# =========================================================

CACHE_FILE = "roadmap_cache.json"
CACHE_TTL_SECONDS = 7 * 24 * 60 * 60  # 7 days

load_dotenv()
HF_TOKEN = os.getenv("HF_TOKEN")

if not HF_TOKEN:
    raise RuntimeError("HF_TOKEN missing in .env file")

API_URL = "https://router.huggingface.co/v1/chat/completions"

HEADERS = {
    "Authorization": f"Bearer {HF_TOKEN}",
    "Content-Type": "application/json"
}


def load_cache():
    if not os.path.exists(CACHE_FILE):
        return {}

    try:
        with open(CACHE_FILE, "r", encoding="utf-8") as f:
            cache = json.load(f)

        # 🔹 TTL validation
        meta = cache.get("_meta")
        if meta:
            last_updated = meta.get("last_updated", 0)
            age = time.time() - last_updated

            if age > CACHE_TTL_SECONDS:
                print("🕒 Cache expired. Ignoring old roadmap links.")
                return {}

        return cache

    except json.JSONDecodeError:
        return {}


def save_cache(cache):
    # 🔹 preserve existing metadata
    if "_meta" not in cache:
        cache["_meta"] = {}

    cache["_meta"]["last_updated"] = int(time.time())

    with open(CACHE_FILE, "w", encoding="utf-8") as f:
        json.dump(cache, f, indent=2, ensure_ascii=False)


def safe_link(title: str, link: str | None):
    """
    Priority:
    1. Valid AI-provided link
    2. YouTube free learning video
    3. Google search (project-safe fallback)
    """

    # 1️⃣ Use AI link if valid
    if link:
        link = link.strip()
        if link.startswith("http"):
            return link

    # 2️⃣ YouTube fallback
    yt_query = title.replace(" ", "+") + "+tutorial"
    return f"https://www.youtube.com/results?search_query={yt_query}"




def parse_roadmap(text):
    roadmap = []
    current = None

    for line in text.split("\n"):
        line = line.strip()
        if not line:
            continue

        if line.startswith("LEVEL:"):
            current = {"level": line.replace("LEVEL:", "").strip(), "topics": []}
            roadmap.append(current)

        elif line.startswith("TOPIC:") and current:
            raw = line.replace("TOPIC:", "").strip()

            if " | " in raw:
                title, link = raw.split(" | ", 1)
                link = safe_link(title, link)
            else:
                title = raw
                link = safe_link(title, None)

            current["topics"].append({
            "title": title.strip(),
            "link": link
})


    return roadmap


def build_ui_roadmap(parsed):
    durations = {
        "Foundation": "3–6 months",
        "Intermediate": "6–12 months",
        "Advanced": "12–18 months",
        "Projects": "18+ months"
    }

    ui = []

    for r in parsed:
        ui.append({
            "level": r["level"],
            "duration": durations.get(r["level"], "—"),
            "topics": [
                {
                    "title": t["title"],
                    "link": t["link"]
                }
                for t in r["topics"]
            ]
        })

    return ui



def generate_roadmap_from_hf(career_name):
    prompt = f"""
Create a beginner-friendly learning roadmap for the career: {career_name}.

RULES:
- Plain text only
- No numbering
- Use this format exactly

LEVEL: Foundation
TOPIC: topic | link

LEVEL: Intermediate
TOPIC: topic | link

LEVEL: Advanced
TOPIC: topic | link

LEVEL: Projects
TOPIC: topic
"""

    payload = {
        "model": "deepseek-ai/DeepSeek-V3",
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 500
    }

    response = requests.post(API_URL, headers=HEADERS, json=payload, timeout=60)
    response.raise_for_status()

    text = response.json()["choices"][0]["message"]["content"]
    return build_ui_roadmap(parse_roadmap(text))


# =========================================================
# ROADMAP API ENDPOINT
# =========================================================

@app.post("/roadmap", response_model=RoadmapResponse)
def get_roadmap(data: RoadmapRequest):

    career = data.career.strip()
    if not career:
        raise HTTPException(status_code=400, detail="Career name required")

    cache = load_cache()
  

# 🔹 ignore metadata key
    if career in cache and career != "_meta":
        return {
        "career": career,
        "roadmap": cache[career]["roadmap"],
        "source": "cache"
        }

     

    roadmap = generate_roadmap_from_hf(career)

    cache[career] = {
        "career": career,
        "roadmap": roadmap
    }

    save_cache(cache)

    return {
        "career": career,
        "roadmap": roadmap,
        "source": "hf"
    }
# =========================================================
# SHARED HF CHAT COMPLETION HELPER
# =========================================================

def get_hf_response(prompt: str) -> str:
    payload = {
        "model": "deepseek-ai/DeepSeek-V3",
        "messages": [
            {"role": "user", "content": prompt}
        ],
        "max_tokens": 400
    }

    response = requests.post(
        API_URL,
        headers=HEADERS,
        json=payload,
        timeout=60
    )
    response.raise_for_status()

    data = response.json()
    return data["choices"][0]["message"]["content"].strip()

# =========================
# CHATBOT LOGIC
# =========================

def is_greeting(message: str) -> bool:
    greetings = [
        "hi", "hello", "hey", "hii", "hai",
        "good morning", "good evening", "good afternoon"
    ]
    msg = message.lower().strip()
    return any(greet in msg for greet in greetings)

def get_dynamic_greeting() -> str:
    responses = [
        "Hi! I’m your career assistant. Ask me about any career or skills.",
        "Hello! I can explain careers and share free learning resources.",
        "Hey! Not sure about your career? Ask me anything related to careers."
    ]
    return random.choice(responses)

def build_chatbot_prompt(user_message: str) -> str:
    return f"""
You are a beginner-friendly career guidance chatbot.

RULES:
- Simple human language
- Career-related questions only
- FREE resources only
- No markdown, no emojis

Format:
Career Overview:
<simple explanation>

What You Will Do:
<short explanation>

Free Resources:
- Resource name: https://link

User question:
{user_message}

Answer:
"""

def chatbot_reply(user_message: str) -> str:
    if is_greeting(user_message):
        return get_dynamic_greeting()

    prompt = build_chatbot_prompt(user_message)
    response = get_hf_response(prompt)

    return response + (
        "\n\nNext Step:\n"
        "To understand your interests better, take our short career quiz."
    )

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat_api(data: ChatRequest):
    reply = chatbot_reply(data.message)
    return {"reply": reply}

# =========================================================
# RUN SERVER
# =========================================================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app_fastapi:app", host="127.0.0.1", port=8000, reload=True)



