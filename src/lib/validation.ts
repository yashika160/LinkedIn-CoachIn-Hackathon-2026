/**
 * Robust input validation — mirrors backend validation.py exactly.
 * Blocks keyboard mash (kamm, qwert, uyweg, ucgrue, abc, xyz).
 * Uses whitelist + bigram frequency scoring.
 */

const KNOWN_WORDS = new Set([
  // Programming languages
  "python","javascript","typescript","java","c++","c#","c","go","rust","ruby","php",
  "swift","kotlin","scala","dart","perl","r","matlab","julia","lua","haskell",
  // Frameworks & libraries
  "react","vue","angular","svelte","nextjs","nuxt","gatsby","remix","astro",
  "node","express","fastapi","django","flask","spring","rails","laravel","nestjs",
  "pandas","numpy","pytorch","tensorflow","keras","opencv","scipy","sklearn",
  "spark","kafka","hadoop","airflow","dbt","flink",
  // Databases & cloud
  "sql","mysql","postgresql","mongodb","redis","elasticsearch","firebase","supabase",
  "dynamodb","cassandra","neo4j","influxdb","sqlite","oracle","mssql",
  "aws","gcp","azure","docker","kubernetes","terraform","ansible","jenkins","git",
  // Frontend & design
  "html","css","tailwind","sass","scss","bootstrap","figma","sketch","xd",
  "webpack","vite","babel","eslint","jest","cypress","selenium","playwright",
  // General tech
  "linux","bash","shell","powershell","unix","nginx","apache",
  "graphql","rest","grpc","websocket","oauth","jwt","api","sdk",
  "devops","mlops","cicd","agile","scrum","kanban","jira","confluence",
  "nlp","ai","ml","dl","iot","ar","vr","xr","saas","paas","iaas",
  // Career keywords
  "software","engineer","developer","scientist","analyst","manager","designer",
  "architect","consultant","specialist","lead","senior","junior","intern",
  "frontend","backend","fullstack","mobile","cloud","data","machine","learning",
  "deep","artificial","intelligence","computer","vision","natural","language",
  "product","project","quality","assurance","testing","security",
  "network","database","system","embedded","game","blockchain","web","cyber",
  // Education
  "btech","be","bsc","bcom","ba","bca","mca","mtech","msc","mba","me","phd",
  "diploma","certificate","degree","engineering","science","technology","commerce",
  "arts","mathematics","statistics","physics","chemistry","biology","economics",
  "management","business","information","design","architecture",
  "bootcamp","vocational","associate","undergraduate","postgraduate","self","taught",
  // Interests
  "development","programming","coding","hacking","analytics","visualization",
  "research","open","source","robotics","automation","finance","marketing",
  "entrepreneurship","startup","consulting","education","healthcare","gaming",
  // Non-tech career roles
  "librarian","library","teacher","teaching","professor","lecturer","instructor",
  "doctor","physician","surgeon","nurse","nursing","medical","medicine","dentist",
  "pharmacist","pharmacy","therapist","counselor","psychologist","psychiatrist",
  "social","worker","accountant","accounting","auditor","banker","banking","finance",
  "lawyer","attorney","legal","paralegal","judge","advocate",
  "journalist","reporter","editor","writer","author","content","copywriter",
  "photographer","videographer","filmmaker","director","actor","artist","musician",
  "chef","cook","culinary","hospitality","hotel","tourism","travel",
  "sales","marketing","advertising","public","relations","hr","human","resources",
  "recruitment","logistics","supply","chain","operations","admin","administrative",
  "civil","mechanical","electrical","chemical","aerospace","biomedical","industrial",
  "environmental","agriculture","veterinary","veterinarian","biologist","physicist",
  "chemist","geologist","economist","statistician","mathematician","researcher",
  "coach","trainer","fitness","sports","athlete","pilot","aviation",
  "architect","planner","real","estate","construction","interior","fashion",
  "retail","ecommerce","insurance","investment","stockbroker","financial",
]);

// Extended common English words for better real-word detection
const COMMON_ENGLISH_WORDS = new Set([
  "the","and","for","are","but","not","you","all","can","was","had","her","were",
  "his","they","one","our","out","if","who","get","him","his","how","its","may",
  "new","now","old","see","two","way","who","boy","did","let","man","put","say",
  "she","too","use","about","after","also","back","been","come","could","day",
  "does","each","even","find","first","from","give","good","have","here","high",
  "just","know","last","left","life","like","look","make","most","move","much",
  "need","only","open","over","part","place","same","show","side","such","take",
  "than","that","their","them","then","there","these","think","this","time","turn",
  "very","want","well","what","when","where","which","while","will","with","work",
  "year","your","any","ask","big","call","came","case","come","down","each","face",
  "fact","feel","four","full","hand","hard","head","help","hold","home","keep",
  "kind","land","line","list","live","long","made","main","many","mean","meet",
  "mind","miss","more","name","next","once","only","other","page","past","play",
  "real","right","room","said","self","set","small","some","soon","start","still",
  "stop","sure","talk","tell","thing","those","through","told","top","tree","true",
  "under","until","upon","used","walk","water","word","world","write","years",
]);

const COMMON_BIGRAMS = new Set([
  "th","he","in","er","an","re","on","en","at","es","ed","nd","to","or","ea",
  "ti","ar","st","nt","ng","is","ha","et","se","ou","te","al","it","de","le",
  "si","li","ry","ly","io","ro","ic","ge","el","di","la","pe","ve","ta","ll",
  "ma","ra","ow","wa","em","ot","ne","me","ri","na","ca","ct","so","fo","lo",
  "co","un","ac","pr","tr","sp","sc","ch","sh","wh","ph","gh","qu","ck","ss",
  "oo","ee","ai","oa","ie","ei","eu","ue","ui","au","ay","ey","oy",
]);

function isRealWord(word: string): boolean {
  const w = word.toLowerCase().trim();
  if (!w) return false;
  if (KNOWN_WORDS.has(w)) return true;
  if (COMMON_ENGLISH_WORDS.has(w)) return true;

  const alpha = w.replace(/[^a-z]/g, "");
  if (alpha.length <= 3) return KNOWN_WORDS.has(w) || KNOWN_WORDS.has(alpha) || COMMON_ENGLISH_WORDS.has(w);

  const bigrams = [];
  for (let i = 0; i < alpha.length - 1; i++) bigrams.push(alpha.slice(i, i + 2));
  if (!bigrams.length) return false;

  const score = bigrams.filter(b => COMMON_BIGRAMS.has(b)).length / bigrams.length;
  // Lowered threshold from 0.30 to 0.25 for more lenient matching of valid uncommon words
  return score > 0.25;
}

function looksReal(text: string): boolean {
  const tokens = text.trim().toLowerCase().split(/[\s,./\-]+/).filter(Boolean);
  return tokens.length > 0 && tokens.some(t => isRealWord(t));
}

export function validateRole(role: string): string | null {
  const v = role.trim();
  if (!v || v.length < 3)
    return "Please enter a valid career role (e.g. Software Engineer, Data Scientist).";
  if (!looksReal(v))
    return `"${v}" is not a recognised career. Please enter a real role like "Software Engineer", "Data Scientist", or "Product Manager".`;
  return null;
}

export function validateSkills(skills: string): string | null {
  const items = skills.split(",").map(s => s.trim()).filter(Boolean);
  if (!items.length)
    return "Please enter at least one real skill (e.g. Python, SQL, React).";
  const valid = items.filter(s => looksReal(s));
  if (!valid.length) {
    // Check if input looks like a single letter or very short gibberish
    const allShort = items.every(s => s.length <= 2 && !["c", "r", "go"].includes(s.toLowerCase()));
    if (allShort)
      return "Invalid skills entered. Please enter full skill names like \"Python\", \"SQL\", or \"React\".";
    return "Invalid skills/interests entered. Please use recognised skill names like Python, SQL, JavaScript, or React.";
  }
  return null;
}

export function validateInterests(interests: string): string | null {
  const items = interests.split(",").map(s => s.trim()).filter(Boolean);
  if (!items.length)
    return "Please enter at least one real interest (e.g. Web Development, Machine Learning).";
  const valid = items.filter(i => looksReal(i));
  if (!valid.length)
    return "Invalid interests entered. Please enter real interests like \"Web Development\", \"Data Science\", or \"Healthcare\".";
  return null;
}

export function validateEducation(education: string): string | null {
  const v = education.trim();
  if (!v || v.length < 3)
    return "Please enter your education (e.g. B.Tech Computer Science, MBA).";
  if (!looksReal(v))
    return `"${v}" is not a recognised education. Please enter something like "B.Tech Computer Science" or "Self-Taught".`;
  return null;
}
