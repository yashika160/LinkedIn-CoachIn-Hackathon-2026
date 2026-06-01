"""
Simple SQLite-based persistence for AIVentra.
No MongoDB or external server needed — db.sqlite3 is created automatically in backend/.

Usage:
  from db import save_profile, get_profile, save_activity, get_activity
"""

import sqlite3, json, os
from datetime import date

DB_PATH = os.path.join(os.path.dirname(__file__), "aiventra.db")


def _conn():
    con = sqlite3.connect(DB_PATH)
    con.row_factory = sqlite3.Row
    return con


def init_db():
    with _conn() as con:
        con.executescript("""
        CREATE TABLE IF NOT EXISTS profiles (
            email TEXT PRIMARY KEY,
            name  TEXT,
            role  TEXT,
            skills TEXT,
            interests TEXT,
            education TEXT,
            short_goal TEXT,
            long_goal  TEXT,
            ai_profile TEXT,
            updated_at TEXT DEFAULT (date('now'))
        );

        CREATE TABLE IF NOT EXISTS activity (
            id         INTEGER PRIMARY KEY AUTOINCREMENT,
            email      TEXT,
            type       TEXT,
            date       TEXT DEFAULT (date('now')),
            meta       TEXT
        );

        CREATE TABLE IF NOT EXISTS quiz_results (
            id        INTEGER PRIMARY KEY AUTOINCREMENT,
            email     TEXT,
            topic     TEXT,
            score     INTEGER,
            total     INTEGER,
            date      TEXT DEFAULT (date('now'))
        );

        CREATE TABLE IF NOT EXISTS interview_results (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            email       TEXT,
            career      TEXT,
            avg_score   REAL,
            date        TEXT DEFAULT (date('now'))
        );
        """)


# ── Profiles ─────────────────────────────────────────────────────────────────

def save_profile(email: str, data: dict):
    init_db()
    with _conn() as con:
        con.execute("""
        INSERT INTO profiles (email, name, role, skills, interests, education,
                              short_goal, long_goal, ai_profile, updated_at)
        VALUES (:email,:name,:role,:skills,:interests,:education,
                :short_goal,:long_goal,:ai_profile, date('now'))
        ON CONFLICT(email) DO UPDATE SET
            name=excluded.name, role=excluded.role, skills=excluded.skills,
            interests=excluded.interests, education=excluded.education,
            short_goal=excluded.short_goal, long_goal=excluded.long_goal,
            ai_profile=excluded.ai_profile, updated_at=excluded.updated_at
        """, {
            "email": email,
            "name": data.get("name", ""),
            "role": data.get("role", ""),
            "skills": data.get("skills", ""),
            "interests": data.get("interests", ""),
            "education": data.get("education", ""),
            "short_goal": data.get("short_goal", ""),
            "long_goal": data.get("long_goal", ""),
            "ai_profile": json.dumps(data.get("ai_profile", {})),
        })


def get_profile(email: str) -> dict | None:
    init_db()
    with _conn() as con:
        row = con.execute("SELECT * FROM profiles WHERE email=?", (email,)).fetchone()
        if not row:
            return None
        d = dict(row)
        d["ai_profile"] = json.loads(d["ai_profile"] or "{}")
        return d


# ── Activity / Streak ─────────────────────────────────────────────────────────

def save_activity(email: str, type_: str, meta: dict = {}):
    init_db()
    today = str(date.today())
    with _conn() as con:
        con.execute(
            "INSERT INTO activity (email, type, date, meta) VALUES (?,?,?,?)",
            (email, type_, today, json.dumps(meta))
        )


def get_streak(email: str) -> int:
    """Count consecutive days of activity ending today."""
    init_db()
    with _conn() as con:
        rows = con.execute(
            "SELECT DISTINCT date FROM activity WHERE email=? ORDER BY date DESC",
            (email,)
        ).fetchall()
    if not rows:
        return 0
    dates = [r["date"] for r in rows]
    from datetime import timedelta
    streak = 0
    current = date.today()
    for d in dates:
        d_obj = date.fromisoformat(d)
        if d_obj == current:
            streak += 1
            current -= timedelta(days=1)
        elif d_obj < current:
            break
    return streak


def get_activity_log(email: str, days: int = 60) -> list[str]:
    """Return list of date strings for the last N days."""
    init_db()
    with _conn() as con:
        rows = con.execute(
            "SELECT date FROM activity WHERE email=? ORDER BY date DESC LIMIT ?",
            (email, days * 5)
        ).fetchall()
    return [r["date"] for r in rows]


# ── Quiz / Interview Results ──────────────────────────────────────────────────

def save_quiz_result(email: str, topic: str, score: int, total: int):
    init_db()
    with _conn() as con:
        con.execute(
            "INSERT INTO quiz_results (email, topic, score, total) VALUES (?,?,?,?)",
            (email, topic, score, total)
        )


def save_interview_result(email: str, career: str, avg_score: float):
    init_db()
    with _conn() as con:
        con.execute(
            "INSERT INTO interview_results (email, career, avg_score) VALUES (?,?,?)",
            (email, career, avg_score)
        )


def get_progress(email: str) -> dict:
    init_db()
    with _conn() as con:
        quiz_count = con.execute(
            "SELECT COUNT(*) as c FROM quiz_results WHERE email=?", (email,)
        ).fetchone()["c"]
        interview_count = con.execute(
            "SELECT COUNT(*) as c FROM interview_results WHERE email=?", (email,)
        ).fetchone()["c"]
        avg_quiz = con.execute(
            "SELECT AVG(CAST(score AS REAL)/total*100) as avg FROM quiz_results WHERE email=?", (email,)
        ).fetchone()["avg"]
    return {
        "quiz_count": quiz_count,
        "interview_count": interview_count,
        "avg_quiz_score": round(avg_quiz or 0, 1),
        "streak": get_streak(email),
        "activity_log": get_activity_log(email),
    }


# Init on import
init_db()
