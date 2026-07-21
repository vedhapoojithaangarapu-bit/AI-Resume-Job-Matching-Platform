from pathlib import Path


PROMPTS_DIR = Path("prompts")


def load_prompt(filename: str) -> str:
    with open(PROMPTS_DIR / filename, "r", encoding="utf-8") as f:
        return f.read()