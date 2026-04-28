import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Bell,
  ArrowRight,
  Phone,
  Mail,
  Info,
  ExternalLink,
  Loader2,
  Tag,
  Users,
  ChevronRight,
  X,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const JACKRABBIT_ORG_ID = "532199";
const JACKRABBIT_ENROLL_URL = `https://app.jackrabbitclass.com/jr3.0/Enroll/EnrollmentList?orgID=${JACKRABBIT_ORG_ID}`;
const JACKRABBIT_OPENINGS_URL = `https://app.jackrabbitclass.com/jr3.0/Openings/OpeningsDirect?OrgID=${JACKRABBIT_ORG_ID}`;
// 2026-2027 season registration opens May 1, 2026
const REGISTRATION_OPEN_DATE = new Date("2026-05-01T00:00:00-04:00");

// ─── Types ─────────────────────────────────────────────────────────────────

type RegistrationStatus = "opening-soon" | "open" | "between-seasons";

interface PriceTier {
  duration: string;
  monthly: string;
  annual: string;
  annualNote: string;
}

interface DayFilter {
  id: string;
  label: string;
  short: string;
}

interface DisciplineFilter {
  id: string;
  label: string;
  color: string;
  activeColor: string;
}

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PRICE_TIERS: PriceTier[] = [
  { duration: "30 min", monthly: "$48.30", annual: "$434.70", annualNote: "Save $144" },
  { duration: "60 min", monthly: "$61.70", annual: "$555.30", annualNote: "Save $185" },
  { duration: "90 min", monthly: "$86.40", annual: "$777.60", annualNote: "Save $259" },
  { duration: "2 hours", monthly: "$98.75", annual: "$888.75", annualNote: "Save $297" },
];

const DAY_FILTERS: DayFilter[] = [
  { id: "all", label: "All Days", short: "All" },
  { id: "Monday", label: "Monday", short: "Mon" },
  { id: "Tuesday", label: "Tuesday", short: "Tue" },
  { id: "Wednesday", label: "Wednesday", short: "Wed" },
  { id: "Thursday", label: "Thursday", short: "Thu" },
  { id: "Friday", label: "Friday", short: "Fri" },
  { id: "Saturday", label: "Saturday", short: "Sat" },
];

const DISCIPLINE_FILTERS: DisciplineFilter[] = [
  { id: "all", label: "All Disciplines", color: "bg-white text-slate-600 border-slate-200", activeColor: "bg-purple-600 text-white border-purple-600" },
  { id: "Ballet", label: "Ballet", color: "bg-white text-slate-600 border-slate-200", activeColor: "bg-purple-100 text-purple-700 border-purple-300" },
  { id: "Jazz", label: "Jazz", color: "bg-white text-slate-600 border-slate-200", activeColor: "bg-pink-100 text-pink-700 border-pink-300" },
  { id: "Hip-Hop", label: "Hip-Hop", color: "bg-white text-slate-600 border-slate-200", activeColor: "bg-blue-100 text-blue-700 border-blue-300" },
  { id: "Tap", label: "Tap", color: "bg-white text-slate-600 border-slate-200", activeColor: "bg-amber-100 text-amber-700 border-amber-300" },
  { id: "Lyrical", label: "Lyrical", color: "bg-white text-slate-600 border-slate-200", activeColor: "bg-violet-100 text-violet-700 border-violet-300" },
  { id: "Acro", label: "Acro", color: "bg-white text-slate-600 border-slate-200", activeColor: "bg-red-100 text-red-700 border-red-300" },
  { id: "Adult", label: "Adult", color: "bg-white text-slate-600 border-slate-200", activeColor: "bg-teal-100 text-teal-700 border-teal-300" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getRegistrationStatus(): RegistrationStatus {
  const now = new Date();
  if (now < REGISTRATION_OPEN_DATE) return "opening-soon";
  return "open";
}

function buildJackrabbitUrl(day: string, discipline: string): string {
  const params = new URLSearchParams({ OrgID: JACKRABBIT_ORG_ID });
  if (day !== "all") params.set("classDay", day);
  if (discipline !== "all") params.set("ClassCategory1", discipline);
  return `https://app.jackrabbitclass.com/jr3.0/Openings/OpeningsDirect?${params.toString()}`;
}

function useCountdown(targetDate: Date): CountdownValues {
  const [values, setValues] = useState<CountdownValues>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, targetDate.getTime() - Date.now());
      setValues({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return values;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 min-w-[64px] text-center backdrop-blur-sm">
        <span className="text-3xl sm:text-4xl font-black text-white tabular-nums leading-none">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-1.5 text-xs font-semibold text-purple-300 uppercase tracking-widest">{label}</span>
    </div>
  );
}

function SmartStateBanner({ status }: { status: RegistrationStatus }) {
  if (status === "open") {
    return (
      <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-3.5">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
        <p className="text-sm font-semibold text-emerald-800">
          Registration is open for the 2026–2027 season — enroll now to secure your spot.
        </p>
        <a
          href={JACKRABBIT_ENROLL_URL}
          target="_blank"
          rel="noreferrer"
          className="ml-auto shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
        >
          Register Now
        </a>
      </div>
    );
  }

  if (status === "between-seasons") {
    return (
      <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl px-5 py-4">
        <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-slate-700">Registration for the 2026–2027 season has closed.</p>
          <p className="text-sm text-slate-500 mt-0.5">
            The 2027–2028 season opens in spring 2027. Leave your email below to be first to know.
          </p>
        </div>
      </div>
    );
  }

  return null;
}


// ─── Main Page ────────────────────────────────────────────────────────────────

export function Schedule() {
  const status = getRegistrationStatus();
  const countdown = useCountdown(REGISTRATION_OPEN_DATE);
  const [activeDay, setActiveDay] = useState("all");
  const [activeDiscipline, setActiveDiscipline] = useState("all");
  const [iframeLoading, setIframeLoading] = useState(true);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [pricingView, setPricingView] = useState<"monthly" | "annual">("monthly");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);

  const iframeSrc = buildJackrabbitUrl(activeDay, activeDiscipline);

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setEmailSubmitted(true);
  }

  function scrollToSchedule() {
    scheduleRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative min-h-[58vh] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=1600&q=80"
            alt="Dance class at Dynamic Academy of the Arts in Quispamsis NB"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-950/97 via-purple-950/65 to-purple-900/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-950/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            {status === "opening-soon" ? (
              <span className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/40 text-orange-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                Registration Opens May 1, 2026
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Enrollment Open
              </span>
            )}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-5 tracking-tight">
              2026–2027
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">
                Class Schedule
              </span>
            </h1>
            <p className="text-lg text-purple-100/80 leading-relaxed max-w-2xl mb-8">
              Ballet, Jazz, Tap, Hip-Hop, Lyrical, Acro, Contemporary, Musical Theatre & Adult Classes — all updated live from our Jackrabbit studio management system. No stale PDFs.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={scrollToSchedule}
                className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-3.5 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-orange-500/30"
              >
                View Full Schedule ↓
              </button>
              <Link
                to="/contact"
                className="border border-white/25 hover:border-white/50 text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-colors"
              >
                Book a Free Trial
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Quick Info Strip ── */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-6 items-center text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-500 shrink-0" />
              <span>6 Market St, Quispamsis NB &amp; Rothesay NB</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-purple-500 shrink-0" />
              <a href="tel:+15068471164" className="hover:text-purple-600 transition-colors">(506) 847-1164</a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-purple-500 shrink-0" />
              <a href="mailto:dynamicacademyofthearts@gmail.com" className="hover:text-purple-600 transition-colors">dynamicacademyofthearts@gmail.com</a>
            </div>
            <div className="ml-auto shrink-0">
              <a
                href={`https://app.jackrabbitclass.com/jr3.0/ParentPortal/Login?orgID=${JACKRABBIT_ORG_ID}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-purple-600 font-semibold hover:text-purple-800 transition-colors text-sm"
              >
                Parent Portal
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Registration Countdown (opening-soon only) ── */}
      {status === "opening-soon" && (
        <section className="bg-gradient-to-r from-purple-900 via-purple-800 to-violet-900 py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-3">Season 2026–2027</p>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">Registration Opens In</h2>
              <p className="text-purple-200/70 text-sm mb-8">
                Secure your child's spot on May 1st — popular classes fill quickly.
              </p>

              {/* Countdown */}
              <div className="flex justify-center gap-3 sm:gap-5 mb-10">
                <CountdownUnit value={countdown.days} label="Days" />
                <div className="text-white/40 text-3xl font-black self-start mt-3">:</div>
                <CountdownUnit value={countdown.hours} label="Hours" />
                <div className="text-white/40 text-3xl font-black self-start mt-3">:</div>
                <CountdownUnit value={countdown.minutes} label="Minutes" />
                <div className="text-white/40 text-3xl font-black self-start mt-3">:</div>
                <CountdownUnit value={countdown.seconds} label="Seconds" />
              </div>

              {/* Email Capture */}
              <AnimatePresence mode="wait">
                {emailSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-3 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-6 py-4 rounded-2xl"
                  >
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span className="font-semibold">You're on the list! We'll email you the moment registration opens.</span>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p className="text-purple-200/60 text-xs mb-3 flex items-center justify-center gap-1.5">
                      <Bell className="w-3.5 h-3.5" />
                      Get notified the moment enrollment opens
                    </p>
                    <form
                      onSubmit={handleEmailSubmit}
                      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                    >
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent min-h-[44px]"
                      />
                      <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors whitespace-nowrap min-h-[44px]"
                      >
                        Notify Me
                      </button>
                    </form>
                    <p className="text-purple-300/40 text-xs mt-3">No spam, ever. Unsubscribe anytime.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Live Schedule ── */}
      <section ref={scheduleRef} className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold text-purple-600 uppercase tracking-widest">Live from Jackrabbit</span>
                <h2 className="mt-2 text-3xl sm:text-4xl font-black text-slate-900">Class Schedule</h2>
                <p className="mt-1.5 text-slate-500 text-sm">
                  Updated automatically — no stale data. Use filters below or scroll the schedule directly.
                </p>
              </div>
              <a
                href={JACKRABBIT_OPENINGS_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors shrink-0"
              >
                Open in Full Screen
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Smart State Banner */}
            <SmartStateBanner status={status} />
          </motion.div>

          {/* Filter Controls */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-6">
            {/* Day Filter */}
            <div className="mb-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                Filter by Day
              </p>
              <div className="flex flex-wrap gap-2">
                {DAY_FILTERS.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setActiveDay(d.id)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all min-h-[44px] border ${
                      activeDay === d.id
                        ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-200"
                        : "bg-white text-slate-600 border-slate-200 hover:border-purple-300 hover:text-purple-600"
                    }`}
                  >
                    <span className="hidden sm:inline">{d.label}</span>
                    <span className="sm:hidden">{d.short}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Discipline Filter */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Tag className="w-3.5 h-3.5" />
                Filter by Discipline
              </p>
              <div className="flex flex-wrap gap-2">
                {DISCIPLINE_FILTERS.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setActiveDiscipline(d.id)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all min-h-[44px] border ${
                      activeDiscipline === d.id ? d.activeColor : d.color + " hover:border-slate-300"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {(activeDay !== "all" || activeDiscipline !== "all") && (
              <button
                type="button"
                onClick={() => { setActiveDay("all"); setActiveDiscipline("all"); }}
                className="mt-4 inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Clear filters
              </button>
            )}
          </div>

          {/* Jackrabbit Live Embed */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Embed Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-slate-600">Live openings — powered by Jackrabbit</span>
              </div>
              <a
                href={JACKRABBIT_ENROLL_URL}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-purple-600 hover:text-purple-800 transition-colors flex items-center gap-1"
              >
                Enroll directly
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Loading skeleton */}
            <AnimatePresence>
              {iframeLoading && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 flex flex-col items-center gap-4"
                >
                  <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                  <p className="text-sm text-slate-500">Loading live schedule from Jackrabbit…</p>
                  <div className="w-full space-y-3 mt-2 max-w-2xl">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-12 bg-slate-100 rounded-xl animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <iframe
              ref={iframeRef}
              key={iframeSrc}
              src={iframeSrc}
              title="DATA Class Schedule — Live from Jackrabbit"
              className="w-full border-0"
              style={{ minHeight: "700px", display: iframeLoading ? "none" : "block" }}
              onLoad={() => setIframeLoading(false)}
              allow="payment"
            />

            {/* Fallback / mobile nudge */}
            <div className="px-5 py-4 bg-slate-50 border-t border-slate-100">
              <p className="text-xs text-slate-500 text-center">
                Schedule not loading?{" "}
                <a
                  href={iframeSrc}
                  target="_blank"
                  rel="noreferrer"
                  className="text-purple-600 font-semibold hover:underline"
                >
                  Open live openings in Jackrabbit →
                </a>
              </p>
            </div>
          </div>

          {/* Smart State Cards — D3 requirements */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Full Class */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Users className="w-4 h-4 text-amber-600" />
                </div>
                <h3 className="font-bold text-amber-800 text-sm">Class is Full?</h3>
              </div>
              <p className="text-xs text-amber-700 leading-relaxed mb-4">
                Don't miss out. Jackrabbit automatically adds you to the waitlist and notifies you the moment a spot opens.
              </p>
              <a
                href={`https://app.jackrabbitclass.com/jr3.0/ParentPortal/Login?orgID=${JACKRABBIT_ORG_ID}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors min-h-[44px]"
              >
                Join Waitlist
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Registration Closed */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="font-bold text-blue-800 text-sm">Between Seasons?</h3>
              </div>
              <p className="text-xs text-blue-700 leading-relaxed mb-4">
                If registration isn't open yet, leave your email above and we'll notify you the day it opens — before the website update.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors min-h-[44px]"
              >
                Contact Us
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Class Cancelled */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                  <Info className="w-4 h-4 text-slate-600" />
                </div>
                <h3 className="font-bold text-slate-800 text-sm">Class Not Running?</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                If a specific class isn't offered this season, we'll suggest the closest alternative and never leave you with a dead end.
              </p>
              <Link
                to="/programs"
                className="inline-flex items-center gap-1.5 bg-slate-700 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors min-h-[44px]"
              >
                Explore All Programs
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-xs font-bold text-purple-600 uppercase tracking-widest">Transparent Pricing</span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black text-slate-900">Tuition Rates 2026–2027</h2>
            <p className="mt-3 text-slate-500 text-lg max-w-2xl mx-auto">
              All fees are in CAD and subject to HST. One-time registration fee of{" "}
              <strong className="text-slate-700">$35 + HST</strong> per student per season.
            </p>

            {/* Toggle */}
            <div className="inline-flex items-center bg-slate-100 rounded-full p-1 mt-8">
              <button
                type="button"
                onClick={() => setPricingView("monthly")}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all min-h-[44px] ${
                  pricingView === "monthly"
                    ? "bg-white text-purple-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setPricingView("annual")}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all min-h-[44px] ${
                  pricingView === "annual"
                    ? "bg-white text-purple-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Annual <span className="text-emerald-600 text-xs font-bold ml-1">Save up to $297</span>
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRICE_TIERS.map((tier, i) => (
              <motion.div
                key={tier.duration}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="relative bg-white border-2 border-slate-100 hover:border-purple-200 rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:shadow-purple-50"
              >
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-black text-slate-900 text-lg mb-1">{tier.duration}</h3>
                <p className="text-xs text-slate-400 mb-5 uppercase tracking-wide">per class</p>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={pricingView}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-4xl font-black text-purple-700">
                      {pricingView === "monthly" ? tier.monthly : tier.annual}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {pricingView === "monthly" ? "/ month + HST" : "/ year + HST"}
                    </p>
                    {pricingView === "annual" && (
                      <span className="mt-2 inline-block bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                        {tier.annualNote}
                      </span>
                    )}
                  </motion.div>
                </AnimatePresence>

                <Link
                  to="/contact"
                  className="mt-6 block w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl text-sm font-bold transition-colors min-h-[44px] flex items-center justify-center"
                >
                  Book Free Trial
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Discounts Row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {[
              {
                icon: "🎓",
                title: "Multi-Class Discount",
                desc: "30% off any second class for the same student",
              },
              {
                icon: "👨‍👩‍👧‍👦",
                title: "Sibling Discount",
                desc: "$5.00/month off tuition for each additional sibling enrolled",
              },
              {
                icon: "🎁",
                title: "Free Trial Class",
                desc: "Every new student gets one completely free trial class — no commitment",
              },
            ].map((d) => (
              <div key={d.title} className="flex items-start gap-4 bg-purple-50 border border-purple-100 rounded-2xl p-5">
                <span className="text-2xl shrink-0">{d.icon}</span>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{d.title}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{d.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How to Enroll ── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="text-xs font-bold text-purple-600 uppercase tracking-widest">Simple Process</span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black text-slate-900">How to Enroll</h2>
            <p className="mt-3 text-slate-500 text-lg max-w-xl mx-auto">
              From first hello to first class in 3 easy steps.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-12 left-[calc(33.33%+2rem)] right-[calc(33.33%+2rem)] h-0.5 bg-gradient-to-r from-purple-300 to-orange-300" />

            {[
              {
                step: "01",
                title: "Book Your Free Trial",
                desc: "Call, email, or fill out our online form to book a free 60-minute trial class. No registration fee, no commitment. We match your child to the right class for their age and experience.",
                color: "bg-purple-600",
                action: { label: "Book a Trial", to: "/contact" },
              },
              {
                step: "02",
                title: "Come Try a Class",
                desc: "Show up in comfortable clothes — no special dancewear needed for the trial. Your child meets their teacher, learns a few moves, and decides if it's the right fit. (Spoiler: they love it.)",
                color: "bg-orange-500",
                action: { label: "View Programs", to: "/programs" },
              },
              {
                step: "03",
                title: "Register via Jackrabbit",
                desc: "When you're ready to commit, register online through our Jackrabbit parent portal. Pay monthly or annually, manage your schedule, and get class notifications all in one place.",
                action: {
                  label: "Open Parent Portal",
                  href: `https://app.jackrabbitclass.com/jr3.0/ParentPortal/Login?orgID=${JACKRABBIT_ORG_ID}`,
                },
                color: "bg-emerald-500",
              },
            ].map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative bg-white border border-slate-100 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-2xl ${step.color} flex items-center justify-center mb-5 shadow-lg`}>
                  <span className="text-white font-black text-lg">{step.step}</span>
                </div>
                <h3 className="font-black text-slate-900 text-xl mb-3">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{step.desc}</p>
                {"to" in step.action ? (
                  <Link
                    to={step.action.to!}
                    className="inline-flex items-center gap-2 text-sm font-bold text-purple-600 hover:text-purple-800 transition-colors min-h-[44px]"
                  >
                    {step.action.label}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <a
                    href={step.action.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-800 transition-colors min-h-[44px]"
                  >
                    {step.action.label}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What to Expect ── */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55 }}
            >
              <span className="text-xs font-bold text-purple-600 uppercase tracking-widest">Before You Book</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-black text-slate-900 mb-6">
                Everything You Need to Know
              </h2>
              <div className="space-y-4">
                {[
                  { q: "First class attire?", a: "Comfortable athletic wear and bare feet or socks. No special dancewear needed for a trial." },
                  { q: "Registration fee?", a: "$35 + HST per student, per season. One-time payment — not monthly." },
                  { q: "Class sizes?", a: "Small classes. We cap enrolment per Jackrabbit so every student gets proper attention." },
                  { q: "Make-up classes?", a: "Available for missed classes when arranged in advance — check the Jackrabbit portal." },
                  { q: "Dress code?", a: "Varies by style. We'll send you the full dress code guide when you register. Don't buy anything before day one." },
                  { q: "Recital?", a: "One year-end Artists in Motion Showcase. Every dancer performs. Costume deposit: $75 + HST." },
                ].map((item) => (
                  <div key={item.q} className="flex gap-4 items-start">
                    <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800 text-sm">{item.q}</span>
                      <span className="text-slate-500 text-sm"> — {item.a}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/faq"
                className="mt-8 inline-flex items-center gap-2 border-2 border-purple-200 hover:border-purple-400 text-purple-700 hover:text-purple-900 px-6 py-3 rounded-xl font-bold text-sm transition-all min-h-[44px]"
              >
                Full FAQ →
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="bg-gradient-to-br from-purple-600 to-violet-700 rounded-3xl p-8 text-white"
            >
              <h3 className="font-black text-2xl mb-6">Ready to talk?</h3>
              <div className="space-y-5">
                <a
                  href="tel:+15068471164"
                  className="flex items-center gap-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl px-5 py-4 transition-colors group min-h-[64px]"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-purple-200 uppercase tracking-wide font-semibold">Call Us</p>
                    <p className="font-bold text-white">(506) 847-1164</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/50 ml-auto group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="mailto:dynamicacademyofthearts@gmail.com"
                  className="flex items-center gap-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl px-5 py-4 transition-colors group min-h-[64px]"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-purple-200 uppercase tracking-wide font-semibold">Email Us</p>
                    <p className="font-bold text-white text-sm break-all">dynamicacademyofthearts@gmail.com</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/50 ml-auto shrink-0 group-hover:translate-x-1 transition-transform" />
                </a>
                <Link
                  to="/contact"
                  className="flex items-center gap-4 bg-orange-500 hover:bg-orange-400 rounded-2xl px-5 py-4 transition-colors group min-h-[64px]"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-orange-200 uppercase tracking-wide font-semibold">Book Online</p>
                    <p className="font-bold text-white">Schedule a Free Trial</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/80 ml-auto group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
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
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            Your Child's Dance Journey
            <br />Starts with One Free Class.
          </h2>
          <p className="text-purple-100/80 text-lg mb-10 max-w-2xl mx-auto">
            No pressure, no commitment, no cost. Just a trial class where your child can discover what they love.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-black text-base transition-colors shadow-lg shadow-orange-500/30 min-h-[52px] flex items-center"
            >
              Book a Free Trial Class
            </Link>
            <button
              type="button"
              onClick={scrollToSchedule}
              className="bg-white/10 hover:bg-white/20 border border-white/25 text-white px-8 py-4 rounded-xl font-bold text-base transition-colors min-h-[52px] flex items-center"
            >
              View Schedule Again ↑
            </button>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
