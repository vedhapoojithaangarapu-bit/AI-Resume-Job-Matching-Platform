import json
from pathlib import Path
from services.gemini_service import generate_response

PROMPTS_DIR = Path("prompts")


def load_prompt(filename: str) -> str:
    with open(PROMPTS_DIR / filename, "r", encoding="utf-8") as f:
        return f.read()


def build_prompt(system_prompt: str, task_prompt: str, input_data: str) -> str:
    return f"""
SYSTEM INSTRUCTIONS
-------------------
{system_prompt}

TASK INSTRUCTIONS
-----------------
{task_prompt}

INPUT
-----
{input_data}
"""


# Load the system prompt once
system_prompt = load_prompt("system_prompt.md")


def analyze_job_match(resume_text: str, job_description: str):

    # ==========================
    # Step 1 - Resume Parser
    # ==========================
    resume_prompt = load_prompt("resume_parser.md")

    resume_response = generate_response(
        build_prompt(
            system_prompt,
            resume_prompt,
            f"RESUME:\n{resume_text}"
        )
    )

    resume_json = json.loads(resume_response)

    # ==========================
    # Step 2 - JD Parser
    # ==========================
    jd_prompt = load_prompt("jd_parser.md")

    jd_response = generate_response(
        build_prompt(
            system_prompt,
            jd_prompt,
            f"JOB DESCRIPTION:\n{job_description}"
        )
    )

    jd_json = json.loads(jd_response)

    # ==========================
    # Step 3 - Worker
    # ==========================
    worker_prompt = load_prompt("worker.md")

    worker_input = json.dumps(
        {
            "activeGoal": "Applying for a Job",
            "resumeParserOutput": resume_json,
            "jdParserOutput": jd_json,
        },
        indent=2,
    )

    worker_response = generate_response(
        build_prompt(
            system_prompt,
            worker_prompt,
            worker_input
        )
    )

    worker_json = json.loads(worker_response)

    # ==========================
    # Step 4 - Recommendation
    # ==========================
    recommendation_prompt = load_prompt("recommendation.md")

    recommendation_input = json.dumps(worker_json, indent=2)

    recommendation_response = generate_response(
        build_prompt(
            system_prompt,
            recommendation_prompt,
            recommendation_input
        )
    )

    recommendation_json = json.loads(recommendation_response)

    # ==========================
    # Step 5 - Validator
    # ==========================
    validator_prompt = load_prompt("validator.md")

    validator_input = json.dumps(
    {
        "resumeParserOutput": resume_json,
        "jdParserOutput": jd_json,
        "workerOutput": worker_json,
        "recommendationOutput": recommendation_json,
    },
    indent=2,
)

    validator_response = generate_response(
        build_prompt(
            system_prompt,
            validator_prompt,
            validator_input
        )
    )

    validator_json = json.loads(validator_response)

    # ==========================
    # Step 6 - Critic
    # ==========================
    critic_prompt = load_prompt("critic.md")

    if not validator_json.get("isValid", False):
        return {
        "status": "VALIDATION_FAILED",
        "validation_report": validator_json
    }

    critic_input = json.dumps(
        validator_json.get("correctedOutput", validator_json),
        indent=2
    )

    final_response = generate_response(
        build_prompt(
            system_prompt,
            critic_prompt,
            critic_input
        )
    )

    final_json = json.loads(final_response)

    return {
        "status": "SUCCESS",
        "report": final_json
    }