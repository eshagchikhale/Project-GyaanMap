import joblib
import pandas as pd
import numpy as np

xgb = joblib.load("xgb_model.joblib")
le = joblib.load("label_encoder.joblib")

def predict_career(user_answers):
    # user_answers is a list or dict of quiz answers (25 numeric answers, 1–5 scale)
    df = pd.DataFrame([user_answers], columns=[f"Q{i}" for i in range(1, 26)])
    prediction = xgb.predict(df)
    career = le.inverse_transform(prediction)[0]
    return career

if __name__ == "__main__":
    # Example input from a user quiz
    sample_user = np.random.randint(1, 6, size=25)
    print("Predicted Career Path:", predict_career(sample_user))