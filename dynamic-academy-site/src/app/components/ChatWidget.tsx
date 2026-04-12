import { useEffect, useRef, useState } from "react";
import { Loader2, X } from "lucide-react";
import { ChatAssistantAvatar } from "./ChatAssistantAvatar";

type ChatRole = "user" | "bot";

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
};

const CHAT_API_URL = "http://localhost:5003/chat";

/**
 * Reads the chat reply from JSON: fetch body `{ response }` or axios-style `{ data: { response } }`.
 */
function extractChatReplyFromJson(payload: unknown): string | null {
  if (payload == null || typeof payload !== "object") return null;
  const o = payload as Record<string, unknown>;
  if (typeof o.response === "string") return o.response;
  const data = o.data;
  if (data != null && typeof data === "object") {
    const inner = (data as Record<string, unknown>).response;
    if (typeof inner === "string") return inner;
  }
  return null;
}

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const WELCOME_MESSAGE =
  "Hi there! 👋 I'm D.A.T.A. Bot, your friendly dance studio assistant. How can I help you today?";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { id: createId(), role: "bot", text: WELCOME_MESSAGE },
  ]);
  const [pending, setPending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  async function send() {
    const text = input.trim();
    if (!text || pending) return;

    setPending(true);
    setMessages((prev) => [...prev, { id: createId(), role: "user", text }]);
    setInput("");

    try {
      const res = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const raw = await res.text();
      let parsed: unknown;
      try {
        parsed = raw ? JSON.parse(raw) : null;
      } catch {
        throw new Error("Invalid JSON");
      }
      const reply = extractChatReplyFromJson(parsed);
      if (!res.ok || reply == null) {
        throw new Error("Invalid response");
      }
      setMessages((prev) => [
        ...prev,
        { id: createId(), role: "bot", text: reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: createId(), role: "bot", text: "Something went wrong" },
      ]);
    } finally {
      setPending(false);
    }
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
            {messages.map((m) =>
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
                  <div className="min-w-0 max-w-[min(85%,calc(100%-2.5rem))] rounded-lg rounded-bl-sm border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm">
                    {m.text}
                  </div>
                </div>
              ),
            )}
            {pending && (
              <div
                className="flex w-full min-w-0 justify-start gap-2"
                aria-busy="true"
                aria-label="Loading response"
              >
                <ChatAssistantAvatar
                  size={32}
                  className="mt-0.5 self-start"
                />
                <div className="flex min-h-[2.5rem] min-w-0 max-w-[min(85%,calc(100%-2.5rem))] items-center justify-center rounded-lg rounded-bl-sm border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <Loader2
                    className="h-4 w-4 animate-spin text-slate-500"
                    aria-hidden
                  />
                </div>
              </div>
            )}
          </div>
          <div className="shrink-0 border-t border-slate-100 bg-white p-3">
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

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="pointer-events-auto flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full shadow-md ring-2 ring-white/90 transition-opacity hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
        aria-expanded={open}
        aria-controls="chat-widget-panel"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <ChatAssistantAvatar size={48} />
      </button>
    </div>
  );
}
