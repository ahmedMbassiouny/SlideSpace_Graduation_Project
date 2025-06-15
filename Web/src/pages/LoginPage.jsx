import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { LogIn, Mail, Lock, Chrome } from "lucide-react"; // Using Chrome for Google icon placeholder
import { motion } from "framer-motion";
// import axios from 'axios';
import api from "@/lib/axios";



const LoginPage = ({ user, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        toast({ title: "Reminder", description: "You are logged in!" });
        navigate("/admin", { replace: true });
      } else {
        toast({ title: "Reminder", description: "You are logged in!" });
        navigate("/", { replace: true });
      }
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Fetch CSRF token
      const csrfRes = await api.get("/csrf.php");
      const csrfToken = csrfRes.data.csrf_token;

      const response = await api.post(
        "/auth.php?action=login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        }
      );

      const data = response.data;

      if (data.status === "success") {
        toast({ title: "Login Successful", description: "Welcome back!" });
        setUser(response.data.user);
        localStorage.setItem("isAuthenticated", "true");
        if (data.user.role === "admin") {
          navigate("/admin", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Invalid email or password. Please try again.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-150px)] py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md z-10"
      >
        <Card className="shadow-xl border-border/60 bg-card">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-3xl font-bold text-primary">
              Welcome Back!
            </CardTitle>
            <CardDescription>
              Log in to access your SlideSpace account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="w-4 h-4 mr-2 inline-block relative -top-px" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">
                    <Lock className="w-4 h-4 mr-2 inline-block relative -top-px" />
                    Password
                  </Label>
                  <Link
                    to="/forgot-password" // Placeholder link
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  "Logging in..."
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" /> Log In
                  </>
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-primary hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;
