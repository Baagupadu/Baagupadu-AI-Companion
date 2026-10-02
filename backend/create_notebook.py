import json

notebook = {
 "cells": [
  {
   "cell_type": "markdown",
   "metadata": {},
   "source": [
    "# Baagupadu Best Friend Distillation (Unsloth)\n",
    "Run this notebook in Google Colab with a free T4 GPU to train your custom model!"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": None,
   "metadata": {},
   "outputs": [],
   "source": [
    "%%capture\n",
    "# 1. Install Unsloth and Dependencies\n",
    "!pip install \"unsloth[colab-new] @ git+https://github.com/unslothai/unsloth.git\"\n",
    "!pip install --no-deps \"xformers<0.0.27\" \"trl<0.9.0\" peft accelerate bitsandbytes"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": None,
   "metadata": {},
   "outputs": [],
   "source": [
    "from unsloth import FastLanguageModel\n",
    "import torch\n",
    "max_seq_length = 2048\n",
    "dtype = None\n",
    "load_in_4bit = True\n",
    "\n",
    "# 2. Load the base Llama-3-8B model in 4-bit (to fit on free GPU)\n",
    "model, tokenizer = FastLanguageModel.from_pretrained(\n",
    "    model_name = \"unsloth/llama-3-8b-Instruct-bnb-4bit\",\n",
    "    max_seq_length = max_seq_length,\n",
    "    dtype = dtype,\n",
    "    load_in_4bit = load_in_4bit,\n",
    ")\n",
    "\n",
    "# Add LoRA adapters\n",
    "model = FastLanguageModel.get_peft_model(\n",
    "    model,\n",
    "    r = 16,\n",
    "    target_modules = [\"q_proj\", \"k_proj\", \"v_proj\", \"o_proj\",\n",
    "                      \"gate_proj\", \"up_proj\", \"down_proj\",],\n",
    "    lora_alpha = 16,\n",
    "    lora_dropout = 0,\n",
    "    bias = \"none\",    \n",
    "    use_gradient_checkpointing = \"unsloth\",\n",
    "    random_state = 3407,\n",
    "    use_rslora = False,\n",
    "    loftq_config = None,\n",
    ")"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": None,
   "metadata": {},
   "outputs": [],
   "source": [
    "# 3. Load Your Custom Dataset\n",
    "# IMPORTANT: Upload your dataset.jsonl file to the Colab sidebar first!\n",
    "from datasets import load_dataset\n",
    "from unsloth.chat_templates import get_chat_template\n",
    "\n",
    "tokenizer = get_chat_template(\n",
    "    tokenizer,\n",
    "    chat_template = \"llama-3\",\n",
    "    mapping = {\"role\" : \"role\", \"content\" : \"content\", \"user\" : \"user\", \"assistant\" : \"assistant\"}\n",
    ")\n",
    "\n",
    "def formatting_prompts_func(examples):\n",
    "    convos = examples[\"messages\"]\n",
    "    texts = [tokenizer.apply_chat_template(convo, tokenize = False, add_generation_prompt = False) for convo in convos]\n",
    "    return { \"text\" : texts, }\n",
    "\n",
    "dataset = load_dataset(\"json\", data_files=\"dataset.jsonl\", split=\"train\")\n",
    "dataset = dataset.map(formatting_prompts_func, batched = True,)\n",
    "print(\"Dataset loaded successfully!\")"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": None,
   "metadata": {},
   "outputs": [],
   "source": [
    "# 4. Train the Model!\n",
    "from trl import SFTTrainer\n",
    "from transformers import TrainingArguments\n",
    "from unsloth import is_bfloat16_supported\n",
    "\n",
    "trainer = SFTTrainer(\n",
    "    model = model,\n",
    "    tokenizer = tokenizer,\n",
    "    train_dataset = dataset,\n",
    "    dataset_text_field = \"text\",\n",
    "    max_seq_length = max_seq_length,\n",
    "    dataset_num_proc = 2,\n",
    "    packing = False, # Can make training 5x faster for short sequences.\n",
    "    args = TrainingArguments(\n",
    "        per_device_train_batch_size = 2,\n",
    "        gradient_accumulation_steps = 4,\n",
    "        warmup_steps = 5,\n",
    "        max_steps = 60,\n",
    "        learning_rate = 2e-4,\n",
    "        fp16 = not is_bfloat16_supported(),\n",
    "        bf16 = is_bfloat16_supported(),\n",
    "        logging_steps = 1,\n",
    "        optim = \"adamw_8bit\",\n",
    "        weight_decay = 0.01,\n",
    "        lr_scheduler_type = \"linear\",\n",
    "        seed = 3407,\n",
    "        output_dir = \"outputs\",\n",
    "    ),\n",
    ")\n",
    "\n",
    "trainer_stats = trainer.train()"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": None,
   "metadata": {},
   "outputs": [],
   "source": [
    "# 5. Export to GGUF so you can run it locally on your Mac!\n",
    "model.save_pretrained_gguf(\"Baagupadu_Llama3_8B\", tokenizer, quantization_method = \"q4_k_m\")\n",
    "print(\"Done! You can now download the Baagupadu_Llama3_8B-unsloth.Q4_K_M.gguf file from the sidebar.\")"
   ]
  }
 ],
 "metadata": {
  "language_info": {
   "name": "python"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 4
}

import os
os.makedirs("notebooks", exist_ok=True)
with open("notebooks/Baagupadu_Unsloth_FineTuning.ipynb", "w") as f:
    json.dump(notebook, f, indent=1)
print("Notebook created successfully at notebooks/Baagupadu_Unsloth_FineTuning.ipynb")
