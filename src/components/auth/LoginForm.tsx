"use client"
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast , Toaster } from "sonner";


const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
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

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (response.status === 200) {
        // Store the data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        
        toast.success("Login successful! Redirecting to dashboard...");
        
        // Delay redirect for 1.5 seconds
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        toast.error("Invalid username or password");
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-white  dark:bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden">
      <div className="w-full max-w-sm mx-auto space-y-6 animate-fade-in">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent">
            Welcome back
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter your credentials to continue
            </p>
            <Toaster position="top-center" richColors closeButton />
            </div>
        <div className="space-y-6 glass-effect p-6 rounded-xl border border-white/10 shadow-xl backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                placeholder="Enter your username"
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
                value={formData.username}
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
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" className="border-white/10" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-sm text-sky-400 hover:text-sky-300 transition-colors"
              >
                Forgot password?
              </a>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-medium shadow-lg shadow-sky-400/20 transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-black/10 dark:border-white/15" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className=" px-2 text-muted-foreground dark:text-gray-300">
                  Test Credentials
                </span>
              </div>
            </div>
            <div className="rounded-lg border border-black/10 dark:border-white/10 bg-white/5 p-4">
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Username: <span className="text-foreground">michaelw</span></p>
                <p>Password: <span className="text-foreground">michaelwpass</span></p>
              </div>
            </div>
          </div>
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <a href="register" className="text-sky-400 hover:text-sky-300 transition-colors">
              Register here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

