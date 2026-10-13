import json
import os
import yaml
from pathlib import Path

# Directories
BASE_DIR = Path(__file__).parent.parent.parent
FRAMEWORKS_DIR = BASE_DIR / "gems" / "nenu_evaru" / "frameworks"
OUTPUT_DIR = BASE_DIR / "gems" / "nenu_evaru" / "okf_frameworks"

def process_dict_to_markdown(data, level=2):
    """Recursively converts a JSON dictionary into Markdown headers and lists."""
    md_content = ""
    if isinstance(data, dict):
        for key, value in data.items():
            # Format the key nicely
            title = key.replace("_", " ").title()
            
            if isinstance(value, dict):
                md_content += f"\n{'#' * level} {title}\n"
                md_content += process_dict_to_markdown(value, level + 1)
            elif isinstance(value, list):
                md_content += f"\n{'#' * level} {title}\n"
                for item in value:
                    if isinstance(item, dict):
                        md_content += process_dict_to_markdown(item, level + 1)
                    else:
                        md_content += f"- {item}\n"
            else:
                md_content += f"**{title}:** {value}\n\n"
    return md_content

def convert_json_to_okf(filepath):
    print(f"Converting {filepath.name}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    # Extract root metadata for the OKF YAML frontmatter
    frontmatter = {
        "id": f"okf-{filepath.stem}",
        "name": data.get("name", filepath.stem),
        "version": data.get("version", "1.0"),
        "description": data.get("description", "Converted from JSON"),
        "type": "framework"
    }
    
    # Remove metadata from the main body so it's not duplicated
    data.pop("name", None)
    data.pop("version", None)
    data.pop("description", None)
    
    # Generate the Markdown Body
    markdown_body = f"# {frontmatter['name']}\n\n"
    markdown_body += process_dict_to_markdown(data)
    
    # Construct final OKF document
    okf_document = "---\n"
    okf_document += yaml.dump(frontmatter, default_flow_style=False)
    okf_document += "---\n\n"
    okf_document += markdown_body
    
    # Save the file
    out_file = OUTPUT_DIR / f"{filepath.stem}.md"
    with open(out_file, 'w', encoding='utf-8') as f:
        f.write(okf_document)
    print(f"  -> Saved to {out_file.name}")

def main():
    if not OUTPUT_DIR.exists():
        OUTPUT_DIR.mkdir(parents=True)
        
    for file in FRAMEWORKS_DIR.glob("*.json"):
        convert_json_to_okf(file)
        
    print(f"Successfully converted all frameworks to OKF format in {OUTPUT_DIR}")

if __name__ == "__main__":
    main()
