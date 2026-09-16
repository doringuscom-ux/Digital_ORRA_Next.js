"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Agar admin already logged in hai to dashboard redirect karein
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
    if (token) {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email || !password) {
      setErrorMsg("Please provide both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid credentials! Please try again.");
      }

      // Save admin session token
      if (data.token) {
        localStorage.setItem("adminToken", data.token);
        setSuccessMsg("Authentication successful! Redirecting...");
        setTimeout(() => {
          router.replace("/admin/dashboard");
        }, 800);
      } else {
        throw new Error("Login failed: Token not received");
      }
    } catch (err) {
      setErrorMsg(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#0A1128] overflow-hidden px-4 py-12 selection:bg-[#FF3399] selection:text-white">
      {/* Dynamic Background Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#FF3399]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#00E5FF]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-[350px] h-[350px] bg-[#0F1B4C]/80 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)",
          backgroundSize: "28px 28px"
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">
        
        {/* Top Logo & Title Card Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center group mb-4">
            <div className="p-2.5 rounded-2xl bg-white/95 shadow-[0_0_25px_rgba(255,51,153,0.3)] transition-transform duration-300 group-hover:scale-105 backdrop-blur-md">
              <Image 
                src="/DO JPG.jpeg" 
                alt="Digital ORRA Logo" 
                title="Digital ORRA Logo"
                width={130} 
                height={42} 
                style={{ width: "auto", height: "auto" }}
                className="object-contain max-h-[42px]"
                priority
              />
            </div>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            Control Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Admin <span className="text-gradient">Portal</span>
          </h1>
          <p className="text-sm text-gray-400 mt-1.5">
            Sign in with your authorized credentials to manage Digital ORRA
          </p>
        </div>

        {/* Login Form Card */}
        <div className="relative rounded-3xl p-8 sm:p-9 bg-[#0F1B4C]/50 border border-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
          {/* Subtle Pink Border Accent Glow */}
          <div className="absolute inset-x-8 -top-px h-[2px] bg-gradient-to-r from-transparent via-[#FF3399] to-transparent" />

          {/* Feedback messages */}
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-400 text-sm animate-shake">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{errorMsg}</div>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3 text-emerald-400 text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{successMsg}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Admin Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#FF3399] transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@digitalorra.com"
                  className="w-full pl-11 pr-4 py-3 bg-[#0A1128]/70 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#FF3399] focus:ring-2 focus:ring-[#FF3399]/20 transition-all duration-200"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#FF3399] transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-11 py-3 bg-[#0A1128]/70 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#FF3399] focus:ring-2 focus:ring-[#FF3399]/20 transition-all duration-200"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative group mt-2 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-[#FF3399] to-[#d6006e] hover:from-[#ff4d9d] hover:to-[#e60077] shadow-[0_8px_25px_rgba(255,51,153,0.35)] hover:shadow-[0_10px_30px_rgba(255,51,153,0.5)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer active:scale-[0.99]"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Additional Security Note */}
          <div className="mt-7 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF3399]" />
              Secure 256-bit JWT Session
            </span>
            <Link 
              href="/"
              className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium hover:underline"
            >
              Return to Website →
            </Link>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} Digital ORRA. Restricted Authorized Personnel Only.
        </p>
      </div>
    </div>
  );
}
