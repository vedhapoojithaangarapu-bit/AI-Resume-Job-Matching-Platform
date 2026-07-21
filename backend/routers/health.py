from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def root():
    return {
        "message": "Welcome to the Resume Analyzer API!"
    }


@router.get("/health")
def health():
    return {
        "status": "running"
    }