// app.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Home from "@Pages/Home";
import UploadPage from "@Pages/UploadPage";
import SlideGenerationPage from "@Pages/SlideGenerationPage";
import PreviewExportPage from "@Pages/PreviewExportPage";
import UserProfilePage from "@Pages/UserProfilePage";
import AdminProfilePage from "@Pages/AdminProfilePage";
import AdminDashboardPage from "@Pages/AdminDashboardPage";
import HelpFAQPage from "@Pages/HelpFAQPage";
import AboutPage from "@Pages/AboutPage";
import LoginPage from "@Pages/LoginPage";
import SignupPage from "@Pages/SignupPage";
import FeaturesPage from "@Pages/FeaturesPage";
import PrivacyPolicyPage from "@Pages/PrivacyPolicyPage";
import TermsOfServicePage from "@Pages/TermsOfServicePage";
import { Toaster } from "@Components/toaster";
import Loader from "@Components/loader";
import api from "@/lib/axios"; 

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch user session on load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth.php?action=user");
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  

  const handleLogout = async () => {
    await api.post("/auth.php?action=logout");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    setUser(null);
  };

  // Protected route wrapper
  const ProtectedRoute = ({ element }) => {
    if (loading) return <Loader /> ; // Or a spinner
    return user?.role === "user" ? element : <Navigate to="/login" replace />;
  };

  const AdminRoute = ({ element }) => {
    if (loading) return <Loader />;
    return user?.role === "admin" ? element : <Navigate to="/login" replace />;
  };
  
  if (loading) return <Loader />;

  return (
    <Router>
      <Routes>
        {/* layout done */}
        <Route path="/" element={<MainLayout user={user} onLogout={handleLogout} />}>
          {/* done */}
          <Route index element={<Home user={user}/>} />
          {/* done */}
          <Route path="features" element={<FeaturesPage />} />
          {/* done */}
          <Route path="about" element={<AboutPage />} />
          {/* done */}
          <Route path="help" element={<HelpFAQPage />} />
          {/* done */}
          <Route path="upload" element={<ProtectedRoute element={<UploadPage />} />} />
          {/* no */}
          <Route path="generate" element={<ProtectedRoute element={<SlideGenerationPage />} />} />
          {/* no */}
          <Route path="preview" element={<ProtectedRoute element={<PreviewExportPage />} />} />
          {/* no */}
          <Route path="profile" element={<ProtectedRoute element={<UserProfilePage />} />} />
          {/* no */}
          <Route path="admin-profile" element={<AdminRoute element={<AdminProfilePage />} />} />
          {/* no */}
          <Route path="admin" element={<AdminRoute element={<AdminDashboardPage />} />} />
          {/* done */}
          <Route path="login" element={<LoginPage setUser={setUser} user={user} />} />
          {/* done */}
          <Route path="signup" element={<SignupPage user={user} />} />
          {/* done */}
          <Route path="privacy" element={<PrivacyPolicyPage />} />
          {/* done */}
          <Route path="terms" element={<TermsOfServicePage />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
