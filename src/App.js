import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Books from "./pages/BooksPage";
import ProtectedUpload from "./pages/ProtectedUpload";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookDetail from "./pages/BookDetail";
import Navbar from "./components/Navbar";
import RequestBook from "./pages/RequestBook";
import Feedback from "./pages/Feedback";

function AppWrapper() {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-bold text-slate-600 font-heading">Loading Bookly Library...</p>
        </div>
      </div>
    );
  }

  // Hide global navbar on Landing page since Landing has its own header banner
  const isLanding = location.pathname === "/";

  return (
    <>
      {!isLanding && <Navbar />}

      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Public Library Pages (Accessible to both guests and logged in users) */}
        <Route path="/home" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/request" element={<RequestBook />} />
        <Route path="/feedback" element={<Feedback />} />

        {/* Auth Pages */}
        <Route
          path="/login"
          element={!currentUser ? <Login /> : <Navigate to="/home" />}
        />
        <Route
          path="/register"
          element={!currentUser ? <Register /> : <Navigate to="/home" />}
        />

        {/* Protected Upload Portal */}
        <Route path="/upload" element={<ProtectedUpload />} />
        <Route path="/secret-upload" element={<ProtectedUpload />} />

        {/* Catch-All */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
