# AIVentra — AI-Powered Career Platform

## Project Structure

```
aiventra/
├── backend/                ← Python / FastAPI
│   ├── api.py              ← All API routes
│   ├── config.py           ← Groq client setup
│   ├── utils.py            ← AI helpers
│   ├── db.py               ← SQLite persistence (auto-created)
│   ├── requirements.txt
│   └── .env                ← GROQ_API_KEY (already set)
│
├── src/
│   ├── app/
│   │   ├── (main)/         ← Authenticated pages (dashboard, quiz, etc.)
│   │   ├── login/
│   │   └── onboarding/
│   ├── components/
│   ├── lib/                ← api.ts, activity.ts
│   ├── store/              ← Zustand
│   ├── hooks/
│   └── types/
│
├── public/
├── package.json
├── .env.local              ← NEXT_PUBLIC_API_URL=http://localhost:8000
└── README.md
```

## Quick Start

### Step 1 — Backend

```bash
cd aiventra/backend
pip install -r requirements.txt
uvicorn api:app --reload
```

Backend runs at: **http://localhost:8000**

### Step 2 — Frontend (new terminal)

```bash
cd aiventra
npm install
npm run dev
```

Frontend runs at: **http://localhost:3000**

## Database

**No MongoDB or external DB needed.**

The backend uses **SQLite** — `backend/aiventra.db` is created automatically
the first time you run the server. It stores:

| Table | What |
|---|---|
| `profiles` | User profile + AI career analysis |
| `activity` | Daily activity log (used for streak) |
| `quiz_results` | Quiz scores per topic |
| `interview_results` | Mock interview avg scores |

The frontend also uses **localStorage** for instant UI updates (streak counter,
badge unlocks, etc.). Both stay in sync — localStorage is the fast cache,
SQLite is the durable store.

## Environment Variables

**`backend/.env`** — for the AI:
```
GROQ_API_KEY=your_groq_key_here
```

**`.env.local`** — for the frontend:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Get a free Groq key at https://console.groq.com (no credit card needed).
