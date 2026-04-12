const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5003;

/** @type {{ question: string; answer: string }[]} */
const KNOWLEDGE_BASE = [
  {
    question: "How do I register my child for dance classes?",
    answer:
      "You can register online at dynamicacademy.ca/classes, through the D.A.T.A. App, or by contacting the studio directly at (506) 847-1164 or by email.",
  },
  {
    question: "Is there a registration fee? How much does it cost to sign up?",
    answer:
      "Yes. Registration Fee: $35.00 + HST per student. Costume Deposit Fee: $75.00 or $150.00 + HST (depending on class length).",
  },
  {
    question: "My daughter is 4 years old. What classes can she take?",
    answer:
      "For ages 3–4 we offer Ballet ($48.30/mo + HST), Tap ($48.30/mo + HST), and a Ballet + Tap Combo ($61.70/mo + HST).",
  },
  {
    question: "My son is 12 years old and wants to try dance for the first time. What do you recommend?",
    answer:
      "We recommend All Styles (2 hrs/week) at $98.75/mo + HST, or Hip Hop (30 min/week) at $48.30/mo + HST.",
  },
  {
    question: "Can my child try a class before committing to a full session?",
    answer:
      "Yes! We offer a Free Trial Class with no experience required. Sign up at dynamicacademy.ca/free-trial-class. We'll help you find the right class fit.",
  },
  {
    question: "Do you offer mid-year enrolment or do I have to wait until September?",
    answer:
      "Yes, mid-season registration is possible if spots are available. Contact the studio to check availability.",
  },
  {
    question: "What's the process to switch my child from one class to another?",
    answer:
      "Contact the office via the Parent Portal or email and we will make the adjustment for you.",
  },
  {
    question: "Is there a waitlist if a class is full?",
    answer:
      "Yes. Click the WAITLIST button on the class schedule page at dynamicacademy.ca/classes to add your name.",
  },
  {
    question: "What is the registration deadline for the September season?",
    answer:
      "Registration typically opens in spring/summer. Check dynamicacademy.ca for current dates.",
  },
  {
    question: "Can siblings be registered in the same class?",
    answer:
      "Yes, siblings can be registered in the same class if they are the appropriate age for the class they are interested in.",
  },
  {
    question: "What dance programs and classes do you offer?",
    answer:
      "We offer Recreational, Part-Time Competitive, and Full-Time Competitive Company programs. Styles include Ballet, Jazz, Tap, Hip Hop, Lyrical, Contemporary, and Acrobatics.",
  },
  {
    question: "What are the Hip Hop classes you offer?",
    answer:
      "Hip Hop classes are available by age group: ages 5–6, 7–8, 9–10, and 11–18. Contact the studio or visit dynamicacademy.ca/classes for current scheduling and pricing details.",
  },
  {
    question: "What ballet classes do you offer by age group?",
    answer:
      "Ballet is offered for ages 3–4 as a standalone class, and for older ages within combo classes. Competitive dancers receive dedicated ballet training as part of their program.",
  },
  {
    question: "Do you offer jazz classes?",
    answer:
      "Yes, jazz is included in both recreational and competitive programs across multiple age groups.",
  },
  {
    question: "Do you offer lyrical or contemporary classes?",
    answer:
      "Yes. Lyrical is included in All Styles recreational classes. Contemporary is part of the competitive program.",
  },
  {
    question: "Do you offer tap classes?",
    answer:
      "Yes, tap classes are available with a detailed breakdown by age group. Visit dynamicacademy.ca/classes for the full schedule.",
  },
  {
    question: "Do you offer acro or acrobatic classes?",
    answer:
      "Yes. Acro Level 1/2 is available for ages 7–8, and Acro Level 3 is available for ages 9+.",
  },
  {
    question: "What is the weekly class schedule?",
    answer:
      "The full schedule is available at dynamicacademy.ca/recreational-classes. Classes are generally structured by age group on Tuesday/Wednesday evenings and Saturday mornings.",
  },
  {
    question: "When does the dance season start and end?",
    answer:
      "The dance season runs from September through May. Summer programs (camps and intensives) run in July and August.",
  },
  {
    question: "How long is each class session?",
    answer:
      "Recreational class lengths are 30 min, 60 min, 90 min, or 2 hours per week. Competitive program classes are longer and more frequent.",
  },
  {
    question: "Can adults take classes too or is it only for children?",
    answer:
      "Our programs are designed for students ages 3 to 18. Adult classes are not currently listed in our schedule.",
  },
  {
    question: "What are the preschool class options for ages 3–4?",
    answer:
      "For ages 3–4, we offer Ballet ($48.30/mo + HST), Tap ($48.30/mo + HST), and a Ballet + Tap Combo ($61.70/mo + HST).",
  },
  {
    question: "Do you offer any special events like workshops or masterclasses?",
    answer:
      "Yes! The studio offers summer workshops and events. Summer Elite Technique classes run Tuesdays & Wednesdays 4:30–6:30 PM for ages 5–18, at $130 for a 5-week session (July 7 – Aug 12, 2026). Competitive Intensives are also available. Contact the studio for details on any additional guest workshops or masterclasses.",
  },
  {
    question: "Can a parent and child take a class together?",
    answer:
      "Typically, students are placed in age-appropriate classes. Parent-child classes are not a standard offering. Contact the studio to discuss options.",
  },
  {
    question: "Is there a trial class I can sign my daughter up for before committing?",
    answer:
      "Yes! We offer a Free Trial Class. No experience required. Sign up at dynamicacademy.ca/free-trial-class. We'll help you find the right class fit.",
  },
];

const NO_MATCH =
  "Sorry, I don’t have information on that.";

/**
 * Minimal stop words only (lowercase). Content words like same, class, registered
 * are never listed here.
 */
const STOP_WORDS = new Set([
  "what",
  "do",
  "you",
  "your",
  "are",
  "is",
  "the",
  "a",
  "an",
]);

const MIN_WORD_LENGTH = 3;
const MIN_INTERSECTION = 2;

/**
 * Lowercase, replace punctuation with spaces, collapse whitespace.
 * @param {string} text
 * @returns {string}
 */
function normalizeInput(text) {
  return (text || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Meaningful word set: normalized text, split on spaces, drop stop words and short tokens.
 * @param {string} normalized
 * @returns {Set<string>}
 */
function meaningfulWordSet(normalized) {
  const out = new Set();
  if (!normalized) return out;
  const parts = normalized.split(/\s+/);
  for (let i = 0; i < parts.length; i++) {
    const w = parts[i];
    if (w.length >= MIN_WORD_LENGTH && !STOP_WORDS.has(w)) {
      out.add(w);
    }
  }
  return out;
}

/**
 * Intersection size: exact token equality only (via Set membership).
 * @param {Set<string>} userWords
 * @param {Set<string>} questionWords
 * @returns {number}
 */
function intersectionCount(userWords, questionWords) {
  let n = 0;
  const a = userWords;
  const b = questionWords;
  const [smaller, larger] = a.size <= b.size ? [a, b] : [b, a];
  smaller.forEach((w) => {
    if (larger.has(w)) n++;
  });
  return n;
}

/**
 * 1) Normalized full-string equality with a KB question (exact match).
 * 2) Else: word intersection ≥ MIN_INTERSECTION; unique top score wins.
 * @param {string} userMessage
 * @returns {string | null}
 */
const SYNONYMS = {
  fees: ["price", "cost", "charges"],
  classes: ["programs", "courses"],
  schedule: ["timing", "time", "hours"],
  enroll: ["register", "join", "admission"]
};

function findAnswer(userMessage) {
  // Replace synonyms in userMessage before normalization
  let replacedMessage = userMessage;
  if (typeof replacedMessage === "string") {
    Object.entries(SYNONYMS).forEach(([main, syns]) => {
      syns.forEach((syn) => {
        const regex = new RegExp(`\\b${syn}\\b`, "gi");
        replacedMessage = replacedMessage.replace(regex, main);
      });
    });
  }
  console.log("USER:", userMessage);
  const normalized = normalizeInput(replacedMessage);
  if (!normalized) return null;

  for (let i = 0; i < KNOWLEDGE_BASE.length; i++) {
    const item = KNOWLEDGE_BASE[i];
    console.log("CHECKING:", item.question);
    if (normalized === normalizeInput(item.question)) {
      return item.answer;
    }
  }

  const userWords = meaningfulWordSet(normalized);
  if (userWords.size === 0) return null;

  /** @type {{ score: number; answer: string }[]} */
  const scored = [];
  for (let j = 0; j < KNOWLEDGE_BASE.length; j++) {
    const item = KNOWLEDGE_BASE[j];
    const qNorm = normalizeInput(item.question);
    const questionWords = meaningfulWordSet(qNorm);
    const score = intersectionCount(userWords, questionWords);
    scored.push({ score, answer: item.answer });
  }

  let maxScore = 0;
  for (let k = 0; k < scored.length; k++) {
    if (scored[k].score > maxScore) maxScore = scored[k].score;
  }

  if (maxScore < MIN_INTERSECTION) return null;

  let winner = null;
  let tieCount = 0;
  for (let m = 0; m < scored.length; m++) {
    if (scored[m].score !== maxScore) continue;
    tieCount += 1;
    winner = scored[m].answer;
  }

  if (tieCount !== 1) return null;
  return winner;
}

app.use(cors());
app.use(express.json());

app.post("/chat", (req, res) => {
  const message =
    typeof req.body?.message === "string" ? req.body.message : "";
  const response = findAnswer(message) ?? NO_MATCH;
  res.json({ response });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
