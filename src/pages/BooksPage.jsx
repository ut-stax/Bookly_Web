import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import BookCard from "../components/BookCard";
import Footer from "../components/Footer";
import { BookGridSkeleton } from "../components/SkeletonLoader";
import { 
  Search, 
  Filter, 
  RotateCcw, 
  BookOpen, 
  Send, 
  Grid, 
  List, 
  Sparkles,
  ArrowRight,
  BookX,
  SlidersHorizontal,
  ChevronDown
} from "lucide-react";

const genreOptions = ["All Genres", "Fiction", "Non-Fiction", "Poetry", "Biographies", "Comics"];
const languageOptions = ["All Languages", "English", "Hindi", "Sanskrit", "Regional"];

const BooksPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters from URL or state
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [genreFilter, setGenreFilter] = useState(searchParams.get("genre") || "All Genres");
  const [languageFilter, setLanguageFilter] = useState(searchParams.get("language") || "All Languages");
  const [sortBy, setSortBy] = useState("latest");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksCollection = query(collection(db, "books"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(booksCollection);
        const booksList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setBooks(booksList);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Keep search params in sync
  useEffect(() => {
    const initialSearch = searchParams.get("search");
    const initialGenre = searchParams.get("genre");
    if (initialSearch !== null) setSearch(initialSearch);
    if (initialGenre !== null) setGenreFilter(initialGenre);
  }, [searchParams]);

  const handleReset = () => {
    setSearch("");
    setGenreFilter("All Genres");
    setLanguageFilter("All Languages");
    setSortBy("latest");
    setSearchParams({});
  };

  const filteredBooks = books.filter((book) => {
    const titleMatch = (book.title || "").toLowerCase().includes(search.toLowerCase());
    const authorMatch = (book.author || "").toLowerCase().includes(search.toLowerCase());
    const matchesSearch = titleMatch || authorMatch;

    const matchesGenre =
      genreFilter === "All Genres" || !genreFilter
        ? true
        : book.genre === genreFilter;

    const matchesLanguage =
      languageFilter === "All Languages" || !languageFilter
        ? true
        : book.language === languageFilter;

    return matchesSearch && matchesGenre && matchesLanguage;
  });

  // Sorting
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === "title") return (a.title || "").localeCompare(b.title || "");
    if (sortBy === "year") return (b.publishYear || 0) - (a.publishYear || 0);
    // default 'latest'
    return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 flex flex-col font-sans">
      
      {/* 🚀 Header Banner */}
      <section className="bg-indigo-600 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 hero-curved-bottom shadow-lg">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <BookOpen className="w-3.5 h-3.5 text-amber-300" /> Digital Library Catalog
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white">
            Explore Digital Book Store
          </h1>
          <p className="text-indigo-100 text-sm sm:text-base max-w-xl mx-auto">
            Browse through hundreds of free titles across genres and languages. Search, filter, and download instantly.
          </p>
        </div>
      </section>

      {/* 🔍 Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 w-full flex-1 space-y-8 pb-16">
        
        {/* Search & Filter Bar Card */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-slate-100 space-y-4">
          
          <div className="flex flex-col lg:flex-row items-center gap-4">
            
            {/* Search Input */}
            <div className="relative w-full lg:w-1/2">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by book title or author name..."
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-slate-200 hover:bg-slate-300 px-2 py-1 rounded-full text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Dropdowns & Reset */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-1/2 justify-start lg:justify-end">
              
              {/* Language Filter */}
              <div className="relative">
                <select
                  value={languageFilter}
                  onChange={(e) => setLanguageFilter(e.target.value)}
                  className="appearance-none px-4 py-3 pr-9 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  {languageOptions.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              {/* Sort By Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-3 pr-9 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="latest">Sort: Newest First</option>
                  <option value="title">Sort: Title A-Z</option>
                  <option value="year">Sort: Publish Year</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-xl text-xs font-bold transition ${
                    viewMode === "grid" ? "bg-white text-indigo-600 shadow-xs" : "text-slate-500 hover:text-slate-800"
                  }`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-xl text-xs font-bold transition ${
                    viewMode === "list" ? "bg-white text-indigo-600 shadow-xs" : "text-slate-500 hover:text-slate-800"
                  }`}
                  title="Dense List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="px-4 py-3 bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold text-xs sm:text-sm rounded-2xl transition flex items-center gap-1.5"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>

            </div>
          </div>

          {/* Genre Pill Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none border-t border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest shrink-0 mr-1 font-heading">
              Genres:
            </span>
            {genreOptions.map((g) => (
              <button
                key={g}
                onClick={() => setGenreFilter(g)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition shrink-0 border ${
                  genreFilter === g
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-indigo-50 hover:text-indigo-600"
                }`}
              >
                {g}
              </button>
            ))}
          </div>

        </div>

        {/* Results Metadata Header */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 px-2">
          <span>
            Showing <strong className="text-slate-900 font-bold">{sortedBooks.length}</strong> {sortedBooks.length === 1 ? "book" : "books"}
            {genreFilter !== "All Genres" ? ` in ${genreFilter}` : ""}
            {languageFilter !== "All Languages" ? ` (${languageFilter})` : ""}
          </span>
          {search && (
            <span>Filtering for: &ldquo;<strong className="text-indigo-600 font-bold">{search}</strong>&rdquo;</span>
          )}
        </div>

        {/* 📚 Books Grid / List Display */}
        {loading ? (
          <BookGridSkeleton count={8} />
        ) : sortedBooks.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedBooks.map((book, idx) => (
                <BookCard key={book.id} book={book} index={idx} />
              ))}
            </div>
          ) : (
            /* Dense List View */
            <div className="space-y-4">
              {sortedBooks.map((book) => (
                <div
                  key={book.id}
                  onClick={() => navigate(`/book/${book.id}`)}
                  className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                      <img
                        src={book.coverImageLink || "https://via.placeholder.com/150"}
                        alt={book.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/placeholder.jpg";
                        }}
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-heading font-bold text-slate-900 text-base group-hover:text-indigo-600 transition">
                        {book.title}
                      </h3>
                      <p className="text-xs text-slate-600 font-medium">by {book.author}</p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 pt-1">
                        <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md font-bold uppercase">{book.genre}</span>
                        <span>• {book.language}</span>
                        <span>• {book.publishYear}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/book/${book.id}`);
                    }}
                    className="bg-indigo-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition flex items-center gap-1.5 shrink-0 self-end sm:self-center"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-6 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
              <BookX className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-heading text-slate-900">No Books Found</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We couldn't find any books matching your criteria. Try adjusting your search query, or submit a request to add this title!
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={handleReset}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-full transition"
              >
                Clear Search Filters
              </button>
              <Link
                to="/request"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-full transition shadow-sm flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Request Title
              </Link>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default BooksPage;
