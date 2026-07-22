import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs } from "firebase/firestore";
import confetti from "canvas-confetti";
import Footer from "../components/Footer";
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  BookPlus, 
  User, 
  Sparkles, 
  Clock, 
  HelpCircle,
  BookOpen
} from "lucide-react";

const RequestBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    why: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [recentRequests, setRecentRequests] = useState([]);

  useEffect(() => {
    fetchRecentRequests();
  }, []);

  const fetchRecentRequests = async () => {
    try {
      const q = query(collection(db, "bookRequests"), orderBy("createdAt", "desc"), limit(4));
      const snap = await getDocs(q);
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setRecentRequests(list);
    } catch (e) {
      console.error("Error fetching requests:", e);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, author, why } = formData;

    if (!title.trim() || !author.trim() || !why.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await addDoc(collection(db, "bookRequests"), {
        title: title.trim(),
        author: author.trim(),
        why: why.trim(),
        createdAt: serverTimestamp(),
      });

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      setSubmitted(true);
      setFormData({ title: "", author: "", why: "" });
      fetchRecentRequests();
    } catch (err) {
      console.error("Error submitting book request:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 flex flex-col font-sans">
      
      {/* Hero Header */}
      <section className="bg-indigo-600 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 hero-curved-bottom shadow-lg">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Send className="w-3.5 h-3.5 text-amber-300" /> Community Library
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white">
            Request a Book
          </h1>
          <p className="text-indigo-100 text-sm sm:text-base max-w-xl mx-auto">
            Can't find a book in our store? Tell us what title you need, and our library team will source and upload it for you!
          </p>
        </div>
      </section>

      {/* Main Request Form Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 w-full flex-1 space-y-12 pb-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Request Form */}
          <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 space-y-6">
            
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                <BookPlus className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-heading text-slate-900">
                  Book Request Details
                </h2>
                <p className="text-xs text-slate-500">Fill in the book information below</p>
              </div>
            </div>

            {submitted && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Thank you! Your request has been recorded.</p>
                  <p className="text-emerald-700 text-xs mt-0.5">Our admins check requests daily and update the library catalog.</p>
                </div>
              </div>
            )}

            {error && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 font-heading">
                  Book Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. To Kill a Mockingbird or Atomic Habits"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 font-heading">
                  Author Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="e.g. Harper Lee or James Clear"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 font-heading">
                  Why do you want this book? <span className="text-rose-500">*</span>
                </label>
                <textarea
                  name="why"
                  value={formData.why}
                  onChange={handleChange}
                  placeholder="Tell us why you are interested in this book (course study, personal interest, research...)"
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-md transition flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                {submitting ? (
                  <span>Submitting Request...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Book Request</span>
                  </>
                )}
              </button>
            </form>

          </div>

          {/* Right Column: Info & Recent Community Requests */}
          <div className="md:col-span-5 space-y-6">
            
            {/* Soft Pastel Pink Info Box */}
            <div className="bg-[#FFE8EC] rounded-3xl p-6 border border-rose-100 space-y-3">
              <div className="flex items-center gap-2 text-rose-800 font-bold font-heading text-sm">
                <Sparkles className="w-4 h-4 text-rose-600" /> Fast Response Guaranteed
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Bookly community members and admins monitor requests daily. Over 85% of valid book requests get fulfilled with high-quality PDF links!
              </p>
            </div>

            {/* Recent Requests Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center gap-2 font-heading font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">
                <Clock className="w-4 h-4 text-indigo-600" /> Recent Community Requests
              </div>

              {recentRequests.length > 0 ? (
                <div className="space-y-3">
                  {recentRequests.map((req) => (
                    <div key={req.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                      <p className="font-bold text-slate-900 line-clamp-1">{req.title}</p>
                      <p className="text-slate-500 text-[11px]">by {req.author}</p>
                      {req.why && (
                        <p className="text-slate-600 italic line-clamp-2 text-[11px] pt-1">
                          "{req.why}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No recent requests yet. Be the first to submit!</p>
              )}
            </div>

          </div>

        </div>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default RequestBook;
