from pydantic import BaseModel


class JobMatchRequest(BaseModel):
    resume_text: str
    job_description: str


class CareerGuidanceRequest(BaseModel):
    resume_text: str
    target_career: str