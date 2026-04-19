require("dotenv").config();
 
const express = require("express");
const cors = require("cors");
const KNOWLEDGE_BASE = require("./knowledgeBase");
 
const app = express();
const PORT = 5003;
 
const NO_MATCH =
  "That's a great question! I don't have that specific information right now, but I'd love to help you get an answer. Please reach out to our team at dynamicacademyofthearts@gmail.com or call (506) 847-1164, and we'll get back to you as soon as possible.";
 
const EMPATHY_OPENERS = [
  "Great question!",
  "We'd love to help with that!",
  "Thanks for asking!",
];
 
function formatResponse(opener, answer, cta) {
  return opener + "\n\n" + answer + "\n\n" + cta;
}
 
const CTA_BY_TOPIC = {
  refund:
    "Please email us at dynamicacademyofthearts@gmail.com with your details so our team can assist you.",
  billing:
    "Please contact our office at dynamicacademyofthearts@gmail.com so we can review this for you.",
  injury:
    "Please call us immediately at (506) 847-1164 so we can assist you right away.",
  complaint:
    "Please contact our team at dynamicacademyofthearts@gmail.com so we can address your concern properly.",
  general:
    "For more details, feel free to contact us at (506) 847-1164 or visit dynamicacademy.ca.",
};
 
// ---------------------------------------------------------------------------
// SYNONYMS
// Each group maps related user terms together.
// Groups are kept SEPARATE by intent — "register" and "enrolment" are NOT
// merged because "how to register" and "mid-year enrolment" are different intents.
// Synonym boost ONLY fires when the user's input triggered that group.
// ---------------------------------------------------------------------------
const SYNONYMS = {
  refund:     ["refund", "money back", "cancel", "withdraw", "stop payment"],
  // "sign up" as standalone phrase means register intent (not fee intent)
  sibling:    ["sibling", "siblings", "brother", "sister"],
  schedule:   ["schedule", "timing", "time", "class time"],
  instructor: ["instructor", "instructors", "teacher", "faculty", "coach"],
  injury:     ["injury", "injured", "hurt", "accident"],
  parking:    ["parking", "park"],
  volunteer:  ["volunteer", "volunteering", "help out"],
  discount:   ["discount", "discounts", "deal", "promotion", "save"],
  costume:    ["costume", "costumes", "outfit", "uniform"],
  ticket:     ["ticket", "tickets"],
  background: ["background check", "background checks", "criminal record", "screening"],
  trial:      ["trial", "free trial", "try a class", "tryout"],
  accessible: ["wheelchair", "accessible", "accessibility", "wheelchair accessible"],
  waiver:     ["waiver", "liability"],
  french:     ["french", "francais", "francophone", "en francais", "cours en francais"],
};
 
// ---------------------------------------------------------------------------
// SENSITIVE TOPICS — bypass normal scoring, always add empathy + escalation CTA
// ---------------------------------------------------------------------------
const SENSITIVE_TOPICS = {
  refund:    ["refund", "money back", "cancel", "withdraw"],
  billing:   ["charged", "payment", "billing", "double charge", "charged twice"],
  injury:    ["injury", "injured", "hurt", "accident"],
  complaint: ["complaint", "unhappy", "issue", "problem", "bad experience"],
};
 
const INTENT_KEYWORDS = {
  injury:    ["injury", "injured", "hurt", "accident", "safety"],
  complaint: ["complaint", "complain", "issue", "problem", "bad experience"],
  refund:    ["refund", "money back", "cancel", "withdraw"],
  billing:   ["billing", "charged", "payment", "double charge"],
};
 
// ---------------------------------------------------------------------------
// DOMAIN KEYWORDS — gate to filter non-studio messages.
// Covers every topic across all 140 KB questions.
// Uses substring matching so "enrolment" matches "enrol", etc.
// ---------------------------------------------------------------------------
const DOMAIN_KEYWORDS = new Set([
  // Classes & programs
  "class", "classes", "dance", "dancing", "program", "programs",
  "ballet", "tap", "jazz", "hiphop", "hip", "hop", "acro", "acrobatic",
  "lyrical", "contemporary", "musical", "theatre", "combo",
  "recreational", "competitive", "preschool", "adult",
  // Registration & enrollment
  "register", "registration", "enrol", "enroll", "enrolment", "enrollment",
  "signup", "join", "waitlist", "trial", "tryout", "midyear",
  "september", "season", "sibling", "siblings", "brother", "sister",
  // Pricing & fees
  "price", "prices", "pricing", "cost", "costs", "tuition", "fee", "fees",
  "rates", "rate", "discount", "discounts", "monthly", "upfront",
  "bursary", "bursaries", "financial", "assistance", "paying", "payments",
  "processed", "deposit", "costume", "costumes",
  // Billing & payments
  "billing", "payment", "refund", "withdraw", "cancel", "cheque", "visa",
  "mastercard", "cash", "invoice", "receipt", "charged",
  // Studio & policies
  "studio", "location", "located", "address", "parking", "park",
  "waiting", "area", "parents", "parent", "watch", "observe",
  "attendance", "absent", "absence", "makeup", "weather", "cancelled",
  "cancellation", "dress", "code", "attire", "shoes", "uniform",
  "rehearsal", "volunteer", "volunteering", "birthday", "party", "rental",
  "photo", "covid", "health", "safety", "open", "hours",
  // General info
  "contact", "phone", "email", "website", "url",
  "app", "download", "social", "media", "facebook", "instagram",
  "reputation", "rating", "google", "community", "operating", "years",
  "mailing", "students", "enrolled", "rooms", "studios", "francais",
  "french", "francophone",
  // Instructors & staff
  "instructor", "instructors", "teacher", "teachers", "faculty",
  "coach", "coaches", "qualifications", "certified", "certification",
  "background", "checks", "criminal", "first", "aid", "employees",
  "contractors", "apprentice", "junior", "assistant",
  // Safety & child protection
  "safe", "safety", "child", "children", "supervision", "supervised",
  "pickup", "dropoff", "bullied", "bullying", "anonymous",
  "emergency", "medical", "waiver", "liability", "form", "sign",
  "injury", "injured", "hurt", "accident", "incident",
  // Complaints & escalation
  "complaint", "complain", "unhappy", "feedback", "escalate",
  "escalation", "unfairly", "behavior", "behaviour",
  // Recital & performances
  "recital", "recitals", "performance", "ticket", "tickets",
  "backstage", "flowers", "venue", "annual",
  // Competitive program
  "competition", "competitions", "audition", "auditions",
  "solo", "duet", "merit", "seniority", "professional", "company",
  "intensives", "intensive",
  // Accessibility & inclusion
  "wheelchair", "accessible", "accessibility", "adaptive", "inclusive",
  "inclusion", "special", "needs", "lgbtq", "pride", "gender", "welcoming",
  // Sponsorship
  "sponsorship", "sponsor", "partnership", "partnerships",
  // DATOA specific
  "datoa", "data", "dynamic", "academy", "arts",
  // Additional topic words
  "summer", "elite", "technique", "workshops", "masterclasses", "events",
  "opportunities", "bios", "members", "policy", "tickets", "family",
]);
 
// ---------------------------------------------------------------------------
// STOP WORDS — removed from scoring.
// Includes generic question words like "how", "there", "any" which match
// too many KB questions and dilute scores.
// ---------------------------------------------------------------------------
const STOP_WORDS = new Set([
  "a", "an", "and", "are", "can", "do", "for", "i", "is", "it",
  "me", "my", "of", "on", "or", "the", "to", "we", "what", "when",
  "where", "who", "why", "you", "your", "have", "has", "had", "be",
  "been", "being", "does", "did", "will", "would", "could", "should",
  "may", "might", "shall", "was", "were", "this", "that", "these",
  "those", "with", "from", "into", "onto", "upon",
  // Generic question/filler words — too noisy for scoring
  "how", "there", "any", "like", "just", "about", "also", "more",
  "get", "got", "its", "way", "want", "need", "tell", "know",
  "give", "ask", "let", "put", "use", "say", "see", "make",
]);
 
// FEE-INTENT WORDS — when present in user input, they're asking about cost
const FEE_WORDS = new Set([
  "fee", "fees", "cost", "costs", "price", "prices", "pricing",
  "much", "payment", "charge", "charged", "tuition", "rates", "rate",
]);
 
// ---------------------------------------------------------------------------
// OFF-TOPIC SIGNALS — words that definitively indicate a non-studio query.
// If ANY of these appear in input, return NO_MATCH immediately.
// "weather" is handled conditionally: valid only with studio context words.
// ---------------------------------------------------------------------------
const OFF_TOPIC_SIGNALS = new Set([
  // Vehicle brands
  "bmw", "toyota", "honda", "ford", "tesla", "mercedes", "audi",
  "volkswagen", "hyundai", "kia", "nissan", "chevrolet", "chevy",
  "jeep", "dodge", "subaru", "mazda", "ferrari", "lamborghini",
  // Tech brands / products
  "iphone", "android", "samsung", "apple", "microsoft", "amazon",
  "netflix", "spotify", "playstation", "xbox", "nintendo",
  "laptop", "computer", "tablet", "smartphone",
  // Food / retail
  "mcdonalds", "subway", "starbucks", "pizza", "burger",
  // Off-topic cities (studio is in Quispamsis NB)
  "noida", "delhi", "mumbai", "bangalore", "hyderabad", "pune",
  "toronto", "vancouver", "calgary", "ottawa", "montreal",
  "london", "paris", "berlin", "sydney", "melbourne",
  "chicago", "houston", "phoenix", "seattle", "boston",
  "miami", "dallas", "denver", "atlanta",
  // Off-topic subjects
  "bitcoin", "crypto", "stock", "stocks", "forex",
  "election", "politics", "government", "parliament",
  "football", "soccer", "hockey", "baseball", "basketball",
  "cricket", "rugby", "golf", "tennis",
]);
 
// "weather" is valid only when paired with a studio context word
const WEATHER_CONTEXT_WORDS = new Set([
  "class", "classes", "cancel", "cancelled", "cancellation",
  "studio", "dance", "makeup", "refund", "policy",
]);
 
// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const normalize = (text) =>
  String(text ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim();
 
// Strip "(New)" / "(Expanded)" labels from KB questions before matching.
// These labels cause duplicate questions to exact-match user queries unfairly.
const stripLabels = (q) =>
  q.replace(/\s*\((new|expanded|new\s*[—-]\s*deployment package)\)\s*/gi, "").trim();
 
// Returns true if this KB entry is a labeled variant (New / Expanded).
// Labeled variants must NOT get exact-match or substring-match priority —
// only the original canonical question should win those.
const isLabeledVariant = (q) =>
  /\((new|expanded|new\s*[—-]\s*deployment package)\)/i.test(q);
 
app.use(cors());
app.use(express.json());
 
app.post("/chat", (req, res) => {
  const message =
    typeof req.body?.message === "string" ? req.body.message : "";
 
  const input = normalize(message);
 
  if (!input) {
    return res.json({ response: NO_MATCH, category: "general" });
  }
 
  // -------------------------------------------------------------------------
  // STEP 0: Off-topic signal check — runs before anything else.
  // If the input contains a known non-studio word, return NO_MATCH immediately.
  // This prevents "bmw price", "noida weather", etc. from matching KB entries.
  // -------------------------------------------------------------------------
  const inputWordsRaw = input.split(/\s+/).filter(Boolean);
  const inputWordSetRaw = new Set(inputWordsRaw);
 
  // Hard block: input contains an unambiguous off-topic word
  const hasOffTopicSignal = [...OFF_TOPIC_SIGNALS].some((w) =>
    inputWordSetRaw.has(w),
  );
  if (hasOffTopicSignal) {
    return res.json({ response: NO_MATCH, category: "general" });
  }
 
  // Conditional block: "weather" is only valid with studio context
  if (inputWordSetRaw.has("weather")) {
    const hasStudioContext = [...WEATHER_CONTEXT_WORDS].some((w) =>
      inputWordSetRaw.has(w),
    );
    if (!hasStudioContext) {
      return res.json({ response: NO_MATCH, category: "general" });
    }
  }
 
  // -------------------------------------------------------------------------
  // STEP 1: Sensitive topic detection
  // Injury / billing / complaint / refund get empathy + human escalation CTA.
  // -------------------------------------------------------------------------
  let sensitiveCategory = null;
 
  const inputWords = inputWordsRaw; // already split above in STEP 0
  const complaintKeywords = ["complaint", "complain", "issue", "problem"];
  const isComplaint = complaintKeywords.some((k) => inputWords.includes(k));
 
  if (isComplaint) {
    sensitiveCategory = "complaint";
  } else {
    for (const [category, keywords] of Object.entries(SENSITIVE_TOPICS)) {
      const hit = keywords.some((k) => input.includes(normalize(k)));
      if (hit) {
        sensitiveCategory = category;
        break;
      }
    }
  }
 
  if (sensitiveCategory) {
    const needles = INTENT_KEYWORDS[sensitiveCategory] ?? [];
    let bestItem = null;
    let bestScore = 0;
 
    for (const item of KNOWLEDGE_BASE) {
      const normalizedQuestion = normalize(item.question);
      if (!normalizedQuestion) continue;
 
      let score = 0;
      for (const keyword of needles) {
        if (normalizedQuestion.includes(normalize(keyword))) score++;
      }
      for (const word of inputWords) {
        if (word && normalizedQuestion.includes(word)) score += 2;
      }
 
      if (score > bestScore) {
        bestScore = score;
        bestItem = item;
      }
    }
 
    const matchedAnswer =
      bestItem && bestScore >= 1 ? bestItem.answer : NO_MATCH;
 
    const empathyMap = {
      refund:    "We understand that situations like this can be frustrating, and we're here to help.",
      billing:   "We understand that situations like this can be frustrating, and we're here to help.",
      injury:    "We're really sorry to hear about this — your child's safety is incredibly important to us.",
      complaint: "Thank you for bringing this to our attention — we take concerns like this very seriously.",
    };
 
    const finalResponse = formatResponse(
      empathyMap[sensitiveCategory] || "",
      matchedAnswer,
      CTA_BY_TOPIC[sensitiveCategory] || CTA_BY_TOPIC.general,
    );
 
    return res.json({ response: finalResponse, category: sensitiveCategory });
  }
 
  // -------------------------------------------------------------------------
  // STEP 2: Domain gate — reject clearly off-topic messages.
  // Uses substring matching so "enrolment" matches "enrol", etc.
  // -------------------------------------------------------------------------
  const allInputWords = input.split(/\s+/).filter((w) => w.length >= 3);
 
  const passesDomainGate = allInputWords.some((word) => {
    if (DOMAIN_KEYWORDS.has(word)) return true;
    for (const dk of DOMAIN_KEYWORDS) {
      if (word.includes(dk) || dk.includes(word)) return true;
    }
    return false;
  });
 
  if (!passesDomainGate) {
    return res.json({ response: NO_MATCH, category: "general" });
  }
 
  // -------------------------------------------------------------------------
  // STEP 3: Extract base keywords (stop-word filtered)
  // -------------------------------------------------------------------------
  const baseKeywords = inputWords.filter(
    (w) => w && w.length >= 3 && !STOP_WORDS.has(w),
  );
 
  // -------------------------------------------------------------------------
  // STEP 4: Detect intent flags
  //
  // register_intent: user wants HOW to register (not asking about fees).
  //   Detects "register", "enroll", "enrolment", "sign up" in input.
  //
  // asking_about_fee: user is asking about cost/price.
  //   When BOTH flags are true (e.g. "registration fee"), no penalty is applied
  //   so the fee question can still win.
  // -------------------------------------------------------------------------
  const inputWordSet = new Set(inputWords);
 
  // "sign up" signals register-HOW intent. We inject "register"/"enroll" into
  // baseKeywords so Q1-type questions score higher — but we do NOT add "sign up"
  // as a search phrase because Q2 contains "...cost to sign up?" and would steal the match.
  const signUpIntent = input.includes("sign up") || input.includes("signup");
  if (signUpIntent) {
    baseKeywords.push("register");
    baseKeywords.push("enroll");
  }
 
  const register_intent =
    ["register", "enroll", "enrolment", "enrollment", "enrol"].some((w) =>
      input.includes(w),
    ) || signUpIntent;
 
  const asking_about_fee = [...FEE_WORDS].some((w) => inputWordSet.has(w));
 
  // -------------------------------------------------------------------------
  // STEP 5: Detect category for CTA selection
  // -------------------------------------------------------------------------
  const detectedCategory = (() => {
    if (SYNONYMS.schedule.some((t) => input.includes(normalize(t))))
      return "schedule";
    const pricingWords = [
      "price", "prices", "pricing", "cost", "costs", "tuition",
      "fee", "fees", "rates", "discount", "discounts", "monthly", "upfront",
    ];
    if (pricingWords.some((t) => input.includes(t))) return "pricing";
    return null;
  })();
 
  // -------------------------------------------------------------------------
  // STEP 6: Find which synonym groups the user's input triggered.
  // Only triggered groups participate in synonym boost scoring — this prevents
  // unrelated KB questions from getting a boost from their own internal synonyms.
  // -------------------------------------------------------------------------
  const triggeredGroups = {};
  for (const [group, synList] of Object.entries(SYNONYMS)) {
    if (synList.some((term) => input.includes(normalize(term)))) {
      triggeredGroups[group] = synList;
    }
  }
 
  // Expand user terms using only triggered groups
  const expandedTerms = new Set(baseKeywords);
  for (const synList of Object.values(triggeredGroups)) {
    for (const term of synList) expandedTerms.add(normalize(term));
  }
 
  const expandedWords = new Set(
    [...expandedTerms].filter(
      (t) => t && !t.includes(" ") && !STOP_WORDS.has(t),
    ),
  );
  const expandedPhrases = new Set(
    [...expandedTerms].filter((t) => t && t.includes(" ")),
  );
 
  // -------------------------------------------------------------------------
  // STEP 7: Score every KB entry and pick the best match
  // -------------------------------------------------------------------------
  let bestItem = null;
  let bestScore = 0;
 
  for (const item of KNOWLEDGE_BASE) {
    const q = normalize(stripLabels(item.question));
    if (!q) continue;
 
    // --- Exact match ---
    // Only canonical (non-labeled) questions get exact-match priority.
    // "(New)" / "(Expanded)" variants must NOT steal exact matches from originals.
    if (q === input && !isLabeledVariant(item.question)) {
      bestItem = item;
      bestScore = 99999;
      break;
    }
 
    // --- Strong substring match ---
    // Also skipped for labeled variants to prevent false priority.
    if (
      !isLabeledVariant(item.question) &&
      (q.includes(input) || input.includes(q))
    ) {
      if (bestScore < 999) {
        bestItem = item;
        bestScore = 999;
      }
      continue;
    }
 
    // --- Word/phrase scoring ---
    const qWords = new Set(
      q.split(/\s+/).filter((w) => w && w.length >= 3 && !STOP_WORDS.has(w)),
    );
 
    let score = 0;
 
    // Phrase matches — high value
    for (const phrase of expandedPhrases) {
      if (q.includes(phrase)) score += 4;
    }
 
    // Exact word matches
    for (const w of expandedWords) {
      if (qWords.has(w)) score += 2;
    }
 
    // Synonym group boost — ONLY for groups triggered by the user's input.
    // Rewards KB questions that contain multiple terms from the same group
    // the user is asking about.
    for (const synList of Object.values(triggeredGroups)) {
      let groupHits = 0;
      for (const termRaw of synList) {
        const term = normalize(termRaw);
        if (!term) continue;
        const isHit =
          term.includes(" ") ? q.includes(term) : qWords.has(term);
        if (isHit) groupHits++;
      }
      if (groupHits >= 2) score += groupHits;
    }
 
    // Partial word match — "enrolment" partially matches "enrol",
    // "discounts" partially matches "discount", etc.
    for (const w of expandedWords) {
      if (w.length >= 5) {
        for (const qw of qWords) {
          if (qw !== w && (qw.startsWith(w) || w.startsWith(qw))) {
            score += 0.5;
            break;
          }
        }
      }
    }
 
    // Negative penalty: user wants to register but did NOT ask about fees.
    // Prevents "how to register" from returning the registration-fee question.
    if (register_intent && !asking_about_fee) {
      if ([...qWords].some((w) => FEE_WORDS.has(w))) {
        score -= 2;
      }
    }
 
    // Strict > preserves the first-found winner on tied scores.
    // KB entries are ordered Q1→Q143, so earlier = more canonical question wins ties.
    if (score > bestScore) {
      bestScore = score;
      bestItem = item;
    }
  }
 
  // -------------------------------------------------------------------------
  // STEP 8: Last-resort fallback — simple substring search on KB questions.
  // Catches edge cases the scorer missed.
  // -------------------------------------------------------------------------
  if (!bestItem || bestScore === 0) {
    for (const item of KNOWLEDGE_BASE) {
      const found = baseKeywords.some(
        (word) =>
          word.length >= 4 && item.question.toLowerCase().includes(word),
      );
      if (found) {
        bestItem = item;
        break;
      }
    }
  }
 
  if (!bestItem) {
    return res.json({
      response: NO_MATCH,
      category: detectedCategory || "general",
    });
  }
 
  // -------------------------------------------------------------------------
  // STEP 9: Build and return final response
  // -------------------------------------------------------------------------
  const empathyOpener =
    EMPATHY_OPENERS[Math.floor(Math.random() * EMPATHY_OPENERS.length)];
 
  const finalResponse = formatResponse(
    empathyOpener,
    bestItem.answer,
    CTA_BY_TOPIC.general,
  );
 
  res.json({
    response: finalResponse,
    category: detectedCategory || "general",
  });
});
 
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
 










