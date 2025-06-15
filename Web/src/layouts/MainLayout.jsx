import React, { useState, useEffect } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  FileText,
  LayoutGrid,
  Info,
  HelpCircle,
  LogIn,
  UserPlus,
  Upload,
  Menu,
  X,
  ArrowUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MainLayout = ({ user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    cn(
      "transition-colors hover:text-foreground/80 block",
      isActive ? "text-foreground font-medium " : "text-foreground/60"
    );

  const ScrollToTopButton = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
      setVisible(window.scrollY > 200);
    };

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    useEffect(() => {
      window.addEventListener("scroll", toggleVisibility);
      return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-white shadow-md hover:bg-primary/80 transition-all duration-500 transform
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
        `}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    );
    
  };

  // Check if user is authenticated
  const isAuthenticated = !!user;

  return (
    <div className="flex flex-col bg-gradient-to-br from-blue-50 via-white to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/50 shadow-xl shadow-blue-300/30">
        <div className="container flex items-center justify-between h-16 max-w-screen-2xl px-5">
          {/* Logo */}

          {user?.role == "admin" ? (
            <>
              <Link to="/admin" className="flex items-center space-x-2">
                <FileText className="w-6 h-6 text-primary" />
                <span className="font-bold sm:inline-block">
                  SlideSpace.Admin
                </span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="flex items-center space-x-2">
                <FileText className="w-6 h-6 text-primary" />
                <span className="font-bold sm:inline-block">SlideSpace</span>
              </Link>
            </>
          )}

          {/* Desktop Nav */}
          {user?.role == "admin" ? (
            ""
          ) : (
            <>
              <nav className="hidden md:flex items-center gap-6 text-sm">
                <NavLink to="/" className={navLinkClass}>
                  Home
                </NavLink>
                <NavLink to="/features" className={navLinkClass}>
                  Features
                </NavLink>
                <NavLink to="/upload" className={navLinkClass}>
                  <Upload className="w-4 h-4 mr-1 inline-block relative -top-px" />{" "}
                  Upload
                </NavLink>
                <NavLink to="/about" className={navLinkClass}>
                  About
                </NavLink>
                <NavLink to="/help" className={navLinkClass}>
                  Help
                </NavLink>
              </nav>
            </>
          )}
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <NavLink
                  to={`${
                    user.role === "admin" ? "/admin-profile" : "/profile"
                  }`}
                  className={navLinkClass}
                >
                  Profile
                </NavLink>
                <Button
                  className="bg-red-500 text-white"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onLogout();
                    window.location.href = "/login"; // Force redirect
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">
                    <LogIn className="w-4 h-4 mr-2" /> Login
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/signup">
                    <UserPlus className="w-4 h-4 mr-2" /> Sign Up
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Menu */}
      {isMobileMenuOpen && (
        <div
          className="
      fixed md:hidden top-14 left-0 w-full z-50
      bg-gradient-to-br from-white via-blue-50 to-blue-100
      dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-950
      border-b border-border/40 
      px-6 py-6 space-y-4 text-sm 
      shadow-2xl rounded-b-xl
      transition-all duration-400 ease-in-out 
      animate-slide-down
    "
        >
          {user?.role == "admin" ? (
            ""
          ) : (
            <>
              <NavLink
                to="/"
                className={navLinkClass}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/features"
                className={navLinkClass}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </NavLink>
              <NavLink
                to="/upload"
                className={navLinkClass}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Upload
              </NavLink>
              <NavLink
                to="/about"
                className={navLinkClass}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </NavLink>
              <NavLink
                to="/help"
                className={navLinkClass}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Help
              </NavLink>
            </>
          )}

          {isAuthenticated ? (
            <>
              <NavLink
                to={`${user.role === "admin" ? "/admin-profile" : "/profile"}`}
                className={navLinkClass}
              >
                Profile
              </NavLink>
              <Button
                className="bg-red-500 text-white"
                variant="outline"
                size="sm"
                onClick={() => {
                  onLogout();
                  window.location.href = "/login"; // Force redirect
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full">
                  <LogIn className="w-4 h-4 mr-2" /> Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                <Button size="sm" className="w-full">
                  <UserPlus className="w-4 h-4 mr-2" /> Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      )}

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      <ScrollToTopButton />

      {/* Footer */}
      <footer className="py-6  md:py-8 bg-secondary/50">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm leading-loose text-center text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} SlideSpace. All rights reserved.
              Developed By <a href="https://github.com/ahmedMbassiouny" target="_blank" className="text-primary font-bold">Ahmed Bassiouny</a>.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/privacy"
              className=" text-primary text-sm hover:text-primary/80  transition-all"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className=" text-primary text-sm hover:text-primary/80  transition-all"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
