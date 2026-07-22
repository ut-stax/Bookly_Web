import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, collection, getDocs, limit, query, where } from "firebase/firestore";
import confetti from "canvas-confetti";
import Footer from "../components/Footer";
import BookCard from "../components/BookCard";
import { BookCardSkeleton } from "../components/SkeletonLoader";
import { 
  Download, 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  Check, 
  Calendar, 
  Globe, 
  BookOpen, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  Star
} from "lucide-react";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBook = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "books", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const bookData = docSnap.data();
          setBook(bookData);

          // Check if saved
          try {
            const saved = localStorage.getItem("bookly_saved_" + id);
            setIsSaved(saved === "true");
          } catch (e) {}

          // Fetch related books in same genre or random
          try {
            const booksSnap = await getDocs(query(collection(db, "books"), limit(5)));
            const all = booksSnap.docs
              .map((d) => ({ id: d.id, ...d.data() }))
              .filter((d) => d.id !== id);
            setRelatedBooks(all.slice(0, 4));
          } catch (e) {}
        } else {
          setBook(null);
        }
      } catch (err) {
        console.error("Error fetching book details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleDownload = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {}

    if (book?.bookLink) {
      window.open(book.bookLink, "_blank", "noopener,noreferrer");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const toggleSave = () => {
    const nextState = !isSaved;
    setIsSaved(nextState);
    try {
      localStorage.setItem("bookly_saved_" + id, String(nextState));
    } catch (e) {}
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 animate-pulse">
        <div className="w-24 h-8 bg-slate-200 rounded-full" />
        <div className="bg-white rounded-3xl p-8 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="aspect-[3/4] bg-slate-200 rounded-2xl" />
          <div className="md:col-span-2 space-y-4">
            <div className="w-1/3 h-6 bg-slate-200 rounded" />
            <div className="w-3/4 h-10 bg-slate-200 rounded" />
            <div className="w-1/2 h-5 bg-slate-200 rounded" />
            <div className="w-full h-32 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-6 text-center">
        <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-xl max-w-md space-y-4">
          <BookOpen className="w-16 h-16 text-indigo-600 mx-auto" />
          <h2 className="text-2xl font-bold font-heading text-slate-900">Book Not Found</h2>
          <p className="text-xs text-slate-500">The book you are looking for does not exist or was removed.</p>
          <button
            onClick={() => navigate("/books")}
            className="bg-indigo-600 text-white font-bold text-xs px-6 py-2.5 rounded-full shadow-md hover:bg-indigo-700 transition"
          >
            Back to Book Store
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 flex flex-col font-sans">
      
      {/* Top Breadcrumb Header */}
      <section className="bg-indigo-600 text-white pt-8 pb-16 px-4 sm:px-6 lg:px-8 hero-curved-bottom shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-bold bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full backdrop-blur-md transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleSave}
              className={`p-2 rounded-full transition ${
                isSaved ? "bg-amber-400 text-slate-900" : "bg-white/20 text-white hover:bg-white/30"
              }`}
              title={isSaved ? "Saved to Favorites" : "Save to Favorites"}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? "fill-slate-900" : ""}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition"
              title="Share Book Link"
            >
              {copied ? <Check className="w-4 h-4 text-amber-300" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </section>

      {/* Main Detail Card Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 w-full flex-1 space-y-12 pb-16">
        
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Cover Image Frame */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 shadow-xl border border-slate-200/80 flex items-center justify-center group">
              {!imgError && book.coverImageLink ? (
                <img
                  src={book.coverImageLink}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-900 p-8 flex flex-col justify-between text-white relative">
                  <div className="flex justify-between items-start">
                    <span className="text-xs uppercase font-bold tracking-widest text-indigo-200">Bookly Digital</span>
                    <BookOpen className="w-6 h-6 text-amber-300" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-heading font-black text-2xl leading-tight text-white">{book.title}</p>
                    <p className="text-xs text-indigo-200 font-medium">by {book.author}</p>
                  </div>
                  <div className="text-xs text-indigo-300 font-mono flex items-center justify-between border-t border-white/10 pt-3">
                    <span>{book.publishYear || "2024"}</span>
                    <span>{book.language || "English"}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Badges under Cover */}
            <div className="flex items-center justify-around p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Verified PDF
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" /> Free Access
              </div>
            </div>
          </div>

          {/* Right Column: Book Information */}
          <div className="md:col-span-7 space-y-6 flex flex-col justify-between h-full">
            
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-indigo-100 text-indigo-700 font-bold text-xs px-3 py-1 rounded-full uppercase font-heading">
                  {book.genre || "General"}
                </span>
                <span className="bg-amber-100 text-amber-800 font-bold text-xs px-3 py-1 rounded-full font-heading flex items-center gap-1">
                  <Globe className="w-3 h-3" /> {book.language || "English"}
                </span>
                {book.publishYear && (
                  <span className="bg-slate-100 text-slate-600 font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {book.publishYear}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-black font-heading text-slate-900 leading-tight">
                {book.title}
              </h1>

              <p className="text-base font-semibold text-indigo-600">
                Author: <span className="text-slate-800 font-bold">{book.author || "Unknown"}</span>
              </p>

              {book.description ? (
                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading mb-1">
                    About This Book
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                    {book.description}
                  </p>
                </div>
              ) : (
                <p className="text-xs italic text-slate-400">No extended description available for this title.</p>
              )}
            </div>

            {/* CTA Download Button */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <button
                onClick={handleDownload}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transition flex items-center justify-center gap-2 text-base group active:scale-98"
              >
                <Download className="w-5 h-5 group-hover:translate-y-0.5 transition" />
                <span>Download / Read Digital PDF</span>
                <ExternalLink className="w-4 h-4 ml-auto opacity-70" />
              </button>

              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span>Hosted via Google Drive / Cloud Link</span>
                <span>100% Free Public Library</span>
              </div>
            </div>

          </div>

        </div>

        {/* 📚 Related Recommendations Section */}
        {relatedBooks.length > 0 && (
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black font-heading text-slate-900">
                You Might Also Like
              </h2>
              <Link to="/books" className="text-xs font-bold text-indigo-600 hover:underline">
                Explore Store
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedBooks.map((rel, idx) => (
                <BookCard key={rel.id} book={rel} index={idx + 1} />
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default BookDetail;
