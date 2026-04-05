import { Link, Outlet, useLocation, ScrollRestoration } from "react-router";
import { useState } from "react";
import { Menu, X, Instagram, Facebook, Twitter, Phone, Mail, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Classes", path: "/classes" },
  { name: "Competitive", path: "/competitive" },
  { name: "Parent Portal", path: "/portal" },
  { name: "Contact", path: "/contact" },
];

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-white antialiased selection:bg-purple-200 selection:text-purple-900">
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center gap-2">
              <Link to="/" className="flex items-end">
                <span className="text-3xl font-extrabold tracking-tight text-slate-900">DATA</span>
                <span className="text-[10px] leading-[10px] uppercase font-semibold text-slate-500 ml-1 pb-1 flex flex-col">
                  <span>Dynamic</span>
                  <span>Academy</span>
                  <span>of the Arts</span>
                </span>
              </Link>
            </div>

            <nav className="hidden md:flex space-x-8 items-center">
              {navLinks.slice(0, 3).map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-semibold transition-colors hover:text-purple-600 ${
                    location.pathname === link.path
                      ? "text-purple-600 border-b-2 border-purple-600 pb-1"
                      : "text-slate-700"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="relative group">
                <button type="button" className="text-sm font-semibold text-slate-600 hover:text-purple-600 pb-1 flex items-center gap-1">
                  More
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                  {navLinks.slice(3).map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-purple-50 hover:text-purple-700"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to="/contact"
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-md font-bold text-sm transition-colors shadow-md shadow-orange-500/20"
              >
                Free Trial Class
              </Link>
            </nav>

            <div className="flex items-center md:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-600 hover:text-slate-900 focus:outline-none"
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
              className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1 shadow-inner">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-3 py-3 rounded-md text-base font-medium ${
                      location.pathname === link.path
                        ? "text-purple-700 bg-purple-50"
                        : "text-slate-700 hover:text-purple-700 hover:bg-purple-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block mt-4 text-center bg-orange-500 text-white px-5 py-3 rounded-md font-bold"
                >
                  Free Trial Class
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
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-6">
            <div className="flex items-end text-white">
              <span className="text-3xl font-extrabold tracking-tight">DATA</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Nurturing creativity, confidence, and excellence through dance since 2013.
            </p>
            <div className="flex items-center gap-1 text-orange-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20" aria-hidden>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-xs text-slate-500">4.8/5 on Google (12 reviews)</p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-purple-600 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-purple-600 transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4 text-white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-purple-600 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4 text-white" />
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
                <Link to="/classes" className="hover:text-purple-400 transition-colors">
                  Classes
                </Link>
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
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-purple-500 shrink-0" />
                <span>dynamicacademyofthearts@gmail.com</span>
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
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Studio Hours</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex justify-between">
                <span>Mon-Thu:</span>
                <span>4:30 PM - 8:30 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Fri:</span>
                <span>4:30 PM - 6:30 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sat:</span>
                <span>9:00 AM - 11:30 AM</span>
              </li>
              <li className="flex justify-between">
                <span>Sun:</span>
                <span>10:00 AM - 5:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© 2024 Dynamic Academy of The Arts Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
