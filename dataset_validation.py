

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# =========================
# 1) LOAD DATASET
# =========================
df = pd.read_csv("csit_riasec_interest_dataset_final.csv")

riasec_cols = ["R", "I", "A", "S", "E", "C"]

print("\n==============================")
print("DATASET INFO")
print("==============================")
print("Shape:", df.shape)
print(df.head())

# =========================
# 2) COUNT OF RECORDS (INTEREST)
# =========================
interest_counts = df["interest_label"].value_counts()

plt.figure()
interest_counts.plot(kind="bar")
plt.title("Count of Records per Interest Label")
plt.xlabel("Interest Label")
plt.ylabel("Count")
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()

# =========================
# 3) MEAN TRAIT TABLE (BASE FOR EVERYTHING)
# =========================
mean_table = df.groupby("interest_label")[riasec_cols].mean()

print("\n==============================")
print("MEAN RIASEC TABLE")
print("==============================")
print(mean_table)

# =========================
# 4) HEATMAP (MAIN VISUAL)
# =========================
plt.figure()
plt.imshow(mean_table, aspect='auto')
plt.colorbar()

plt.xticks(range(len(riasec_cols)), riasec_cols)
plt.yticks(range(len(mean_table.index)), mean_table.index)

# annotate values
for i in range(len(mean_table.index)):
    for j in range(len(riasec_cols)):
        plt.text(j, i, f"{mean_table.iloc[i,j]:.1f}",
                 ha='center', va='center')

plt.title("Interest vs RIASEC Traits (Heatmap)")
plt.xlabel("Traits")
plt.ylabel("Interest Label")
plt.tight_layout()
plt.show()

# =========================
# 5) BAR CHART → TRAIT COMPARISON
# =========================
mean_table.plot(kind="bar")

plt.title("RIASEC Traits per Interest Label")
plt.xlabel("Interest Label")
plt.ylabel("Average Score")
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()

# =========================
# 6) DATA-DRIVEN MAPPING (KEY LOGIC)
# =========================
print("\n==============================")
print("AUTO MAPPING (FROM HEATMAP)")
print("==============================")

auto_mapping = {}

for interest in mean_table.index:
    row = mean_table.loc[interest]

    # pick top 2 traits automatically
    top2 = row.sort_values(ascending=False).head(2).index.tolist()
    auto_mapping[interest] = top2

    print(f"{interest:15} → Top Traits: {top2}")

# =========================
# 7) COMBINED SCORE (BASED ON REAL MAPPING)
# =========================
print("\n==============================")
print("COMBINED TRAIT SCORES")
print("==============================")

# create combined score columns dynamically
for interest, traits in auto_mapping.items():
    df[interest + "_score"] = df[traits].mean(axis=1)

score_cols = [col for col in df.columns if "_score" in col]

combined_means = df.groupby("interest_label")[score_cols].mean()

# =========================
# 8) FINAL BAR CHART (LOGIC VISUAL)
# =========================
combined_means.plot(kind="bar")

# plt.title("Data-Driven Mapping (Matches Heatmap)")
# plt.xlabel("Interest Label")
# plt.ylabel("Combined Trait Score")
# plt.xticks(rotation=45)
# plt.tight_layout()
# plt.show()