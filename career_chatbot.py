
import os
import random
import requests
from dotenv import load_dotenv

# ----------------------------------
# CONFIG
# ----------------------------------
load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")
if not HF_TOKEN:
    raise ValueError("HF_TOKEN not found. Add it to your .env file as HF_TOKEN=xxxx")

API_URL = "https://router.huggingface.co/v1/chat/completions"

HEADERS = {
    "Authorization": f"Bearer {HF_TOKEN}",
    "Content-Type": "application/json"
}

# ----------------------------------
# GREETING LOGIC
# ----------------------------------
def is_greeting(message: str) -> bool:
    greetings = [
        "hi", "hello", "hey", "hii", "hai",
        "good morning", "good evening", "good afternoon"
    ]
    msg = message.lower().strip()
    return any(greet in msg for greet in greetings)

def get_dynamic_greeting() -> str:
    responses = [
        "Hello! Ask me about any career and I will explain it in a simple way.",
        "Hi! I can help you understand careers and free learning resources.",
        "Hey! Confused about careers? Just ask me about any field.",
        "Hello! I explain career options in beginner-friendly language."
    ]
    return random.choice(responses)

# ----------------------------------
# PROMPT BUILDER
# ----------------------------------
def build_prompt(user_message: str) -> str:
    return f"""
You are a beginner-friendly career guidance chatbot.

STRICT RULES:
- Use very simple, human language
- Explain like talking to a student
- No markdown
- No emojis
- No complex technical terms
- Keep it short and clear
- FREE resources only

If the user asks about a career:
1. Give a simple definition
2. Explain what the person does
3. Provide FREE learning resources with clickable links
4. Use this exact format ONLY:

Career Overview:
<simple explanation>

What You Will Do:
<short explanation>

Free Resources:
- Resource name: https://link
- Resource name: https://link
- Resource name: https://link

User question:
{user_message}

Answer:
"""

# ----------------------------------
# HF API CALL
# ----------------------------------
def get_hf_response(prompt: str) -> str:
    payload = {
        "model": "deepseek-ai/DeepSeek-V3",
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 400
    }

    response = requests.post(
        API_URL,
        headers=HEADERS,
        json=payload,
        timeout=60
    )
    response.raise_for_status()

    return response.json()["choices"][0]["message"]["content"].strip()

# ----------------------------------
# QUIZ SUGGESTION (ALWAYS APPENDED)
# ----------------------------------
def append_quiz_suggestion(text: str) -> str:
    quiz_line = (
        "\n\nNext Step:\n"
        "To get personalized career suggestions based on your interests, "
        "take our short career interest quiz."
    )
    return text + quiz_line

# ----------------------------------
# CHATBOT CORE LOGIC
# ----------------------------------
def chatbot_reply(user_message: str) -> str:

    # Greeting handling
    if is_greeting(user_message):
        return get_dynamic_greeting()

    # Career-related response
    prompt = build_prompt(user_message)
    response = get_hf_response(prompt)

    # Always guide user to quiz
    return append_quiz_suggestion(response)

# ----------------------------------
# MAIN (TERMINAL CHAT)
# ----------------------------------
if __name__ == "__main__":
    print("\nCareer Guidance Chatbot")
    print("Ask about any career (type 'exit' to quit)\n")

    while True:
        user_input = input("You: ").strip()

        if user_input.lower() == "exit":
            print("Bot: Goodbye! All the best for your career journey.")
            break

        try:
            reply = chatbot_reply(user_input)
            print("\nBot:\n" + reply + "\n")
        except Exception as e:
            print("Bot: Something went wrong. Please try again.\n")
