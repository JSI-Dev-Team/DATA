import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  Music2,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Send,
  User,
  MessageSquare,
  Smartphone,
  AlertCircle,
} from "lucide-react";

// ─── Constants ─────────────────────────────────────────────────────────────────

const JACKRABBIT_PORTAL = "https://app.jackrabbitclass.com/jr3.0/ParentPortal/Login?orgID=532199";
const JACKRABBIT_ENROLL = "https://app.jackrabbitclass.com/jr3.0/Enroll/EnrollmentList?orgID=532199";
const APP_STORE_URL = "https://apps.apple.com/us/app/dynamic-academy-of-the-arts/id6746337745";
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.dynamicacademyofthearts.mi";

const JACKRABBIT_FN = "/api/jackrabbit-register";
const CONTACT_EMAIL_FN = "/api/send-contact";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/dynamicacademyofthearts", Icon: Instagram, color: "hover:bg-pink-600" },
  { label: "Facebook", href: "https://www.facebook.com/DynamicAcademyOfTheArts/", Icon: Facebook, color: "hover:bg-blue-600" },
  { label: "TikTok", href: "https://www.tiktok.com/@dynamicacademyoft?lang=en", Icon: Music2, color: "hover:bg-slate-700" },
  { label: "YouTube", href: "https://www.youtube.com/@DynamicAcademyofTheArts", Icon: Youtube, color: "hover:bg-red-600" },
];

const LOCATIONS = [
  {
    id: "quispamsis",
    name: "Quispamsis",
    badge: "Main Studio",
    badgeColor: "bg-purple-100 text-purple-700",
    address: "6 Market Street",
    city: "Quispamsis, NB E2E 4B1",
    note: null,
    mapSrc:
      "https://maps.google.com/maps?q=6+Market+Street%2C+Quispamsis%2C+NB+E2E+4B1%2C+Canada&t=&z=15&ie=UTF8&iwloc=&output=embed",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=6+Market+Street+Quispamsis+NB+E2E+4B1",
  },
  {
    id: "rothesay",
    name: "Rothesay",
    badge: "Opening July 2026",
    badgeColor: "bg-orange-100 text-orange-700",
    address: "63 Marr Road",
    city: "Rothesay, NB E2E 3J9",
    note: "Location confirmed for 2026–2027 season as part of the Rothesay Ballet merger.",
    mapSrc:
      "https://maps.google.com/maps?q=63+Marr+Road%2C+Rothesay%2C+NB+E2E+3J9%2C+Canada&t=&z=15&ie=UTF8&iwloc=&output=embed",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=63+Marr+Road+Rothesay+NB+E2E+3J9",
  },
];

const HOURS = [
  { day: "Monday – Thursday", time: "By appointment", note: null },
  { day: "Friday", time: "4:00 PM – 9:00 PM", note: "Classes in session (seasonal)" },
  { day: "Saturday", time: "9:00 AM – 3:00 PM", note: "Classes in session (seasonal)" },
  { day: "Sunday", time: "Closed", note: null },
];

const DANCE_STYLES = [
  "Ballet", "Jazz", "Hip-Hop", "Tap", "Lyrical", "Acro",
  "Contemporary", "Musical Theatre", "Adult Classes", "Not sure yet",
];

const AGE_GROUPS = ["3–5 years", "6–8 years", "9–12 years", "13–18 years", "18+ (Adult)"];
const BEST_TIMES = ["Morning (9 AM – 12 PM)", "Afternoon (12 PM – 5 PM)", "Evening (5 PM – 9 PM)", "Anytime"];
const HOW_HEARD = ["Google Search", "Instagram", "Facebook", "TikTok", "Word of Mouth", "Returning Family", "Saw the Sign", "Other"];

// ─── Types ─────────────────────────────────────────────────────────────────────

interface FormState {
  parentFirst: string;
  parentLast: string;
  email: string;
  phone: string;
  childName: string;
  childAge: string;
  styles: string[];
  bestTime: string;
  howHeard: string;
  message: string;
}

const EMPTY_FORM: FormState = {
  parentFirst: "", parentLast: "", email: "", phone: "",
  childName: "", childAge: "", styles: [], bestTime: "",
  howHeard: "", message: "",
};

// ─── Sub-components ────────────────────────────────────────────────────────────

function SelectField({
  label, value, options, onChange, required,
}: {
  label: string; value: string; options: string[]; onChange: (v: string) => void; required?: boolean;
}) {
  return (
    <div className="relative">
      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="w-full appearance-none bg-white border-2 border-slate-200 focus:border-purple-400 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none transition-colors cursor-pointer min-h-[48px]"
        >
          <option value="">Select…</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export function Contact() {
  const [activeLocation, setActiveLocation] = useState("quispamsis");
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const loc = LOCATIONS.find((l) => l.id === activeLocation)!;

  function toggleStyle(style: string) {
    setForm((prev) => ({
      ...prev,
      styles: prev.styles.includes(style)
        ? prev.styles.filter((s) => s !== style)
        : [...prev.styles, style],
    }));
  }

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Bot caught by honeypot — silently "succeed" so bots don't retry.
    if (honeypot.trim().length > 0) {
      setSubmitted(true);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const payload = {
      parentFirst : form.parentFirst,
      parentLast  : form.parentLast,
      email       : form.email,
      phone       : form.phone,
      childName   : form.childName,
      childAge    : form.childAge,
      styles      : form.styles,
      bestTime    : form.bestTime,
      howHeard    : form.howHeard,
      message     : form.message,
      website     : honeypot,
    };

    const postJson = (url: string) =>
      fetch(url, {
        method : "POST",
        headers: { "Content-Type": "application/json" },
        body   : JSON.stringify(payload),
      }).then(async (r) => {
        const data = (await r.json().catch(() => ({}))) as { error?: string };
        if (!r.ok || data.error) throw new Error(data.error ?? `Request failed (${r.status})`);
        return data;
      });

    // Primary  : register the family in JackRabbit
    // Secondary: email the studio via SMTP (Nodemailer in /api/send-contact)
    // Both run in parallel; success of either is enough to acknowledge the user.
    try {
      const [jrResult, mailResult] = await Promise.allSettled([
        postJson(JACKRABBIT_FN),
        postJson(CONTACT_EMAIL_FN),
      ]);

      if (jrResult.status === "rejected" && mailResult.status === "rejected") {
        const err = jrResult.reason ?? mailResult.reason;
        throw err instanceof Error ? err : new Error("Submission failed on both channels");
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "We couldn't send your message right now. Please try again or email dynamicacademyofthearts@gmail.com directly.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative min-h-[52vh] flex items-end pb-14 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1600&q=80"
            alt="Dance studio at Dynamic Academy of the Arts"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-950/97 via-purple-950/65 to-purple-900/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-950/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <span className="inline-block bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
              Book a Free Trial
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-5 tracking-tight">
              We'd Love to Meet
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">
                Your Dancer.
              </span>
            </h1>
            <p className="text-lg text-purple-100/80 leading-relaxed max-w-2xl mb-8">
              One free trial class, zero commitment, zero cost. Tell us a little about your child and we'll take care of the rest.
            </p>

            {/* Quick-contact pills */}
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+15068471164"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors min-h-[44px]"
              >
                <Phone className="w-4 h-4 text-orange-400" />
                (506) 847-1164
              </a>
              <a
                href="mailto:dynamicacademyofthearts@gmail.com"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors min-h-[44px]"
              >
                <Mail className="w-4 h-4 text-orange-400" />
                Email Us
              </a>
              <a
                href={JACKRABBIT_PORTAL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-colors min-h-[44px] shadow-lg shadow-orange-500/30"
              >
                <ExternalLink className="w-4 h-4" />
                Parent Portal
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_480px] gap-10 xl:gap-14 items-start">

            {/* ── Left: Locations + Hours + Social ── */}
            <div className="space-y-8">

              {/* Location Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
              >
                {/* Tab Bar */}
                <div className="flex border-b border-slate-100">
                  {LOCATIONS.map((location) => (
                    <button
                      key={location.id}
                      type="button"
                      onClick={() => setActiveLocation(location.id)}
                      className={`flex-1 px-5 py-4 text-sm font-bold transition-all min-h-[52px] ${
                        activeLocation === location.id
                          ? "text-purple-700 border-b-2 border-purple-600 bg-purple-50/50"
                          : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {location.name}
                        <span className={`hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${location.badgeColor}`}>
                          {location.badge}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeLocation}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Map Embed */}
                    <div className="relative h-64 sm:h-80 bg-slate-100">
                      <iframe
                        src={loc.mapSrc}
                        title={`Google Maps — DATA ${loc.name} Studio`}
                        className="w-full h-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                      />
                    </div>

                    {/* Address Card */}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${loc.badgeColor}`}>
                              {loc.badge}
                            </span>
                          </div>
                          <p className="font-black text-slate-900 text-lg">{loc.address}</p>
                          <p className="text-slate-500 text-sm">{loc.city}</p>
                          {loc.note && (
                            <p className="mt-2 text-xs text-orange-600 italic">{loc.note}</p>
                          )}
                        </div>
                        <a
                          href={loc.directionsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors shrink-0 min-h-[44px] shadow-md shadow-purple-200"
                        >
                          <MapPin className="w-4 h-4" />
                          Get Directions
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Contact Details */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7"
              >
                <h2 className="font-black text-slate-900 text-xl mb-6">Get in Touch</h2>
                <div className="space-y-4">
                  <a
                    href="tel:+15068471164"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-purple-50 hover:bg-purple-100 border border-purple-100 transition-colors group min-h-[64px]"
                  >
                    <div className="w-11 h-11 bg-purple-600 rounded-xl flex items-center justify-center shrink-0 shadow-md">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-purple-500 uppercase tracking-wider">Phone</p>
                      <p className="font-bold text-slate-800 text-base">(506) 847-1164</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-purple-400 ml-auto group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a
                    href="mailto:dynamicacademyofthearts@gmail.com"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-orange-50 hover:bg-orange-100 border border-orange-100 transition-colors group min-h-[64px]"
                  >
                    <div className="w-11 h-11 bg-orange-500 rounded-xl flex items-center justify-center shrink-0 shadow-md">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-orange-500 uppercase tracking-wider">Email</p>
                      <p className="font-bold text-slate-800 text-sm break-all">dynamicacademyofthearts@gmail.com</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-orange-400 ml-auto shrink-0 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>

              {/* Studio Hours */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-violet-600" />
                  </div>
                  <h2 className="font-black text-slate-900 text-xl">Studio Hours</h2>
                </div>
                <div className="space-y-3">
                  {HOURS.map((h) => (
                    <div
                      key={h.day}
                      className={`flex items-start justify-between gap-4 py-3 px-4 rounded-xl ${
                        h.time === "Closed" ? "bg-slate-50" : "bg-violet-50/60"
                      }`}
                    >
                      <span className={`text-sm font-semibold ${h.time === "Closed" ? "text-slate-400" : "text-slate-700"}`}>
                        {h.day}
                      </span>
                      <div className="text-right">
                        <span className={`text-sm font-black ${h.time === "Closed" ? "text-slate-400" : "text-violet-700"}`}>
                          {h.time}
                        </span>
                        {h.note && (
                          <p className="text-[11px] text-slate-400 mt-0.5">{h.note}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-slate-400 leading-relaxed">
                  Hours reflect class schedule during the active season. Contact us directly for office/admin hours or summer schedule.
                </p>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7"
              >
                <h2 className="font-black text-slate-900 text-xl mb-2">Follow Along</h2>
                <p className="text-slate-500 text-sm mb-6">
                  See recital highlights, class clips, and student milestones every week.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {SOCIAL_LINKS.map(({ label, href, Icon, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center gap-3 bg-slate-800 ${color} text-white px-4 py-3.5 rounded-xl transition-colors group min-h-[52px]`}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      <span className="font-semibold text-sm">{label}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── Right: Contact Form ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="lg:sticky lg:top-28"
            >
              <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-purple-700 to-violet-700 px-7 py-7">
                  <span className="text-xs font-bold text-purple-200 uppercase tracking-widest mb-2 block">First class is free</span>
                  <h2 className="text-2xl font-black text-white leading-tight">Book Your Free Trial Class</h2>
                  <p className="text-purple-200/80 text-sm mt-2 leading-relaxed">
                    Fill in the details below and we'll match your child to the perfect class — no commitment required.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-7 py-10 text-center"
                    >
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900 mb-3">Message sent!</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-8">
                        Thanks{form.parentFirst ? `, ${form.parentFirst}` : ""}! Your trial request is on its way to our inbox. We typically reply within a few hours — we're excited to meet{" "}
                        <strong className="text-slate-700">{form.childName || "your dancer"}</strong>!
                      </p>
                      <div className="space-y-3">
                        <a
                          href={JACKRABBIT_ENROLL}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-colors w-full min-h-[48px]"
                        >
                          Register Now via Parent Portal
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button
                          type="button"
                          onClick={() => { setSubmitted(false); setForm(EMPTY_FORM); setSubmitError(null); }}
                          className="w-full text-sm text-slate-500 hover:text-slate-700 transition-colors py-2 min-h-[44px]"
                        >
                          Send another message
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handleSubmit}
                      className="px-7 py-7 space-y-5"
                    >
                      {/* Honeypot — invisible to humans, attractive to bots. */}
                      <div aria-hidden="true" className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden">
                        <label>
                          Do not fill this field
                          <input
                            type="text"
                            tabIndex={-1}
                            autoComplete="off"
                            value={honeypot}
                            onChange={(e) => setHoneypot(e.target.value)}
                            name="website"
                          />
                        </label>
                      </div>

                      {/* Parent Name Row */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                            First Name
                          </label>
                          <div className="relative">
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              type="text"
                              required
                              value={form.parentFirst}
                              onChange={(e) => set("parentFirst", e.target.value)}
                              placeholder="Jane"
                              className="w-full bg-white border-2 border-slate-200 focus:border-purple-400 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 outline-none transition-colors min-h-[48px]"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                            Last Name
                          </label>
                          <input
                            type="text"
                            required
                            value={form.parentLast}
                            onChange={(e) => set("parentLast", e.target.value)}
                            placeholder="Smith"
                            className="w-full bg-white border-2 border-slate-200 focus:border-purple-400 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none transition-colors min-h-[48px]"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                          Your Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => set("email", e.target.value)}
                            placeholder="jane@email.com"
                            className="w-full bg-white border-2 border-slate-200 focus:border-purple-400 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 outline-none transition-colors min-h-[48px]"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => set("phone", e.target.value)}
                            placeholder="(506) 555-0100"
                            className="w-full bg-white border-2 border-slate-200 focus:border-purple-400 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 outline-none transition-colors min-h-[48px]"
                          />
                        </div>
                      </div>

                      {/* Child Info */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                            Child's Name
                          </label>
                          <input
                            type="text"
                            required
                            value={form.childName}
                            onChange={(e) => set("childName", e.target.value)}
                            placeholder="Emma"
                            className="w-full bg-white border-2 border-slate-200 focus:border-purple-400 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none transition-colors min-h-[48px]"
                          />
                        </div>
                        <SelectField
                          label="Age Group"
                          value={form.childAge}
                          options={AGE_GROUPS}
                          onChange={(v) => set("childAge", v)}
                          required
                        />
                      </div>

                      {/* Dance Style Interest */}
                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                          Dance Styles of Interest
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {DANCE_STYLES.map((style) => (
                            <button
                              key={style}
                              type="button"
                              onClick={() => toggleStyle(style)}
                              className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all min-h-[36px] border ${
                                form.styles.includes(style)
                                  ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                                  : "bg-white text-slate-600 border-slate-200 hover:border-purple-300 hover:text-purple-600"
                              }`}
                            >
                              {style}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Best time + How heard */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <SelectField
                          label="Best Time to Call"
                          value={form.bestTime}
                          options={BEST_TIMES}
                          onChange={(v) => set("bestTime", v)}
                        />
                        <SelectField
                          label="How Did You Hear About Us?"
                          value={form.howHeard}
                          options={HOW_HEARD}
                          onChange={(v) => set("howHeard", v)}
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                          Message (optional)
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                          <textarea
                            rows={3}
                            value={form.message}
                            onChange={(e) => set("message", e.target.value)}
                            placeholder="Any questions or things we should know before your trial class…"
                            className="w-full bg-white border-2 border-slate-200 focus:border-purple-400 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 outline-none transition-colors resize-none"
                          />
                        </div>
                      </div>

                      {submitError && (
                        <div
                          role="alert"
                          className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
                        >
                          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                          <p className="text-sm text-red-800 leading-relaxed">{submitError}</p>
                        </div>
                      )}

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white py-4 rounded-xl font-black text-base transition-colors shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 min-h-[56px]"
                      >
                        {submitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message & Book My Free Trial
                          </>
                        )}
                      </button>

                      <p className="text-center text-xs text-slate-400 leading-relaxed">
                        Or{" "}
                        <a href={JACKRABBIT_ENROLL} target="_blank" rel="noreferrer" className="text-purple-600 font-semibold hover:underline">
                          register directly via Jackrabbit
                        </a>{" "}
                        if you're ready to enroll now.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Quick Action Cards ── */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Other Ways to Connect</h2>
            <p className="text-slate-500 mt-2 text-base">Manage your account, book online, or download the app.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Parent Portal */}
            <motion.a
              href={JACKRABBIT_PORTAL}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45 }}
              className="group bg-gradient-to-br from-purple-600 to-violet-700 rounded-3xl p-7 text-white flex flex-col hover:shadow-xl hover:shadow-purple-200 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-5">
                <User className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-xl mb-2">Parent Portal</h3>
              <p className="text-purple-100/80 text-sm leading-relaxed flex-1">
                Register online, manage your schedule, make payments, and view your child's account — all in one place via Jackrabbit.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-bold text-white">
                Open Portal
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>

            {/* App Download */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-7 text-white flex flex-col"
            >
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-5">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-xl mb-2">DATA Studio App</h3>
              <p className="text-slate-300/80 text-sm leading-relaxed mb-6 flex-1">
                Get class notifications, manage your account, and stay connected to everything happening at the studio — on the go.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl px-4 py-3 transition-colors group min-h-[52px]"
                  aria-label="Download on the App Store"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                  </svg>
                  <div className="text-left">
                    <p className="text-[9px] text-slate-400 leading-tight tracking-wide">Download on the</p>
                    <p className="text-sm font-bold leading-tight">App Store</p>
                  </div>
                </a>
                <a
                  href={GOOGLE_PLAY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl px-4 py-3 transition-colors group min-h-[52px]"
                  aria-label="Get it on Google Play"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none">
                    <path d="M3.5 21.5V2.5L21 12L3.5 21.5Z" fill="url(#gpContact)" />
                    <defs>
                      <linearGradient id="gpContact" x1="3.5" y1="2.5" x2="3.5" y2="21.5" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#4285F4" />
                        <stop offset="0.4" stopColor="#EA4335" />
                        <stop offset="0.7" stopColor="#FBBC04" />
                        <stop offset="1" stopColor="#34A853" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="text-left">
                    <p className="text-[9px] text-slate-400 leading-tight tracking-wide uppercase">Get it on</p>
                    <p className="text-sm font-bold leading-tight">Google Play</p>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Free Trial CTA */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: 0.16 }}
              className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-100 rounded-3xl p-7 flex flex-col"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-5">
                <span className="text-2xl">🎉</span>
              </div>
              <h3 className="font-black text-slate-900 text-xl mb-2">First Class Is Free</h3>
              <p className="text-slate-500 text-sm leading-relaxed flex-1">
                Every new student gets one completely free trial class. No registration fee, no costume cost, no commitment. Just your child discovering what they love.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  "No prior experience needed",
                  "Wear comfortable clothes",
                  "Meet the teacher first",
                  "Decide before you commit",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                    <span className="text-sm text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
                <a
                  href="#form"
                  onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="mt-2 block w-full text-center bg-orange-500 hover:bg-orange-600 text-white py-3.5 rounded-xl font-black text-sm transition-colors shadow-md shadow-orange-200 min-h-[48px] flex items-center justify-center"
                >
                  Book Your Free Trial ↑
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Final CTA Banner ── */}
      <section className="py-20 bg-gradient-to-br from-purple-700 to-violet-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            Questions? We're Always Happy to Chat.
          </h2>
          <p className="text-purple-100/80 text-lg mb-10 max-w-2xl mx-auto">
            No question is too small. Whether you're asking about class placement, pricing, or what to wear — we're here.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+15068471164"
              className="inline-flex items-center gap-2 bg-white text-purple-800 hover:bg-purple-50 px-7 py-4 rounded-xl font-black text-sm transition-colors shadow-lg min-h-[52px]"
            >
              <Phone className="w-4 h-4" />
              (506) 847-1164
            </a>
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white px-7 py-4 rounded-xl font-bold text-sm transition-colors min-h-[52px]"
            >
              Read the FAQ →
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
