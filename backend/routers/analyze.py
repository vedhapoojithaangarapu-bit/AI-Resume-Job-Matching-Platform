import traceback

from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from services.pipeline import analyze_job_match
from utils.pdf_reader import extract_text_from_pdf
import os
import shutil
import uuid

router = APIRouter(prefix="/analyze", tags=["Analyze"])

UPLOAD_DIR = "temp_uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/job-match")
async def job_match(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    print("===== Endpoint reached =====")
    unique_name = f"{uuid.uuid4()}_{resume.filename}"
    file_path = os.path.join(UPLOAD_DIR, unique_name)

    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(resume.file, buffer)

        resume_text = extract_text_from_pdf(file_path)

        result = analyze_job_match(
            resume_text,
            job_description
        )

        return result
    
    except Exception as e:
        message = str(e)
        print(f"ERROR in /analyze/job-match: {message}")
        print(traceback.format_exc())

        if "RESOURCE_EXHAUSTED" in message or "429" in message:
            raise HTTPException(
                status_code=429,
                detail="Gemini API quota exceeded. Please try again later."
            )

        if "UNAVAILABLE" in message or "503" in message:
            raise HTTPException(
                status_code=503,
                detail="Gemini is currently experiencing high demand. Please try again shortly."
            )

        if "Invalid API key" in message or "API_KEY" in message:
            raise HTTPException(
                status_code=401,
                detail="Invalid API key. Please check your Gemini API configuration."
            )

        if "not found" in message.lower() or "does not exist" in message.lower():
            raise HTTPException(
                status_code=400,
                detail="The specified Gemini model is not available. Please contact support."
            )

        raise HTTPException(
            status_code=500,
            detail=f"Analysis failed: {message}"
        )

    finally:
        if os.path.exists(file_path):
            os.remove(file_path)