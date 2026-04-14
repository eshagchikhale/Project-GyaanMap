import pandas as pd

# Load original balanced dataset
df = pd.read_csv("csit_riasec_interest_dataset_balanced_5000.csv")

def assign_interest(row):
    # Base scores
    scores = {
        "Design": row["A"] + row["I"],
        "Management": row["E"] + row["S"],
        "QualitySupport": row["S"] + row["C"],
        "SecurityCloud": row["R"] + row["S"],
        "RI": row["R"] + row["I"]  # temporary combined bucket
    }

    top = max(scores, key=scores.get)

    # Split RI into Data vs Technical using C dominance
    if top == "RI":
        if row["C"] >= 3.5:
            return "Data"
        else:
            return "Technical"
    else:
        return top

# Apply relabeling
df["interest_label"] = df.apply(assign_interest, axis=1)

# Save new dataset
df.to_csv("csit_riasec_interest_dataset_mapping_based.csv", index=False)

print("DONE")
print(df["interest_label"].value_counts())
