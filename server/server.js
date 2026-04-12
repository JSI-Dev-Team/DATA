const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5001;

/** @type {{ question: string; answer: string }[]} */
const KNOWLEDGE_BASE = [
  {
    question: "What are your hours?",
    answer:
      "We are open Monday–Friday 9am–5pm, and Saturday 10am–2pm. We are closed on Sundays.",
  },
  {
    question: "How do I enroll?",
    answer:
      "You can enroll through our website contact form, by phone, or by visiting during office hours.",
  },
  {
    question: "Where are you located?",
    answer:
      "Visit our Contact page for the full address and a map. We’d love to see you!",
  },
];

const NO_MATCH =
  "Sorry, I don't have information on that.";

/**
 * @param {string} userMessage
 * @returns {string | null}
 */
function findAnswer(userMessage) {
  const q = (userMessage || "").trim().toLowerCase();
  if (!q) return null;

  for (const item of KNOWLEDGE_BASE) {
    const questionLower = item.question.toLowerCase();
    if (q.includes(questionLower) || questionLower.includes(q)) {
      return item.answer;
    }
    const keywords = questionLower
      .replace(/[?!.,]/g, "")
      .split(/\s+/)
      .filter((w) => w.length >= 3);
    if (keywords.some((kw) => q.includes(kw))) {
      return item.answer;
    }
  }
  return null;
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
