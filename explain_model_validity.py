import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from scipy.stats import f_oneway
import numpy as np

# ===============================
# LOAD FINAL DATASET
# ===============================
df = pd.read_csv("csit_riasec_interest_dataset_final.csv")

traits = ["R","I","A","S","E","C"]
labels = df["interest_label"].unique()

# ===============================
# 1️⃣ DATASET BALANCE CHECK
# ===============================
plt.figure(figsize=(8,5))
df["interest_label"].value_counts().plot(kind="bar")
plt.title("Balanced Distribution of Interest Labels")
plt.ylabel("Number of Samples")
plt.xlabel("Interest Label")
plt.tight_layout()
plt.show()

# ===============================
# 2️⃣ ANOVA + EFFECT SIZE (ETA SQUARED)
# ===============================
print("\nANOVA + EFFECT SIZE (η²):")

anova_results = {}

for trait in traits:
    groups = [df[df["interest_label"] == l][trait] for l in labels]
    F, p = f_oneway(*groups)

    # Effect size (eta squared)
    ss_between = sum(len(g) * (g.mean() - df[trait].mean())**2 for g in groups)
    ss_total = sum((df[trait] - df[trait].mean())**2)
    eta_sq = ss_between / ss_total

    anova_results[trait] = eta_sq

    print(f"{trait}: F={F:.2f}, p={p:.10f}, η²={eta_sq:.3f}")

# ===============================
# 3️⃣ OVERALL TRAIT BEHAVIOUR (MEAN SHIFT)
# ===============================
mean_by_label = df.groupby("interest_label")[traits].mean()
global_mean = df[traits].mean()

mean_shift = mean_by_label - global_mean

plt.figure(figsize=(10,6))
sns.heatmap(
    mean_shift,
    annot=True,
    cmap="coolwarm",
    center=0
)
plt.title("Trait Mean Shift from Global Average (Overall Behaviour)")
plt.ylabel("Interest Label")
plt.xlabel("RIASEC Traits")
plt.tight_layout()
plt.show()

# ===============================
# 4️⃣ PAIR BEHAVIOUR (NO RULES, PURE STATISTICS)
# ===============================
pairs = [
    ("R","I"), ("I","C"), ("E","S"),
    ("R","S"), ("A","I"), ("C","S")
]

print("\nPAIR-WISE BEHAVIOUR (MEAN + VARIANCE):")

for a, b in pairs:
    col = f"{a}{b}_sum"
    df[col] = df[a] + df[b]

    stats = df.groupby("interest_label")[col].agg(["mean","var"])
    print(f"\nPAIR {a}+{b}")
    print(stats.sort_values("mean", ascending=False))

    plt.figure(figsize=(8,5))
    sns.boxplot(x="interest_label", y=col, data=df)
    plt.title(f"Distribution of {a}+{b} Across Interest Labels")
    plt.xticks(rotation=30)
    plt.tight_layout()
    plt.show()
