"""
PathAI — Full Backend API
Run: uvicorn api:app --reload
Then open: http://127.0.0.1:8000
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel
from typing import List, Optional
import json, os, traceback
from utils import ai_json, ai_chat, ai
from db import save_profile, get_profile, save_activity, save_quiz_result, save_interview_result, get_progress, get_streak, get_activity_log
from validation import validate_role, validate_skills, validate_interests, validate_education

# ── App setup ─────────────────────────────────────────────────
app = FastAPI(title="PathAI", version="2.0.0")

app.add_middleware(CORSMiddleware,
    allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# Serve static files (CSS/JS if any)
static_dir = os.path.join(os.path.dirname(__file__), "static")
if os.path.exists(static_dir):
    app.mount("/static", StaticFiles(directory=static_dir), name="static")

@app.get("/")
def root():
    html_path = os.path.join(os.path.dirname(__file__), "static", "index.html")
    if os.path.exists(html_path):
        return FileResponse(html_path)
    return {"status": "PathAI running — put index.html in /static folder"}

# ── Helper: safe endpoint wrapper ─────────────────────────────
def safe(func):
    try:
        return func()
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"AI error: {str(e)[:200]}")

# ── Request Models ────────────────────────────────────────────
class OnboardRequest(BaseModel):
    name: str
    skills: List[str]
    interests: List[str]
    education: str
    experience_years: int = 0
    preferred_work_style: str = "remote"
    email: str = ""
    role: str = ""
    short_goal: str = ""
    long_goal: str = ""

class SkillGapRequest(BaseModel):
    skills: List[str]
    target_career: str

class RoadmapRequest(BaseModel):
    target_career: str = ""
    career: str = ""  # frontend sends "career" field
    missing_skills: List[str] = []
    skills: List[str] = []  # frontend sends "skills" field
    available_hours_per_day: int = 2

class ChatRequest(BaseModel):
    message: str
    career_goal: str
    history: List[dict] = []
    user_name: str = "User"

class ResumeRequest(BaseModel):
    resume_text: str
    target_career: str

class CompareRequest(BaseModel):
    career_a: str
    career_b: str
    user_skills: List[str]

class QuizRequest(BaseModel):
    topic: str
    career: str
    difficulty: str = "Easy"
    num_questions: int = 5
    email: str = ""

class ChallengeRequest(BaseModel):
    topic: str
    career: str
    difficulty: str = "Easy"

class InterviewRequest(BaseModel):
    career: str
    level: str = "Fresher"
    email: str = ""

class EvalRequest(BaseModel):
    question: str
    user_answer: str
    career: str

class DailyPlanRequest(BaseModel):
    topic: str
    career: str
    hours: int = 2

class ProgressRequest(BaseModel):
    career: str
    completed_topics: List[str] = []
    total_hours: float = 0

class SalaryRequest(BaseModel):
    career: str
    experience_years: int = 0
    city: str = "Bangalore"

class JobMarketRequest(BaseModel):
    career: str

class CoverLetterRequest(BaseModel):
    job_title: str
    company: str
    user_skills: List[str]
    user_experience: str

class LinkedInRequest(BaseModel):
    name: str
    career_goal: str
    skills: List[str]
    experience: str = ""

class StudyBuddyRequest(BaseModel):
    topic: str
    user_doubt: str
    career: str

# ── Endpoints ─────────────────────────────────────────────────

@app.post("/api/onboard")
def onboard(req: OnboardRequest):
    # Validate all inputs before calling AI
    role_err = validate_role(req.role) if req.role else None
    skills_err = validate_skills(req.skills)
    interests_err = validate_interests(req.interests)
    edu_err = validate_education(req.education)
    errors = {}
    if role_err: errors["role"] = role_err
    if skills_err: errors["skills"] = skills_err
    if interests_err: errors["interests"] = interests_err
    if edu_err: errors["education"] = edu_err
    if errors:
        raise HTTPException(status_code=422, detail=errors)

    def _run():
        skills_str = ", ".join(req.skills)
        interests_str = ", ".join(req.interests)
        result = ai_json(f"""
You are a strict career advisor AI. Analyze ONLY the exact data below. Do NOT invent or assume anything.

EXACT USER DATA:
Name: {req.name}
Skills (use ONLY these): {skills_str}
Interests (use ONLY these): {interests_str}
Education: {req.education}
Experience: {req.experience_years} years
Target role: {req.role}

CRITICAL RULES:
- "strengths" must be a sublist of the EXACT skills provided: [{skills_str}]. Copy them as-is. Do NOT add anything else.
- "growth_areas" must ONLY list skills required for {req.role or "a tech career"} that are NOT in the skills list above.
- match_score must be mathematically strict. Most careers require 6-10 skills. If the user provides only 1 or 2 skills, the match score MUST NOT exceed 20%. Only give scores above 60% if they have 4+ relevant skills. Calculate the match_score for the first career STRICTLY against {req.role or 'the best fit career'}.
- Do NOT invent traits like "Analytical thinking" — only list actual skills the user provided.

Reply ONLY with valid JSON (no markdown, no backticks):
{{
  "personality_type": "<1-3 word type derived from: {interests_str}>",
  "career_archetype": "<derived from interests and skills>",
  "top_careers": [
    {{
      "title": "{req.role or '<best-fit career for skills>'}",
      "match_score": <integer 0-100>,
      "why": "<cite specific skills from: {skills_str}>",
      "salary_range": "<realistic India range>",
      "demand": "<Low/Medium/High/Very High>",
      "time_to_ready": "<realistic duration>",
      "growth": "<growth %>",
      "skills_to_add": ["<skill NOT already in: {skills_str}>"]
    }},
    {{
      "title": "<second best-fit career>",
      "match_score": <integer>,
      "why": "<cite specific skills from: {skills_str}>",
      "salary_range": "<range>",
      "demand": "<demand>",
      "time_to_ready": "<duration>",
      "growth": "<growth %>",
      "skills_to_add": ["<skill NOT in: {skills_str}>"]
    }},
    {{
      "title": "<third best-fit career>",
      "match_score": <integer>,
      "why": "<cite specific skills from: {skills_str}>",
      "salary_range": "<range>",
      "demand": "<demand>",
      "time_to_ready": "<duration>",
      "growth": "<growth %>",
      "skills_to_add": ["<skill NOT in: {skills_str}>"]
    }}
  ],
  "strengths": [<copy ONLY items from this exact list that are real skills: {req.skills}>],
  "growth_areas": [<skills required for {req.role or "tech career"} NOT present in: {req.skills}>],
  "next_steps": ["<concrete step based on gaps>", "<second step>", "<third step>"],
  "recommended_first_step": "<specific actionable step>",
  "motivational_quote": "<short motivational quote>"
}}""", 1500, 0.0)
        if req.email:
            try:
                save_profile(req.email, {
                    "name": req.name, "role": req.role,
                    "skills": ",".join(req.skills),
                    "interests": ",".join(req.interests),
                    "education": req.education,
                    "short_goal": req.short_goal,
                    "long_goal": req.long_goal,
                    "ai_profile": result,
                })
                save_activity(req.email, "onboard")
            except Exception as e:
                print(f"DB save error: {e}")
        return result
    return safe(_run)


@app.post("/api/skill-gap")
def skill_gap(req: SkillGapRequest):
    skills_err = validate_skills(req.skills)
    if skills_err:
        raise HTTPException(status_code=422, detail={"skills": skills_err})
    role_err = validate_role(req.target_career)
    if role_err:
        raise HTTPException(status_code=422, detail={"target_career": role_err})
    return safe(lambda: ai_json(f"""
You are a career skills analyst. Analyze the skill gap for this specific user.

Target career: {req.target_career}
User's current skills: {req.skills}

IMPORTANT:
- Only list skills that the user ACTUALLY provided in user_has. Do NOT add skills they didn't mention.
- Only suggest missing skills that are genuinely required for {req.target_career}.
- Calculate readiness_percent based ONLY on the skills the user actually has vs what is required for {req.target_career}. Most careers require 6-10 skills. If the user provides only 1 or 2 skills, the score MUST NOT exceed 20%.
- Do NOT invent or assume skills the user hasn't listed.
- If the target career is nonsensical or fake (e.g. "abc", "xyz", "test"), set readiness_percent to 0 and explain in the priority_skills why field.

Reply ONLY with valid JSON, no markdown, no backticks:
{{
  "target_career": "<exact value from input>",
  "readiness_percent": <integer 0-100, mathematically strict. Max 20% per relevant skill the user actually has>,
  "user_has": [<list only the skills from {req.skills} that are relevant to {req.target_career}>],
  "user_is_missing": [<list only the skills genuinely required for {req.target_career} that are NOT in {req.skills}>],
  "priority_skills": [
    {{
      "skill": "<actual missing skill name>",
      "importance": "Critical or High or Medium",
      "weeks_to_learn": <realistic integer>,
      "resource": "<real learning resource name>",
      "link": "<real URL>",
      "why": "<specific reason why this skill is needed for {req.target_career}>"
    }}
  ]
}}"""))


@app.post("/api/roadmap")
def roadmap(req: RoadmapRequest):
    # Support both field names from frontend
    career = (req.career or req.target_career or "").strip()
    skills = req.skills or req.missing_skills or []

    role_err = validate_role(career)
    if role_err:
        raise HTTPException(status_code=422, detail={"career": role_err})

    return safe(lambda: ai_json(f"""
You are a career learning roadmap generator.

Target career: {career}
User's current skills: {skills}
Hours per day available: {req.available_hours_per_day}

IMPORTANT:
- Generate a roadmap specifically for "{career}". Do NOT use example data for a different career.
- If "{career}" is not a real or recognized career (e.g. gibberish like "sof", "abc", "xyz"), return an empty steps array.
- Base the roadmap on what is genuinely required to become a {career}.
- Do NOT include skills the user already has in {skills} as steps (they already know them).

Reply ONLY with valid JSON, no markdown, no backticks:
{{
  "career": "{career}",
  "steps": [
    {{
      "title": "<specific topic for {career}>",
      "link": "<real learning resource URL>",
      "lessons": ["<subtopic 1>", "<subtopic 2>", "<subtopic 3>"]
    }}
  ]
}}

Generate 6-10 steps appropriate for becoming a {career}. Each step must be genuinely relevant to {career}.
""", 2000))

@app.post("/api/chat")
def chat(req: ChatRequest):
    return safe(lambda: _chat(req))

def _chat(req):
    system = f"""You are PathAI Mentor, a world-class career coach.
User name: {req.user_name}. Career goal: {req.career_goal}.
Be friendly, specific, practical. Max 3-4 sentences. End with encouragement.
Give ONE actionable next step when asked what to do."""
    msgs = list(req.history) + [{"role": "user", "content": req.message}]
    reply = ai_chat(msgs, system)
    new_history = msgs + [{"role": "assistant", "content": reply}]
    return {"reply": reply, "history": new_history}


@app.post("/api/resume")
def resume(req: ResumeRequest):
    def _run(): return ai_json(f"""
You are a strict resume screening AI. First determine if the provided text is actually a resume or CV.

A resume must contain at least some of: name, contact info, work experience, education, skills, projects.
If the text is NOT a resume (e.g. it is a random document, article, code file, or gibberish), you MUST return an error response.

Text submitted:
{req.resume_text[:2000]}

Target role: {req.target_career}

If this is NOT a resume, reply with:
{{"error": true, "message": "The uploaded text does not appear to be a resume. Please upload your actual resume/CV."}}

If it IS a resume, analyze it strictly based on the ACTUAL content of the resume above. Do NOT use placeholder values.
Calculate all scores based on what is actually present in the resume text.
Reply ONLY with valid JSON, no markdown, no backticks:
{{
  "overall_score": <integer 0-100 based on actual resume quality>,
  "grade": "<letter grade A/B/C/D based on score>",
  "sections": {{
    "impact": <integer 0-100>,
    "skills": <integer 0-100>,
    "experience": <integer 0-100>,
    "education": <integer 0-100>,
    "formatting": <integer 0-100>
  }},
  "ats_score": <integer 0-100>,
  "keywords_found": [<actual keywords found in the resume relevant to {req.target_career}>],
  "keywords_missing": [<actual important keywords for {req.target_career} NOT found in the resume>],
  "strengths": [<actual strengths observed in this specific resume>],
  "improvements": [
    {{"issue": "<actual issue found>", "fix": "<specific actionable fix>", "priority": "High or Medium or Low"}}
  ],
  "ats_keywords_to_add": [<actual keywords to add for better ATS score for {req.target_career}>]
}}""", max_tokens=3000)
    return safe(_run)


@app.post("/api/compare")
def compare(req: CompareRequest):
    err_a = validate_role(req.career_a)
    if err_a:
        raise HTTPException(status_code=422, detail={"career_a": err_a})
    err_b = validate_role(req.career_b)
    if err_b:
        raise HTTPException(status_code=422, detail={"career_b": err_b})

    return safe(lambda: ai_json(f"""
Compare these careers for someone with skills: {req.user_skills}
Career A: {req.career_a}
Career B: {req.career_b}

Reply ONLY with valid JSON, no markdown, no backticks:
{{
  "winner": "{req.career_a}",
  "winner_reason": "Better match for current skills",
  "careers": {{
    "{req.career_a}": {{
      "match_score": <integer 0-100, mathematically strict. Max 20% per relevant skill in {req.user_skills}>,
      "salary_range": "8-20 LPA",
      "demand": "Very High",
      "difficulty": "Medium",
      "months_to_ready": 8,
      "skills_to_learn": ["ML", "Stats"],
      "job_openings_india": "45000 plus",
      "best_for": "People who love data and patterns"
    }},
    "{req.career_b}": {{
      "match_score": <integer 0-100, mathematically strict. Max 20% per relevant skill in {req.user_skills}>,
      "salary_range": "6-15 LPA",
      "demand": "High",
      "difficulty": "Medium",
      "months_to_ready": 6,
      "skills_to_learn": ["APIs", "Databases"],
      "job_openings_india": "80000 plus",
      "best_for": "People who like building systems"
    }}
  }}
}}"""))


@app.post("/api/quiz")
def quiz(req: QuizRequest):
    err = validate_role(req.career)
    if err: raise HTTPException(status_code=422, detail={"career": err})
    return safe(lambda: ai_json(f"""
Create exactly {req.num_questions} {req.difficulty} MCQ questions on {req.topic} for {req.career} learners.

Reply ONLY with valid JSON, no markdown, no backticks:
{{
  "topic": "{req.topic}",
  "difficulty": "{req.difficulty}",
  "questions": [
    {{
      "id": 1,
      "question": "What does a pandas DataFrame represent?",
      "options": {{"A": "A single column of data", "B": "A 2D table with rows and columns", "C": "A type of chart", "D": "A list of numbers"}},
      "correct": "B",
      "explanation": "A DataFrame is a 2D labeled data structure like a spreadsheet.",
      "points": 10
    }}
  ]
}}""", 2000))


@app.post("/api/challenge")
def challenge(req: ChallengeRequest):
    err = validate_role(req.career)
    if err: raise HTTPException(status_code=422, detail={"career": err})
    return safe(lambda: ai_json(f"""
Create one {req.difficulty} coding challenge on {req.topic} for {req.career} learners.

Reply ONLY with valid JSON, no markdown, no backticks:
{{
  "title": "Find the Most Frequent Element",
  "difficulty": "{req.difficulty}",
  "topic": "{req.topic}",
  "problem": "Write a Python function that takes a list and returns the most frequent element.",
  "constraints": ["1 <= len(arr) <= 1000", "Elements are integers"],
  "examples": [
    {{"input": "[1,2,2,3,3,3]", "output": "3", "explanation": "3 appears 3 times"}}
  ],
  "hint": "Think about using a dictionary to count frequencies",
  "starter_code": "def most_frequent(arr):\\n    # Your code here\\n    pass",
  "solution": "def most_frequent(arr):\\n    count = {{}}\\n    for x in arr:\\n        count[x] = count.get(x, 0) + 1\\n    return max(count, key=count.get)"
}}"""))


@app.post("/api/interview")
def interview(req: InterviewRequest):
    err = validate_role(req.career)
    if err: raise HTTPException(status_code=422, detail={"career": err})
    return safe(lambda: ai_json(f"""
Generate 5 interview questions for {req.level} {req.career} role.
Mix: 2 technical, 1 conceptual, 1 situational, 1 HR.

Reply ONLY with valid JSON, no markdown, no backticks:
{{
  "career": "{req.career}",
  "level": "{req.level}",
  "questions": [
    {{
      "id": 1,
      "type": "Technical",
      "question": "Explain the difference between supervised and unsupervised learning.",
      "model_answer": "Supervised learning uses labeled data to train a model to make predictions. Unsupervised learning finds patterns in data without labels.",
      "keywords": ["labels", "prediction", "clustering"],
      "time_limit_seconds": 120,
      "follow_up": "Can you give a real-world example?"
    }}
  ]
}}"""))


@app.post("/api/evaluate")
def evaluate(req: EvalRequest):
    err = validate_role(req.career)
    if err: raise HTTPException(status_code=422, detail={"career": err})
    return safe(lambda: ai_json(f"""
You are a strict technical interviewer evaluating a candidate answer for a {req.career} role.
Be HONEST and ACCURATE. If the answer is wrong, vague, or incomplete — give a LOW score. Do not be encouraging if the answer is bad.

Question: {req.question}
Candidate answer: {req.user_answer}

Scoring rules:
- 0-3: Answer is wrong, irrelevant, or just "I don't know"
- 4-5: Partially correct but missing key points
- 6-7: Mostly correct with minor gaps
- 8-9: Complete, accurate, with examples
- 10: Perfect answer with depth and real-world application

If the candidate says "I don't know", "not sure", or gives a blank/irrelevant answer, score MUST be 0-2.

Reply ONLY with valid JSON, no markdown, no backticks. Generate scores based on the ACTUAL answer quality:
{{
  "score": <integer 0-10 based strictly on answer quality>,
  "max_score": 10,
  "grade": "<Poor/Needs Work/Average/Good/Excellent based on score>",
  "breakdown": {{
    "accuracy": <0-10>,
    "completeness": <0-10>,
    "clarity": <0-10>,
    "examples": <0-10>
  }},
  "good": [<what they got right, empty list if nothing>],
  "missing": [<what was wrong or missing, be specific>],
  "model_answer": "<concise ideal answer in 2-3 sentences>",
  "tip": "<one specific improvement tip>"
}}"""))


@app.post("/api/daily-plan")
def daily_plan(req: DailyPlanRequest):
    err = validate_role(req.career)
    if err: raise HTTPException(status_code=422, detail={"career": err})
    return safe(lambda: ai_json(f"""
Create a 7-day study plan for {req.topic} for a {req.career} learner with {req.hours} hours per day.

Reply ONLY with valid JSON, no markdown, no backticks:
{{
  "topic": "{req.topic}",
  "total_hours": {req.hours * 7},
  "days": [
    {{
      "day": 1,
      "title": "Introduction and Setup",
      "tasks": ["Install required library 20 min", "Read official docs chapter 1 40 min", "Complete exercise set A 60 min"],
      "resource": "Official documentation",
      "link": "https://docs.python.org",
      "checkpoint": "Run your first script successfully"
    }},
    {{
      "day": 2,
      "title": "Core Concepts",
      "tasks": ["Watch tutorial video 30 min", "Practice 5 exercises 60 min", "Review notes 30 min"],
      "resource": "YouTube freeCodeCamp",
      "link": "https://youtube.com",
      "checkpoint": "Understand the 3 main concepts"
    }},
    {{
      "day": 3,
      "title": "Hands-on Practice",
      "tasks": ["Work on mini project 90 min", "Debug and fix errors 30 min"],
      "resource": "Kaggle exercises",
      "link": "https://kaggle.com/learn",
      "checkpoint": "Complete mini project"
    }},
    {{
      "day": 4,
      "title": "Deep Dive",
      "tasks": ["Advanced features 60 min", "Read real-world examples 60 min"],
      "resource": "Medium articles",
      "link": "https://medium.com",
      "checkpoint": "Understand advanced usage"
    }},
    {{
      "day": 5,
      "title": "Project Day",
      "tasks": ["Build small project from scratch 120 min"],
      "resource": "GitHub for inspiration",
      "link": "https://github.com",
      "checkpoint": "Working project on your machine"
    }},
    {{
      "day": 6,
      "title": "Review and Revise",
      "tasks": ["Revisit weak areas 60 min", "Redo difficult exercises 60 min"],
      "resource": "Your own notes",
      "link": "",
      "checkpoint": "All concepts clear"
    }},
    {{
      "day": 7,
      "title": "Quiz and Assessment",
      "tasks": ["Take online quiz 30 min", "Summarize learnings 30 min", "Plan next week 30 min"],
      "resource": "PathAI Quiz",
      "link": "",
      "checkpoint": "Score above 70 percent in quiz"
    }}
  ]
}}"""))


@app.post("/api/progress")
def progress(req: ProgressRequest):
    err = validate_role(req.career)
    if err: raise HTTPException(status_code=422, detail={"career": err})
    return safe(lambda: ai_json(f"""
Give a progress report for someone learning to become a {req.career}.
Completed topics: {req.completed_topics}
Total hours studied: {req.total_hours}

Reply ONLY with valid JSON, no markdown, no backticks:
{{
  "completion_percent": 35,
  "level": "Intermediate Beginner",
  "badge": "Rising Star",
  "xp_points": 450,
  "message": "You are making great progress! Keep going.",
  "next_topic": "Machine Learning Basics",
  "next_reason": "You have built the foundation, now it is time to level up",
  "weekly_goal": "Complete 2 more topics this week",
  "estimated_job_ready": "4 months from now"
}}"""))


@app.post("/api/salary-insights")
def salary(req: SalaryRequest):
    err = validate_role(req.career)
    if err: raise HTTPException(status_code=422, detail={"career": err})
    return safe(lambda: ai_json(f"""
Give salary insights for {req.career} with {req.experience_years} years experience in {req.city} India.

Reply ONLY with valid JSON, no markdown, no backticks:
{{
  "career": "{req.career}",
  "city": "{req.city}",
  "salary_ranges": {{
    "fresher": "4-8 LPA",
    "1_3_years": "8-15 LPA",
    "3_5_years": "15-25 LPA",
    "5_plus": "25-50 LPA"
  }},
  "your_expected": "6 LPA",
  "top_paying_companies": ["Google", "Microsoft", "Amazon", "Flipkart", "Swiggy"],
  "top_paying_cities": ["Bangalore", "Hyderabad", "Mumbai"],
  "skills_that_increase_salary": ["Deep Learning", "MLOps", "Cloud AWS"],
  "salary_tip": "Getting AWS certified can increase your salary by 20 to 30 percent",
  "freelance_potential": "2000 to 8000 rupees per hour on Upwork"
}}"""))


@app.post("/api/job-market")
def job_market(req: JobMarketRequest):
    err = validate_role(req.career)
    if err: raise HTTPException(status_code=422, detail={"career": err})
    return safe(lambda: ai_json(f"""
Give job market analysis for {req.career} in India.

Reply ONLY with valid JSON, no markdown, no backticks:
{{
  "career": "{req.career}",
  "market_score": 88,
  "demand_trend": "Rising",
  "openings_india": "50000 plus",
  "top_hiring_companies": ["Amazon", "Google", "Swiggy", "Zomato", "Meesho"],
  "top_skills_in_demand": ["Python", "Machine Learning", "SQL", "Statistics"],
  "emerging_skills": ["LLMs", "MLOps", "Vector Databases"],
  "remote_opportunities": "High",
  "interview_difficulty": "Medium-High",
  "best_job_portals": ["LinkedIn", "Naukri", "Instahyre", "AngelList"],
  "insider_tip": "90 percent of DS jobs require SQL so make it your top priority this week"
}}"""))


@app.post("/api/cover-letter")
def cover_letter(req: CoverLetterRequest):
    err = validate_role(req.job_title)
    if err: raise HTTPException(status_code=422, detail={"job_title": err})
    return safe(lambda: {
        "cover_letter": ai(f"""Write a compelling 250-word cover letter for {req.job_title} at {req.company}.
Applicant skills: {req.user_skills}. Experience: {req.user_experience}.
Make it specific, confident, and results-focused. Do not use placeholders.""", 600)
    })


@app.post("/api/linkedin-bio")
def linkedin_bio(req: LinkedInRequest):
    err = validate_role(req.career_goal)
    if err: raise HTTPException(status_code=422, detail={"career_goal": err})
    return safe(lambda: {
        "bio": ai(f"""Write a powerful LinkedIn About section in 150 words for {req.name}.
Career goal: {req.career_goal}. Skills: {req.skills}. Experience: {req.experience}.
Make it compelling, keyword-rich for recruiters, and authentic. Write in first person.""", 400)
    })


@app.post("/api/study-buddy")
def study_buddy(req: StudyBuddyRequest):
    err = validate_role(req.career)
    if err: raise HTTPException(status_code=422, detail={"career": err})
    return safe(lambda: {
        "explanation": ai(f"""You are a patient brilliant tutor helping someone learn {req.topic} for a {req.career} career.
Their question: {req.user_doubt}
Explain with: 1) Simple explanation 2) Real-world analogy 3) Short code example if relevant.
Be encouraging. Max 150 words.""", 400)
    })

# ── DB-backed endpoints ───────────────────────────────────────────────────────

@app.get("/api/user-progress")
def user_progress(email: str):
    """Return real activity, streak, quiz and interview counts from SQLite."""
    try:
        data = get_progress(email)
        return JSONResponse(data)
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)


@app.get("/api/user-profile")
def user_profile(email: str):
    """Return full saved profile from SQLite."""
    try:
        profile = get_profile(email)
        if not profile:
            return JSONResponse({"found": False})
        return JSONResponse({**profile, "found": True})
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)
