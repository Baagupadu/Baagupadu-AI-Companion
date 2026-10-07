import os
from huggingface_hub import HfApi, login

# 1. Paste your HuggingFace Access Token below inside the quotes!
HF_TOKEN = "paste_your_token_here_but_do_not_commit_it" 

# 2. Put your HuggingFace username and the repo name you created
REPO_ID = "ReddyPindi/Baagupadu-Llama-3-8B-Q4"  

# 3. Path to the model
FILE_PATH = "llama-3-8b-Instruct.Q4_K_M.gguf"

print("Logging in to HuggingFace...")
login(token=HF_TOKEN)

print(f"Uploading {FILE_PATH} to {REPO_ID} (This might take a while for 5GB!)...")
api = HfApi()
api.upload_file(
    path_or_fileobj=FILE_PATH,
    path_in_repo=FILE_PATH,
    repo_id=REPO_ID,
    repo_type="model",
)
print("Upload Complete! Your teammate can now download it.")
