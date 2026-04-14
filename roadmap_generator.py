



import os
import json
import requests
from dotenv import load_dotenv

# ----------------------------------
# CONFIG
# ----------------------------------
CACHE_FILE = "roadmap_cache.json"

load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")
if not HF_TOKEN:
    raise ValueError("❌ HF_TOKEN not found. Add it to your .env file as HF_TOKEN=xxxx")

API_URL = "https://router.huggingface.co/v1/chat/completions"

HEADERS = {
    "Authorization": f"Bearer {HF_TOKEN}",
    "Content-Type": "application/json"
}

# ----------------------------------
# CACHE HELPERS
# ----------------------------------
def load_cache():
    if not os.path.exists(CACHE_FILE):
        return {}
    try:
        with open(CACHE_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except json.JSONDecodeError:
        return {}

def save_cache(cache):
    with open(CACHE_FILE, "w", encoding="utf-8") as f:
        json.dump(cache, f, indent=2, ensure_ascii=False)

def get_roadmap_from_cache(career_name):
    return load_cache().get(career_name)

def save_roadmap_to_cache(career_name, roadmap):
    cache = load_cache()
    cache[career_name] = roadmap
    save_cache(cache)

# ----------------------------------
# PARSER (IMPORTANT)
# ----------------------------------
def parse_roadmap(text):
    roadmap = []
    current_level = None

    for line in text.split("\n"):
        line = line.strip()

        if not line:
            continue

        if line.lower().startswith("here is"):
            continue

        if line.startswith("LEVEL:"):
            current_level = {
                "level": line.replace("LEVEL:", "").strip(),
                "topics": []
            }
            roadmap.append(current_level)

        elif line.startswith("TOPIC:") and current_level:
            topic = line.replace("TOPIC:", "").strip()
            current_level["topics"].append(topic)

    return roadmap

def build_ui_roadmap(parsed):
    durations = {
        "Foundation": "3–6 months",
        "Intermediate": "6–12 months",
        "Advanced": "12–18 months",
        "Projects": "18+ months"
    }

    return [
        {
            "level": r["level"],
            "duration": durations.get(r["level"], "—"),
            "topics": r["topics"]
        }
        for r in parsed
    ]

# ----------------------------------
# HF ROADMAP GENERATOR
# ----------------------------------
def generate_roadmap_from_hf(career_name):
    prompt = f"""
Create a beginner-friendly learning roadmap for the career: {career_name}.

STRICT RULES:
- Do NOT use markdown
- Do NOT use headings like ### or **
- Do NOT number items
- Output plain text only
- Use this exact format:

LEVEL: Foundation
TOPIC: topic name | link
TOPIC: topic name | link

LEVEL: Intermediate
TOPIC: topic name | link

LEVEL: Advanced
TOPIC: topic name | link

LEVEL: Projects
TOPIC: topic name

Only include FREE resources.
"""

    payload = {
        "model": "deepseek-ai/DeepSeek-V3",
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 500
    }

    response = requests.post(API_URL, headers=HEADERS, json=payload, timeout=60)
    response.raise_for_status()

    text = response.json()["choices"][0]["message"]["content"]

    parsed = parse_roadmap(text)
    return build_ui_roadmap(parsed)

# ----------------------------------
# MAIN
# ----------------------------------
if __name__ == "__main__":
    career_name = "Python Developer"

    roadmap = get_roadmap_from_cache(career_name)

    if roadmap:
        print("✅ Roadmap found in cache\n")
    else:
        print("🔍 Not in cache. Calling HF API...\n")
        ui_roadmap = generate_roadmap_from_hf(career_name)

        roadmap = {
            "career": career_name,
            "roadmap": ui_roadmap
        }

        save_roadmap_to_cache(career_name, roadmap)
        print("✅ Generated & saved\n")

    # -------- Pretty print --------
    print(f"Career: {roadmap['career']}\n")

    for step in roadmap["roadmap"]:
        print(f"{step['level']} ({step['duration']})")
        for topic in step["topics"]:
            print("  -", topic)
        print()

    # -------- Save JSON --------
    with open("pretty_output.json", "w", encoding="utf-8") as f:
        json.dump(roadmap, f, indent=2, ensure_ascii=False)
