import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Crown,
  Zap,
  Flame,
  Heart,
  Trophy,
  Sparkles,
  Users,
  Music,
  Star,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type FilterId = "all" | "classical" | "jazz-urban" | "specialty" | "adult";

interface Discipline {
  id: string;
  name: string;
  subtitle: string;
  category: Exclude<FilterId, "all">;
  featured?: boolean;
  badge?: string;
  ageRange: string;
  image: string;
  iconBg: string;
  pillColor: string;
  Icon: React.ElementType;
  description: string;
}

interface AgeBand {
  range: string;
  label: string;
  color: string;
  bg: string;
  border: string;
  programs: string[];
  levelName: string;
  note?: string;
}

interface PathwayStep {
  step: number;
  title: string;
  ageRange: string;
  hours: string;
  tagline: string;
  color: string;
  textColor: string;
  border: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const DISCIPLINES: Discipline[] = [
  {
    id: "ballet",
    name: "Ballet",
    subtitle: "RAD-Certified Training",
    category: "classical",
    featured: true,
    badge: "RAD Certified",
    ageRange: "Ages 3+",
    image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=800&q=80",
    iconBg: "bg-purple-600",
    pillColor: "bg-purple-100 text-purple-700",
    Icon: Crown,
    description:
      "Ballet is the cornerstone of every great dancer's training. At DATA, we deliver the Royal Academy of Dance (RAD) syllabus — the most respected classical ballet curriculum in the world. Students build exceptional posture, musicality, flexibility, and body awareness from the very first class. Our RAD-certified instructors guide young dancers from Pre-Primary all the way through Grade 8, with official RAD examinations available to mark each milestone. Whether your child dreams of a professional stage career or simply wants the discipline and grace that ballet instils for life, our program delivers both. Past students have gone on to full-time conservatory training, and every alumni credits ballet as the foundation that made everything else possible.",
  },
  {
    id: "tap",
    name: "Tap",
    subtitle: "Rhythm & Percussion",
    category: "classical",
    ageRange: "Ages 4+",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80",
    iconBg: "bg-amber-500",
    pillColor: "bg-amber-100 text-amber-700",
    Icon: Music,
    description:
      "Tap is rhythm made visible. Students wear metal-tapped shoes that transform every step into a percussive instrument, developing exceptional coordination, timing, and musicality. Our tap curriculum progresses from simple shuffles and flaps in the early years to complex rhythmic patterns, improvisation, and Broadway-style showstoppers by the senior levels. Tap builds fast-twitch muscle memory, concentration, and an ear for music unlike any other discipline. It pairs beautifully with jazz and musical theatre training, making it a favourite among students who love to perform. Classes are high-energy, joyful, and deeply musical — you will see your child naturally tapping on every hard floor surface within a week.",
  },
  {
    id: "jazz",
    name: "Jazz",
    subtitle: "Technique & Style",
    category: "jazz-urban",
    ageRange: "Ages 5+",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
    iconBg: "bg-pink-500",
    pillColor: "bg-pink-100 text-pink-700",
    Icon: Zap,
    description:
      "Jazz dance is where technique meets personality. Energetic, expressive, and endlessly versatile, jazz training at DATA blends sharp isolations, dynamic leaps, turns, and a mastery of performance quality that makes every dancer magnetic on stage. Students develop core strength, flexibility, and the kind of confident stage presence that carries into every area of life. Our jazz curriculum is carefully progressive — foundations of alignment and body isolations in the junior years give way to complex combinations, jazz walks, and stylised choreography as dancers advance. Jazz complements every other style and is a core component of our competitive team preparation. If your child loves music and wants to move with power and flair, jazz is a must.",
  },
  {
    id: "hiphop",
    name: "Hip-Hop",
    subtitle: "Street Style & Grooves",
    category: "jazz-urban",
    ageRange: "Ages 6+",
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&q=80",
    iconBg: "bg-blue-500",
    pillColor: "bg-blue-100 text-blue-700",
    Icon: Flame,
    description:
      "Hip-Hop at DATA is authentic, high-energy, and deeply rooted in street-dance culture. Students explore foundational grooves, popping, locking, breaking, and the latest commercial choreography styles in an environment that is both technically demanding and unabashedly fun. Hip-Hop builds explosive athleticism, confidence, and an understanding of rhythm and musicality through a completely different lens than classical styles. It is the discipline that often hooks reluctant dancers — kids who think dance is not for them walk out of their first Hip-Hop class completely lit up. Our instructors keep content current, drawing on trends in music videos, battle culture, and competition circuits to give students a truly contemporary skill set.",
  },
  {
    id: "lyrical",
    name: "Lyrical",
    subtitle: "Emotion Through Movement",
    category: "specialty",
    ageRange: "Ages 7+",
    image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=800&q=80",
    iconBg: "bg-violet-500",
    pillColor: "bg-violet-100 text-violet-700",
    Icon: Heart,
    description:
      "Lyrical dance is the language of emotion. Drawing on the technical foundation of ballet and the freedom of jazz, lyrical teaches students to translate the meaning of music into beautifully fluid movement. Every phrase tells a story — loss, hope, joy, resilience — and dancers learn to connect authentically with an audience through genuine feeling rather than just steps. Lyrical is often transformative for students, many of whom discover their strongest artistic voice in this style. It develops an advanced understanding of musicality, phrasing, and spatial awareness, and produces some of the most compelling competition solos and group numbers we stage. A ballet and jazz foundation is recommended before beginning lyrical training.",
  },
  {
    id: "acro",
    name: "Acro",
    subtitle: "Acrobatics & Gymnastics Skills",
    category: "specialty",
    ageRange: "Ages 5+",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
    iconBg: "bg-red-500",
    pillColor: "bg-red-100 text-red-700",
    Icon: Trophy,
    description:
      "Acro blends the artistry of dance with the athleticism of gymnastics, producing dancers who are truly extraordinary to watch. Students develop strength, flexibility, balance, and spatial awareness as they progressively master cartwheels, walkovers, handstands, aerials, and more — all safely integrated into choreography. Our Acro curriculum follows the internationally respected Acrobatic Arts syllabus, ensuring proper physical development and injury-free progression at every age. Acro skills are in extraordinarily high demand on competition floors and in professional performance contexts, and DATA students consistently earn top marks for their acro-integrated numbers. Importantly, our instructors build these skills in the correct sequence so that strength and flexibility always develop together.",
  },
  {
    id: "contemporary",
    name: "Contemporary",
    subtitle: "Expressive Movement Arts",
    category: "specialty",
    ageRange: "Ages 10+",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    iconBg: "bg-teal-500",
    pillColor: "bg-teal-100 text-teal-700",
    Icon: Star,
    description:
      "Contemporary dance sits at the intersection of ballet's technical rigour and modern dance's expressive freedom. It challenges dancers to move beyond set vocabulary, explore floor work, unconventional weight-sharing, and the use of gravity as a choreographic tool. Contemporary students at DATA develop a deep understanding of body mechanics, spatial composition, and artistic intention that elevates every other style they train in. This is the discipline where advanced students truly become artists — generating movement from a genuine idea rather than reproducing a preset sequence. Contemporary is primarily offered to intermediate and senior dancers with a solid ballet or jazz foundation, and regularly produces our most critically acclaimed competition entries.",
  },
  {
    id: "musicaltheatre",
    name: "Musical Theatre",
    subtitle: "Acting, Singing & Dance",
    category: "specialty",
    ageRange: "Ages 6+",
    image: "https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?w=800&q=80",
    iconBg: "bg-emerald-500",
    pillColor: "bg-emerald-100 text-emerald-700",
    Icon: Sparkles,
    description:
      "Musical Theatre is the ultimate total-performer training. Students at DATA combine dance technique, vocal performance, and acting skills to bring beloved Broadway and West End repertoire to life. This discipline is perfect for children who are never not performing — who narrate their lunch, sing their homework reminders, and turn every walk to school into a production number. Classes cover character development, projection, stylised performance vocabulary, and the specific movement grammar of classic and contemporary musical theatre. Musical Theatre students develop extraordinary confidence, communication skills, and stage presence that serve them in auditions, school productions, and every public situation they will ever face. It is joyful, creative, and genuinely transformative.",
  },
  {
    id: "adult",
    name: "Adult Classes",
    subtitle: "All Levels Welcome",
    category: "adult",
    badge: "New",
    ageRange: "Ages 18+",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    iconBg: "bg-slate-600",
    pillColor: "bg-slate-100 text-slate-700",
    Icon: Users,
    description:
      "Dance has no age limit — and our Adult Classes prove it. Whether you danced as a child and want to rediscover something you have always loved, or you are an absolute beginner stepping into a studio for the very first time, DATA welcomes you. Our adult program offers Adult Ballet (RAD), Adult Hip-Hop, and our beloved Silver Swans® program for dancers 55 and over. All adult classes are designed by instructors who understand adult learning — progressive, supportive, and genuinely enjoyable. No leotard required, no prior experience needed. The first class is always free so you can experience the culture before committing. Adults who dance report better posture, reduced stress, new friendships, and a renewed relationship with their own body.",
  },
];

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All Programs" },
  { id: "classical", label: "Classical" },
  { id: "jazz-urban", label: "Jazz & Urban" },
  { id: "specialty", label: "Specialty" },
  { id: "adult", label: "Adult" },
];

const AGE_BANDS: AgeBand[] = [
  {
    range: "3–5",
    label: "Early Explorers",
    color: "text-pink-700",
    bg: "bg-pink-50",
    border: "border-pink-200",
    levelName: "Creative Movement",
    programs: ["Ballet Pre-Primary", "Creative Movement", "Musical Theatre Jr"],
    note: "Focus: play, rhythm & imagination. No audition.",
  },
  {
    range: "6–8",
    label: "Junior Dancers",
    color: "text-violet-700",
    bg: "bg-violet-50",
    border: "border-violet-200",
    levelName: "Foundation Level",
    programs: ["Ballet Grade 1", "Tap Beginners", "Jazz Foundation", "Hip-Hop Juniors", "Musical Theatre"],
    note: "First technique foundations. RAD exams available from age 7.",
  },
  {
    range: "9–12",
    label: "Rising Stars",
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
    levelName: "Intermediate Level",
    programs: ["Ballet Grades 2–4", "Jazz Intermediate", "Hip-Hop", "Lyrical", "Acro", "Contemporary Intro", "Tap Intermediate"],
    note: "ATP track available from age 9 by audition.",
  },
  {
    range: "13–18",
    label: "Emerging Artists",
    color: "text-orange-700",
    bg: "bg-orange-50",
    border: "border-orange-200",
    levelName: "Senior / Competitive Level",
    programs: ["Ballet Grades 5–8 / Vocational", "Contemporary", "Jazz Senior", "Hip-Hop Senior", "Lyrical", "Acro Senior", "Musical Theatre Senior"],
    note: "Competitive Full-Time team eligible. RAD vocational exams (Intermediate, Advanced).",
  },
  {
    range: "18+",
    label: "Adults",
    color: "text-teal-700",
    bg: "bg-teal-50",
    border: "border-teal-200",
    levelName: "Adult Program",
    programs: ["Adult Ballet (RAD)", "Adult Hip-Hop", "Silver Swans® (55+)"],
    note: "No experience required. First class free. Drop-in available.",
  },
];

const PATHWAY_STEPS: PathwayStep[] = [
  {
    step: 1,
    title: "Creative Movement",
    ageRange: "Ages 3–5",
    hours: "1–2 hrs / wk",
    tagline: "Explore rhythm, imagination & the joy of moving",
    color: "bg-pink-500",
    textColor: "text-pink-600",
    border: "border-pink-200",
  },
  {
    step: 2,
    title: "Recreational",
    ageRange: "Ages 6–18",
    hours: "1–3 hrs / wk",
    tagline: "Build real technique across one or more styles",
    color: "bg-violet-500",
    textColor: "text-violet-600",
    border: "border-violet-200",
  },
  {
    step: 3,
    title: "ATP 1 / 2 / 3",
    ageRange: "Ages 9+",
    hours: "3–6 hrs / wk",
    tagline: "Accelerated technical development & RAD progression",
    color: "bg-blue-500",
    textColor: "text-blue-600",
    border: "border-blue-200",
  },
  {
    step: 4,
    title: "Competitive Part-Time",
    ageRange: "Ages 11+",
    hours: "4–8 hrs / wk",
    tagline: "Regional & provincial competitions with the team",
    color: "bg-orange-500",
    textColor: "text-orange-600",
    border: "border-orange-200",
  },
  {
    step: 5,
    title: "Competitive Full-Time",
    ageRange: "Ages 13+",
    hours: "8–15 hrs / wk",
    tagline: "National-level training & elite performance",
    color: "bg-purple-600",
    textColor: "text-purple-600",
    border: "border-purple-200",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function DisciplineCard({ d, index }: { d: Discipline; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.96 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 flex flex-col ${
        d.featured ? "md:col-span-2 lg:col-span-2" : ""
      }`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${d.featured ? "h-56 md:h-64" : "h-44"}`}>
        <img
          src={d.image}
          alt={d.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        {d.badge && (
          <span className="absolute top-3 right-3 bg-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide shadow-lg">
            {d.badge}
          </span>
        )}
        <div className="absolute bottom-3 left-4 flex items-center gap-2">
          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${d.iconBg} shadow-md`}>
            <d.Icon className="w-4 h-4 text-white" />
          </span>
          <div>
            <p className="text-white font-bold text-base leading-tight">{d.name}</p>
            <p className="text-white/75 text-xs leading-tight">{d.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${d.pillColor}`}>{d.ageRange}</span>
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">
            {d.category === "jazz-urban" ? "Jazz & Urban" : d.category.charAt(0).toUpperCase() + d.category.slice(1)}
          </span>
        </div>

        <p className={`text-sm text-slate-600 leading-relaxed ${expanded ? "" : "line-clamp-3"}`}>
          {d.description}
        </p>

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-xs font-semibold text-purple-600 hover:text-purple-800 transition-colors self-start"
        >
          {expanded ? "Show less" : "Read more →"}
        </button>

        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3 mt-auto">
          <Link
            to="/contact"
            className="flex-1 text-center bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
          >
            Book a Free Trial
          </Link>
          <a
            href="https://app.jackrabbitclass.com/jr3.0/ParentPortal/Login?orgID=532199"
            target="_blank"
            rel="noreferrer"
            className="flex-1 text-center border border-slate-200 hover:border-purple-300 hover:bg-purple-50 text-slate-700 hover:text-purple-700 text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
          >
            Continue to Schedule
          </a>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function Programs() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");

  const filtered =
    activeFilter === "all"
      ? DISCIPLINES
      : DISCIPLINES.filter((d) => d.category === activeFilter);

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative min-h-[62vh] flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=1600&q=80"
            alt="Dance students in class at Dynamic Academy of the Arts"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-950/95 via-purple-950/60 to-purple-900/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-950/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <span className="inline-block bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
              Programs & Classes
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight">
              Every Style.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">
                Every Age.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-purple-100/85 leading-relaxed max-w-2xl mb-8">
              From first steps at age 3 to elite competitive training at 18 — and adult classes for every level — DATA offers
              the most comprehensive dance education in the Quispamsis–Rothesay area.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-3.5 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-orange-500/30"
              >
                Book a Free Trial Class
              </Link>
              <a
                href="#disciplines"
                className="border border-white/25 hover:border-white/50 text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-colors backdrop-blur-sm"
              >
                Explore Disciplines ↓
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: "9", label: "Dance Disciplines" },
              { num: "RAD", label: "Certified Ballet" },
              { num: "50+", label: "Years Combined Experience" },
              { num: "300+", label: "Students Enrolled" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-black text-purple-700">{s.num}</p>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Disciplines ── */}
      <section id="disciplines" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="text-center mb-14"
          >
            <span className="text-xs font-bold text-purple-600 uppercase tracking-widest">What We Teach</span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
              Our Dance Disciplines
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              Nine world-class programs, all under one roof — taught by instructors who have competed, performed, and trained at the highest level.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeFilter === f.id
                    ? "bg-purple-600 text-white shadow-md shadow-purple-300"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-purple-300 hover:text-purple-600"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeFilter}
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((d, i) => (
                <DisciplineCard key={d.id} d={d} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Pathway Visualizer ── */}
      <section className="py-24 bg-gradient-to-br from-purple-950 via-slate-900 to-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="text-center mb-16"
          >
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">Your Journey at DATA</span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black text-white leading-tight">
              The Dancer's Pathway
            </h2>
            <p className="mt-4 text-lg text-purple-200/70 max-w-2xl mx-auto">
              A clear progression from first movement through elite competition — every dancer's path is unique and we meet them where they are.
            </p>
          </motion.div>

          {/* Desktop horizontal flow */}
          <div className="hidden lg:flex items-stretch gap-0">
            {PATHWAY_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex-1 relative"
              >
                {/* Connector arrow */}
                {i < PATHWAY_STEPS.length - 1 && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                    <ChevronRight className="w-6 h-6 text-white/30" />
                  </div>
                )}
                <div className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-6 h-full transition-all duration-300 cursor-default mx-1 flex flex-col">
                  <div className={`w-10 h-10 rounded-xl ${step.color} flex items-center justify-center text-white font-black text-lg mb-4 shadow-lg`}>
                    {step.step}
                  </div>
                  <h3 className="text-white font-black text-base leading-tight mb-1">{step.title}</h3>
                  <p className="text-purple-300 text-xs font-semibold mb-0.5">{step.ageRange}</p>
                  <p className="text-purple-400 text-xs mb-3">{step.hours}</p>
                  <p className="text-slate-300 text-xs leading-relaxed flex-1">{step.tagline}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile vertical */}
          <div className="lg:hidden space-y-4">
            {PATHWAY_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex gap-4 items-start"
              >
                <div className={`w-10 h-10 rounded-xl ${step.color} flex items-center justify-center text-white font-black text-lg shrink-0 shadow-lg mt-1`}>
                  {step.step}
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex-1">
                  <div className="flex items-baseline gap-3 flex-wrap mb-1">
                    <h3 className="text-white font-black text-base">{step.title}</h3>
                    <span className="text-purple-300 text-xs font-semibold">{step.ageRange}</span>
                    <span className="text-purple-400 text-xs">{step.hours}</span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{step.tagline}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-purple-300/70 text-sm mb-6">
              Not sure where your child fits? Our teachers assess every new student and recommend the right starting point.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-orange-500/30"
            >
              Book a Free Assessment
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Age Guide ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="text-center mb-16"
          >
            <span className="text-xs font-bold text-purple-600 uppercase tracking-widest">Age-Appropriate Training</span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
              What's Right for Your Child?
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              Every age group gets a tailored curriculum — we never rush development or hold talented students back.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {AGE_BANDS.map((band, i) => (
              <motion.div
                key={band.range}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className={`${band.bg} border ${band.border} rounded-2xl p-6 flex flex-col`}
              >
                <div className="mb-4">
                  <span className={`text-4xl font-black ${band.color} leading-none`}>
                    {band.range}
                  </span>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-0.5">years</p>
                </div>
                <h3 className={`font-black text-base ${band.color} mb-1`}>{band.label}</h3>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">{band.levelName}</p>
                <ul className="space-y-1.5 flex-1">
                  {band.programs.map((prog) => (
                    <li key={prog} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${band.color} shrink-0 mt-0.5`} />
                      {prog}
                    </li>
                  ))}
                </ul>
                {band.note && (
                  <p className="mt-4 pt-4 border-t border-slate-200/60 text-[11px] text-slate-500 leading-relaxed italic">
                    {band.note}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Adult Classes Teaser ── */}
      <section className="py-24 bg-slate-900 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">For Adults</span>
              <h2 className="mt-3 text-4xl sm:text-5xl font-black text-white leading-tight">
                Dance Has No
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
                  Age Limit.
                </span>
              </h2>
              <p className="mt-5 text-lg text-slate-300 leading-relaxed">
                Whether you danced as a child and miss it, or you have always wanted to try but never had the chance — our adult program is built for you. No judgement, no prior experience required.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  "Adult Ballet — Royal Academy of Dance syllabus, all levels",
                  "Adult Hip-Hop — current styles, high-energy, endlessly fun",
                  "Silver Swans® — gentle RAD ballet designed for dancers 55+",
                  "First class is always free — no commitment required",
                  "Drop-in options available",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="bg-teal-500 hover:bg-teal-400 text-white px-7 py-3.5 rounded-xl font-bold text-sm transition-colors shadow-lg"
                >
                  Claim Your Free Class
                </Link>
                <Link
                  to="/adult-classes"
                  className="border border-white/20 hover:border-white/40 text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-colors"
                >
                  View Adult Programs →
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { title: "Adult Ballet", subtitle: "RAD-Certified", color: "from-purple-600 to-violet-700", Icon: Crown },
                { title: "Adult Hip-Hop", subtitle: "All Skill Levels", color: "from-blue-600 to-blue-800", Icon: Flame },
                { title: "Silver Swans®", subtitle: "Ages 55+", color: "from-teal-600 to-cyan-700", Icon: Heart },
                { title: "Coming Soon", subtitle: "More Adult Programs", color: "from-slate-600 to-slate-800", Icon: Sparkles },
              ].map((card) => (
                <div
                  key={card.title}
                  className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 aspect-square flex flex-col justify-between`}
                >
                  <card.Icon className="w-7 h-7 text-white/70" />
                  <div>
                    <p className="text-white font-black text-base leading-tight">{card.title}</p>
                    <p className="text-white/60 text-xs mt-0.5">{card.subtitle}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-purple-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5">
            Ready to Find the Right Class?
          </h2>
          <p className="text-purple-100/80 text-lg mb-10 max-w-2xl mx-auto">
            Every new student gets a free trial class so you and your child can experience DATA's energy, culture, and teaching quality before committing to anything.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-black text-base transition-colors shadow-lg shadow-orange-500/30"
            >
              Book a Free Trial Class
            </Link>
            <a
              href="https://app.jackrabbitclass.com/jr3.0/ParentPortal/Login?orgID=532199"
              target="_blank"
              rel="noreferrer"
              className="bg-white/10 hover:bg-white/20 border border-white/25 text-white px-8 py-4 rounded-xl font-bold text-base transition-colors"
            >
              View Full Schedule →
            </a>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
