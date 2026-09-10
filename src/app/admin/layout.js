"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  GraduationCap,
  Image as ImageIcon,
  Briefcase,
  Sparkles,
  Globe,
  Users,
  LogOut,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
  Activity,
  Layers,
  MapPin
} from "lucide-react";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const isClient = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const [counts, setCounts] = useState({
    inquiries: 0,
    blogs: 0,
    courses: 0,
    gallery: 0,
    careers: 0,
    services: 0,
    reviews: 0,
    portfolios: 0,
    workshops: 0,
    locations: 0,
  });

  // Agar login page hai toh bina sidebar ke clean login dikhayein
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isClient || isLoginPage) return;

    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    // Load sidebar live counts
    async function loadSidebarCounts() {
      try {
        const [cRes, bRes, crRes, gRes, carRes, sRes, rRes, pRes, wRes, lRes] = await Promise.all([
          fetch("/api/contact").catch(() => null),
          fetch("/api/blogs").catch(() => null),
          fetch("/api/courses").catch(() => null),
          fetch("/api/gallery").catch(() => null),
          fetch("/api/careers").catch(() => null),
          fetch("/api/services").catch(() => null),
          fetch("/api/reviews").catch(() => null),
          fetch("/api/portfolio").catch(() => null),
          fetch("/api/workshop").catch(() => null),
          fetch("/api/locations").catch(() => null),
        ]);

        let inqCount = 0;
        if (cRes && cRes.ok) {
          const cData = await cRes.json();
          inqCount = cData.count || (Array.isArray(cData.data) ? cData.data.length : 0);
        }

        let blogCount = 0;
        if (bRes && bRes.ok) {
          const bData = await bRes.json();
          blogCount = Array.isArray(bData) ? bData.length : 0;
        }

        let crsCount = 0;
        if (crRes && crRes.ok) {
          const crData = await crRes.json();
          crsCount = Array.isArray(crData) ? crData.length : (crData.data ? crData.data.length : 0);
        }

        let galCount = 0;
        if (gRes && gRes.ok) {
          const gData = await gRes.json();
          galCount = Array.isArray(gData) ? gData.length : (gData.data ? gData.data.length : 0);
        }

        let carCount = 0;
        if (carRes && carRes.ok) {
          const carData = await carRes.json();
          carCount = Array.isArray(carData) ? carData.length : (carData.data ? carData.data.length : 0);
        }

        let srvCount = 0;
        if (sRes && sRes.ok) {
          const sData = await sRes.json();
          srvCount = Array.isArray(sData) ? sData.length : (sData.data ? sData.data.length : 0);
        }

        let revCount = 0;
        if (rRes && rRes.ok) {
          const rData = await rRes.json();
          revCount = Array.isArray(rData) ? rData.length : 0;
        }

        let portCount = 0;
        if (pRes && pRes.ok) {
          const pData = await pRes.json();
          portCount = Array.isArray(pData) ? pData.length : 0;
        }

        let workCount = 0;
        if (wRes && wRes.ok) {
          const wData = await wRes.json();
          workCount = Array.isArray(wData) ? wData.length : 0;
        }

        let locCount = 0;
        if (lRes && lRes.ok) {
          const lData = await lRes.json();
          locCount = Array.isArray(lData) ? lData.length : 0;
        }

        setCounts({
          inquiries: inqCount,
          blogs: blogCount,
          courses: crsCount,
          gallery: galCount,
          careers: carCount,
          services: srvCount,
          reviews: revCount,
          portfolios: portCount,
          workshops: workCount,
          locations: locCount,
        });
      } catch (e) {
        console.error("Sidebar count error:", e);
      }
    }

    loadSidebarCounts();
  }, [pathname, isLoginPage, router, isClient]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("adminToken");
    }
    router.replace("/admin/login");
  };

  if (!isClient && !isLoginPage) {
    return (
      <div className="min-h-screen bg-[#0A1128] flex items-center justify-center text-gray-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#FF3399] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium tracking-wide">Loading Admin Panel...</span>
        </div>
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  const navItems = [
    {
      label: "Overview",
      icon: LayoutDashboard,
      href: "/admin/dashboard",
      active: pathname === "/admin/dashboard" || pathname === "/admin",
    },
    {
      label: "Contact Inquiries",
      icon: MessageSquare,
      href: "/admin/inquiries",
      badge: counts.inquiries,
      active: pathname.startsWith("/admin/inquiries"),
    },
    {
      label: "Blogs & Articles",
      icon: FileText,
      href: "/admin/blogs",
      badge: counts.blogs,
      active: pathname.startsWith("/admin/blogs"),
    },
    {
      label: "Courses",
      icon: GraduationCap,
      href: "/admin/courses",
      badge: counts.courses,
      active: pathname.startsWith("/admin/courses"),
    },
    {
      label: "Services",
      icon: Sparkles,
      href: "/admin/services",
      badge: counts.services,
      active: pathname.startsWith("/admin/services"),
    },
    {
      label: "Media Gallery",
      icon: ImageIcon,
      href: "/admin/gallery",
      badge: counts.gallery,
      active: pathname.startsWith("/admin/gallery"),
    },
    {
      label: "Workshop Media",
      icon: GraduationCap,
      href: "/admin/workshop",
      badge: counts.workshops,
      active: pathname.startsWith("/admin/workshop"),
    },
    {
      label: "Portfolio Projects",
      icon: Layers,
      href: "/admin/portfolio",
      badge: counts.portfolios,
      active: pathname.startsWith("/admin/portfolio"),
    },
    {
      label: "Location Pages",
      icon: MapPin,
      href: "/admin/locations",
      badge: counts.locations,
      active: pathname.startsWith("/admin/locations"),
    },
    {
      label: "Job Applications",
      icon: Briefcase,
      href: "/admin/careers",
      badge: counts.careers,
      active: pathname.startsWith("/admin/careers"),
    },
    {
      label: "Client Reviews",
      icon: MessageSquare,
      href: "/admin/reviews",
      badge: counts.reviews,
      active: pathname.startsWith("/admin/reviews"),
    },
    {
      label: "Our Team",
      icon: Users,
      href: "/admin/team",
      active: pathname.startsWith("/admin/team"),
    },
    {
      label: "SEO Manager",
      icon: Globe,
      href: "/admin/seo",
      active: pathname.startsWith("/admin/seo"),
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A1128] text-white flex flex-col selection:bg-[#FF3399] selection:text-white">
      {/* Top Global Admin Header */}
      <header className="sticky top-0 z-50 bg-[#0F1B4C]/90 backdrop-blur-xl border-b border-white/10 px-6 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard" className="flex items-center gap-3 group">
            <div className="p-1.5 rounded-xl bg-white/95 shadow-[0_0_15px_rgba(255,51,153,0.25)] group-hover:scale-105 transition-transform">
              <Image
                src="/DO JPG.jpeg"
                alt="Digital ORRA Logo"
                width={100}
                height={32}
                style={{ width: "auto", height: "auto" }}
                className="object-contain max-h-[32px]"
                priority
              />
            </div>
          </Link>
          <span className="hidden sm:inline-block h-5 w-px bg-white/20" />
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FF3399]/10 border border-[#FF3399]/30 text-xs font-semibold text-[#FF3399]">
            <ShieldCheck className="w-3.5 h-3.5" />
            Super Admin Portal
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.location.reload()}
            title="Reload Page Data"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 transition-all"
          >
            Live Site <ExternalLink className="w-3 h-3" />
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 px-3.5 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Layout Area: Persistent Sidebar + Page Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Persistent Left Sidebar */}
        <aside className="w-full md:w-64 bg-[#0F1B4C]/35 border-r border-white/10 p-4 shrink-0 flex flex-col justify-between sticky top-[61px] md:h-[calc(100vh-61px)]">
          <div className="space-y-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-3 py-2">
              Navigation
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    item.active
                      ? "bg-gradient-to-r from-[#FF3399] to-[#d6006e] text-white shadow-lg shadow-[#FF3399]/20"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${item.active ? "text-white" : "text-gray-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.active ? "bg-white/20 text-white" : "bg-white/10 text-gray-300"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Bottom System Status Widget - Adjusted with bottom padding to never overlap Dev badge */}
          <div className="mt-8 mb-16 p-3.5 rounded-2xl bg-[#0A1128]/80 border border-white/10 shadow-lg">
            <div className="flex items-center gap-2 mb-1 text-xs font-bold text-white">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>Digital ORRA Core</span>
            </div>
            <p className="text-[11px] text-gray-400 pl-4 leading-tight">
              Database connection active & running.
            </p>
          </div>
        </aside>

        {/* Page Content Body */}
        <div className="flex-1 min-w-0 overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
