import { motion } from "motion/react";
import { Link } from "react-router";
import {
  ChevronRight, ChevronDown, Trophy, Heart, Star, MapPin,
  Crown, Zap, Sparkles, CheckCircle2, Camera,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Accent = "purple" | "orange" | "violet" | "merger";

type TimelineEvent = {
  year: string;
  label: string;
  title: string;
  location: string;
  paragraphs: string[];
  side: "left" | "right";
  accent: Accent;
  Icon: React.ComponentType<{ className?: string }>;
  imagePlaceholder: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const EVENTS: TimelineEvent[] = [
  {
    year: "1975",
    label: "A Legacy Is Born",
    title: "Rothesay Ballet School Opens Its Doors",
    location: "Rothesay, New Brunswick",
    paragraphs: [
      "Long before D.A.T.A existed, a quiet but powerful tradition took root in Rothesay. Miss Sylvia Logan founded what would become one of Atlantic Canada's most respected classical ballet institutions — built on the Royal Academy of Dance (RAD) syllabus, an internationally recognized standard that would give generations of local dancers a credential they could carry anywhere in the world.",
      "Over the next five decades, the school would stage countless productions, develop technically exceptional dancers, and create a holiday tradition so beloved that families across the Kennebecasis Valley planned their entire December around it: The Nutcracker. Year after year, generation after generation, the lights came up and the magic happened.",
    ],
    side: "left",
    accent: "purple",
    Icon: Crown,
    imagePlaceholder: "Historic founding photo — Miss Sylvia Logan teaching early students (circa 1975)",
  },
  {
    year: "2013",
    label: "A New Energy Arrives",
    title: "Dynamic Academy of The Arts Opens",
    location: "Quispamsis, New Brunswick",
    paragraphs: [
      "A bold vision took shape just down the road in Quispamsis. Dynamic Academy of The Arts was founded on a simple but powerful belief: that classical discipline and contemporary fire are partners, not opposites. From day one, D.A.T.A offered ballet, jazz, tap, hip-hop, lyrical, and acro under one roof — pairing rigorous training with a culture that made every dancer feel like they truly belonged.",
      "But more than classes, the founders built a family. One where every student, from the 3-year-old discovering her first plié to the 17-year-old heading to nationals, received genuine attention and real pride in their growth. The goal was never just to teach steps. It was to build confident, creative, disciplined human beings — who happened to dance brilliantly.",
    ],
    side: "right",
    accent: "orange",
    Icon: Zap,
    imagePlaceholder: "Opening day at 6 Market St — founding students and teachers, September 2013",
  },
  {
    year: "2013–2025",
    label: "The Growth Years",
    title: "300 Dancers. 50+ Awards. One Unbreakable Family.",
    location: "Quispamsis, NB",
    paragraphs: [
      "What started as a local studio became one of the region's most celebrated dance communities. D.A.T.A grew to 300+ active dancers, earned more than 50 competition awards, and staged over 100 performances across New Brunswick — all while keeping the intimate, family-first environment that made it extraordinary in the first place.",
      "The secret was never just technique. It was culture. An industry-trained faculty who never stopped growing their own craft. A competitive team that won on heart as much as skill. And an uncompromising philosophy that every dancer at every level deserved the same quality of attention, encouragement, and belief.",
    ],
    side: "left",
    accent: "orange",
    Icon: Trophy,
    imagePlaceholder: "Competition team celebrating — trophies, team jackets, and pure joy",
  },
  {
    year: "2024–2025",
    label: "Two Schools, One Heartbeat",
    title: "The Collaboration That Changed Everything",
    location: "Kennebecasis Valley, NB",
    paragraphs: [
      "Something remarkable began happening between two neighbouring schools. D.A.T.A and Rothesay Ballet School started working together — first through joint summer intensives that brought students into shared training spaces, then even more meaningfully when D.A.T.A dancers were invited to perform in Rothesay Ballet's beloved Nutcracker production.",
      "It felt natural and inevitable. Two schools, fifty years apart in history, with the same deep commitment to extraordinary dance education. The community could feel what was forming long before any announcement was made. Something bigger was taking shape — something neither school could have built alone.",
    ],
    side: "right",
    accent: "violet",
    Icon: Heart,
    imagePlaceholder: "Joint summer intensive 2024 — students from both schools in class together",
  },
  {
    year: "April 9, 2026",
    label: "Historic Announcement",
    title: "\"One Stage. One Community. One School.\"",
    location: "Quispamsis & Rothesay, NB",
    paragraphs: [
      "On April 9, 2026, the Kennebecasis Valley received news that many had sensed was coming — and that would change everything. Dynamic Academy of The Arts and Rothesay Ballet School announced they were coming together. Not a takeover. Not an acquisition. A merger of equals: two beloved, excellent schools choosing to build something that neither could have achieved alone.",
      "The announcement was met with an outpouring of support from families who had watched both schools flourish for years. \"The tradition of Rothesay Ballet. The energy of DATA. One school, one community, one stage.\" Fifty years of classical excellence, meeting twelve years of dynamic contemporary training — finally, in one place.",
    ],
    side: "left",
    accent: "merger",
    Icon: Sparkles,
    imagePlaceholder: "April 9, 2026 — merger announcement, leadership and community together",
  },
  {
    year: "July 1, 2026",
    label: "The New Chapter",
    title: "Together. Stronger Than Ever.",
    location: "Quispamsis & Rothesay, NB",
    paragraphs: [
      "Effective July 1, 2026, all programs, all faculty, and all students joined under one creative family across two campuses. The Nutcracker — a tradition established through Gala Ballet Productions since 1975 — continues. Miss Sylvia Logan and the full Rothesay faculty continue. RAD certification continues. What opens up for every dancer is extraordinary.",
      "50 years of classical ballet excellence married to over a decade of dynamic contemporary and competitive training. Ballet, jazz, tap, hip-hop, lyrical, acro, contemporary, and musical theatre — all under one name, one roof, one community. This is D.A.T.A as it was always meant to be.",
    ],
    side: "right",
    accent: "orange",
    Icon: Star,
    imagePlaceholder: "First combined school day — students and teachers from both campuses together",
  },
];

const STATS = [
  { value: "1975", label: "Rothesay Ballet Founded", accent: "purple" as Accent },
  { value: "2013", label: "D.A.T.A Founded", accent: "orange" as Accent },
  { value: "300+", label: "Active Dancers", accent: "orange" as Accent },
  { value: "50+", label: "Competition Awards", accent: "purple" as Accent },
  { value: "2", label: "Campus Locations", accent: "violet" as Accent },
  { value: "50 yrs", label: "Nutcracker Tradition", accent: "purple" as Accent },
];

const ICON_BG: Record<Accent, string> = {
  purple: "bg-purple-600 shadow-purple-500/40",
  orange: "bg-orange-500 shadow-orange-400/40",
  violet: "bg-violet-600 shadow-violet-500/40",
  merger: "bg-gradient-to-br from-purple-600 to-orange-500 shadow-purple-500/30",
};

const YEAR_COLOR: Record<Accent, string> = {
  purple: "text-purple-600",
  orange: "text-orange-500",
  violet: "text-violet-600",
  merger: "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-500",
};

const STAT_COLOR: Record<Accent, string> = {
  purple: "text-purple-700",
  orange: "text-orange-500",
  violet: "text-violet-600",
  merger: "text-purple-600",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function EventCard({ event }: { event: TimelineEvent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="bg-white rounded-3xl shadow-xl shadow-slate-200/70 border border-slate-100 overflow-hidden"
    >
      {/* Image placeholder */}
      <div className="relative aspect-[16/7] bg-gradient-to-br from-slate-100 to-purple-50/50 border-b border-slate-100 flex flex-col items-center justify-center gap-2 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/60 to-orange-50/40" />
        <Camera className="w-8 h-8 text-slate-300 relative z-10" />
        <p className="text-xs text-slate-400 text-center px-6 relative z-10 leading-snug font-medium">
          {event.imagePlaceholder}
        </p>
      </div>

      <div className="p-7 md:p-8">
        {/* Year + label row */}
        <div className="flex items-center gap-3 mb-3">
          <span className={`text-base font-extrabold tracking-tight ${YEAR_COLOR[event.accent]}`}>
            {event.year}
          </span>
          <span className="h-px flex-1 bg-slate-200" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
            {event.label}
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-3 leading-tight">
          {event.title}
        </h3>

        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium mb-5">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          {event.location}
        </div>

        <div className="space-y-3">
          {event.paragraphs.map((p, i) => (
            <p key={i} className="text-slate-600 text-[15px] leading-relaxed">{p}</p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function TimelineEntry({ event }: { event: TimelineEvent }) {
  const isLeft = event.side === "left";

  return (
    <div className="relative">
      {/* ── Mobile layout (single column, left spine) ── */}
      <div className="lg:hidden pl-14">
        <div className={`absolute left-0 top-2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-10 ${ICON_BG[event.accent]}`}>
          <event.Icon className="w-5 h-5 text-white" />
        </div>
        <EventCard event={event} />
      </div>

      {/* ── Desktop layout (alternating) ── */}
      <div className="hidden lg:grid grid-cols-[1fr_88px_1fr] items-start">
        {/* Left slot */}
        <div className="pr-10">
          {isLeft && <EventCard event={event} />}
        </div>

        {/* Centre icon on spine */}
        <div className="flex justify-center pt-6">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl z-10 ${ICON_BG[event.accent]}`}>
            <event.Icon className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Right slot */}
        <div className="pl-10">
          {!isLeft && <EventCard event={event} />}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function About() {
  return (
    <div className="flex flex-col w-full overflow-hidden">

      {/* ═══════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════ */}
      <section className="relative min-h-[72vh] flex items-center justify-center pt-20 pb-16">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?w=2000&q=80"
            alt="Dance studio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-purple-950/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-950/50 via-purple-900/60 to-purple-950/90" />
          <div className="absolute inset-0 bg-grain opacity-[0.04] pointer-events-none select-none" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-orange-400 font-bold tracking-widest uppercase text-sm bg-orange-400/10 border border-orange-400/25 px-5 py-1.5 rounded-full mb-8">
              Our Story
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.06]">
              Fifty Years of Steps.<br />
              <span className="text-[#ff8904]">One Bold Future.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-purple-100 leading-relaxed">
              The story of two dance schools, half a century of tradition, and a merger that created something extraordinary for the Kennebecasis Valley — and every dancer in it.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════
          STATS RIBBON
      ═══════════════════════════════════════════════ */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <div className={`text-3xl md:text-4xl font-extrabold mb-1.5 ${STAT_COLOR[s.accent]}`}>
                  {s.value}
                </div>
                <div className="text-xs text-slate-500 font-medium leading-tight">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          OPENING STATEMENT
      ═══════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <blockquote className="text-2xl md:text-3xl font-bold text-slate-900 leading-snug mb-8">
              "We believe dance is more than movement — it&apos;s{" "}
              <span className="text-purple-600">a journey of self-discovery</span>,
              creativity, and confidence that shapes who a child becomes for life."
            </blockquote>
            <div className="h-1 w-16 bg-gradient-to-r from-purple-600 to-orange-500 rounded-full mx-auto mb-8" />
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              This is the founding belief that D.A.T.A and Rothesay Ballet School have always shared — even when they were two separate schools working on opposite sides of the valley. Today, united as one, this belief shapes every class, every teacher, and every dancer who walks through our doors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TIMELINE
      ═══════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-b from-purple-50/60 via-white to-orange-50/40 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <span className="text-purple-600 font-bold tracking-wider uppercase text-sm bg-purple-100 inline-block px-4 py-1 rounded-full mb-4">
              The Journey
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              A Story Worth Knowing
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Two schools. Five decades apart. One shared belief that dance changes lives.
            </p>
          </div>

          <div className="relative">
            {/* Desktop spine */}
            <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-violet-400 to-orange-400 opacity-40" />
            {/* Mobile spine */}
            <div className="lg:hidden absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-orange-400 opacity-40" />

            <div className="space-y-14 lg:space-y-16">
              {EVENTS.map((event) => (
                <TimelineEntry key={event.year} event={event} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          MERGER SPOTLIGHT
      ═══════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-br from-purple-950 via-slate-900 to-slate-950 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-orange-400 font-bold tracking-widest uppercase text-sm bg-orange-400/10 border border-orange-400/25 inline-block px-5 py-1.5 rounded-full mb-6">
              April 9, 2026
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              Two Great Schools.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">
                One Extraordinary Future.
              </span>
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              The merger represents the single most significant milestone in Kennebecasis Valley dance history — uniting fifty years of classical tradition with a decade of dynamic contemporary training.
            </p>
          </div>

          {/* Two schools + result */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_72px_1fr] gap-6 lg:gap-0 items-center mb-10">
            {/* Rothesay Ballet */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white/5 border border-purple-500/20 rounded-3xl p-8 lg:mr-8"
            >
              <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-purple-500/30">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div className="mb-1 text-purple-300 text-xs font-bold uppercase tracking-widest">Est. 1975</div>
              <h3 className="text-xl font-extrabold text-white mb-1">Rothesay Ballet School</h3>
              <p className="text-slate-500 text-sm mb-6">50 years of classical excellence</p>
              <ul className="space-y-2.5">
                {[
                  "RAD-Certified Classical Ballet",
                  "50-Year Nutcracker Tradition",
                  "Miss Slyvia Logan & Full Faculty",
                  "Gala Ballet Productions",
                  "Rothesay Campus",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-200 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Plus */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex items-center justify-center py-4 lg:py-0"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-orange-500 flex items-center justify-center shadow-2xl shadow-purple-500/30 shrink-0">
                <span className="text-white text-2xl font-black leading-none">+</span>
              </div>
            </motion.div>

            {/* DATA */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white/5 border border-orange-500/20 rounded-3xl p-8 lg:ml-8"
            >
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-orange-500/30">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="mb-1 text-orange-300 text-xs font-bold uppercase tracking-widest">Est. 2013</div>
              <h3 className="text-xl font-extrabold text-white mb-1">Dynamic Academy of The Arts</h3>
              <p className="text-slate-500 text-sm mb-6">12 years of dynamic training</p>
              <ul className="space-y-2.5">
                {[
                  "Jazz, Tap, Hip-Hop, Lyrical & Acro",
                  "Part-Time & Full-Time Competitive",
                  "Advanced Training Program (ATP)",
                  "300+ Dancers · 50+ Awards",
                  "Quispamsis Campus",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-200 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Result card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-gradient-to-r from-purple-600/20 via-violet-600/15 to-orange-500/20 border border-white/10 rounded-3xl p-8 md:p-12 text-center"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-orange-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-purple-500/30">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
              One Complete Dance Education — Finally
            </h3>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
              The full spectrum of dance — classical to contemporary, recreational to elite competitive — across two welcoming campuses. One school. One community. Everything your dancer could ever want in one place.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FOUNDERS — PEOPLE BEHIND THE MAGIC
      ═══════════════════════════════════════════════ */}
      <section className="py-28 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        {/* Atmospheric glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-purple-600/8 rounded-full blur-3xl -translate-x-1/2" />
          <div className="absolute bottom-1/3 right-0 w-[600px] h-[600px] bg-orange-500/8 rounded-full blur-3xl translate-x-1/2" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(139,92,246,0.06),transparent_65%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <span className="text-orange-400 font-bold tracking-widest uppercase text-sm bg-orange-400/10 border border-orange-400/20 inline-block px-5 py-1.5 rounded-full mb-6">
              The People Behind the Magic
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Two Visionaries.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">
                One Extraordinary School.
              </span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Meet the founders whose passion, dedication, and decades of work built the dance community that families across the Kennebecasis Valley call home.
            </p>
          </motion.div>

          {/* Founder cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">

            {/* ── Miss Slyvia Logan ── */}
            <motion.div
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, ease: "easeOut" }}
              className="group relative rounded-3xl overflow-hidden bg-white/[0.03] border border-purple-500/15 hover:border-purple-500/35 transition-all duration-500 shadow-2xl shadow-black/40"
            >
              {/* Photo */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src="/Miss_Slyvia_Logan.png"
                  alt="Miss Slyvia Logan — Founder, Rothesay Ballet School"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent" />

                {/* School badge */}
                <div className="absolute top-5 left-5">
                  <div className="flex items-center gap-2 bg-purple-600/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-lg shadow-purple-900/50">
                    <Crown className="w-3.5 h-3.5 text-white" />
                    <span className="text-white text-xs font-bold uppercase tracking-wider">Est. 1975</span>
                  </div>
                </div>

                {/* Name overlay */}
                <div className="absolute bottom-0 left-0 right-0 px-8 pb-8">
                  <div className="h-0.5 w-10 bg-purple-400 mb-4 rounded-full" />
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-1 tracking-tight">Miss Slyvia Logan</h3>
                  <p className="text-purple-300 font-semibold text-sm tracking-wide">Founder & Ballet Mistress Emerita</p>
                  <p className="text-slate-500 text-xs mt-1 font-medium">Rothesay Ballet School · Rothesay, NB</p>
                </div>
              </div>

              {/* Bio */}
              <div className="px-8 pt-8 pb-10 space-y-7">
                <div>
                  <p className="text-purple-400 font-bold text-[10px] uppercase tracking-[0.15em] mb-3">Her Journey</p>
                  <p className="text-slate-300 text-[15px] leading-relaxed">
                    Trained in both the Royal Academy and Vaganova methodologies in England, Sylvia Logan emigrated to Canada in 1962 carrying a world-class ballet foundation that the Kennebecasis Valley had never seen. When she founded Rothesay Ballet School in 1975, she planted a seed that would grow into Atlantic Canada's most respected classical ballet institution — built on the RAD syllabus, a credential her students could carry anywhere in the world.
                  </p>
                </div>

                <div>
                  <p className="text-purple-400 font-bold text-[10px] uppercase tracking-[0.15em] mb-3">Legacy & Impact</p>
                  <p className="text-slate-300 text-[15px] leading-relaxed mb-5">
                    In 1982 she founded Gala Ballet Company as the school's performing arm, and led her dancers to perform for Their Royal Highnesses Prince Charles and Princess Diana. She became a registered RAD teacher in the very first year registration was mandated in Canada — and after nearly five decades of instruction, her influence lives on through former students who returned to teach at the school she built.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["RAD Registered Teacher", "Gala Ballet Founder", "50-Year Nutcracker", "Royal Performance", "Vaganova Trained"].map((tag) => (
                      <span key={tag} className="text-[11px] bg-purple-500/15 border border-purple-500/25 text-purple-300 px-3 py-1 rounded-full font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <blockquote className="border-l-2 border-purple-500 pl-5 italic text-slate-400 text-[14px] leading-relaxed">
                  "A safe and welcoming environment where students of all ages can experience the joy of dance while striving towards excellence."
                </blockquote>
              </div>
            </motion.div>

            {/* ── Justin Saulnier ── */}
            <motion.div
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, ease: "easeOut", delay: 0.15 }}
              className="group relative rounded-3xl overflow-hidden bg-white/[0.03] border border-orange-500/15 hover:border-orange-500/35 transition-all duration-500 shadow-2xl shadow-black/40"
            >
              {/* Photo */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src="/Justin.png"
                  alt="Justin Saulnier — Founder, Dynamic Academy of The Arts"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-900/15 to-transparent" />

                {/* School badge */}
                <div className="absolute top-5 left-5">
                  <div className="flex items-center gap-2 bg-orange-500/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-lg shadow-orange-900/50">
                    <Zap className="w-3.5 h-3.5 text-white" />
                    <span className="text-white text-xs font-bold uppercase tracking-wider">Est. 2013</span>
                  </div>
                </div>

                {/* Name overlay */}
                <div className="absolute bottom-0 left-0 right-0 px-8 pb-8">
                  <div className="h-0.5 w-10 bg-orange-400 mb-4 rounded-full" />
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-1 tracking-tight">Justin Saulnier</h3>
                  <p className="text-orange-300 font-semibold text-sm tracking-wide">Founder & Owner / Director</p>
                  <p className="text-slate-500 text-xs mt-1 font-medium">Dynamic Academy of The Arts · Quispamsis, NB</p>
                </div>
              </div>

              {/* Bio */}
              <div className="px-8 pt-8 pb-10 space-y-7">
                <div>
                  <p className="text-orange-400 font-bold text-[10px] uppercase tracking-[0.15em] mb-3">His Journey</p>
                  <p className="text-slate-300 text-[15px] leading-relaxed">
                    Born and raised in Saint John, New Brunswick, Justin discovered his passion for performance at age nine and never looked back. He trained across tap, jazz, hip-hop, contemporary, ballet, and musical theatre before taking his ambitions to Toronto — completing the Commercial Dance Studies Program at George Brown College, training in circus arts with A2D2 Cirque Company, and performing with the Lindsay Ritter Dance Company.
                  </p>
                </div>

                <div>
                  <p className="text-orange-400 font-bold text-[10px] uppercase tracking-[0.15em] mb-3">Building D.A.T.A</p>
                  <p className="text-slate-300 text-[15px] leading-relaxed mb-5">
                    In 2013, Justin brought everything back home — his training, his professional network, and his vision — and opened Dynamic Academy of The Arts in Quispamsis. Within a decade he grew it to 300+ dancers and 50+ competition awards, built on a culture where technical excellence and genuine belonging were never in conflict. His choreography has won top overall placements and special awards at competitions across the region.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Certified AcroDance Instructor", "George Brown Grad", "Lindsay Ritter Co.", "Barre Essentials Cert.", "Progressive Ballet Cert."].map((tag) => (
                      <span key={tag} className="text-[11px] bg-orange-500/15 border border-orange-500/25 text-orange-300 px-3 py-1 rounded-full font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <blockquote className="border-l-2 border-orange-500 pl-5 italic text-slate-400 text-[14px] leading-relaxed">
                  "Classical discipline and contemporary fire are partners, not opposites — and every dancer deserves to experience both."
                </blockquote>
              </div>
            </motion.div>
          </div>

          {/* Closing connector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-16 text-center max-w-3xl mx-auto"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              Together, Miss Logan and Justin bring a combined legacy spanning over five decades of excellence — now united in one school, one community, and one shared belief that dance changes lives.
            </p>
            <Link
              to="/faculty"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/30 text-white px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 group"
            >
              Meet Our Full Faculty
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          IMAGE OPPORTUNITY CALLOUT
      ═══════════════════════════════════════════════ */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-slate-500 font-bold tracking-wider uppercase text-xs bg-slate-200 inline-block px-4 py-1 rounded-full mb-4">
              Gallery — Coming Soon
            </span>
            <h3 className="text-2xl font-extrabold text-slate-700 mb-2">Where the Photos Will Live</h3>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">
              Each of these slots is reserved for real photos — drop them in and the page comes fully alive.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Rothesay Ballet — 1975 founding era", ratio: "aspect-square" },
              { label: "First D.A.T.A class — 2013", ratio: "aspect-square" },
              { label: "Competition team with trophies", ratio: "aspect-square" },
              { label: "Joint Nutcracker rehearsal — 2025", ratio: "aspect-square" },
            ].map((ph) => (
              <div
                key={ph.label}
                className={`${ph.ratio} rounded-2xl bg-gradient-to-br from-purple-50 to-orange-50 border-2 border-dashed border-purple-200/70 flex flex-col items-center justify-center gap-2 p-4`}
              >
                <Camera className="w-6 h-6 text-purple-300" />
                <p className="text-[10px] text-slate-400 text-center leading-snug font-medium">{ph.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FUTURE VISION + CTA
      ═══════════════════════════════════════════════ */}
      <section className="py-28 bg-gradient-to-b from-white via-purple-50/50 to-orange-50/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-orange-500 font-bold tracking-wider uppercase text-sm bg-orange-100 inline-block px-4 py-1 rounded-full mb-8">
              Looking Ahead
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
              The Best Is Still Coming
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-5">
              A school where a 4-year-old takes her first plié and grows into a RAD-certified ballet dancer. Where a hip-hop dancer discovers the elegance of classical technique. Where a competitive team carries fifty years of tradition onto stages across the country.
            </p>
            <p className="text-xl text-slate-600 leading-relaxed mb-14">
              This is D.A.T.A — built on two great legacies, united for one extraordinary future, and always open to the next dancer who walks through the door.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-md font-bold text-lg transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 group"
              >
                Book a Free Trial Class
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/classes"
                className="border-2 border-purple-600 text-purple-700 px-8 py-4 rounded-md font-bold text-lg hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
              >
                <Trophy className="w-5 h-5" /> Explore All Programs
              </Link>
            </div>

            <div className="mt-16 pt-10 border-t border-slate-200 grid grid-cols-3 gap-8 max-w-lg mx-auto text-center text-slate-600">
              <div>
                <div className="text-2xl font-extrabold text-purple-700 mb-1">Ages 3–18</div>
                <div className="text-xs text-slate-500 font-medium">& Adult Classes</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-orange-500 mb-1">2 Campuses</div>
                <div className="text-xs text-slate-500 font-medium">Kennebecasis Valley</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-purple-700 mb-1">1 Free Trial</div>
                <div className="text-xs text-slate-500 font-medium">No strings attached</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
