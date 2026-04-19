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
// SYNONYMS — expands user terms before scoring
// ---------------------------------------------------------------------------
const SYNONYMS = {
  refund: ["refund", "money back", "cancel", "withdraw", "stop payment"],
  sibling: ["sibling", "brother", "sister"],
  schedule: ["schedule", "timing", "time", "class time"],
  enrolment: ["enrolment", "enrollment", "enrol", "enroll", "register", "sign up", "join"],
  instructor: ["instructor", "instructors", "teacher", "faculty", "coach"],
  injury: ["injury", "injured", "hurt", "accident"],
  parking: ["parking", "park", "lot"],
  volunteer: ["volunteer", "volunteering", "help out"],
  discount: ["discount", "discounts", "deal", "promotion", "save"],
  costume: ["costume", "costumes", "outfit", "uniform"],
  waiver: ["waiver", "liability", "form", "sign"],
  ticket: ["ticket", "tickets"],
  background: ["background check", "background checks", "criminal record", "screening"],
};
 
// ---------------------------------------------------------------------------
// SENSITIVE TOPICS — bypass normal scoring, use empathy + escalation
// ---------------------------------------------------------------------------
const SENSITIVE_TOPICS = {
  refund: ["refund", "money back", "cancel", "withdraw"],
  billing: ["charged", "payment", "billing", "double charge", "charged twice"],
  injury: ["injury", "injured", "hurt", "accident"],
  complaint: ["complaint", "unhappy", "issue", "problem", "bad experience"],
};
 
const INTENT_KEYWORDS = {
  injury: ["injury", "injured", "hurt", "accident", "safety"],
  complaint: ["complaint", "complain", "issue", "problem", "bad experience"],
  refund: ["refund", "money back", "cancel", "withdraw"],
  billing: ["billing", "charged", "payment", "double charge"],
};
 
// ---------------------------------------------------------------------------
// DOMAIN KEYWORDS — the gate that decides if the question is studio-related.
// FIX: expanded to cover ALL topics in the 140-question knowledge base.
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
  "rates", "rate", "discount", "discounts", "monthly", "upfront", "full",
  "bursary", "bursaries", "financial", "assistance", "paying", "payments",
  "processed", "deposit", "costume", "costumes",
  // Billing & payments
  "billing", "payment", "refund", "withdraw", "cancel", "cheque", "visa",
  "mastercard", "cash", "invoice", "receipt", "charged", "late",
  // Studio & policies
  "studio", "location", "located", "address", "parking", "park",
  "waiting", "area", "parents", "parent", "watch", "observe",
  "attendance", "absent", "absence", "makeup", "weather", "cancelled",
  "cancellation", "dress", "code", "attire", "shoes", "uniform",
  "rehearsal", "volunteer", "volunteering", "birthday", "party", "rental",
  "photo", "covid", "health", "safety", "open", "hours", "holiday",
  // General info
  "where", "hours", "contact", "phone", "email", "website", "url",
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
  "pickup", "dropoff", "late", "bullied", "bullying", "anonymous",
  "emergency", "medical", "waiver", "liability", "form", "sign",
  "injury", "injured", "hurt", "accident", "incident",
  // Complaints & escalation
  "complaint", "complain", "unhappy", "feedback", "escalate",
  "escalation", "unfairly", "behavior", "behaviour", "issue",
  // Recital & performances
  "recital", "recitals", "performance", "ticket", "tickets", "costume",
  "rehearsal", "backstage", "flowers", "venue", "annual",
  // Competitive program
  "competitive", "competition", "competitions", "audition", "auditions",
  "solo", "duet", "merit", "seniority", "professional", "company",
  "parttime", "fulltime", "intensives", "intensive",
  // Accessibility & inclusion
  "wheelchair", "accessible", "accessibility", "adaptive", "inclusive",
  "inclusion", "special", "needs", "lgbtq", "pride", "gender",
  "welcoming",
  // Sponsorship
  "sponsorship", "sponsor", "partnership", "partnerships", "community",
  // DATOA specific
  "datoa", "data", "dynamic", "academy", "arts",
]);
 
// ---------------------------------------------------------------------------
// STOP WORDS — removed from scoring (too generic to be useful)
// ---------------------------------------------------------------------------
const STOP_WORDS = new Set([
  "a", "an", "and", "are", "can", "do", "for", "i", "is", "it",
  "me", "my", "of", "on", "or", "the", "to", "we", "what", "when",
  "where", "who", "why", "you", "your", "have", "has", "had", "be",
  "been", "being", "does", "did", "will", "would", "could", "should",
  "may", "might", "shall", "was", "were", "this", "that", "these",
  "those", "with", "from", "into", "onto", "upon",
]);
 
// ---------------------------------------------------------------------------
// Normalize helper
// ---------------------------------------------------------------------------
const normalize = (text) =>
  String(text ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim();
 
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
  // STEP 1: Sensitive topic detection (injury, billing, complaint, refund)
  // These bypass normal scoring and always escalate to human contact.
  // -------------------------------------------------------------------------
  let sensitiveCategory = null;
 
  const inputWords = input.split(/\s+/).filter(Boolean);
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
      refund: "We understand that situations like this can be frustrating, and we're here to help.",
      billing: "We understand that situations like this can be frustrating, and we're here to help.",
      injury: "We're really sorry to hear about this — your child's safety is incredibly important to us.",
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
  // STEP 2: Extract base keywords from user input
  // -------------------------------------------------------------------------
  const baseKeywords = inputWords.filter(
    (w) => w && w.length >= 3 && !STOP_WORDS.has(w),
  );
 
  // -------------------------------------------------------------------------
  // STEP 3: Domain gate — FIXED.
  // Check if ANY keyword OR ANY word in the input matches the domain.
  // Also check substrings so "enrolment" matches "enrol" etc.
  // -------------------------------------------------------------------------
  const allInputWords = input.split(/\s+/).filter((w) => w.length >= 3);
 
  const passesDomainGate = allInputWords.some((word) => {
    // direct hit
    if (DOMAIN_KEYWORDS.has(word)) return true;
    // partial hit — domain keyword is contained in user word or vice versa
    for (const dk of DOMAIN_KEYWORDS) {
      if (word.includes(dk) || dk.includes(word)) return true;
    }
    return false;
  });
 
  if (!passesDomainGate) {
    return res.json({ response: NO_MATCH, category: "general" });
  }
 
  // -------------------------------------------------------------------------
  // STEP 4: Detect category for CTA selection
  // -------------------------------------------------------------------------
  const detectedCategory = (() => {
    if (SYNONYMS.schedule.some((t) => input.includes(normalize(t)))) return "schedule";
    const pricingKeywords = ["price", "prices", "pricing", "cost", "tuition", "fee", "fees", "rates", "discount", "discounts", "monthly", "upfront"];
    if (pricingKeywords.some((t) => input.includes(t))) return "pricing";
    return null;
  })();
 
  // -------------------------------------------------------------------------
  // STEP 5: Expand terms using synonym groups
  // -------------------------------------------------------------------------
  const expandedTerms = new Set(baseKeywords);
 
  for (const synList of Object.values(SYNONYMS)) {
    const hasAny = synList.some((term) => input.includes(normalize(term)));
    if (hasAny) {
      for (const term of synList) expandedTerms.add(normalize(term));
    }
  }
 
  const expandedWords = new Set();
  const expandedPhrases = new Set();
  for (const term of expandedTerms) {
    if (!term) continue;
    if (term.includes(" ")) expandedPhrases.add(term);
    else expandedWords.add(term);
  }
 
  // -------------------------------------------------------------------------
  // STEP 6: Score every KB entry and find the best match
  // -------------------------------------------------------------------------
  let bestItem = null;
  let bestScore = 0;
 
  for (const item of KNOWLEDGE_BASE) {
    const q = normalize(item.question);
    if (!q) continue;
 
    // Exact match — instant winner
    if (q === input) {
      bestItem = item;
      bestScore = 99999;
      break;
    }
 
    // Strong substring match
    if (q.includes(input) || input.includes(q)) {
      if (bestScore < 999) {
        bestItem = item;
        bestScore = 999;
      }
      continue;
    }
 
    const qWords = new Set(
      q
        .split(/\s+/)
        .filter((w) => w && w.length >= 3 && !STOP_WORDS.has(w)),
    );
 
    let score = 0;
 
    // Phrase matches
    for (const phrase of expandedPhrases) {
      if (q.includes(phrase)) score += 3;
    }
 
    // Word matches
    for (const w of expandedWords) {
      if (qWords.has(w)) score += 1;
    }
 
    // Synonym group boost
    for (const synList of Object.values(SYNONYMS)) {
      let groupHits = 0;
      for (const termRaw of synList) {
        const term = normalize(termRaw);
        if (!term) continue;
        const isHit = term.includes(" ") ? q.includes(term) : qWords.has(term);
        if (isHit) groupHits++;
      }
      if (groupHits >= 2) score += groupHits;
    }
 
    // NEW: partial word match boost — catches "enrolment" matching "enrol" in KB
    for (const w of expandedWords) {
      if (w.length >= 5) {
        for (const qw of qWords) {
          if (qw.includes(w) || w.includes(qw)) {
            score += 0.5;
            break;
          }
        }
      }
    }
 
    if (score > bestScore) {
      bestScore = score;
      bestItem = item;
    }
  }
 
  // -------------------------------------------------------------------------
  // STEP 7: Last-resort fallback — simple substring search on KB questions
  // This catches any edge cases the scorer missed.
  // -------------------------------------------------------------------------
  if (!bestItem || bestScore === 0) {
    const fallbackItem = KNOWLEDGE_BASE.find((item) =>
      baseKeywords.some(
        (word) =>
          word.length >= 4 && item.question.toLowerCase().includes(word),
      ),
    );
 
    if (fallbackItem) {
      bestItem = fallbackItem;
    }
  }
 
  if (!bestItem) {
    return res.json({
      response: NO_MATCH,
      category: detectedCategory || "general",
    });
  }
 
  // -------------------------------------------------------------------------
  // STEP 8: Build and return final response
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
 










