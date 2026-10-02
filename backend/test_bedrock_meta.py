import boto3
import json

def test_model(model_id):
    try:
        client = boto3.client('bedrock-runtime', region_name='us-east-1')
        body = json.dumps({
            "prompt": "hi",
            "max_gen_len": 10
        })
        # Note: Llama models on Bedrock use a different payload structure for raw invoke.
        # But for Bedrock Converse API (or just testing access via list_foundation_models), we can check.
        # Let's just use get_foundation_model instead to see if we get AccessDenied.
        # Wait, get_foundation_model doesn't test subscription access.
        # Let's invoke using the Converse API which abstracts the payload!
        response = client.converse(
            modelId=model_id,
            messages=[{"role": "user", "content": [{"text": "hi"}]}]
        )
        print(f"[OK] {model_id} is ACTIVE!")
    except Exception as e:
        print(f"[FAIL] {model_id}: {e}")

models = [
    "meta.llama3-70b-instruct-v1:0", 
    "meta.llama3-1-70b-instruct-v1:0",
    "us.meta.llama3-1-70b-instruct-v1:0",
    "us.meta.llama3-2-90b-instruct-v1:0"
]
for m in models:
    test_model(m)
