const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function post(endpoint: string, body: object) {
  const res = await fetch(`${BASE}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    let errorMsg = `API error ${res.status}`;
    try {
      const errData = await res.json();
      if (errData.detail) {
        if (typeof errData.detail === 'string') {
          errorMsg = errData.detail;
        } else if (Array.isArray(errData.detail)) {
          errorMsg = errData.detail.map((e: any) => `${e.loc?.slice(-1)[0] || 'field'}: ${e.msg}`).join(', ');
        } else if (typeof errData.detail === 'object') {
          errorMsg = String(Object.values(errData.detail)[0]);
        }
      }
    } catch (e) {}
    throw new Error(errorMsg);
  }
  return res.json();
}

export const api = {
  onboard: (data: object) => post("/api/onboard", data),
  skillGap: (data: object) => post("/api/skill-gap", data),
  roadmap: (data: object) => post("/api/roadmap", data),
  chat: (data: object) => post("/api/chat", data),
  resume: (data: object) => post("/api/resume", data),
  compare: (data: object) => post("/api/compare", data),
  quiz: (data: object) => post("/api/quiz", data),
  challenge: (data: object) => post("/api/challenge", data),
  interview: (data: object) => post("/api/interview", data),
  evaluate: (data: object) => post("/api/evaluate", data),
  dailyPlan: (data: object) => post("/api/daily-plan", data),
  progress: (data: object) => post("/api/progress", data),
  salary: (data: object) => post("/api/salary-insights", data),
  jobMarket: (data: object) => post("/api/job-market", data),
  coverLetter: (data: object) => post("/api/cover-letter", data),
  linkedinBio: (data: object) => post("/api/linkedin-bio", data),
  studyBuddy: (data: object) => post("/api/study-buddy", data),
};
