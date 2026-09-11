"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  ArrowRight, 
  PhoneCall, 
  Sparkles,
  ChevronRight,
  Globe,
  Layers,
  GraduationCap,
  Users,
  Image as ImageIcon,
  FileText,
  Mail
} from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "About Us", href: "/about-us", icon: Globe },
    { name: "Services", href: "/services", icon: Layers },
    { name: "Courses", href: "/courses", icon: GraduationCap },
    { name: "Our Team", href: "/our-team", icon: Users },
    { name: "Gallery", href: "/gallery", icon: ImageIcon },
    { name: "Blog", href: "/blog", icon: FileText },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] px-3 sm:px-6 py-3 sm:py-4 transition-all duration-300">
        <div
          className={`max-w-7xl mx-auto rounded-full px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 flex items-center justify-between shadow-lg transition-all duration-500 ${
            scrolled
              ? "bg-[#070D1E]/95 border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl"
              : "glass-nav"
          }`}
        >
          {/* Brand Logo */}
          <Link href="/" className="flex items-center hover:scale-105 transition-transform duration-300">
            <div
              className={`p-1.5 rounded-xl transition-shadow ${
                scrolled
                  ? "bg-white shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  : "bg-white shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(234,0,122,0.4)]"
              }`}
            >
              <Image
                src="/logo.webp"
                alt="Digital ORRA Logo"
                width={140}
                height={46}
                style={{ width: "auto", height: "auto" }}
                className="object-contain max-h-[46px] sm:max-h-[50px]"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links (Large Screens) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-[16px] xl:text-[17px] font-bold text-gray-200">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`transition-all duration-300 relative py-1 ${
                    isActive
                      ? "text-cyan-300 font-extrabold"
                      : "hover:text-white hover:scale-105"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-pink-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action + Mobile Menu Hamburger */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              href="/contact#form"
              className="btn-glow-pink px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-[14px] font-bold inline-flex items-center gap-1.5 shadow-[0_0_20px_rgba(255,51,153,0.35)]"
            >
              <span>Get Proposal</span>
              <ArrowRight className="w-3.5 h-3.5 hidden sm:inline-block" />
            </Link>

            {/* Mobile / Tablet Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all flex items-center justify-center cursor-pointer active:scale-95"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-pink-400" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Full Responsive Mobile & Tablet Navigation Drawer (Modal Sheet) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[150] lg:hidden animate-fade-in">
          {/* Backdrop Blur Overlay */}
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-2xl transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative h-full w-full max-w-md ml-auto bg-gradient-to-b from-[#0B132B] via-[#070D1E] to-[#040814] border-l border-white/15 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            {/* Top Drawer Header */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
                  <div className="p-1.5 rounded-xl bg-white shadow-md">
                    <Image
                      src="/DO JPG.jpeg"
                      alt="Digital ORRA"
                      width={105}
                      height={32}
                      style={{ width: "auto", height: "auto" }}
                      className="object-contain max-h-[32px]"
                    />
                  </div>
                </Link>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5 text-pink-400" />
                </button>
              </div>

              {/* Navigation Links in Mobile */}
              <div className="space-y-2">
                {navLinks.map((link, idx) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-pink-500/20 to-purple-600/20 border-pink-500/40 text-white font-black shadow-lg"
                          : "bg-white/[0.03] hover:bg-white/[0.08] border-white/5 text-gray-200 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                            isActive
                              ? "bg-pink-500 text-white shadow-[0_0_15px_rgba(255,51,153,0.5)]"
                              : "bg-white/5 text-cyan-400 border border-white/10"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-base font-bold tracking-tight">{link.name}</span>
                      </div>

                      <ChevronRight className={`w-4 h-4 ${isActive ? "text-pink-400" : "text-gray-500"}`} />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Bottom Drawer Actions */}
            <div className="pt-8 border-t border-white/10 mt-8 space-y-3">
              <Link
                href="/contact#form"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-glow-pink w-full py-3.5 text-center text-sm font-black flex items-center justify-center gap-2 rounded-2xl shadow-xl"
              >
                <span>Get Free Growth Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="https://wa.me/919990432321?text=Hi%20Digital%20ORRA,%20I%20want%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Chat on WhatsApp (+91 99904 32321)</span>
              </a>

              <p className="text-[11px] text-center text-gray-500 font-light pt-2">
                Digital ORRA • Architects of Modern Digital Growth
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
