import boto3
import json

def test_model(model_id):
    try:
        client = boto3.client('bedrock-runtime', region_name='us-east-1')
        body = json.dumps({
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 10,
            "messages": [{"role": "user", "content": "hi"}]
        })
        client.invoke_model(modelId=model_id, body=body)
        print(f"[OK] {model_id} is ACTIVE!")
        return True
    except Exception as e:
        print(f"[FAIL] {model_id}: {e}")
        return False

models = [
    "us.anthropic.claude-sonnet-5", 
    "us.anthropic.claude-sonnet-4-6", 
    "eu.anthropic.claude-sonnet-5"
]
for m in models:
    test_model(m)
