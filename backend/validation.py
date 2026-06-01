"""
Robust input validation using whitelist + bigram frequency scoring.
Rejects keyboard mash, random chars, and nonsense inputs like
'kamm', 'qwert', 'uyweg', 'ucgrue', 'abc', 'xyz'.
"""
import re

# ── Whitelist of known real words in our domain ───────────────────────────────
KNOWN_WORDS = {
    # Programming languages
    "python","javascript","typescript","java","c++","c#","c","go","rust","ruby","php",
    "swift","kotlin","scala","dart","perl","r","matlab","julia","lua","haskell",
    # Frameworks & libraries
    "react","vue","angular","svelte","nextjs","nuxt","gatsby","remix","astro",
    "node","express","fastapi","django","flask","spring","rails","laravel","nestjs",
    "pandas","numpy","pytorch","tensorflow","keras","opencv","scipy","sklearn",
    "spark","kafka","hadoop","airflow","dbt","flink",
    # Databases & cloud
    "sql","mysql","postgresql","mongodb","redis","elasticsearch","firebase","supabase",
    "dynamodb","cassandra","neo4j","influxdb","sqlite","oracle","mssql",
    "aws","gcp","azure","docker","kubernetes","terraform","ansible","jenkins","git",
    # Frontend & design
    "html","css","tailwind","sass","scss","bootstrap","figma","sketch","xd",
    "webpack","vite","babel","eslint","jest","cypress","selenium","playwright",
    # General tech terms
    "linux","bash","shell","powershell","unix","macos","windows","nginx","apache",
    "graphql","rest","grpc","websocket","oauth","jwt","ssl","tls","api","sdk",
    "devops","mlops","cicd","agile","scrum","kanban","jira","confluence","git",
    "nlp","ai","ml","dl","iot","ar","vr","xr","saas","paas","iaas","faas",
    # Career keywords
    "software","engineer","developer","scientist","analyst","manager","designer",
    "architect","consultant","specialist","lead","senior","junior","intern",
    "frontend","backend","fullstack","mobile","cloud","data","machine","learning",
    "deep","artificial","intelligence","computer","vision","natural","language",
    "product","project","program","quality","assurance","testing","security",
    "network","database","system","embedded","game","blockchain","web","cyber",
    # Education keywords
    "btech","be","bsc","bcom","ba","bca","mca","mtech","msc","mba","me","phd",
    "diploma","certificate","degree","engineering","science","technology","commerce",
    "arts","mathematics","statistics","physics","chemistry","biology","economics",
    "management","business","information","computer","design","architecture",
    "bootcamp","vocational","associate","undergraduate","postgraduate","self","taught",
    # Interests
    "development","programming","coding","hacking","analytics","visualization",
    "research","open","source","robotics","automation","finance","marketing",
    "entrepreneurship","startup","consulting","education","healthcare","gaming",
    # Non-tech career roles
    "librarian","library","teacher","teaching","professor","lecturer","instructor",
    "doctor","physician","surgeon","nurse","nursing","medical","medicine","dentist",
    "pharmacist","pharmacy","therapist","counselor","psychologist","psychiatrist",
    "social","worker","accountant","accounting","auditor","banker","banking",
    "lawyer","attorney","legal","paralegal","judge","advocate",
    "journalist","reporter","editor","writer","author","content","copywriter",
    "photographer","videographer","filmmaker","director","actor","artist","musician",
    "chef","cook","culinary","hospitality","hotel","tourism","travel",
    "sales","advertising","relations","hr","resources",
    "recruitment","logistics","supply","chain","operations","admin","administrative",
    "civil","mechanical","electrical","chemical","aerospace","biomedical","industrial",
    "environmental","agriculture","veterinary","veterinarian","biologist","physicist",
    "chemist","geologist","economist","statistician","mathematician",
    "coach","trainer","fitness","sports","athlete","pilot","aviation",
    "architect","planner","estate","construction","interior","fashion",
    "retail","ecommerce","insurance","investment","stockbroker","financial",
}

# Common English words for role validation
COMMON_ENGLISH_WORDS = {
    "the","and","for","are","but","not","you","all","can","was","had","her","were",
    "his","they","one","our","out","who","get","him","how","its","may","new","now",
    "old","see","two","way","boy","did","let","man","put","say","she","too","use",
    "about","after","also","back","been","come","could","day","does","each","even",
    "find","first","from","give","good","have","here","high","just","know","last",
    "left","life","like","look","make","most","move","much","need","only","open",
    "over","part","place","same","show","side","such","take","than","that","their",
    "them","then","there","these","think","this","time","turn","very","want","well",
    "what","when","where","which","while","will","with","work","year","your","any",
    "ask","big","call","came","case","down","face","fact","feel","four","full",
    "hand","hard","head","help","hold","home","keep","kind","land","line","list",
    "live","long","made","main","many","mean","meet","mind","miss","more","name",
    "next","once","other","page","past","play","real","right","room","said","self",
    "set","small","some","soon","start","still","stop","sure","talk","tell","thing",
    "those","through","told","top","tree","true","under","until","upon","used",
    "walk","water","word","world","write","years",
}

# ── Common English/tech bigrams ───────────────────────────────────────────────
COMMON_BIGRAMS = {
    "th","he","in","er","an","re","on","en","at","es","ed","nd","to","or","ea",
    "ti","ar","st","nt","ng","is","ha","et","se","ou","te","al","it","de","le",
    "si","li","ry","ly","io","ro","ic","ge","el","di","la","pe","ve","ta","ll",
    "ma","ra","ow","wa","em","ot","ne","me","ri","na","ca","ct","so","fo","lo",
    "co","un","ac","pr","tr","sp","sc","ch","sh","wh","ph","gh","qu","ck","ss",
    "oo","ee","ai","oa","ie","ei","eu","ue","ui","au","ay","ey","oy",
}


def _is_real_word(word: str) -> bool:
    """
    Returns True if the word is real — either in the whitelist
    or passes bigram frequency scoring for longer words.
    """
    w = word.lower().strip()
    if not w:
        return False

    # Direct whitelist check
    if w in KNOWN_WORDS:
        return True

    # Common English word check
    if w in COMMON_ENGLISH_WORDS:
        return True

    # Remove non-alpha for bigram check (handles c++, next.js etc)
    alpha = re.sub(r'[^a-z]', '', w)

    # Short words (≤3 chars): only accept if in whitelist
    if len(alpha) <= 3:
        return w in KNOWN_WORDS or alpha in KNOWN_WORDS or w in COMMON_ENGLISH_WORDS

    # Longer words: bigram frequency check (lowered threshold for better real-word detection)
    bigrams = [alpha[i:i+2] for i in range(len(alpha) - 1)]
    if not bigrams:
        return False
    score = sum(1 for b in bigrams if b in COMMON_BIGRAMS) / len(bigrams)
    return score > 0.25


def _looks_real(text: str) -> bool:
    """
    Returns True if at least ONE token in the text is a real word.
    Splits on spaces, commas, dots, slashes.
    """
    tokens = re.split(r'[\s,./\-]+', text.strip().lower())
    tokens = [t for t in tokens if t]
    if not tokens:
        return False
    return any(_is_real_word(t) for t in tokens)


# ── Public validators ─────────────────────────────────────────────────────────

def validate_role(role: str):
    v = role.strip()
    if not v or len(v) < 3:
        return "Please enter a valid career role (e.g. Software Engineer, Data Scientist)."
    if not _looks_real(v):
        return f'"{v}" is not a recognised career. Please enter a real role like "Software Engineer", "Data Scientist", or "Product Manager".'
    return None


def validate_skills(skills: list):
    if not skills:
        return "Please enter at least one real skill (e.g. Python, SQL, React)."
    valid = [s for s in skills if s.strip() and _looks_real(s.strip())]
    if not valid:
        return "None of the entered skills are recognised. Please enter real skills like Python, SQL, or React."
    return None


def validate_interests(interests: list):
    if not interests:
        return "Please enter at least one real interest (e.g. Web Development, Machine Learning)."
    valid = [i for i in interests if i.strip() and _looks_real(i.strip())]
    if not valid:
        return "None of the entered interests are recognised. Please enter real interests like Web Development or Data Science."
    return None


def validate_education(education: str):
    v = education.strip()
    if not v or len(v) < 3:
        return "Please enter your education (e.g. B.Tech Computer Science, MBA)."
    if not _looks_real(v):
        return f'"{v}" is not a recognised education. Please enter something like "B.Tech Computer Science" or "Self-Taught".'
    return None
