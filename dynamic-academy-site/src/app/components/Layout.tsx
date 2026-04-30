import { Link, Outlet, useLocation, ScrollRestoration } from "react-router";
import { useState } from "react";
import { Menu, X, Instagram, Facebook, Youtube, Music2, Phone, Mail, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Parent Portal", path: "https://app.jackrabbitclass.com/jr3.0/ParentPortal/Login?orgID=532199", external: true as const },
  { name: "Programs", path: "/programs" },
  { name: "Competitive", path: "/competitive" },
  { name: "Schedule", path: "/schedule" },
  { name: "FAQ", path: "/faq" },
  { name: "Contact", path: "/contact" },
];

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-page-accent antialiased selection:bg-purple-200 selection:text-purple-900">
      <header className="fixed top-0 w-full z-50 bg-purple-950/75 backdrop-blur-md border-b border-white/10 shadow-lg shadow-purple-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center gap-2">
              <Link
                to="/"
                className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-950 rounded-sm"
              >
                <img
                  src="/DATA_logo_White.png"
                  alt="Dynamic Academy of the Arts — DATA"
                  className="h-[4.875rem] w-[400px] max-h-[4.875rem] max-w-[min(400px,85vw)] object-contain object-left drop-shadow-sm"
                  width={400}
                  height={78}
                  decoding="async"
                />
              </Link>
            </div>

            <nav className="hidden md:flex space-x-8 items-center">
              {navLinks.slice(0, 4).map((link) =>
                link.external ? (
                  <a
                    key={link.name}
                    href={link.path}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-sm font-semibold border-b-2 border-transparent pb-1 text-purple-100/90 hover:text-white transition-colors duration-200 ease-out"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`inline-flex items-center text-sm font-semibold border-b-2 pb-1 transition-colors duration-200 ease-out hover:text-white ${
                      location.pathname === link.path
                        ? "text-white border-orange-400"
                        : "text-purple-100/90 border-transparent"
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              )}
              <div className="relative group">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-sm font-semibold border-b-2 border-transparent pb-1 text-purple-100/90 hover:text-white transition-colors duration-200"
                >
                  More
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-purple-950/85 backdrop-blur-md border border-white/10 rounded-md shadow-xl shadow-black/25 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                  {navLinks.slice(3).map((link) => (
                    link.external ? (
                      <a
                        key={link.name}
                        href={link.path}
                        target="_blank"
                        rel="noreferrer"
                        className="block px-4 py-2 text-sm text-purple-100 hover:bg-white/10 hover:text-white transition-colors duration-150"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        key={link.name}
                        to={link.path}
                        className={`block px-4 py-2 text-sm transition-colors duration-150 ${
                          location.pathname === link.path
                            ? "text-orange-400 bg-white/5 font-semibold"
                            : "text-purple-100 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {link.name}
                      </Link>
                    )
                  ))}
                </div>
              </div>

              <Link
                to="/contact"
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-md font-bold text-sm transition-colors shadow-md shadow-orange-500/35 hover:shadow-orange-500/50"
              >
                Book a Free Trial
              </Link>
            </nav>

            <div className="flex items-center md:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-purple-100 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-950 rounded-md p-1 transition-colors"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-purple-950/88 backdrop-blur-md border-t border-white/10 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1 shadow-inner shadow-black/20">
                {navLinks.map((link) => (
                  link.external ? (
                    <a
                      key={link.name}
                      href={link.path}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-3 rounded-md text-base font-medium transition-colors duration-150 text-purple-100 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-3 py-3 rounded-md text-base font-medium transition-colors duration-150 ${
                        location.pathname === link.path
                          ? "text-white bg-white/10 border-l-2 border-orange-400 pl-[10px]"
                          : "text-purple-100 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                      }`}
                    >
                      {link.name}
                    </Link>
                  )
                ))}
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block mt-4 text-center bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-md font-bold shadow-md shadow-orange-500/30 transition-colors"
                >
                  Book a Free Trial
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow pt-20 flex flex-col">
        <Outlet />
      </main>

      <ScrollRestoration />
      <footer className="bg-slate-900 text-slate-300 py-16 px-4 sm:px-6 lg:px-8 border-t-4 border-purple-600">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.5fr_1.5fr] gap-10">
          <div className="space-y-5">
            <Link to="/" className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded-sm">
              <img
                src="/DATA_logo.png"
                alt="Dynamic Academy of the Arts — DATA"
                className="h-20 w-auto max-w-[280px] object-contain object-left"
                decoding="async"
              />
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Nurturing creativity, confidence, and excellence through dance since 2013.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/dynamicacademyofthearts"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-purple-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://www.facebook.com/DynamicAcademyOfTheArts/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-purple-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://www.tiktok.com/@dynamicacademyoft?lang=en"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-purple-600 transition-colors"
                aria-label="TikTok"
              >
                <Music2 className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://www.youtube.com/@DynamicAcademyofTheArts"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-purple-600 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-purple-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-purple-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-purple-400 transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link to="/schedule" className="hover:text-purple-400 transition-colors">
                  Class Schedule
                </Link>
              </li>
              <li>
                <a
                  href="https://app.jackrabbitclass.com/jr3.0/ParentPortal/Login?orgID=532199"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-purple-400 transition-colors"
                >
                  Parent Portal
                </a>
              </li>
              <li>
                <Link to="/contact" className="hover:text-purple-400 transition-colors">
                  Free Trial
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-purple-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-purple-500 shrink-0" />
                <span>+1 506-847-1164</span>
              </li>
              <li className="flex items-start gap-3 min-w-0">
                <Mail className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                <a
                  href="mailto:dynamicacademyofthearts@gmail.com"
                  className="hover:text-purple-400 transition-colors break-all min-w-0"
                >
                  dynamicacademyofthearts@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-purple-500 shrink-0" />
                <span>
                  6 Market St
                  <br />
                  Quispamsis, NB E2E 4B1
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Download Our Studio App</h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://apps.apple.com/us/app/dynamic-academy-of-the-arts/id6746337745"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-slate-800 hover:bg-slate-700 border border-slate-700/60 text-white px-4 py-3 rounded-xl transition-colors group"
                aria-label="Download on the App Store"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white shrink-0">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                </svg>
                <div className="text-left">
                  <div className="text-[9px] leading-tight text-slate-400 tracking-wide">Download on the</div>
                  <div className="text-sm font-bold leading-tight">App Store</div>
                </div>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.dynamicacademyofthearts.mi"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-slate-800 hover:bg-slate-700 border border-slate-700/60 text-white px-4 py-3 rounded-xl transition-colors group"
                aria-label="Get it on Google Play"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill="none">
                  <path d="M3.5 21.5V2.5L21 12L3.5 21.5Z" fill="url(#gpFooter)" />
                  <defs>
                    <linearGradient id="gpFooter" x1="3.5" y1="2.5" x2="3.5" y2="21.5" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="#4285F4" />
                      <stop offset="0.4" stopColor="#EA4335" />
                      <stop offset="0.7" stopColor="#FBBC04" />
                      <stop offset="1" stopColor="#34A853" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="text-left">
                  <div className="text-[9px] leading-tight text-slate-400 tracking-wide uppercase">Get it on</div>
                  <div className="text-sm font-bold leading-tight">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© 2026 Dynamic Academy of The Arts Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
