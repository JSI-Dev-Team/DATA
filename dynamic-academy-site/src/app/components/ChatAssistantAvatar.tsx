import avatar from "@/assets/chat-avatar.png";

type Size = 32 | 48;

type ChatAssistantAvatarProps = {
  /** Used for `variant="message"` only (chat bubbles). */
  size?: Size;
  className?: string;
  /** Message bubbles: circular crop + bg. Floating trigger: single circular crop (no extra bg). */
  variant?: "message" | "button";
};

export function ChatAssistantAvatar({
  size = 32,
  className = "",
  variant = "message",
}: ChatAssistantAvatarProps) {
  if (variant === "button") {
    return (
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full">
        <img
          src={avatar}
          alt=""
          className="h-full w-full scale-125 object-cover object-center"
          draggable={false}
          aria-hidden
        />
      </div>
    );
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#F3EAF1] ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <img
        src={avatar}
        alt=""
        className="h-full w-full object-cover"
        draggable={false}
      />
    </span>
  );
}
