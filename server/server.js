require("dotenv").config();

const express = require("express");
const cors = require("cors");
const KNOWLEDGE_BASE = require("./knowledgeBase");

const app = express();
const PORT = 5003;

const NO_MATCH =
  "I'm sorry, I don't have that information right now. Please contact the studio for assistance.";

const EMPATHY_OPENERS = [
  "Great question!",
  "We'd love to help with that!",
  "Thanks for reaching out!",
  "We totally understand your question.",
  "Happy to help!",
];

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
    "Visit dynamicacademy.ca or call us at (506) 847-1164 for more information.",
};

const SYNONYMS = {
  refund: ["refund", "money back", "cancel", "withdraw", "stop payment"],
  sibling: ["sibling", "brother", "sister"],
  schedule: ["schedule", "timing", "time", "class time"],
};

const SENSITIVE_TOPICS = {
  refund: ["refund", "money back", "cancel", "withdraw"],
  billing: ["charged", "payment", "billing", "double charge"],
  injury: ["injury", "injured", "hurt", "accident", "safety"],
  complaint: ["complaint", "unhappy", "issue", "problem", "bad experience"],
};

const INTENT_KEYWORDS = {
  injury: ["injury", "injured", "hurt", "accident", "safety"],
  complaint: ["complaint", "complain", "issue", "problem", "bad experience"],
  refund: ["refund", "money back", "cancel", "withdraw"],
  billing: ["billing", "charged", "payment", "double charge"],
};

app.use(cors());
app.use(express.json());

app.post("/chat", (req, res) => {
  const message =
    typeof req.body?.message === "string" ? req.body.message : "";

  const normalize = (text) => {
    return String(text ?? "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .trim();
  };

  const input = normalize(message);

  if (!input) {
    return res.json({ response: NO_MATCH, category: "general" });
  }

  /** @type {keyof typeof SENSITIVE_TOPICS | null} */
  let sensitiveCategory = null;

  // PRIORITY: complaint keywords as exact words
  const inputWords = input.split(/\s+/).filter(Boolean);
  const complaintKeywords = ["complaint", "complain", "issue", "problem"];
  const isComplaint = complaintKeywords.some((k) => inputWords.includes(k));
  if (isComplaint) {
    sensitiveCategory = "complaint";
  } else {
    for (const [category, keywords] of Object.entries(SENSITIVE_TOPICS)) {
      const hit = keywords.some((k) => input.includes(normalize(k)));
      if (hit) {
        sensitiveCategory = /** @type {any} */ (category);
        break;
      }
    }
  }

  // Sensitive topics: force match by intent (do not use general scoring)
  if (sensitiveCategory) {
    const needles = INTENT_KEYWORDS[sensitiveCategory] ?? [];

    let bestItem = null;
    let bestScore = 0;

    for (const item of KNOWLEDGE_BASE) {
      const normalizedQuestion = normalize(item.question);
      if (!normalizedQuestion) continue;

      let score = 0;

      for (const keyword of needles) {
        if (normalizedQuestion.includes(normalize(keyword))) {
          score++;
        }
      }

      // Bonus: match user words
      const inputWords = input.split(" ");
      for (const word of inputWords) {
        if (word && normalizedQuestion.includes(word)) {
          score += 2; // higher weight
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestItem = item;
      }
    }

    const matchedAnswer =
      bestItem && bestScore >= 2 ? bestItem.answer : NO_MATCH;

    let empathyValidation = "";
    if (sensitiveCategory === "refund" || sensitiveCategory === "billing") {
      empathyValidation =
        "We understand that situations like this can be frustrating, and we're here to help.";
    } else if (sensitiveCategory === "injury") {
      empathyValidation =
        "We're really sorry to hear about this — your child's safety is incredibly important to us.";
    } else if (sensitiveCategory === "complaint") {
      empathyValidation =
        "Thank you for bringing this to our attention — we take concerns like this very seriously.";
    }

    const topicCTA = CTA_BY_TOPIC[sensitiveCategory] || CTA_BY_TOPIC.general;

    const finalResponse =
      empathyValidation + "\n\n" + matchedAnswer + "\n\n" + topicCTA;

    return res.json({ response: finalResponse, category: sensitiveCategory });
  }

  const detectedCategory = (() => {
    // schedule
    if (SYNONYMS.schedule.some((t) => input.includes(normalize(t)))) {
      return "schedule";
    }
    // pricing
    const pricingKeywords = [
      "price",
      "prices",
      "pricing",
      "cost",
      "tuition",
      "fee",
      "fees",
      "rates",
    ];
    if (pricingKeywords.some((t) => input.includes(normalize(t)))) {
      return "pricing";
    }
    return "general";
  })();

  const baseKeywords = input.split(" ").filter(Boolean);
  const expandedTerms = new Set(baseKeywords);

  // Expand user intent via simple synonyms/phrases
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

  let bestItem = null;
  let bestScore = 0;
  let bestMatches = 0;

  for (const item of KNOWLEDGE_BASE) {
    const q = normalize(item.question);
    if (!q) continue;

    // Boost: full phrase match (highest priority)
    if (q.includes(input) || input.includes(q)) {
      bestItem = item;
      bestScore = Number.POSITIVE_INFINITY;
      bestMatches = Number.POSITIVE_INFINITY;
      break;
    }

    const qWords = new Set(q.split(" ").filter(Boolean));

    let matches = 0;
    let score = 0;

    // Phrase matches (medium-high)
    let phraseHits = 0;
    for (const phrase of expandedPhrases) {
      if (q.includes(phrase)) {
        phraseHits++;
        matches++;
      }
    }

    // Word matches
    let wordHits = 0;
    for (const w of expandedWords) {
      if (qWords.has(w)) {
        wordHits++;
        matches++;
      }
    }

    // Related-keyword boost: matching multiple terms within the same synonym group
    let relatedBoost = 0;
    for (const synList of Object.values(SYNONYMS)) {
      let groupHits = 0;
      for (const termRaw of synList) {
        const term = normalize(termRaw);
        if (!term) continue;
        const isHit = term.includes(" ") ? q.includes(term) : qWords.has(term);
        if (isHit) groupHits++;
      }
      if (groupHits >= 2) relatedBoost += groupHits;
    }

    score = wordHits + phraseHits * 2 + relatedBoost;

    if (score > bestScore) {
      bestScore = score;
      bestMatches = matches;
      bestItem = item;
    }
  }

  if (!bestItem || bestMatches < 2) {
    return res.json({ response: NO_MATCH, category: detectedCategory });
  }

  const matchedAnswer = bestItem.answer;
  const empathyOpener =
    EMPATHY_OPENERS[Math.floor(Math.random() * EMPATHY_OPENERS.length)];

  const finalResponse =
    empathyOpener + "\n\n" + matchedAnswer + "\n\n" + CTA_BY_TOPIC.general;

  res.json({ response: finalResponse, category: detectedCategory });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
