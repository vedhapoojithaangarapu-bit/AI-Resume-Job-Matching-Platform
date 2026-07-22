import json
from google import genai
from config.settings import GEMINI_API_KEY

client = genai.Client(api_key=GEMINI_API_KEY)


def generate_response(prompt: str) -> str:
    """
    Sends a prompt to Gemini and returns clean JSON text.
    Raises an exception if the response is not valid JSON.
    """

    import time
    time.sleep(3)
    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=prompt,
    )

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