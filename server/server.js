require("dotenv").config();

const express = require("express");
const cors = require("cors");
const KNOWLEDGE_BASE = require("./knowledgeBase");

const app = express();
const PORT = 5003;

const NO_MATCH =
  "I'm sorry, I don't have that information right now. Please contact the studio for assistance.";

app.use(cors());
app.use(express.json());

app.post("/chat", (req, res) => {
  const message =
    typeof req.body?.message === "string" ? req.body.message : "";

  const normalize = (text) =>
    String(text ?? "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const input = normalize(message);

  if (!input) {
    return res.json({ response: NO_MATCH });
  }

  const keywords = input.split(" ").filter(Boolean);
  const keywordSet = new Set(keywords);

  let bestItem = null;
  let bestScore = 0;

  for (const item of KNOWLEDGE_BASE) {
    const q = normalize(item.question);
    if (!q) continue;

    const qWords = q.split(" ").filter(Boolean);

    let score = 0;
    const seen = new Set();
    for (const w of qWords) {
      if (seen.has(w)) continue;
      seen.add(w);
      if (keywordSet.has(w)) score++;
    }

    if (score > bestScore) {
      bestScore = score;
      bestItem = item;
    }
  }

  if (!bestItem || bestScore < 2) {
    return res.json({ response: NO_MATCH });
  }

  res.json({ response: bestItem.answer });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
