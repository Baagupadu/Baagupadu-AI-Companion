import json
import urllib.request
import urllib.error
from rouge_score import rouge_scorer

OLLAMA_URL = "http://localhost:11434/api/chat"
MODEL_NAME = "baagupadu_model" # We will create this name when you import the gguf!

def load_test_data(filepath, num_samples=20):
    """Loads the last N samples from the dataset to use as a blind test set."""
    samples = []
    with open(filepath, 'r') as f:
        lines = f.readlines()
        for line in lines[-num_samples:]:
            if not line.strip(): continue
            convo = json.loads(line)
            # Find the user prompt and the target response
            user_msg = ""
            target_msg = ""
            for msg in convo['messages']:
                if msg['role'] == 'user':
                    user_msg = msg['content']
                elif msg['role'] == 'assistant':
                    target_msg = msg['content']
            
            if user_msg and target_msg:
                samples.append({"prompt": user_msg, "reference": target_msg})
    return samples

def generate_ollama_response(prompt):
    """Hits the local Ollama API to generate a response."""
    data = {
        "model": MODEL_NAME,
        "messages": [
            {"role": "system", "content": "You are Baagupadu, a warm, Gen-Z best friend. Keep it casual, short, and never sound robotic."},
            {"role": "user", "content": prompt}
        ],
        "stream": False
    }
    
    req = urllib.request.Request(OLLAMA_URL, data=json.dumps(data).encode('utf-8'), headers={'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            return result['message']['content']
    except Exception as e:
        print(f"Error querying Ollama: {e}")
        return ""

def calculate_metrics():
    print(f"==================================================")
    print(f"Starting Model Evaluation (Calculating Precision & Recall)")
    print(f"==================================================")
    
    # 1. Load Data
    test_samples = load_test_data("dataset_clean.jsonl", num_samples=20)
    print(f"Loaded {len(test_samples)} blind test samples.\n")
    
    # Initialize ROUGE scorer
    scorer = rouge_scorer.RougeScorer(['rougeL'], use_stemmer=True)
    
    total_precision = 0
    total_recall = 0
    total_f1 = 0
    valid_tests = 0
    
    # 2. Run Inference & Calculate
    for i, sample in enumerate(test_samples):
        prompt = sample['prompt']
        reference = sample['reference']
        
        print(f"Testing Sample {i+1}/{len(test_samples)}...")
        generated = generate_ollama_response(prompt)
        
        if not generated:
            print("Failed to get response, skipping.")
            continue
            
        scores = scorer.score(reference, generated)
        
        total_precision += scores['rougeL'].precision
        total_recall += scores['rougeL'].recall
        total_f1 += scores['rougeL'].fmeasure
        valid_tests += 1
        
    if valid_tests == 0:
        print("No valid tests were run! Is Ollama running?")
        return
        
    # 3. Final Averages
    avg_precision = total_precision / valid_tests
    avg_recall = total_recall / valid_tests
    avg_f1 = total_f1 / valid_tests
    
    print("\n==================================================")
    print("FINAL EVALUATION METRICS (ROUGE-L)")
    print("==================================================")
    print(f"Precision: {avg_precision:.4f} (How relevant the generated words were)")
    print(f"Recall:    {avg_recall:.4f} (How many target keywords were successfully used)")
    print(f"F1-Score:  {avg_f1:.4f} (Harmonic Mean of Precision and Recall)")
    print("==================================================")
    print("NOTE: For generative chat tasks, F1 scores above 0.20 are generally considered highly successful!")

if __name__ == "__main__":
    calculate_metrics()
