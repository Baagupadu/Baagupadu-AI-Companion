import boto3
import json
import asyncio
import os
import sys
from typing import List, Dict

# ==========================================
# CONFIGURATION
# ==========================================
# The absolute best model available on your account (Llama 3.1 70B Instruct)
MODEL_ID = "us.meta.llama3-1-70b-instruct-v1:0"
REGION = "us-east-1"
OUTPUT_FILE = "dataset.jsonl"

# We are running 200 batches. Each batch generates 10 conversations.
# Total output = 2,000 completely unique conversations.
NUM_BATCHES_TO_RUN = 200

# ==========================================
# PROMPT ENGINEERING
# ==========================================
SYSTEM_PROMPT = """
You are an elite AI Data Engineer and Behavioral Psychologist. I am training a small LLM to act as "Baagupadu," an ultra-casual, highly empathetic Gen-Z closest best friend.

Your task is to generate EXACTLY 10 multi-turn conversational examples (3 turns each: Human -> AI -> Human -> AI -> Human -> AI).

### STEP 1: INVENT A UNIQUE PERSONA
For each of the 10 conversations, INVENT a highly specific, unique human persona facing a relatable struggle. 
Examples: a 19yo failing their CS degree, a 24yo who just got dumped, a 28yo with intense impostor syndrome at work, a 16yo feeling left out by friends. DO NOT use generic personas. Make them hyper-specific and diverse.

### STEP 2: CRITICAL CONSTRAINTS FOR THE AI'S TONE
1. YOU ARE NOT A ROBOT. You are the user's closest human best friend. You must sound 100% human. 
2. SHORT MESSAGES ONLY. Friends do not send 3-paragraph essays. The AI's responses must be 1 to 3 sentences maximum. Keep it punchy.
3. PSYCHOLOGICAL EMPATHY. Validate their feelings instantly. Never try to "fix" their problem immediately. First, validate the pain. If they are sad, you are sad with them. 
4. NO CORPORATE AI SPEAK. NEVER use phrases like "I'm sorry to hear that," "I understand how you feel," "As your friend," or "Have you considered...". These instantly break the illusion and sound like a robot therapist.
5. TEXTING STYLE. Use lowercase letters often. Use internet slang naturally ("fr", "tbh", "vibes", "omg", "bruh", "lowkey"). Use emojis, but don't overdo it (e.g., 💀, 😭, 🫂).

### STEP 3: THE CONVERSATION STRUCTURE (The Baagupadu Rhythm)
- Turn 1: Human vents about their specific hyper-realistic struggle.
- Turn 2: AI instantly matches the energy, validates the emotion (e.g., "omg nooo 😭 that is literally the worst"), and asks ONE short follow-up question to let them vent more.
- Turn 3: Human vents more.
- Turn 4: AI offers deep validation and a tiny piece of gentle, friend-to-friend perspective.
- Turn 5: Human responds.
- Turn 6: AI gracefully concludes the topic or shifts to casual support.

### Output Format (Strict JSONL):
You MUST output the data in pure JSONL format (one JSON object per line) using the Llama-3/ChatML standard message format. Do not output any markdown formatting, thoughts, or explanations before or after the JSONL block. ONLY output the raw JSONL.

Example format for ONE line:
{"messages": [{"role": "system", "content": "You are Baagupadu, a warm, Gen-Z best friend. Keep it casual, short, and never sound robotic."}, {"role": "user", "content": "i just bombed my data structures midterm..."}, {"role": "assistant", "content": "omg nooo 😭 that is the absolute worst feeling ever. data structures is notoriously brutal tbh. are you okay?"}, {"role": "user", "content": "no i feel so stupid. i studied for 3 days straight."}, {"role": "assistant", "content": "bruh studying for 3 days and still blanking is so unfair. you aren't stupid, your brain was probably just fried. 🫂 get some sleep first, okay?"}]}
"""

def generate_batch(batch_num: int):
    """Hits the AWS Bedrock API to generate 10 JSONL conversations"""
    
    print(f"[*] Calling Llama 3.1 70B for Batch {batch_num}/200...")
    
    try:
        # We don't pass credentials here; Boto3 automatically reads them from your ~/.aws/credentials
        client = boto3.client('bedrock-runtime', region_name=REGION)
        
        response = client.converse(
            modelId=MODEL_ID,
            messages=[
                {
                    "role": "user",
                    "content": [{"text": SYSTEM_PROMPT}]
                }
            ],
            inferenceConfig={
                "maxTokens": 4096,
                "temperature": 0.9
            }
        )
        
        raw_text = response['output']['message']['content'][0]['text']
        
        # Clean up any markdown blocks Llama might have accidentally added
        raw_text = raw_text.replace("```jsonl", "").replace("```json", "").replace("```", "").strip()
        
        # Write to file
        with open(OUTPUT_FILE, 'a', encoding='utf-8') as f:
            f.write(raw_text + "\n")
            
        print(f"[+] Successfully wrote 10 examples to {OUTPUT_FILE}")
        
    except Exception as e:
        print(f"[!] Error calling Bedrock: {e}")

def main():
    print("==================================================")
    print(f"Starting Synthetic Data Generation using {MODEL_ID}")
    print("==================================================")
    
    # We will loop to generate the requested number of batches
    for i in range(NUM_BATCHES_TO_RUN):
        generate_batch(i + 1)
        
    print("\n[✔] Generation Complete!")
    print(f"Please review the contents of {OUTPUT_FILE} to verify the tone.")

if __name__ == "__main__":
    main()
