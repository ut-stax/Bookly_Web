import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Heart, Code2, Twitter, Mail, ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 rounded-t-[2.5rem] mt-20 relative overflow-hidden">
      {/* Background glow circle */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white font-heading tracking-tight">
                Bookly <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-amber-400 text-slate-900 font-sans tracking-normal">Redex Library</span>
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Discover, explore, and download handpicked digital books across genres and languages. Built with love to bring knowledge closer to everyone.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/ut-stax/Bookly_Web"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-indigo-600 hover:text-white transition flex items-center justify-center text-slate-400"
                title="GitHub Repository"
              >
                <Code2 className="w-4 h-4" />
              </a>
              <Link
                to="/feedback"
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-indigo-600 hover:text-white transition flex items-center justify-center text-slate-400"
                title="Send Feedback"
              >
                <Mail className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold font-heading mb-4 text-sm tracking-wider uppercase">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/home" className="hover:text-indigo-400 transition flex items-center gap-1">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/books" className="hover:text-indigo-400 transition flex items-center gap-1">
                  Book Store
                </Link>
              </li>
              <li>
                <Link to="/request" className="hover:text-indigo-400 transition flex items-center gap-1">
                  Request a Book
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="hover:text-indigo-400 transition flex items-center gap-1">
                  User Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold font-heading mb-4 text-sm tracking-wider uppercase">Genres</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/books?genre=Fiction" className="hover:text-indigo-400 transition">Fiction</Link></li>
              <li><Link to="/books?genre=Non-Fiction" className="hover:text-indigo-400 transition">Non-Fiction</Link></li>
              <li><Link to="/books?genre=Biographies" className="hover:text-indigo-400 transition">Biographies</Link></li>
              <li><Link to="/books?genre=Poetry" className="hover:text-indigo-400 transition">Poetry</Link></li>
              <li><Link to="/books?genre=Comics" className="hover:text-indigo-400 transition">Comics & Graphic</Link></li>
            </ul>
          </div>

          {/* Community / Admin */}
          <div>
            <h4 className="text-white font-bold font-heading mb-4 text-sm tracking-wider uppercase">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/secret-upload" className="hover:text-indigo-400 transition flex items-center gap-1 text-amber-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" /> Admin Portal
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-indigo-400 transition">
                  Create Account
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-indigo-400 transition">
                  Member Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> by <span className="text-slate-300 font-semibold">Utkarsh Tripathi</span>
          </p>
          <p>© {new Date().getFullYear()} Bookly Web. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
