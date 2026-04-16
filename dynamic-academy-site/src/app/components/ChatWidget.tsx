import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { ChatAssistantAvatar } from "./ChatAssistantAvatar";

type ChatRole = "user" | "bot";

type ChatCategory =
  | "pricing"
  | "schedule"
  | "complaint"
  | "safety"
  | "refund"
  | "billing"
  | "injury"
  | "general";

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  category?: ChatCategory;
  feedbackGiven?: boolean;
};

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const WELCOME_MESSAGE =
  "Hi there! 👋 I'm D.A.T.A. Bot, your friendly dance studio assistant. How can I help you today?";

const INITIAL_SUGGESTIONS = [
  "What classes do you offer?",
  "How do I register?",
  "What are your prices?",
  "Where are you located?",
];

const FOLLOW_UP_SUGGESTIONS = {
  pricing: ["Register Now", "Free Trial Class"],
  schedule: ["Pricing Info", "How do I register?"],
  complaint: ["Contact Us", "Talk to a Human"],
  safety: ["Meet Our Instructors", "Contact Us"],
  general: ["View Classes", "Contact Us"],
} as const;

function getFollowUpSuggestions(category: ChatCategory | undefined): string[] {
  const normalizedCategory: keyof typeof FOLLOW_UP_SUGGESTIONS =
    category === "injury"
      ? "safety"
      : category === "refund" || category === "billing"
        ? "complaint"
        : category === "pricing" ||
            category === "schedule" ||
            category === "complaint" ||
            category === "safety"
          ? category
          : "general";

  const raw = FOLLOW_UP_SUGGESTIONS[normalizedCategory] ?? FOLLOW_UP_SUGGESTIONS.general;

  const uniq: string[] = [];
  const seen = new Set<string>();
  for (const s of raw) {
    const v = String(s ?? "").trim();
    if (!v || seen.has(v)) continue;
    seen.add(v);
    uniq.push(v);
  }

  return uniq;
}

const CHIP_TO_QUERY: Record<string, string> = {
  "Contact Us": "How can I contact the studio?",
  "Talk to a Human": "How can I contact the studio?",
  "View Classes": "What classes do you offer?",
  "Pricing Info": "What are your prices?",
  "How do I register?": "How do I register?",
  "Register Now": "How do I register?",
  "Free Trial Class": "Do you offer a free trial class?",
  "Meet Our Instructors": "Are instructors certified in first aid?",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { id: createId(), role: "bot", text: WELCOME_MESSAGE },
  ]);
  const [pending, setPending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [lastCategory, setLastCategory] = useState<ChatCategory | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  const showInitialSuggestions = messages.every((m) => m.role !== "user");

  const handleFeedback = (id: string, type: "up" | "down") => {
    console.log("Feedback:", { id, type });

    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, feedbackGiven: true } : msg)),
    );
  };

  const handleTalkToHuman = () => {
    setLastCategory(null);
    setMessages((prev) => [
      ...prev,
      {
        id: createId(),
        role: "bot",
        text:
          "We’d be happy to connect you with our team!\n\nEmail: dynamicacademyofthearts@gmail.com\nPhone: (506) 847-1164\nOr use our contact form at dynamicacademy.ca/contact",
        category: "general",
      },
    ]);
  };

  async function sendMessage(userText: string) {
    const displayText = userText.trim();
    if (!displayText || pending) return;

    let text = displayText;
    const words = text.split(/\s+/).filter(Boolean);
    const isShort = words.length <= 3;

    if (isShort && lastCategory) {
      text = lastCategory + " " + text;
    }

    setPending(true);
    setIsTyping(true);
    setMessages((prev) => [
      ...prev,
      { id: createId(), role: "user", text: displayText },
    ]);
    setInput("");

    try {
      const response = await fetch("http://localhost:5003/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      const data = (await response.json()) as {
        response?: string;
        category?: ChatCategory;
      };
      const assistantText = data.response?.trim()
        ? data.response
        : "Sorry, I don’t have information on that.";

      await new Promise((resolve) => setTimeout(resolve, 700));
      setIsTyping(false);
      setLastCategory(data.category ?? null);
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "bot",
          text: assistantText,
          category: data.category ?? "general",
        },
      ]);
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 700));
      setIsTyping(false);
      setLastCategory(null);
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "bot",
          text: "Sorry, I don’t have information on that.",
        },
      ]);
    } finally {
      setPending(false);
    }
  }

  async function send() {
    return sendMessage(input);
  }

  return (
    <div className="pointer-events-none fixed bottom-0 right-0 z-[100] flex flex-col items-end gap-3 p-4 sm:p-6">
      {open && (
        <div
          id="chat-widget-panel"
          className="pointer-events-auto flex max-h-[min(520px,calc(100vh-8rem))] w-[min(100vw-2rem,22rem)] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg"
          role="dialog"
          aria-label="Chat with D.A.T.A. Assistant"
        >
          <header className="flex shrink-0 items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3">
            <h2 className="text-sm font-semibold text-slate-800">
              D.A.T.A. Assistant
            </h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-slate-200/80 hover:text-slate-800"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          </header>
          <div
            ref={scrollRef}
            className="flex min-h-[200px] flex-1 flex-col gap-2 overflow-y-auto bg-slate-50/50 p-3"
            aria-live="polite"
          >
            {messages.map((m, idx) =>
              m.role === "user" ? (
                <div key={m.id} className="flex justify-end">
                  <div className="max-w-[85%] rounded-lg rounded-br-sm bg-slate-800 px-3 py-2 text-sm text-white">
                    {m.text}
                  </div>
                </div>
              ) : (
                <div
                  key={m.id}
                  className="flex w-full min-w-0 justify-start gap-2"
                >
                  <ChatAssistantAvatar
                    size={32}
                    className="mt-0.5 self-start"
                  />
                  <div className="min-w-0 max-w-[min(85%,calc(100%-2.5rem))]">
                    <div className="rounded-lg rounded-bl-sm border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm">
                      {m.text}
                    </div>
                    {!m.feedbackGiven && (
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          Was this helpful?
                        </span>

                        <button
                          type="button"
                          onClick={() => handleFeedback(m.id, "up")}
                          className="text-sm transition-transform hover:scale-110"
                        >
                          👍
                        </button>

                        <button
                          type="button"
                          onClick={() => handleFeedback(m.id, "down")}
                          className="text-sm transition-transform hover:scale-110"
                        >
                          👎
                        </button>
                      </div>
                    )}
                    {m.feedbackGiven && (
                      <div className="mt-1 text-xs text-green-600">
                        Thanks for your feedback!
                      </div>
                    )}
                    {idx === 0 && showInitialSuggestions && (
                      <div className="mt-2 flex flex-col items-start gap-2">
                        {INITIAL_SUGGESTIONS.map((s) => (
                          <button
                            key={s}
                            type="button"
                            disabled={pending}
                            onClick={() => void sendMessage(s)}
                            className="inline-block rounded-full border border-slate-200 bg-slate-100 px-3.5 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                    {idx === messages.length - 1 && m.category && !pending && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {getFollowUpSuggestions(m.category)
                          .slice(0, 2)
                          .map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => {
                                const mapped = CHIP_TO_QUERY[s] || s;
                                void sendMessage(mapped);
                              }}
                              className="inline-block rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs text-slate-700 transition-colors hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {s}
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              ),
            )}
            {isTyping && (
              <div className="flex items-start gap-2" aria-busy="true">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-200">
                  <span>🟣</span>
                </div>
                <div className="flex gap-1 rounded-lg bg-gray-100 px-3 py-2">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            )}
          </div>
          <div className="shrink-0 border-t border-slate-100 bg-white p-3">
            <div className="mt-2 mb-2 flex items-center justify-start">
              <button
                type="button"
                onClick={handleTalkToHuman}
                className="bg-orange-100 text-orange-700 px-3 py-1.5 text-sm rounded-full hover:bg-orange-200 font-medium inline-block"
              >
                Talk to a Human
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !pending) {
                    e.preventDefault();
                    void send();
                  }
                }}
                placeholder="Type a message…"
                disabled={pending}
                className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Message input"
              />
              <button
                type="button"
                onClick={() => void send()}
                disabled={pending}
                className="shrink-0 rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative group pointer-events-auto">
        <div className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white shadow-md group-hover:block">
          Chat with D.A.T.A. Bot
        </div>
        <button
          type="button"
          onClick={() => {
            setOpen((v) => !v);
            setHasInteracted(true);
          }}
          className={`flex h-16 w-16 shrink-0 items-center justify-center border-0 bg-transparent p-0 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2${!hasInteracted ? " animate-pulse-custom" : ""}`}
          aria-expanded={open}
          aria-controls="chat-widget-panel"
          aria-label={open ? "Close chat" : "Open chat"}
        >
          <ChatAssistantAvatar variant="button" />
        </button>
      </div>

      <style>{`
        .dot {
          width: 6px;
          height: 6px;
          background: #555;
          border-radius: 50%;
          animation: bounce 1.2s infinite;
        }

        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes bounce {
          0%,
          80%,
          100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }

        .animate-pulse-custom {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2);
          }
          70% {
            transform: scale(1.05);
            box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
          }
        }
      `}</style>
    </div>
  );
}
