import { motion } from "motion/react";
import { Link } from "react-router";
import Slider from "react-slick";
import { Star, ChevronRight, CheckCircle2, Apple, Play } from "lucide-react";
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
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Star className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium tracking-wide">Established 2013 • Quispamsis, NB</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              Where Every Dancer <br />
              <span className="text-orange-400">Finds Their Spotlight</span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg md:text-xl text-purple-100 mb-10 leading-relaxed">
              Welcome to D.A.T.A - a vibrant community where passion meets technique. We nurture your child&apos;s love for dance with
              industry-trained instructors, personalized attention, and a family-like atmosphere.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                to="/contact"
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-md font-bold text-lg transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 group"
              >
                Start Your Free Trial
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-md font-bold text-lg transition-all flex items-center justify-center"
              >
                Learn More About Us
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 md:gap-12 max-w-3xl mx-auto border-t border-white/20 pt-8">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-1">300+</div>
                <div className="text-sm text-purple-200">Happy Dancers</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-1">12+</div>
                <div className="text-sm text-purple-200">Years Excellence</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-1 flex items-center justify-center gap-1">
                  4.8
                  <Star className="w-6 h-6 fill-current text-orange-400" />
                </div>
                <div className="text-sm text-purple-200">Google Rating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
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
                icon: "bg-purple-500",
                iconColor: "text-white",
              },
              {
                title: "Industry-Trained Faculty",
                desc: "Learn from instructors with extensive experience, trained by sought-after professionals.",
                icon: "bg-orange-500",
                iconColor: "text-white",
              },
              {
                title: "Personalized Attention",
                desc: "Individual growth focus ensures each student receives tailored instruction and improves yearly.",
                icon: "bg-red-500",
                iconColor: "text-white",
              },
              {
                title: "Builds Life Skills",
                desc: "Dance teaches discipline, attention to detail, and work ethic - valuable in any career path.",
                icon: "bg-violet-500",
                iconColor: "text-white",
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
                  className={`w-14 h-14 ${feature.icon} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-current/30 rotate-3`}
                >
                  <CheckCircle2 className={`w-7 h-7 ${feature.iconColor}`} />
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

      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <span className="text-purple-600 font-bold tracking-wider uppercase text-sm bg-purple-100 inline-block px-4 py-1 rounded-full">
                Stay Connected
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">Everything You Need in One App</h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                Download the <strong className="text-slate-900">D.A.T.A Studio App</strong> for seamless access to:
              </p>

              <ul className="space-y-4">
                {[
                  "Register for classes instantly",
                  "Receive studio updates & notifications",
                  "Watch class and rehearsal videos",
                  "Purchase recital tickets",
                  "View events calendar",
                  "Make secure payments",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  type="button"
                  className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-slate-800 transition-colors"
                >
                  <Apple className="w-6 h-6 fill-current" />
                  <div className="text-left">
                    <div className="text-[10px] leading-none text-slate-300">Download on the</div>
                    <div className="text-sm font-bold">App Store</div>
                  </div>
                </button>
                <button
                  type="button"
                  className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-slate-800 transition-colors"
                >
                  <Play className="w-6 h-6 fill-current" />
                  <div className="text-left">
                    <div className="text-[10px] leading-none text-slate-300">GET IT ON</div>
                    <div className="text-sm font-bold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="flex-1 relative w-full max-w-lg mx-auto">
              <div className="absolute inset-0 bg-purple-200 rounded-full blur-3xl opacity-30 transform scale-90 translate-x-10 translate-y-10" />
              <img
                src="https://images.unsplash.com/photo-1730818028738-21c19c7103fb?w=800&q=80"
                alt="App screenshot"
                className="w-full h-auto rounded-3xl shadow-2xl relative z-10 border-8 border-slate-900"
              />
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
