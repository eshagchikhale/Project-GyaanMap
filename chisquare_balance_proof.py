import pandas as pd
import numpy as np
from scipy.stats import chisquare

# ===============================
# LOAD FINAL DATASET
# ===============================
df = pd.read_csv("csit_riasec_interest_dataset_final.csv")

# ===============================
# CLASS COUNTS
# ===============================
counts = df["interest_label"].value_counts().sort_index()

print("\nCLASS COUNTS:")
print(counts)

# ===============================
# EXPECTED UNIFORM DISTRIBUTION
# ===============================
expected = np.full(len(counts), counts.mean())

# ===============================
# CHI-SQUARE TEST
# ===============================
chi_stat, p_value = chisquare(f_obs=counts.values, f_exp=expected)

# ===============================
# OUTPUT
# ===============================
print("\nCHI-SQUARE GOODNESS-OF-FIT TEST:")
print(f"Chi-square statistic: {chi_stat}")
print(f"p-value: {p_value}")

# ===============================
# DECISION
# ===============================
if p_value > 0.05:
    print("\n✅ NO STATISTICALLY SIGNIFICANT DIFFERENCE IN CLASS FREQUENCIES")
    print("✅ DATASET IS STATISTICALLY BALANCED")
else:
    print("\n❌ STATISTICALLY SIGNIFICANT DIFFERENCE IN CLASS FREQUENCIES")
    print("❌ DATASET IS NOT BALANCED")
