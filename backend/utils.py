import time, json, re

def clean_json(text: str) -> str:
    text = text.strip()
    # Remove markdown code fences
    if "```" in text:
        # Extract content between first ``` and last ```
        parts = text.split("```")
        for part in parts:
            p = part.strip()
            if p.startswith("json"):
                p = p[4:].strip()
            if p.startswith("{") or p.startswith("["):
                text = p
                break
    # Find first { or [ and last } or ]
    start = min(
        (text.find("{") if text.find("{") != -1 else len(text)),
        (text.find("[") if text.find("[") != -1 else len(text))
    )
    if start < len(text):
        text = text[start:]
    return text.strip()

def ai(prompt: str, max_tokens=2000, temperature=0.7) -> str:
    from config import client, MODEL
    r = client.chat.completions.create(
        model=MODEL, max_tokens=max_tokens, temperature=temperature,
        messages=[{"role":"user","content":prompt}]
    )
    return r.choices[0].message.content

def ai_json(prompt: str, max_tokens=2000, temperature=0.7) -> dict:
    raw = ai(prompt, max_tokens, temperature)
    cleaned = clean_json(raw)
    if not cleaned:
        raise ValueError(f"Empty response from AI. Raw: {raw[:200]}")
    return json.loads(cleaned)

def ai_chat(messages: list, system: str) -> str:
    from config import client, MODEL
    r = client.chat.completions.create(
        model=MODEL, max_tokens=800,
        messages=[{"role":"system","content":system}] + messages
    )
    return r.choices[0].message.content.strip()
