import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import BookCard from "../components/BookCard";
import Footer from "../components/Footer";
import HeroBookGraphic from "../components/HeroBookGraphic";
import { BookGridSkeleton } from "../components/SkeletonLoader";
import { 
  Sparkles, 
  Search, 
  Send, 
  MessageSquare, 
  ArrowRight, 
  Flame, 
  Library, 
  Compass, 
  BookOpen, 
  Layers,
  ChevronRight
} from "lucide-react";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksSnapshot = await getDocs(collection(db, "books"));
        const booksData = booksSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBooks(booksData);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const getLatestBooks = () => {
    return [...books]
      .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
      .slice(0, 4);
  };

  const getRandomBooks = () => {
    return [...books]
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/books");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 flex flex-col font-sans">
      
      {/* 🚀 Hero Banner (Inspired by Landing Page Redex Image) */}
      <section className="bg-indigo-600 text-white pt-8 pb-16 px-4 sm:px-6 lg:px-8 hero-curved-bottom relative overflow-hidden shadow-lg">
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Digital Library Platform
            </div>

            <h1 className="text-4xl sm:text-6xl font-black font-heading tracking-tight leading-tight text-white">
              Expand your mind, <br className="hidden sm:inline" />
              reading a book
            </h1>

            <p className="text-base sm:text-lg text-indigo-100 font-medium max-w-2xl mx-auto leading-relaxed">
              Explore handpicked books in every genre and language. Discover your next favorite read, request missing titles, or download free PDFs!
            </p>

            {/* Quick Search Input inside Hero */}
            <form 
              onSubmit={handleSearchSubmit}
              className="pt-2 max-w-xl mx-auto flex items-center bg-white rounded-full p-1.5 shadow-2xl border border-indigo-200"
            >
              <div className="pl-4 pr-2 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by book title or author..."
                className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-sm sm:text-base focus:outline-none py-2"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-full text-xs sm:text-sm transition shadow-sm shrink-0"
              >
                Search
              </button>
            </form>

            {/* Hero Quick Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => navigate("/request")}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-5 py-2.5 rounded-full text-xs sm:text-sm transition flex items-center gap-2 backdrop-blur-md"
              >
                <Send className="w-4 h-4 text-amber-300" /> Request Title
              </button>

              <button
                onClick={() => navigate("/feedback")}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-5 py-2.5 rounded-full text-xs sm:text-sm transition flex items-center gap-2 backdrop-blur-md"
              >
                <MessageSquare className="w-4 h-4 text-rose-300" /> Give Feedback
              </button>
            </div>

          </div>

          {/* Central 3D Graphic Element */}
          <div className="mt-8">
            <HeroBookGraphic 
              onExplore={() => navigate("/books")}
              onRequest={() => navigate("/request")}
            />
          </div>
        </div>
      </section>

      {/* 🏷️ Quick Categories Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 w-full">
        <div className="bg-white rounded-2xl p-4 shadow-xl border border-slate-100 flex items-center justify-between overflow-x-auto gap-3 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest shrink-0 px-2 font-heading">
            Popular Genres:
          </span>
          {["All Books", "Fiction", "Non-Fiction", "Poetry", "Biographies", "Comics"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                if (cat === "All Books") navigate("/books");
                else navigate(`/books?genre=${encodeURIComponent(cat)}`);
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 transition shrink-0 border border-slate-100"
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 🆕 New Arrivals Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-slate-900">
                New Arrivals
              </h2>
              <p className="text-xs text-slate-500">Freshly added digital books in our library catalog</p>
            </div>
          </div>

          <Link
            to="/books"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition"
          >
            Explore All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <BookGridSkeleton count={4} />
        ) : getLatestBooks().length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {getLatestBooks().map((book, idx) => (
              <BookCard key={book.id} book={book} index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 p-8">
            <p className="text-slate-500 text-sm">No books uploaded yet. Log in to upload your first book!</p>
          </div>
        )}
      </section>

      {/* 🎲 Random Picks / Recommended Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black font-heading text-slate-900">
                Random Recommended Picks
              </h2>
              <p className="text-xs text-slate-500">Handpicked selections to inspire your next reading session</p>
            </div>
          </div>

          <button
            onClick={() => setBooks([...books].sort(() => 0.5 - Math.random()))}
            className="text-xs font-bold text-amber-700 hover:text-amber-900 transition flex items-center gap-1"
          >
            🔄 Shuffle Picks
          </button>
        </div>

        {loading ? (
          <BookGridSkeleton count={4} />
        ) : getRandomBooks().length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {getRandomBooks().map((book, idx) => (
              <BookCard key={book.id} book={book} index={idx + 2} />
            ))}
          </div>
        ) : null}

        {/* View All Store Banner CTA */}
        <div className="pt-8 text-center">
          <button
            onClick={() => navigate("/books")}
            className="bg-indigo-600 text-white font-bold px-8 py-3.5 rounded-full shadow-md hover:bg-indigo-700 transition inline-flex items-center gap-2 text-sm"
          >
            <Library className="w-4 h-4" /> View All Books in Catalog
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default Home;
