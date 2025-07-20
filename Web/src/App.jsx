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
import api, { apiRequest } from "@/lib/axios";
import { FrontDemoMode } from "./config";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch user session on load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        let userData;
        if (FrontDemoMode) {
          // In demo mode, do not auto-login user
          userData = null;
        } else {
          const res = await apiRequest({ url: "/auth.php?action=user", method: "get" });
          userData = res.data;
        }
        setUser(userData ? userData.user : null);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  

  const handleLogout = async () => {
    if (FrontDemoMode) {
      setUser(null);
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
      return;
    }
    await apiRequest({ url: "/auth.php?action=logout", method: "post" });
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

  // Demo mode banner
  const DemoBanner = () => (
    <div style={{
      position: 'fixed',
      top: 75,
      left: 0,
      zIndex: 9999,
      background: 'rgba(7, 143, 255, 0.46)', // 80% transparent gold/yellow
      color: '#222',
      padding: '16px 32px',
      borderRadius: '16px',
      fontWeight: 600,
      fontFamily: 'Segoe UI, Arial, sans-serif',
      fontSize: '1.15rem',
      border: '1.5px solid rgba(255, 152, 0, 0.5)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      letterSpacing: '1px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      scale: '0.8',
      pointerEvents: 'none',
      transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
    }}>
      <span style={{fontSize: '1.5em', lineHeight: 1}}>🛡️</span>
      <span>You are in <span style={{color:'#b26a00', fontWeight:700}}>DEMO MODE</span></span>
    </div>
  );

  return (
    <>
      {FrontDemoMode && <DemoBanner />}
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
    </>
  );
}

export default App;
