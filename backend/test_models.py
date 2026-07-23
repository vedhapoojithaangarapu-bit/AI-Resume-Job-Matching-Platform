from google import genai
from dotenv import load_dotenv
import os

# Load .env
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

print("API Key loaded:", "Yes" if api_key else "No")

client = genai.Client(api_key=api_key)

print("\nAvailable models:\n")

for model in client.models.list():
    print(model.name)