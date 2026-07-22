import React from "react";
import { Sparkles, Lightbulb, BookOpen, Bookmark, Star, Download, Flame, CheckCircle2 } from "lucide-react";

export default function HeroBookGraphic({ onExplore, onRequest }) {
  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center pt-6 pb-2 select-none">
      
      {/* Central Floating Lightbulb Idea Badge */}
      <div className="absolute -top-4 z-20 animate-float">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 p-0.5 shadow-xl shadow-amber-500/30 flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-amber-400 flex items-center justify-center border-2 border-white/60">
            <Lightbulb className="w-8 h-8 sm:w-10 sm:h-10 text-slate-900 fill-yellow-200 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Floating Left Book Tag */}
      <div className="hidden sm:flex absolute left-2 md:left-8 top-16 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-slate-100 items-center gap-3 animate-float-slow">
        <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
          <Flame className="w-5 h-5 text-amber-600 fill-amber-500" />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-900">Trending Reads</p>
          <p className="text-[10px] text-slate-500">100% Free Downloads</p>
        </div>
      </div>

      {/* Floating Right Book Tag */}
      <div className="hidden sm:flex absolute right-2 md:right-8 top-20 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-slate-100 items-center gap-3 animate-float">
        <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
          <CheckCircle2 className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-900">368+ Titles</p>
          <p className="text-[10px] text-slate-500">Curated & Verified</p>
        </div>
      </div>

      {/* Main 3D Illustration Scene Container */}
      <div className="relative w-full max-w-2xl aspect-[16/9] sm:aspect-[2/1] flex items-center justify-center">
        
        {/* Soft Background Radial Light */}
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 via-indigo-300/10 to-transparent rounded-full blur-2xl pointer-events-none" />

        {/* 3D Stacked Books & Open Book Canvas/SVG Composition */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          
          {/* SVG 3D Book Graphic */}
          <svg
            viewBox="0 0 800 450"
            className="w-full h-full drop-shadow-2xl overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Ambient Shadow under open book */}
            <ellipse cx="400" cy="380" rx="320" ry="35" fill="#000000" fillOpacity="0.25" filter="blur(15px)" />

            {/* Left Stacked Books Underneath */}
            <g transform="translate(110, 220)">
              {/* Stack Book 1 (Coral/Red) */}
              <rect x="0" y="80" width="180" height="35" rx="6" fill="#F87171" />
              <rect x="10" y="80" width="160" height="6" fill="#EF4444" />
              <path d="M 180 80 L 195 90 L 195 115 L 180 115 Z" fill="#DC2626" />

              {/* Stack Book 2 (Gold/Yellow) */}
              <rect x="15" y="45" width="170" height="32" rx="6" fill="#FBBF24" />
              <rect x="25" y="45" width="150" height="5" fill="#F59E0B" />
              <path d="M 185 45 L 200 55 L 200 77 L 185 77 Z" fill="#D97706" />

              {/* Stack Book 3 (Cyan/Teal) */}
              <rect x="30" y="10" width="160" height="32" rx="6" fill="#38BDF8" />
              <rect x="40" y="10" width="140" height="5" fill="#0284C7" />
              <path d="M 190 10 L 205 20 L 205 42 L 190 42 Z" fill="#0369A1" />
            </g>

            {/* Right Stacked Books Underneath */}
            <g transform="translate(510, 220)">
              {/* Stack Book 1 (Rose Pink) */}
              <rect x="0" y="80" width="180" height="35" rx="6" fill="#FB7185" />
              <path d="M -15 90 L 0 80 L 0 115 L -15 115 Z" fill="#E11D48" />

              {/* Stack Book 2 (Indigo Blue) */}
              <rect x="-10" y="45" width="175" height="32" rx="6" fill="#818CF8" />
              <path d="M -25 55 L -10 45 L -10 77 L -25 77 Z" fill="#4F46E5" />

              {/* Stack Book 3 (Emerald Green) */}
              <rect x="-20" y="10" width="170" height="32" rx="6" fill="#34D399" />
              <path d="M -35 20 L -20 10 L -20 42 L -35 42 Z" fill="#059669" />
            </g>

            {/* MAIN CENTER OPEN BOOK */}
            <g transform="translate(400, 270)">
              {/* Book Spine Shadow */}
              <path d="M -220 50 C -110 30, -30 70, 0 75 C 30 70, 110 30, 220 50 L 230 65 L 0 95 L -230 65 Z" fill="#1E1B4B" opacity="0.4" />

              {/* Book Cover Base (Indigo / Blue back cover) */}
              <path d="M -225 -25 C -110 -55, -20 -15, 0 0 C 20 -15, 110 -55, 225 -25 L 235 55 C 120 25, 20 65, 0 80 C -20 65, -120 25, -235 55 Z" fill="#3730A3" />

              {/* Book Pages Stack Thickness (Gold Edge) */}
              <path d="M -225 -20 C -110 -50, -20 -10, 0 5 C 20 -10, 110 -50, 225 -20 L 225 -10 C 110 -40, 20 0, 0 15 C -20 0, -110 -40, -225 -10 Z" fill="#FDE68A" />

              {/* Main Left Page (White) */}
              <path d="M -220 -30 C -110 -60, -15 -20, -2 0 L -2 70 C -15 50, -110 10, -220 40 Z" fill="#FFFFFF" />
              <path d="M -218 -28 C -110 -57, -15 -18, -2 0 L -2 70 C -15 50, -110 10, -218 40 Z" fill="#F8FAFC" />

              {/* Main Right Page (White) */}
              <path d="M 220 -30 C 110 -60, 15 -20, 2 0 L 2 70 C 15 50, 110 10, 220 40 Z" fill="#FFFFFF" />
              <path d="M 218 -28 C 110 -57, 15 -18, 2 0 L 2 70 C 15 50, 110 10, 218 40 Z" fill="#F1F5F9" />

              {/* Book Center Fold Contour */}
              <path d="M -5 -20 Q 0 -15 5 -20 L 5 70 Q 0 75 -5 70 Z" fill="#CBD5E1" opacity="0.5" />

              {/* Yellow/Gold Bookmark Ribbon Hanging Down */}
              <path d="M -2 -15 Q 10 30 -5 95 L 12 115 L 25 90 Q 5 25 2 -15 Z" fill="#F59E0B" />

              {/* Simulated Page Text Lines on Left Page */}
              <g opacity="0.15" stroke="#1E293B" strokeWidth="3" strokeLinecap="round">
                <line x1="-190" y1="-10" x2="-30" y2="-25" />
                <line x1="-190" y1="5" x2="-50" y2="-10" />
                <line x1="-190" y1="20" x2="-30" y2="5" />
                <line x1="-190" y1="35" x2="-70" y2="20" />
              </g>

              {/* Simulated Page Text Lines on Right Page */}
              <g opacity="0.15" stroke="#1E293B" strokeWidth="3" strokeLinecap="round">
                <line x1="30" y1="-25" x2="190" y2="-10" />
                <line x1="30" y1="-10" x2="170" y2="5" />
                <line x1="30" y1="5" x2="190" y2="20" />
                <line x1="30" y1="20" x2="150" y2="35" />
              </g>
            </g>

            {/* Floating Pencil Graphic (Right) */}
            <g transform="translate(680, 130) rotate(-25)" className="animate-float">
              <rect x="0" y="0" width="16" height="70" rx="3" fill="#3B82F6" />
              <polygon points="0,70 16,70 8,90" fill="#FDE047" />
              <polygon points="8,90 4,80 12,80" fill="#1E293B" />
              <rect x="0" y="-12" width="16" height="12" rx="2" fill="#F43F5E" />
            </g>

            {/* Floating Yellow Sparkle Elements */}
            <g className="animate-pulse">
              <polygon points="180,90 185,105 200,110 185,115 180,130 175,115 160,110 175,105" fill="#FBBF24" />
              <polygon points="620,80 623,90 633,93 623,96 620,106 617,96 607,93 617,90" fill="#FBBF24" />
              <circle cx="140" cy="180" r="6" fill="#818CF8" />
              <circle cx="680" cy="260" r="8" fill="#F472B6" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
