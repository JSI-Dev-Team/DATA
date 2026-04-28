import { motion } from "motion/react";
import { Link } from "react-router";
import Slider from "react-slick";
import { Star, ChevronRight, ChevronDown, CheckCircle2, Heart, GraduationCap, UserCheck, Trophy, Play } from "lucide-react";
import { useState } from "react";

export function Home() {
  const [currentVideo, setCurrentVideo] = useState({
    id: "QXvaO10wuQE",
    title: "Dynamic Academy Showcase 2024",
    description: "Our award-winning competitive team performs at regional championships",
  });

  const showcaseVideos = [
    {
      id: "QXvaO10wuQE",
      title: "Dynamic Academy Showcase 2024",
      description: "Our award-winning competitive team performs at regional championships",
      thumbnail: "https://img.youtube.com/vi/QXvaO10wuQE/maxresdefault.jpg",
    },
    {
      id: "dQw4w9WgXcQ",
      title: "Behind the Scenes",
      description: "Inside our state-of-the-art studios and training programs",
      thumbnail: "https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?w=800&q=80",
    },
    {
      id: "9bZkp7q19f0",
      title: "Student Spotlight",
      description: "Witness the transformation and growth of our dancers",
      thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    },
    {
      id: "kJQP7kiw5Fk",
      title: "Recital Highlights",
      description: "Memorable moments from our annual recital performances",
      thumbnail: "https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?w=800&q=80",
    },
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1596315458574-d99efaea3b3b?q=80&w=2000"
            alt="Dancers in studio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-purple-900/70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/40 to-transparent" />
          <div className="absolute inset-0 bg-grain opacity-[0.05] pointer-events-none select-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              Classical Precision. <br />
              Contemporary <span className="text-[#ff8904]">Fire</span>.
            </h1>

            <p className="max-w-2xl mx-auto text-lg md:text-xl text-purple-100 mb-10 leading-relaxed">
              Quispamsis + Saint John, 12 years, 300+ dancers, 4.8★
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                to="/contact"
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-md font-bold text-lg transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 group"
              >
                Book a Free Trial
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/classes"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-md font-bold text-lg transition-all flex items-center justify-center"
              >
                Explore Programs
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.a
          href="#page-content"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/50 hover:text-white/80 transition-colors duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          aria-label="Scroll to content"
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.a>
      </section>

      <section aria-label="Recital announcement" className="py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-purple-950/95 via-purple-900/85 to-purple-950/95 shadow-2xl shadow-purple-950/30">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(139,92,246,0.30)_0%,_transparent_55%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_65%,_rgba(255,137,4,0.18)_0%,_transparent_60%)]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-b from-transparent to-purple-950/70" />

            <div className="relative flex flex-col gap-6 px-6 py-8 sm:px-8 sm:py-10 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-5">
                <div className="shrink-0 rounded-xl bg-white/10 border border-white/15 px-5 py-4">
                  <div className="text-orange-400 font-extrabold tracking-tight text-3xl leading-none">Recital</div>
                  <div className="text-purple-100/90 font-extrabold tracking-tight text-3xl leading-none">2026</div>
                </div>

                <div className="min-w-0">
                  <div className="text-white font-bold text-xl sm:text-2xl tracking-tight">
                    Recital 2026 — <span className="text-[#ff8904]">Coming this June</span>
                  </div>
                  <div className="mt-1 text-purple-100/85 text-sm sm:text-base leading-relaxed">
                    Watch for dates, tickets, and costume details in the parent portal and the DATA App.
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-start md:justify-end">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-sm font-semibold text-white">
                  Announcement
                  <span className="inline-block h-2 w-2 rounded-full bg-[#ff8904]" aria-hidden />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="page-content" className="py-24 bg-gradient-to-b from-purple-50/90 via-white to-orange-50/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-purple-600 font-bold tracking-wider uppercase text-sm mb-4 block bg-purple-100 inline-block px-4 py-1 rounded-full">
              Why Families Choose D.A.T.A
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">More Than Just Dance Classes</h2>
            <p className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
              We&apos;re building confident, creative, and disciplined individuals through the art of dance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Family-Like Community",
                desc: "Join a welcoming environment where every student feels valued, supported, and at home.",
                bg: "bg-purple-500",
                Icon: Heart,
              },
              {
                title: "Industry-Trained Faculty",
                desc: "Learn from instructors with extensive experience, trained by sought-after professionals.",
                bg: "bg-orange-500",
                Icon: GraduationCap,
              },
              {
                title: "Personalized Attention",
                desc: "Individual growth focus ensures each student receives tailored instruction and improves yearly.",
                bg: "bg-red-500",
                Icon: UserCheck,
              },
              {
                title: "Builds Life Skills",
                desc: "Dance teaches discipline, attention to detail, and work ethic - valuable in any career path.",
                bg: "bg-violet-500",
                Icon: Trophy,
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300"
              >
                <div
                  className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-current/30 rotate-3`}
                >
                  <feature.Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-700 leading-relaxed text-[15px]">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block bg-white px-8 py-4 rounded-full shadow-lg shadow-purple-900/5 border border-purple-100">
              <h4 className="text-2xl font-bold text-slate-900 mb-1">Ages 3-18 Welcome!</h4>
              <p className="text-slate-500">From Creative Movement to Advanced Performance</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <span className="text-purple-600 font-bold tracking-wider uppercase text-sm bg-purple-100 inline-block px-4 py-1 rounded-full">
                Our Story
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                Building Confidence Through Dance Since 2013
              </h2>
              <div className="space-y-4 text-lg text-slate-700 leading-relaxed">
                <p>
                  At <strong className="text-slate-900">Dynamic Academy of The Arts (D.A.T.A)</strong>, we believe dance is more than movement -
                  it&apos;s a journey of self-discovery, creativity, and confidence.
                </p>
                <p>
                  Our studio is a vibrant community where students meet new friends, have fun, and feel truly at home. We offer diverse class
                  packages tailored to different interests and skill levels, ensuring there&apos;s something for everyone.
                </p>
                <p>
                  Our faculty, trained by some of the industry&apos;s most sought-after instructors, continuously updates their skills to provide
                  cutting-edge techniques and the latest style trends.
                </p>
                <p className="text-purple-700 italic font-medium">
                  We celebrate diversity and inclusivity, ensuring every student feels valued and supported.
                </p>
              </div>
              <div className="pt-4">
                <Link
                  to="/about"
                  className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-md font-bold transition-colors inline-flex items-center gap-2"
                >
                  Join Our Community <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-200 to-orange-100 rounded-3xl blur-3xl opacity-50 -z-10 transform scale-105" />
              <img
                src="https://images.unsplash.com/photo-1767784097087-8c1588215083?w=800&q=80"
                alt="Dance class"
                className="rounded-3xl shadow-2xl relative z-10 w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl z-20 flex items-center gap-4">
                <div className="bg-orange-500 p-4 rounded-xl">
                  <Star className="w-8 h-8 text-white fill-current" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 flex items-center gap-1">
                    4.8 <Star className="w-5 h-5 text-slate-900 fill-current" />
                  </div>
                  <div className="text-sm text-slate-500">Google Rating</div>
                  <div className="text-xs text-slate-400">12 Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-purple-600 font-bold tracking-wider uppercase text-sm bg-purple-100 inline-block px-4 py-1 rounded-full mb-4">
              Our Programs
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Find Your Perfect Dance Style</h2>
            <p className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed">
              From classical ballet to energetic hip hop, we offer diverse classes for ages 3-18. Each class builds technique, confidence, and joy.
            </p>
          </div>

          <div className="mb-16 rounded-3xl overflow-hidden relative shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1765795023687-7b2ebc93bae1?w=1200&q=80"
              alt="Friendships Bloom"
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-10 text-white">
              <h3 className="text-3xl md:text-4xl font-bold mb-2">Where Friendships Bloom</h3>
              <p className="text-lg text-purple-100">Our youngest dancers build confidence, skills, and lasting friendships</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Ballet",
                age: "3-18 years",
                desc: "Classical technique and grace for ages 3+",
                color: "bg-purple-500",
                image: "https://images.unsplash.com/photo-1758670331632-47c8bc00f705?w=800&q=80",
              },
              {
                title: "Tap",
                age: "3-18 years",
                desc: "Rhythm, musicality, and timing",
                color: "bg-orange-500",
                image: "https://images.unsplash.com/photo-1643758344142-7933a8c07796?w=800&q=80",
              },
              {
                title: "Jazz",
                age: "5-18 years",
                desc: "High-energy, expressive movement",
                color: "bg-pink-500",
                image: "https://images.unsplash.com/photo-1765278543368-6e89f3e080bf?w=800&q=80",
              },
              {
                title: "Lyrical",
                age: "7-18 years",
                desc: "Emotional storytelling through dance",
                color: "bg-indigo-500",
                image: "https://images.unsplash.com/photo-1598981553068-135d56f26e6f?w=800&q=80",
              },
              {
                title: "Hip Hop",
                age: "5-18 years",
                desc: "Urban styles and freestyle expression",
                color: "bg-blue-500",
                image: "https://images.unsplash.com/photo-1621976360623-004223992275?w=800&q=80",
              },
              {
                title: "Acro",
                age: "6+ years",
                desc: "Acrobatics, flexibility, and strength",
                color: "bg-red-500",
                image: "https://images.unsplash.com/photo-1762271232481-30bd8d3342fa?w=800&q=80",
              },
            ].map((cls) => (
              <div
                key={cls.title}
                className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow group relative flex flex-col pt-2"
              >
                <div className={`absolute top-0 left-0 right-0 h-2 ${cls.color} z-20`} />
                <div className="h-48 overflow-hidden relative w-full">
                  <img
                    src={cls.image}
                    alt={cls.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <h4 className="text-2xl font-bold text-white">{cls.title}</h4>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-md mb-4 border border-slate-200 self-start">
                    {cls.age}
                  </div>
                  <p className="text-slate-700 mb-8 flex-1 leading-relaxed text-[15px]">{cls.desc}</p>
                  <Link
                    to="/classes"
                    className="text-purple-600 font-bold text-sm inline-flex items-center gap-1 group-hover:text-purple-800 transition-colors"
                  >
                    Try Free Class <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center space-y-6">
            <h4 className="text-2xl font-bold text-slate-900">Classes Available for All Ages</h4>
            <div className="flex flex-wrap justify-center gap-3">
              {["3-4 years (Creative Movement)", "5-6 years", "7-8 years", "9-10 years", "11-18 years"].map((age) => (
                <span key={age} className="px-4 py-2 bg-white border border-purple-200 text-purple-700 rounded-md text-sm font-medium">
                  {age}
                </span>
              ))}
            </div>
            <Link
              to="/classes"
              className="inline-flex items-center gap-2 border-2 border-purple-600 text-purple-700 px-6 py-3 rounded-md font-bold hover:bg-purple-50 transition-colors"
            >
              <Play className="w-4 h-4" /> View Full Class Schedule
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1765278624799-9c90305b0b7e?w=2000&q=80"
            alt="Performance"
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-slate-900/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-white font-bold tracking-wider uppercase text-sm bg-orange-500 inline-flex items-center gap-2 px-4 py-1 rounded-full mb-6 shadow-lg">
              <Star className="w-4 h-4 fill-current" /> Trusted by Families in Quispamsis
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">What Our Families Say</h2>
            <div className="flex items-center justify-center gap-2 text-white text-2xl font-bold">
              <div className="flex text-orange-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-current" />
                ))}
              </div>
              <span>4.8</span> <span className="text-slate-400 font-normal text-lg">out of 5</span>
            </div>
            <p className="text-slate-400 mt-2">Based on 12 authentic Google Reviews</p>
          </div>

          <div className="px-4">
            <Slider
              dots
              infinite
              speed={500}
              slidesToShow={3}
              slidesToScroll={1}
              responsive={[
                { breakpoint: 1024, settings: { slidesToShow: 2 } },
                { breakpoint: 640, settings: { slidesToShow: 1 } },
              ]}
              className="testimonial-carousel -mx-4"
            >
              {[
                {
                  name: "Jessica Vicidomini",
                  initial: "JV",
                  color: "bg-purple-600",
                  text: "We have an amazing family here, I would strongly recommend this studio.",
                },
                {
                  name: "Ashley Kilpatrick",
                  initial: "AK",
                  color: "bg-orange-600",
                  text: "I definitely recommend this studio if you are looking for a place to dance!",
                },
                { name: "Jocelyn", initial: "J", color: "bg-red-600", text: "Amazing and the classes are amazing! It's such a comfortable environment." },
                {
                  name: "Sarah M.",
                  initial: "SM",
                  color: "bg-blue-600",
                  text: "My daughter's confidence has grown so much since joining D.A.T.A.",
                },
              ].map((review) => (
                <div key={review.name} className="px-4 pb-12">
                  <div className="bg-white p-8 rounded-2xl shadow-xl h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-full ${review.color} text-white flex items-center justify-center font-bold text-lg`}>
                        {review.initial}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{review.name}</h4>
                        <div className="flex text-orange-400">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-700 flex-1 italic leading-relaxed">&quot;{review.text}&quot;</p>
                    <div className="mt-6 flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <div className="w-4 h-4 bg-slate-100 rounded-full flex items-center justify-center">
                        <span className="text-[10px] text-blue-500">G</span>
                      </div>
                      Verified Google Review
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          <div className="text-center mt-12">
            <button
              type="button"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-6 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Read All 12 Reviews on Google
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-purple-950 via-slate-900 to-slate-950 relative overflow-hidden">
        <div className="pointer-events-none absolute -top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-600/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-1/3 w-[400px] h-[400px] rounded-full bg-orange-500/10 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <span className="text-orange-400 font-bold tracking-wider uppercase text-sm bg-orange-400/10 border border-orange-400/20 inline-block px-4 py-1 rounded-full">
                Stay Connected
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                Everything You Need<br />in One App
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                Download the <strong className="text-white">D.A.T.A Studio App</strong> for seamless access to all things DATA — right from your pocket.
              </p>

              <ul className="space-y-3">
                {[
                  "Register for classes instantly",
                  "Receive studio updates & notifications",
                  "Watch class and rehearsal videos",
                  "Purchase recital tickets",
                  "View events calendar",
                  "Make secure payments",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="https://apps.apple.com/us/app/dynamic-academy-of-the-arts/id6746337745"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3.5 bg-white text-slate-900 px-5 py-3.5 rounded-2xl hover:bg-slate-50 active:scale-95 transition-all shadow-xl shadow-black/30"
                >
                  <svg viewBox="0 0 24 24" className="w-7 h-7 fill-slate-900 shrink-0">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] leading-tight text-slate-500 tracking-wide">Download on the</div>
                    <div className="text-[17px] font-bold leading-tight tracking-tight">App Store</div>
                  </div>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.dynamicacademyofthearts.mi"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3.5 bg-white text-slate-900 px-5 py-3.5 rounded-2xl hover:bg-slate-50 active:scale-95 transition-all shadow-xl shadow-black/30"
                >
                  <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0" fill="none">
                    <path d="M3.5 21.5V2.5L21 12L3.5 21.5Z" fill="url(#gpHome)" />
                    <defs>
                      <linearGradient id="gpHome" x1="3.5" y1="2.5" x2="3.5" y2="21.5" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#4285F4" />
                        <stop offset="0.4" stopColor="#EA4335" />
                        <stop offset="0.7" stopColor="#FBBC04" />
                        <stop offset="1" stopColor="#34A853" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] leading-tight text-slate-500 tracking-wide uppercase">Get it on</div>
                    <div className="text-[17px] font-bold leading-tight tracking-tight">Google Play</div>
                  </div>
                </a>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <div className="flex text-orange-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-slate-400 text-sm">4.8 stars · Loved by 300+ DATA families</span>
              </div>
            </div>

            <div className="flex-1 relative w-full max-w-sm mx-auto py-10">
              <div className="pointer-events-none absolute inset-8 bg-purple-600/25 rounded-full blur-3xl" />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="relative z-10 mx-auto w-64 sm:w-72"
              >
                <div className="relative rounded-[2.5rem] bg-slate-950 border-[5px] border-slate-700/80 shadow-2xl overflow-hidden aspect-[9/19]">
                  <img
                    src="https://images.unsplash.com/photo-1730818028738-21c19c7103fb?w=800&q=80"
                    alt="DATA Studio App interface"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-0 right-0 text-center px-4">
                    <div className="text-white font-bold text-sm">D.A.T.A Studio</div>
                    <div className="text-purple-200 text-xs">Your dance life, simplified</div>
                  </div>
                </div>
                <div className="absolute top-[7px] left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-700/80 rounded-full z-20" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute top-6 -right-2 sm:-right-8 bg-white rounded-2xl px-3 py-2.5 shadow-2xl z-20"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-600 rounded-xl flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-900 leading-tight">Class Registered!</div>
                    <div className="text-[10px] text-slate-500">Ballet · Mon 4:30 pm</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.6 }}
                className="absolute bottom-6 -left-2 sm:-left-8 bg-white rounded-2xl px-3 py-2.5 shadow-2xl z-20"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center shrink-0">
                    <Star className="w-4 h-4 text-white fill-current" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-900 leading-tight">4.8 ★ Rating</div>
                    <div className="text-[10px] text-slate-500">App Store & Play</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.1)_0%,_transparent_50%)] opacity-30" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 mb-6">
                <Play className="w-4 h-4 text-pink-400" />
                <span className="text-sm font-bold tracking-widest uppercase text-pink-400">Watch Us in Action</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
                WITNESS THE{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-pink-500">MAGIC</span>
              </h2>
              <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Experience the artistry, energy, and passion that define Dynamic Academy.
                <br />
                From competition stages to daily classes, see what makes us different.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-8 rounded-3xl overflow-hidden shadow-2xl border border-purple-500/30 bg-slate-950"
          >
            <div className="relative aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${currentVideo.id}?rel=0&modestbranding=1`}
                title={currentVideo.title}
                style={{ border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 border-t border-purple-500/20">
              <h3 className="text-2xl font-bold text-white mb-2">{currentVideo.title}</h3>
              <p className="text-slate-300">{currentVideo.description}</p>
            </div>
          </motion.div>

          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
              {showcaseVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 w-80 snap-start"
                >
                  <button
                    type="button"
                    onClick={() => setCurrentVideo(video)}
                    className={`group relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 w-full ${
                      currentVideo.id === video.id ? "ring-4 ring-pink-500 shadow-pink-500/50" : "hover:shadow-xl"
                    }`}
                  >
                    <div className="relative aspect-video overflow-hidden bg-slate-800">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-pink-500/90 flex items-center justify-center group-hover:bg-pink-500 transition-colors shadow-lg">
                          <Play className="w-7 h-7 text-white fill-current ml-1" />
                        </div>
                      </div>

                      {currentVideo.id === video.id && (
                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold flex items-center gap-1 shadow-lg">
                          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                          NOW PLAYING
                        </div>
                      )}
                    </div>

                    <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50">
                      <h4 className="text-white font-bold text-lg mb-2 group-hover:text-pink-400 transition-colors">{video.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{video.description}</p>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { icon: "🏆", number: "50+", label: "Competition Awards" },
              { icon: "🎭", number: "100+", label: "Performances" },
              { icon: "💃", number: "15+", label: "Choreographers" },
              { icon: "⭐", number: "12", label: "Years Excellence" },
            ].map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 mb-4 text-3xl group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <iframe
            className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2"
            src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1&mute=1&loop=1&playlist=${currentVideo.id}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
            title="Dance performance background video"
            style={{ border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div className="absolute inset-0 bg-slate-900/60" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Ready to Start Your <br />
              <span className="text-orange-400">Dance Journey?</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join the Dynamic Academy family and discover the joy, confidence, and artistry of dance. Your first class is FREE!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-md font-bold text-lg transition-all shadow-2xl shadow-orange-500/50 flex items-center justify-center gap-2 group"
              >
                Start Your Journey <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                type="button"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white/50 text-white px-8 py-4 rounded-md font-bold text-lg transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" /> Watch Showreel
              </button>
            </div>
          </motion.div>

          <div className="mt-16 pt-8 border-t border-white/30 flex flex-wrap justify-center gap-12 text-center text-white/80">
            <div>
              <div className="font-bold text-white text-xl">300+</div>
              <div className="text-sm">Students</div>
            </div>
            <div>
              <div className="font-bold text-white text-xl flex items-center gap-1 justify-center">
                4.8/5 <Star className="w-4 h-4 fill-current text-orange-400" />
              </div>
              <div className="text-sm">Rating</div>
            </div>
            <div>
              <div className="font-bold text-white text-xl">12+</div>
              <div className="text-sm">Years</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
