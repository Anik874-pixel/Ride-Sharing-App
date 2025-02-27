"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast , Toaster } from "sonner";
import { useRouter } from "next/navigation";


const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.name,
          email: formData.email,
          password: formData.password
        })
      });
      const data = await response.json();
      
      if (data.id) {
        toast.success("Registration successful! Redirecting to login...");
        setTimeout(() => {
          router.push('/login');
        }, 1500);
      } else {
        toast.error("Registration failed");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-white dark:bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden">
      <div className="w-full max-w-sm mx-auto space-y-6 animate-fade-in">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent">
            Create Account
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter your details to create your account
          </p>
          <Toaster position="top-center" richColors closeButton />
        </div>
        <div className="space-y-6 glass-effect p-6 rounded-xl border border-white/10 shadow-xl backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your full name"
                type="text"
                required
                disabled={isLoading}
                value={formData.name}
                onChange={handleChange}
                className="bg-white/5 border-gray-700 focus:border-sky-400/50 focus:ring-sky-400/50 transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="Enter your email"
                type="email"
                required
                disabled={isLoading}
                value={formData.email}
                onChange={handleChange}
                className="bg-white/5 border-gray-700 focus:border-sky-400/50 focus:ring-sky-400/50 transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={isLoading}
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-white/5 border-gray-700 focus:border-sky-400/50 focus:ring-sky-400/50 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  disabled={isLoading}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="bg-white/5 border-gray-700 focus:border-sky-400/50 focus:ring-sky-400/50 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-medium shadow-lg shadow-sky-400/20 transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-sky-400 hover:text-sky-300 transition-colors">
              Login Here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterForm;