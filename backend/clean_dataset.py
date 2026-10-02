import json

valid_lines = 0
invalid_lines = 0

with open("dataset.jsonl", "r") as f_in, open("dataset_clean.jsonl", "w") as f_out:
    for line in f_in:
        line = line.strip()
        if not line:
            continue
            
        try:
            # Test if it's valid JSON
            obj = json.loads(line)
            # Ensure it has the "messages" key which our template expects
            if "messages" in obj:
                f_out.write(json.dumps(obj) + "\n")
                valid_lines += 1
            else:
                invalid_lines += 1
        except Exception:
            invalid_lines += 1

print(f"Cleaned dataset! Valid lines: {valid_lines}, Invalid lines removed: {invalid_lines}")
