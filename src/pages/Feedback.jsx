import React, { useState, useEffect } from "react";
import { collection, addDoc, Timestamp, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import confetti from "canvas-confetti";
import Footer from "../components/Footer";
import { 
  MessageSquare, 
  Star, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  HeartHandshake, 
  User, 
  Quote, 
  Sparkles 
} from "lucide-react";

function Feedback() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [recentFeedbacks, setRecentFeedbacks] = useState([]);

  useEffect(() => {
    fetchRecentFeedbacks();
  }, []);

  const fetchRecentFeedbacks = async () => {
    try {
      const q = query(collection(db, "feedbacks"), orderBy("submittedAt", "desc"), limit(4));
      const snap = await getDocs(q);
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setRecentFeedbacks(list);
    } catch (e) {
      console.error("Error fetching feedbacks:", e);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      await addDoc(collection(db, "feedbacks"), {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        rating,
        submittedAt: Timestamp.now(),
      });

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      setSuccessMsg("Thank you! Your feedback has been submitted successfully.");
      setFormData({ name: "", email: "", message: "" });
      setRating(5);
      fetchRecentFeedbacks();
    } catch (error) {
      console.error("Error submitting feedback: ", error);
      setErrorMsg("Something went wrong. Please try again.");
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
            <MessageSquare className="w-3.5 h-3.5 text-amber-300" /> Reader Experience
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white">
            We Value Your Thoughts
          </h1>
          <p className="text-indigo-100 text-sm sm:text-base max-w-xl mx-auto">
            Help us improve Bookly Library. Share your experience, suggestions, or ideas to make reading even better.
          </p>
        </div>
      </section>

      {/* Main Feedback Form Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 w-full flex-1 space-y-12 pb-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Feedback Form */}
          <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 space-y-6">
            
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-heading text-slate-900">
                  Share Your Feedback
                </h2>
                <p className="text-xs text-slate-500">Your feedback drives continuous platform updates</p>
              </div>
            </div>

            {successMsg && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Star Rating selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 font-heading">
                  How would you rate your experience?
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1.5 transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-200 fill-slate-100"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-500 ml-2 font-heading">
                    {rating} / 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 font-heading">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 font-heading">
                  Your Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john@example.com"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1 font-heading">
                  Your Message / Feedback <span className="text-rose-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share your experience, feature ideas, or suggestions..."
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
                  <span>Sending Feedback...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Feedback</span>
                  </>
                )}
              </button>
            </form>

          </div>

          {/* Right Column: Community Feedback Feed */}
          <div className="md:col-span-5 space-y-6">
            
            <div className="bg-[#EEF2FF] rounded-3xl p-6 border border-indigo-100 space-y-3">
              <div className="flex items-center gap-2 text-indigo-900 font-bold font-heading text-sm">
                <Sparkles className="w-4 h-4 text-indigo-600" /> Continuous Innovation
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Your feedback directly impacts features, genre categories, and book additions on Bookly Library!
              </p>
            </div>

            {/* Community Reviews Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center gap-2 font-heading font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">
                <Quote className="w-4 h-4 text-indigo-600" /> Recent Community Feedback
              </div>

              {recentFeedbacks.length > 0 ? (
                <div className="space-y-3">
                  {recentFeedbacks.map((fb) => (
                    <div key={fb.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{fb.name}</span>
                        <div className="flex text-amber-400">
                          {[...Array(fb.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-600 italic leading-relaxed text-[11px]">
                        "{fb.message}"
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No feedback submitted yet. Be the first to share!</p>
              )}
            </div>

          </div>

        </div>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default Feedback;
