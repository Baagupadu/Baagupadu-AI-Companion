import os
import re
from pathlib import Path

# Base directory for the markdown files
BASE_DIR = Path(__file__).parent.parent.parent
GEMS_DIR = BASE_DIR / "gems" / "nenu_evaru"

TARGET_FOLDERS = ["memory", "output", "prompts", "inference"]

def clean_existing_content(content: str) -> str:
    """Removes messy or incomplete frontmatter like 'text\n---' if present at the very top."""
    # If it starts with standard frontmatter, try to clean it
    if content.startswith("---"):
        # Find the second occurrence of ---
        parts = content.split("---", 2)
        if len(parts) >= 3:
            # Check if the block contained actual yaml or just junk like "text"
            block = parts[1].strip()
            if "id:" not in block and "type:" not in block:
                # It's likely junk frontmatter, strip it and return the rest
                return parts[2].lstrip()
    return content.lstrip()

def process_file(filepath: Path, folder_name: str):
    print(f"Processing: {filepath.name}...")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Check if it already has our OKF frontmatter
    if content.startswith("---") and f"id: okf-{folder_name}" in content:
        print("  -> Already OKF compliant. Skipping.")
        return

    # Clean any messy headers
    clean_content = clean_existing_content(content)
    
    # Generate human-readable name
    human_name = filepath.stem.replace("_", " ").title()
    
    # Construct the YAML Frontmatter
    frontmatter = (
        "---\n"
        f"id: okf-{folder_name}-{filepath.stem}\n"
        f"name: \"{human_name}\"\n"
        f"type: {folder_name}\n"
        f"description: OKF Document containing logic and rules for {human_name}.\n"
        "---\n\n"
    )
    
    # Combine
    final_content = frontmatter + clean_content
    
    # Write back to file
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(final_content)
        
    print(f"  -> Successfully injected OKF metadata!")

def main():
    print("=========================================")
    print("Starting OKF Metadata Injection Script")
    print("=========================================")
    
    total_processed = 0
    for folder in TARGET_FOLDERS:
        folder_path = GEMS_DIR / folder
        if not folder_path.exists():
            continue
            
        for md_file in folder_path.glob("*.md"):
            process_file(md_file, folder)
            total_processed += 1
            
    print("\n[✔] Complete!")
    print(f"Processed {total_processed} files.")

if __name__ == "__main__":
    main()
