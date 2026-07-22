import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useState, useEffect } from "react";
import { 
  BookOpen, 
  Home as HomeIcon, 
  Library, 
  Upload, 
  Send, 
  MessageSquare, 
  LogOut, 
  User, 
  Menu, 
  X,
  PlusCircle,
  Sparkles
} from "lucide-react";

function Navbar() {
  const { currentUser, userData } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
    setMenuOpen(false);
  };

  const displayName = userData?.username || currentUser?.email?.split('@')[0] || "Member";

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-indigo-100/50 py-3" 
        : "bg-indigo-600 py-4 text-white"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo - Redex / Bookly Badge */}
        <Link to={currentUser ? "/home" : "/"} className="flex items-center gap-2.5 group">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-inner transition-transform group-hover:scale-105 ${
            scrolled ? "bg-indigo-600 text-white" : "bg-white text-indigo-600"
          }`}>
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className={`text-xl font-black tracking-tight font-heading flex items-center gap-1 ${
              scrolled ? "text-slate-900" : "text-white"
            }`}>
              Bookly <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-amber-400 text-slate-900 font-sans tracking-normal hidden sm:inline-block">Library</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
          <Link 
            to={currentUser ? "/home" : "/"} 
            className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
              isActive("/home") || isActive("/")
                ? scrolled 
                  ? "bg-indigo-50 text-indigo-600 font-semibold" 
                  : "bg-white/20 text-white font-semibold backdrop-blur-sm"
                : scrolled
                  ? "text-slate-600 hover:text-indigo-600 hover:bg-slate-100"
                  : "text-indigo-100 hover:text-white hover:bg-white/10"
            }`}
          >
            <HomeIcon className="w-4 h-4" /> Home
          </Link>

          <Link 
            to="/books" 
            className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
              isActive("/books")
                ? scrolled 
                  ? "bg-indigo-50 text-indigo-600 font-semibold" 
                  : "bg-white/20 text-white font-semibold backdrop-blur-sm"
                : scrolled
                  ? "text-slate-600 hover:text-indigo-600 hover:bg-slate-100"
                  : "text-indigo-100 hover:text-white hover:bg-white/10"
            }`}
          >
            <Library className="w-4 h-4" /> Store
          </Link>

          <Link 
            to="/request" 
            className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
              isActive("/request")
                ? scrolled 
                  ? "bg-indigo-50 text-indigo-600 font-semibold" 
                  : "bg-white/20 text-white font-semibold backdrop-blur-sm"
                : scrolled
                  ? "text-slate-600 hover:text-indigo-600 hover:bg-slate-100"
                  : "text-indigo-100 hover:text-white hover:bg-white/10"
            }`}
          >
            <Send className="w-4 h-4" /> Request Book
          </Link>

          <Link 
            to="/feedback" 
            className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
              isActive("/feedback")
                ? scrolled 
                  ? "bg-indigo-50 text-indigo-600 font-semibold" 
                  : "bg-white/20 text-white font-semibold backdrop-blur-sm"
                : scrolled
                  ? "text-slate-600 hover:text-indigo-600 hover:bg-slate-100"
                  : "text-indigo-100 hover:text-white hover:bg-white/10"
            }`}
          >
            <MessageSquare className="w-4 h-4" /> Feedback
          </Link>

          {currentUser && (
            <Link 
              to="/upload" 
              className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                isActive("/upload")
                  ? scrolled 
                    ? "bg-indigo-50 text-indigo-600 font-semibold" 
                    : "bg-white/20 text-white font-semibold backdrop-blur-sm"
                  : scrolled
                    ? "text-slate-600 hover:text-indigo-600 hover:bg-slate-100"
                    : "text-indigo-100 hover:text-white hover:bg-white/10"
              }`}
            >
              <Upload className="w-4 h-4" /> Admin Upload
            </Link>
          )}
        </div>

        {/* Right CTA / Auth Section */}
        <div className="hidden md:flex items-center space-x-3">
          {!currentUser ? (
            <>
              <Link 
                to="/login" 
                className={`text-sm font-semibold px-4 py-2 transition ${
                  scrolled ? "text-slate-700 hover:text-indigo-600" : "text-white/90 hover:text-white"
                }`}
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className={`px-5 py-2 rounded-full text-sm font-bold transition shadow-sm hover:shadow-md active:scale-95 flex items-center gap-1.5 ${
                  scrolled 
                    ? "bg-indigo-600 text-white hover:bg-indigo-700" 
                    : "bg-white text-indigo-700 hover:bg-amber-300 hover:text-slate-900"
                }`}
              >
                <Sparkles className="w-4 h-4" /> Get Started
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                scrolled ? "bg-slate-100 text-slate-700 border border-slate-200" : "bg-white/15 text-white backdrop-blur-md"
              }`}>
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-indigo-500 text-white flex items-center justify-center font-bold text-xs uppercase">
                  {displayName.charAt(0)}
                </div>
                <span className="max-w-[120px] truncate">{displayName}</span>
              </div>

              <button
                onClick={handleLogout}
                title="Sign Out"
                className={`p-2 rounded-full transition-colors ${
                  scrolled ? "text-slate-500 hover:bg-red-50 hover:text-red-600" : "text-white/80 hover:bg-white/20 hover:text-white"
                }`}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className={`p-2 rounded-lg transition ${
              scrolled ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"
            }`}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 space-y-2 text-slate-800 animate-in slide-in-from-top-2 duration-200">
          <Link 
            to={currentUser ? "/home" : "/"} 
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium" 
            onClick={() => setMenuOpen(false)}
          >
            <HomeIcon className="w-4 h-4 text-indigo-500" /> Home
          </Link>
          <Link 
            to="/books" 
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium" 
            onClick={() => setMenuOpen(false)}
          >
            <Library className="w-4 h-4 text-indigo-500" /> Store / Books
          </Link>
          <Link 
            to="/request" 
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium" 
            onClick={() => setMenuOpen(false)}
          >
            <Send className="w-4 h-4 text-indigo-500" /> Request a Book
          </Link>
          <Link 
            to="/feedback" 
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium" 
            onClick={() => setMenuOpen(false)}
          >
            <MessageSquare className="w-4 h-4 text-indigo-500" /> Community Feedback
          </Link>
          {currentUser && (
            <Link 
              to="/upload" 
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium" 
              onClick={() => setMenuOpen(false)}
            >
              <Upload className="w-4 h-4 text-indigo-500" /> Admin Upload
            </Link>
          )}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {!currentUser ? (
              <>
                <Link 
                  to="/login" 
                  className="w-full text-center py-2.5 rounded-xl text-indigo-600 font-semibold bg-indigo-50 hover:bg-indigo-100 transition" 
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="w-full text-center py-2.5 rounded-xl text-white font-semibold bg-indigo-600 hover:bg-indigo-700 shadow-sm transition" 
                  onClick={() => setMenuOpen(false)}
                >
                  Register Now
                </Link>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 text-sm font-semibold text-slate-700">
                  <User className="w-4 h-4 text-indigo-600" />
                  <span>Logged in as {displayName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition text-sm"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

