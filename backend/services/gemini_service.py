import json
import os
import time
from google import genai

# Initialize client once
def _get_client():
    from config.settings import GEMINI_API_KEY
    return genai.Client(api_key=GEMINI_API_KEY)

def _get_model():
    """Get the model name, refreshing from environment each time"""
    return os.getenv("GEMINI_MODEL", "gemini-1.5-flash")


def generate_response(prompt: str, max_retries: int = 3) -> str:
    """
    Sends a prompt to Gemini and returns clean JSON text.
    Raises an exception if the response is not valid JSON.
    Includes retry logic for network errors.
    """
    client = _get_client()
    model = _get_model()
    
    print(f"[Gemini] Using model: {model}")
    
    time.sleep(3)
    
    last_error = None
    for attempt in range(max_retries):
        try:
            print(f"[Gemini] Attempt {attempt + 1}/{max_retries}")
            response = client.models.generate_content(
                model=model,
                contents=prompt,
            )
            
            if not response.text:
                raise Exception("Gemini returned an empty response.")
            
            # Successfully got response, break retry loop
            break
            
        except Exception as e:
            last_error = e
            error_str = str(e)
            print(f"[Gemini] Error on attempt {attempt + 1}: {error_str}")
            
            # Check if it's a network error
            if "getaddrinfo failed" in error_str or "11001" in error_str:
                if attempt < max_retries - 1:
                    wait_time = (attempt + 1) * 2  # 2, 4, 6 seconds
                    print(f"[Gemini] Network error. Retrying in {wait_time}s...")
                    time.sleep(wait_time)
                    continue
            
            # For non-network errors or last attempt, raise immediately
            raise
    else:
        # All retries exhausted
        print(f"[Gemini] All {max_retries} attempts failed")
        raise last_error

    if not response.text:
        raise Exception("Gemini returned an empty response.")

    text = response.text.strip()

    if text.startswith("```json"):
        text = text[7:]

    if text.startswith("```"):
        text = text[3:]

    if text.endswith("```"):
        text = text[:-3]

    text = text.strip()
    print("=" * 80)
    print(text)
    print("=" * 80)
    # Validate JSON before returning
    try:
        json.loads(text)
    except json.JSONDecodeError as e:
        raise Exception(
            f"""
    Gemini did not return valid JSON.

    JSON Error:
    {e}

    Error Position:
    {e.pos}

    Response:
    {text}
    """
        ) from e

    return text