const BRAND_BG = "#F3EAF1";
const BRAND_FG = "#752E6B";

type Size = 32 | 48;

type ChatAssistantAvatarProps = {
  size: Size;
  className?: string;
};

/**
 * Ballet arabesque silhouette — smooth cubic/quadratic curves (no stick geometry, no icon fonts).
 * Head: soft ellipses; body: flowing bezier paths; extended rear leg + port de bras arms.
 */
function DancerSilhouetteSvg({ sizePx }: { sizePx: number }) {
  const f = BRAND_FG;
  return (
    <svg
      width={sizePx}
      height={sizePx}
      viewBox="0 0 56 64"
      className="shrink-0"
      aria-hidden
    >
      <ellipse cx="26" cy="9.5" rx="4.6" ry="5.2" fill={f} />
      <ellipse cx="28.5" cy="6.8" rx="2.4" ry="2.7" fill={f} />
      {/* Torso, hips, tutu — one continuous smooth outline */}
      <path
        fill={f}
        d="M22.5 16.2 C19 16.8 16.8 19.5 16.2 23.5 C15.4 29 15.2 35.5 16 41.2 C16.6 45.5 18 49 20.2 51.2 C22.8 53.6 26.5 54 29.2 52.2 C32 50.2 33.2 46.5 32.8 42.5 C32.4 38 31.2 33.5 30 29 C29.2 26 28 21.8 26.5 19.2 C25.5 17.5 24 16.5 22.5 16.2 Z"
      />
      {/* Port de bras — arm lifted in a long curve */}
      <path
        fill={f}
        d="M23.5 17.2 C20 15.8 15.8 16.8 12.8 19.5 C10 22.2 8.2 26.2 7.8 30.5 C7.5 33.2 8.2 35 9.8 35.4 C11.5 35.8 13.2 34.5 14.8 32.2 C16.5 29.8 18 26.8 19.8 24.5 C21 23 22.2 21.8 23.4 20.8 C24.2 20.2 24.6 19.2 24.5 18.2 C24.4 17.5 24 17.2 23.5 17.2 Z"
      />
      {/* Second arm — soft forward curve */}
      <path
        fill={f}
        d="M27.5 18.2 C30.5 17 34 17.2 37 18.8 C39.6 20.2 41.2 22.8 41 25.2 C40.8 27.5 39.2 29 37 28.8 C35 28.6 33 27.2 31.8 25.2 C30.8 23.6 29.8 21.5 29 19.8 C28.5 18.8 28 18.2 27.5 18.2 Z"
      />
      {/* Tutu hem — wide scalloped curve */}
      <path
        fill={f}
        d="M15.8 41.5 C15 45.5 15.2 50 16.8 53.8 C18.6 58.2 22 61 26.5 61.5 C31 62 35 60 37.5 56.5 C39.4 54.2 40 51 39.5 47.8 C36.5 49.8 32.5 50.5 28.5 49.8 C24.5 49 20.8 46.5 18.5 42.8 C17.6 42 16.6 41.6 15.8 41.5 Z"
      />
      {/* Supporting leg */}
      <path
        fill={f}
        d="M21.8 53.5 C21.2 57.5 21 61.2 21.5 64 L26 64 C25.6 60.5 25.8 56.8 26.5 53.2 C27.2 49.5 28.5 46.5 30 44.5 C27.5 46.8 24.5 50 21.8 53.5 Z"
      />
      {/* Arabesque — extended leg & line of foot */}
      <path
        fill={f}
        d="M30.5 43.5 C34.5 42 40 42.5 45 45 C50.5 47.8 53.8 52 54.5 56.5 C55 59.5 54 62 51.8 63 C49.8 63.8 47 63 45.2 60.8 C43.5 58.8 43.2 56 44.2 53.8 C45.2 51.8 47.5 50.5 50 50.5 C47 48 42.5 46.5 38 47.2 C34.8 47.6 32.2 46 30.5 43.5 Z"
      />
    </svg>
  );
}

export function ChatAssistantAvatar({
  size,
  className = "",
}: ChatAssistantAvatarProps) {
  const iconPx = Math.round(size * 0.72);

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: BRAND_BG,
      }}
      aria-hidden
    >
      <DancerSilhouetteSvg sizePx={iconPx} />
    </span>
  );
}
