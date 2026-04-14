import pandas as pd

df = pd.read_csv("csit_riasec_interest_dataset_mapping_based.csv")

TARGET = 800  # safe, realistic

balanced = []

for label, group in df.groupby("interest_label"):
    if len(group) >= TARGET:
        balanced.append(group.sample(TARGET, random_state=42))
    else:
        balanced.append(group.sample(TARGET, replace=True, random_state=42))

balanced_df = pd.concat(balanced)

balanced_df.to_csv(
    "csit_riasec_interest_dataset_final.csv",
    index=False
)

print("BALANCED DATASET CREATED")
print(balanced_df["interest_label"].value_counts())
