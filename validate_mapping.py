import pandas as pd
import numpy as np
from scipy.stats import f_oneway

# Load dataset
df = pd.read_csv("csit_riasec_interest_dataset_final.csv")

riasec_cols = ["R", "I", "A", "S", "E", "C"]

interest_to_traits = {
    "Technical": ["R", "I"],
    "Data": ["C", "I"],
    "Design": ["A", "I"],
    "Management": ["E", "S"],
    "QualitySupport": ["S", "C"],
    "SecurityCloud": ["R", "S"]
}

print("\n==============================")
print("1) MEAN RIASEC SCORES PER INTEREST LABEL")
print("==============================")

mean_table = df.groupby("interest_label")[riasec_cols].mean().round(3)
print(mean_table)

print("\n==============================")
print("2) CHECK IF EACH INTEREST LABEL MATCHES MAPPED TRAITS")
print("==============================")

for interest, traits in interest_to_traits.items():
    row = mean_table.loc[interest]
    top2 = row.sort_values(ascending=False).head(2).index.tolist()
    print(f"{interest:15} | Expected: {traits} | Actual Top2: {top2}")

print("\n==============================")
print("3) ANOVA: DO TRAITS DIFFER ACROSS INTEREST LABELS?")
print("==============================")
print("If p-value < 0.05, trait differences across interest_label are significant.\n")

for trait in riasec_cols:
    groups = [group[trait].values for _, group in df.groupby("interest_label")]
    f_stat, p_val = f_oneway(*groups)
    print(f"{trait}: F = {f_stat:.4f}, p-value = {p_val:.10f}")
