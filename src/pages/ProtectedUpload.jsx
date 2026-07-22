import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import confetti from "canvas-confetti";
import Footer from "../components/Footer";
import { 
  Lock, 
  UserCheck, 
  Upload, 
  BookPlus, 
  CheckCircle2, 
  AlertCircle, 
  Link as LinkIcon, 
  Image as ImageIcon,
  KeyRound,
  ShieldAlert,
  Sparkles,
  LogOut
} from "lucide-react";

const genres = ["Fiction", "Non-Fiction", "Poetry", "Biographies", "Comics"];
const languages = ["Hindi", "English", "Sanskrit", "Regional"];

// 🔐 Hardcoded credentials preserved strictly for compatibility
const VALID_USERNAME = "utk_rsh1011";
const VALID_PASSWORD = "#9039458385";

const ProtectedUpload = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Book details
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [driveLink, setDriveLink] = useState("");
  const [coverURL, setCoverURL] = useState("");
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Invalid admin username or password.");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    setSuccessMsg("");

    try {
      await addDoc(collection(db, "books"), {
        title: title.trim(),
        author: author.trim(),
        publishYear: publishYear ? parseInt(publishYear, 10) : "",
        genre,
        language,
        description: description.trim(),
        bookLink: driveLink.trim(),
        coverImageLink: coverURL.trim(),
        createdAt: Timestamp.now(),
      });

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      setTitle("");
      setAuthor("");
      setPublishYear("");
      setGenre("");
      setLanguage("");
      setDescription("");
      setDriveLink("");
      setCoverURL("");
      setSuccessMsg("Book uploaded successfully to Bookly Library!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please check network connection and try again.");
    } finally {
      setUploading(false);
    }
  };

  // 🔒 Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] text-slate-800 flex flex-col justify-between font-sans">
        
        {/* Header Hero */}
        <section className="bg-indigo-600 text-white pt-10 pb-16 px-4 hero-curved-bottom text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5 text-amber-300" /> Admin Authentication
          </div>
          <h1 className="text-3xl font-black font-heading mt-2">Protected Admin Portal</h1>
        </section>

        <main className="max-w-md mx-auto px-4 -mt-10 relative z-20 w-full">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 space-y-6">
            
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto font-bold shadow-sm">
                <KeyRound className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold font-heading text-slate-900">Admin Sign In</h2>
              <p className="text-xs text-slate-500">Sign in with administrator credentials to manage library catalog</p>
            </div>

            {loginError && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 font-heading">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter admin username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 font-heading">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-md transition text-sm flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4 h-4" /> Sign In to Upload
              </button>
            </form>

          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // 📤 Upload Form (Authenticated)
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 flex flex-col font-sans">
      
      {/* Header Banner */}
      <section className="bg-indigo-600 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 hero-curved-bottom shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-200 font-heading">
              Admin Workspace
            </span>
            <h1 className="text-3xl font-black font-heading text-white mt-1">
              Upload New Book Title
            </h1>
          </div>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-4 py-2 rounded-full backdrop-blur-md transition flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </section>

      {/* Upload Main Container */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 w-full flex-1 space-y-8 pb-16">
        
        <form
          onSubmit={handleUpload}
          className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5"
        >
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
              <BookPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-heading text-slate-900">
                Book Metadata & Files
              </h2>
              <p className="text-xs text-slate-500">Provide complete details to publish to Bookly Library</p>
            </div>
          </div>

          {successMsg && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="font-bold">{successMsg}</span>
            </div>
          )}

          <div className="space-y-4">
            
            {/* Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 font-heading">
                Book Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Clean Code or Wings of Fire"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
              />
            </div>

            {/* Author & Publish Year */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 font-heading">
                  Author <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Robert C. Martin"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 font-heading">
                  Publish Year <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  value={publishYear}
                  onChange={(e) => setPublishYear(e.target.value)}
                  placeholder="e.g. 2021"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Genre & Language */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 font-heading">
                  Genre <span className="text-rose-500">*</span>
                </label>
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="">-- Select Genre --</option>
                  {genres.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 font-heading">
                  Language <span className="text-rose-500">*</span>
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="">-- Select Language --</option>
                  {languages.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 font-heading">
                Book Summary / Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short summary of the book content, topics covered..."
                rows={3}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
              />
            </div>

            {/* Google Drive Link */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 font-heading flex items-center gap-1">
                <LinkIcon className="w-3.5 h-3.5 text-indigo-600" /> Google Drive Link <span className="text-rose-500">*</span>
              </label>
              <input
                type="url"
                value={driveLink}
                onChange={(e) => setDriveLink(e.target.value)}
                placeholder="https://drive.google.com/file/d/..."
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
              />
            </div>

            {/* Cover Image URL */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 font-heading flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-rose-500" /> Cover Image URL <span className="text-rose-500">*</span>
              </label>
              <input
                type="url"
                value={coverURL}
                onChange={(e) => setCoverURL(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
              />
            </div>

          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transition flex items-center justify-center gap-2 text-sm disabled:opacity-50 mt-4"
          >
            {uploading ? (
              <span>Uploading to Firestore...</span>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>Publish Book to Library</span>
              </>
            )}
          </button>
        </form>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default ProtectedUpload;
