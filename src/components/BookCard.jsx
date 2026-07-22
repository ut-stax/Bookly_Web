import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Star, ArrowRight, Download, Bookmark, Sparkles, Languages, Calendar } from "lucide-react";

// Soft pastel color themes inspired by the reference image
const CARD_THEMES = [
  {
    bg: "bg-[#FFF1F2]", // Soft pink
    accent: "text-rose-600",
    badge: "bg-rose-100 text-rose-700",
    btn: "bg-rose-600 hover:bg-rose-700 text-white",
    border: "border-rose-100"
  },
  {
    bg: "bg-[#EEF2FF]", // Soft periwinkle
    accent: "text-indigo-600",
    badge: "bg-indigo-100 text-indigo-700",
    btn: "bg-indigo-600 hover:bg-indigo-700 text-white",
    border: "border-indigo-100"
  },
  {
    bg: "bg-[#FEF3C7]/60", // Soft cream/yellow
    accent: "text-amber-700",
    badge: "bg-amber-100 text-amber-800",
    btn: "bg-amber-600 hover:bg-amber-700 text-white",
    border: "border-amber-200/60"
  },
  {
    bg: "bg-[#ECFDF5]", // Soft mint
    accent: "text-emerald-700",
    badge: "bg-emerald-100 text-emerald-800",
    btn: "bg-emerald-600 hover:bg-emerald-700 text-white",
    border: "border-emerald-100"
  }
];

export default function BookCard({ book, index = 0 }) {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const [isSaved, setIsSaved] = useState(() => {
    try {
      const saved = localStorage.getItem("bookly_saved_" + book.id);
      return saved === "true";
    } catch (e) {
      return false;
    }
  });

  const theme = CARD_THEMES[index % CARD_THEMES.length];

  const toggleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = !isSaved;
    setIsSaved(nextState);
    try {
      localStorage.setItem("bookly_saved_" + book.id, String(nextState));
    } catch (e) {}
  };

  return (
    <div 
      onClick={() => navigate(`/book/${book.id}`)}
      className={`group relative rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer flex flex-col justify-between border ${theme.bg} ${theme.border}`}
    >
      {/* Top Header Row: Genre Badge + Wishlist Bookmark */}
      <div className="flex items-center justify-between mb-4 z-10">
        <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider font-heading shadow-2xs ${theme.badge}`}>
          {book.genre || "General"}
        </span>
        <button
          onClick={toggleSave}
          title={isSaved ? "Saved to Favorites" : "Save Book"}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
            isSaved 
              ? "bg-amber-400 text-slate-900 shadow-sm" 
              : "bg-white/80 hover:bg-white text-slate-400 hover:text-slate-700"
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? "fill-slate-900" : ""}`} />
        </button>
      </div>

      {/* Book Cover Container with 3D Frame Effect */}
      <div className="relative w-full aspect-[3/4] mb-4 rounded-2xl overflow-hidden bg-white shadow-md group-hover:shadow-lg transition flex items-center justify-center">
        {!imgError && book.coverImageLink ? (
          <img
            src={book.coverImageLink}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          /* Sleek Generated Vector Cover Fallback */
          <div className="w-full h-full bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 p-6 flex flex-col justify-between text-white relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex justify-between items-start">
              <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-200">Bookly Digital</span>
              <BookOpen className="w-5 h-5 text-amber-300" />
            </div>
            <div className="space-y-1 my-auto">
              <p className="font-heading font-black text-lg leading-tight line-clamp-3 text-white">
                {book.title}
              </p>
              <p className="text-xs text-indigo-200 font-medium line-clamp-1">
                by {book.author}
              </p>
            </div>
            <div className="text-[10px] text-indigo-300 font-mono flex items-center justify-between border-t border-white/10 pt-2">
              <span>{book.publishYear || "2024"}</span>
              <span>{book.language || "English"}</span>
            </div>
          </div>
        )}

        {/* Quick View Floating Badge on Hover */}
        <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-white text-slate-900 font-bold text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            View Details <ArrowRight className="w-3.5 h-3.5 text-indigo-600" />
          </span>
        </div>
      </div>

      {/* Book Metadata */}
      <div className="flex flex-col grow justify-between space-y-2">
        <div>
          <h3 className="font-heading font-bold text-slate-900 text-lg leading-snug line-clamp-1 group-hover:text-indigo-600 transition">
            {book.title}
          </h3>
          <p className="text-sm font-medium text-slate-600 line-clamp-1">
            {book.author || "Unknown Author"}
          </p>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" /> {book.publishYear || "N/A"}
          </span>
          <span className="flex items-center gap-1 bg-white/60 px-2 py-0.5 rounded-md font-medium text-slate-600">
            <Languages className="w-3 h-3 text-slate-400" /> {book.language || "English"}
          </span>
        </div>

        {/* CTA Button */}
        <div className="pt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/book/${book.id}`);
            }}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs ${theme.btn}`}
          >
            <span>Read / Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
