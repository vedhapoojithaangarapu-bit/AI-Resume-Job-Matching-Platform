from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from routers.health import router as health_router
from routers.analyze import router as analyze_router

# Load environment variables
load_dotenv(override=True)

app = FastAPI(
    title="Resume Analyzer API",
    description="Backend for the Prompt Engineering Capstone Project",
    version="1.0.0",
)

@app.on_event("startup")
async def startup_event():
    """Log configuration on startup"""
    model = os.getenv("GEMINI_MODEL", "gemini-3-flash-preview")
    api_key = os.getenv("GEMINI_API_KEY", "")
    print("="*60)
    print("Resume Analyzer API Starting")
    print(f"Model: {model}")
    print(f"API Key: {api_key[:20]}..." if api_key else "No API Key")
    print("="*60)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(analyze_router)