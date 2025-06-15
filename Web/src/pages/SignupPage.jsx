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
import { UserPlus, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import api from "@/lib/axios";

const RegisterPage = ({ user }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
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

  const handleRegister = async (e) => {
    e.preventDefault();

    // 🔒 Client-side validation
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Password Mismatch",
        description: "Passwords do not match.",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        variant: "destructive",
        title: "Password Too Short",
        description: "Password must be at least 6 characters.",
      });
      return;
    }

    if (!agreedToTerms) {
      toast({
        variant: "destructive",
        title: "Terms Not Accepted",
        description: "You must agree to the Terms of Service.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const csrfRes = await api.get("/csrf.php");
      const csrfToken = csrfRes.data.csrf_token;

      const response = await api.post(
        "/auth.php?action=register",
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        }
      );

      const data = response.data;

      if (data.status === "success") {
        toast({
          title: "Registration Successful",
          description: "You can now log in to your account.",
        });
        navigate("/login", { replace: true });
      } else {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: data.message || "Please try again.",
        });
      }
    } catch (error) {
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
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-border/60 bg-card">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-3xl font-bold text-primary">
              Create an Account
            </CardTitle>
            <CardDescription>
              Register to get started with SlideSpace.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
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
                <Label htmlFor="password">
                  <Lock className="w-4 h-4 mr-2 inline-block relative -top-px" />
                  Password
                </Label>
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
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  disabled={isLoading}
                  className="w-4 h-4"
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary underline">
                    Terms of Service
                  </Link>
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  "Creating account..."
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" /> Register
                  </>
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-primary hover:underline"
              >
                Log In
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
