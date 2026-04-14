import nlp_utils, generator, career_data

def main():
    print("🌟 GyanBot Activated. (Type 'exit' to quit)")
    last_active_career = None

    while True:
        try:
            user_input = input("\nYou: ").strip()
            if not user_input: continue

            intent, matched_key = nlp_utils.detect_intent_and_career(user_input, career_data.CAREER_INFO)

            if intent == "exit":
                print("GyanBot: Goodbye! 👋")
                break

            # Career Priority:
            # 1. If user mentioned a new career/interest in THIS query, use it.
            # 2. Else, fallback to the last discussed career context.
            if matched_key:
                last_active_career = matched_key
            
            if not last_active_career:
                print("GyanBot: I'm not sure which career you mean. Could you share an interest like 'I love building games'?")
                continue

            response = generator.format_response(
                last_active_career, 
                intent, 
                career_data.CAREER_INFO[last_active_career]
            )
            print(f"\nGyanBot:\n{response}")

        except Exception as e:
            print(f"GyanBot Error: {e}")

if __name__ == "__main__":
    main()