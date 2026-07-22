import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, limit, query, orderBy } from "firebase/firestore";
import HeroBookGraphic from "../components/HeroBookGraphic";
import BookCard from "../components/BookCard";
import Footer from "../components/Footer";
import { BookGridSkeleton } from "../components/SkeletonLoader";
import { 
  Sparkles, 
  ArrowRight, 
  Download, 
  BookOpen, 
  CheckCircle2, 
  Star, 
  Send, 
  MessageSquare, 
  Layers, 
  Palette, 
  UserCheck, 
  ChevronRight, 
  Library,
  BookMarked
} from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const q = query(collection(db, "books"), orderBy("createdAt", "desc"), limit(6));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFeaturedBooks(data);
      } catch (err) {
        console.error("Error fetching landing books:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 flex flex-col font-sans">
      
      {/* 🚀 Top Announcement Banner */}
      <div className="bg-indigo-900 text-indigo-100 text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="bg-amber-400 text-slate-900 font-bold px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
          New Release
        </span>
        <span>Welcome to the redesigned Bookly Library platform. Explore 360+ free titles today!</span>
        <Link to="/register" className="underline font-bold text-amber-300 hover:text-white ml-1">
          Join Free
        </Link>
      </div>

      {/* 🔮 HERO SECTION - Inspired directly by the reference image */}
      <section className="bg-indigo-600 text-white pt-6 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 hero-curved-bottom relative overflow-hidden shadow-xl">
        
        {/* Subtle Decorative Background Spheres */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-500/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          {/* Header Navigation Bar */}
          <header className="flex items-center justify-between pb-12 pt-2 border-b border-indigo-500/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-indigo-600 flex items-center justify-center font-bold text-xl shadow-md">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black font-heading tracking-tight text-white">
                Bookly <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-amber-400 text-slate-900 font-sans tracking-normal">Redex</span>
              </span>
            </div>

            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-indigo-100">
              <Link to="/home" className="hover:text-white transition">Home</Link>
              <Link to="/books" className="hover:text-white transition">Store</Link>
              <Link to="/request" className="hover:text-white transition">Request</Link>
              <Link to="/feedback" className="hover:text-white transition">Feedback</Link>
            </nav>

            <div className="flex items-center space-x-3">
              <Link 
                to="/login" 
                className="text-sm font-semibold text-indigo-100 hover:text-white px-3 py-2 transition"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="bg-white text-indigo-700 hover:bg-amber-300 hover:text-slate-900 font-bold px-5 py-2.5 rounded-full text-sm transition shadow-md flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" /> Get Started
              </Link>
            </div>
          </header>

          {/* Hero Typography */}
          <div className="text-center max-w-3xl mx-auto pt-10 sm:pt-14 space-y-4">
            <h1 className="text-4xl sm:text-6xl font-black font-heading tracking-tight leading-tight text-white">
              Expand your mind, <br className="hidden sm:inline" />
              reading a book
            </h1>

            <p className="text-base sm:text-lg text-indigo-100 font-normal max-w-2xl mx-auto leading-relaxed">
              Reading books is a wonderful way to spend your time. Here at <span className="font-semibold text-white">Bookly</span>, we believe reading will help you make meaningful connections with knowledge.
            </p>

            {/* Hero Pill Actions */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => navigate("/books")}
                className="bg-white text-indigo-700 hover:bg-amber-300 hover:text-slate-900 font-bold px-8 py-3.5 rounded-full shadow-lg transition-transform active:scale-95 text-sm sm:text-base flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download Books Now
              </button>

              <button
                onClick={() => navigate("/register")}
                className="bg-indigo-500/80 hover:bg-indigo-500 text-white border border-indigo-400/50 font-semibold px-8 py-3.5 rounded-full transition text-sm sm:text-base backdrop-blur-sm"
              >
                Read Free Library
              </button>
            </div>
          </div>

          {/* Center 3D Book Illustration Graphic */}
          <div className="mt-8">
            <HeroBookGraphic 
              onExplore={() => navigate("/books")} 
              onRequest={() => navigate("/request")} 
            />
          </div>
        </div>
      </section>

      {/* 📖 ABOUT SECTION - Soft warm peach backdrop */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF3EE] relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Card: Soft Pink Graphic Showcase */}
            <div className="relative rounded-3xl bg-[#FFE8EC] p-8 sm:p-12 border border-rose-100 overflow-hidden shadow-sm flex items-center justify-center">
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-rose-200/50 blur-lg" />
              <div className="relative z-10 w-full flex flex-col sm:flex-row items-center gap-6">
                {/* 3D Stack Image Container */}
                <div className="w-40 h-48 sm:w-48 sm:h-56 rounded-2xl bg-white p-3 shadow-xl transform -rotate-3 hover:rotate-0 transition duration-300 flex flex-col justify-between border border-rose-100">
                  <div className="w-full h-32 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-400 p-3 text-white flex flex-col justify-between">
                    <BookOpen className="w-6 h-6 text-white" />
                    <span className="font-heading font-bold text-sm">Digital Library</span>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-xs text-slate-800">The Bookly Collection</p>
                    <p className="text-[10px] text-slate-500">Free Instant PDF Access</p>
                  </div>
                </div>

                {/* White Info Card Overlay */}
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-rose-100/80 flex-1 space-y-3">
                  <h3 className="text-xl font-bold font-heading text-slate-900">
                    The Bookly Library
                  </h3>
                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      <span>Author: <strong className="text-slate-800">Curated & Verified</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-500" />
                      <span>Total Titles: <strong className="text-slate-800">368+ Digital Books</strong></span>
                    </div>
                  </div>
                  <div className="pt-2 flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-indigo-600 inline-block" />
                    <span className="w-4 h-4 rounded-full bg-rose-500 inline-block" />
                    <span className="w-4 h-4 rounded-full bg-amber-400 inline-block" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Info Column */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider font-heading">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" /> About Platform
              </div>

              <h2 className="text-3xl sm:text-5xl font-black font-heading text-slate-900 leading-tight">
                About <br />
                The Bookly Library
              </h2>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Bookly is designed to provide readers, students, and book enthusiasts instant access to hundreds of digital books in multiple languages including English, Hindi, Sanskrit, and regional dialects.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                  <p className="text-2xl font-black font-heading text-indigo-600">368+</p>
                  <p className="text-xs text-slate-500 font-medium">Available Titles</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                  <p className="text-2xl font-black font-heading text-rose-500">100%</p>
                  <p className="text-xs text-slate-500 font-medium">Free Access</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/books"
                  className="inline-flex items-center gap-2 font-bold text-sm bg-indigo-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-indigo-700 transition"
                >
                  Explore Complete Catalog <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 🆕 NEW ARRIVALS SECTION - Soft pastel card grids */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 font-heading">
                Freshly Added
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-slate-900 mt-1">
                New Arrivals
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Find our top categories that will help you find what you are looking for.
              </p>
            </div>

            <Link
              to="/books"
              className="inline-flex items-center gap-1.5 font-bold text-sm text-indigo-600 hover:text-indigo-800 transition"
            >
              View All Store <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Book Cards Grid */}
          {loading ? (
            <BookGridSkeleton count={4} />
          ) : featuredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredBooks.slice(0, 4).map((book, idx) => (
                <BookCard key={book.id} book={book} index={idx} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-3xl border border-slate-200">
              <p className="text-slate-500">No books available yet in Firestore.</p>
            </div>
          )}

        </div>
      </section>

      {/* 💬 TESTIMONIALS SECTION - What People Say */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 font-heading">
              Community Reviews
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-slate-900">
              What People Say About <br /> Bookly Library
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Review 1 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  "Bookly has transformed how I access books for my university literature courses. The clean user interface and direct Google Drive downloads are seamless!"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-sm">
                  AP
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900">Ananya Patel</p>
                  <p className="text-xs text-slate-500">Student & Reader</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  "I submitted a request for a regional book, and it was uploaded within two days! Amazing platform created for book lovers."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm">
                  RS
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900">Rohan Sharma</p>
                  <p className="text-xs text-slate-500">Avid Reader</p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  "Simple, fast, and completely free. The design looks stunning and navigation is super fast on mobile devices."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm">
                  VS
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900">Vikram Singh</p>
                  <p className="text-xs text-slate-500">Community Member</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 📦 WHAT'S INSIDE THE BOOK FEATURES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 font-heading">
                Features & Value
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-slate-900 leading-tight">
                What's inside <br /> the book platform
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-3 rounded-2xl hover:bg-slate-50 transition">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-900">Domain Excellence</p>
                    <p className="text-xs text-slate-500">Curated academic and literature books.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl hover:bg-slate-50 transition">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-900">UI/UX Design</p>
                    <p className="text-xs text-slate-500">Minimalist modern reader aesthetic.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl hover:bg-slate-50 transition">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-900">Multi-Lingual</p>
                    <p className="text-xs text-slate-500">English, Hindi, Sanskrit & Regional.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl hover:bg-slate-50 transition">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-900">Book Requests</p>
                    <p className="text-xs text-slate-500">Community request missing titles.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Illustration Card */}
            <div className="p-8 sm:p-12 rounded-3xl bg-[#EEF2FF] border border-indigo-100 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-indigo-600 text-white flex items-center justify-center shadow-lg">
                  <BookMarked className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold font-heading text-slate-900">
                  Ready to Start Reading?
                </h3>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Sign up now to explore all digital books or request new titles directly.
                </p>
                <button
                  onClick={() => navigate("/register")}
                  className="bg-indigo-600 text-white font-bold text-xs px-6 py-2.5 rounded-full shadow-md hover:bg-indigo-700 transition"
                >
                  Create Account Free
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 🎨 "LET'S WORK ON SOMETHING COOL TOGETHER" CTA BANNER */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-indigo-600 text-white p-8 sm:p-14 relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl text-center md:text-left z-10">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white font-heading uppercase tracking-wider">
                Community Driven
              </span>
              <h2 className="text-3xl sm:text-5xl font-black font-heading leading-tight">
                Let's Work On <br /> Something Cool Together
              </h2>
              <p className="text-indigo-100 text-sm leading-relaxed">
                Have a favorite book you want to share with the community or want to request a rare title? Submit your request today!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto z-10">
              <button
                onClick={() => navigate("/request")}
                className="bg-white text-indigo-700 hover:bg-amber-300 hover:text-slate-900 font-bold px-8 py-3.5 rounded-full shadow-lg transition text-sm text-center flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Request a Book
              </button>

              <button
                onClick={() => navigate("/feedback")}
                className="bg-indigo-500/80 hover:bg-indigo-500 text-white border border-indigo-400 font-semibold px-8 py-3.5 rounded-full transition text-sm text-center flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Give Feedback
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Footer */}
      <Footer />

    </div>
  );
};

export default Landing;
