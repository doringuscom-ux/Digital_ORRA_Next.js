"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  GraduationCap, 
  Briefcase, 
  Image as ImageIcon, 
  LogOut, 
  ShieldCheck, 
  Users, 
  ArrowUpRight, 
  RefreshCw,
  Search,
  CheckCircle,
  Clock,
  Sparkles,
  ExternalLink,
  Layers,
  BookOpen,
  Camera,
  Activity
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const isClient = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Real stats fetched from APIs
  const [stats, setStats] = useState({
    inquiries: 0,
    blogs: 0,
    courses: 0,
    gallery: 0,
    careers: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [fetchingStats, setFetchingStats] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  // Authentication & Data loading
  useEffect(() => {
    if (!isClient) return;
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    let isSubscribed = true;

    async function loadData() {
      try {
        const [contactRes, blogsRes, coursesRes, galleryRes, careersRes, servicesRes] = await Promise.all([
          fetch("/api/contact").catch(() => null),
          fetch("/api/blogs").catch(() => null),
          fetch("/api/courses").catch(() => null),
          fetch("/api/gallery").catch(() => null),
          fetch("/api/careers").catch(() => null),
          fetch("/api/services").catch(() => null),
        ]);

        let inquiriesCount = 0;
        let inqList = [];
        let auditsCount = 0;
        if (contactRes && contactRes.ok) {
          const cData = await contactRes.json();
          const allInqs = Array.isArray(cData.data) ? cData.data : (Array.isArray(cData) ? cData : []);
          inquiriesCount = cData.count || allInqs.length;
          inqList = allInqs.slice(0, 5);
          auditsCount = allInqs.filter((item) => {
            const serv = (item.service || "").toLowerCase();
            const msg = (item.message || "").toLowerCase();
            return serv.includes("audit") || msg.includes("audit");
          }).length;
        }

        let blogsCount = 0;
        if (blogsRes && blogsRes.ok) {
          const bData = await blogsRes.json();
          blogsCount = Array.isArray(bData) ? bData.length : 0;
        }

        let coursesCount = 0;
        if (coursesRes && coursesRes.ok) {
          const crData = await coursesRes.json();
          coursesCount = Array.isArray(crData) ? crData.length : (crData.data ? crData.data.length : 0);
        }

        let galleryCount = 0;
        if (galleryRes && galleryRes.ok) {
          const gData = await galleryRes.json();
          galleryCount = Array.isArray(gData) ? gData.length : (gData.data ? gData.data.length : 0);
        }

        let careersCount = 0;
        if (careersRes && careersRes.ok) {
          const carData = await careersRes.json();
          careersCount = Array.isArray(carData) ? carData.length : (carData.data ? carData.data.length : 0);
        }

        let servicesCount = 0;
        if (servicesRes && servicesRes.ok) {
          const sData = await servicesRes.json();
          servicesCount = Array.isArray(sData) ? sData.length : (sData.data ? sData.data.length : 0);
        }

        if (isSubscribed) {
          setStats({
            inquiries: inquiriesCount,
            audits: auditsCount,
            blogs: blogsCount,
            courses: coursesCount,
            gallery: galleryCount,
            careers: careersCount,
            services: servicesCount,
          });
          setRecentInquiries(inqList);
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load dashboard statistics:", err);
        if (isSubscribed) setLoading(false);
      }
    }

    loadData();

    return () => {
      isSubscribed = false;
    };
  }, [router, isClient, refreshKey]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("adminToken");
    }
    router.replace("/admin/login");
  };

  if (!isClient || loading) {
    return (
      <div className="min-h-screen bg-[#0A1128] flex items-center justify-center text-gray-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#FF3399] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium tracking-wide">Loading Command Dashboard...</span>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard, href: "#" },
    { id: "inquiries", label: "Contact Inquiries", icon: MessageSquare, badge: stats.inquiries, href: "/admin/inquiries" },
    { id: "blogs", label: "Blogs & Articles", icon: FileText, badge: stats.blogs, href: "/admin/blogs" },
    { id: "courses", label: "Courses", icon: GraduationCap, badge: stats.courses, href: "/admin/courses" },
    { id: "gallery", label: "Media Gallery", icon: ImageIcon, badge: stats.gallery, href: "/admin/gallery" },
    { id: "careers", label: "Job Applications", icon: Briefcase, badge: stats.careers, href: "/admin/careers" },
  ];

  return (
    <main className="w-full max-w-[1700px] mx-auto p-6 sm:p-8 lg:p-10 space-y-8">
      {/* Welcome Banner */}
          <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:p-10 bg-gradient-to-r from-[#0F1B4C] via-[#142363] to-[#0A1128] border border-white/10 shadow-2xl">
            <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-[#FF3399]/15 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -left-10 -bottom-10 w-[300px] h-[300px] bg-[#00E5FF]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider text-[#FF3399] uppercase mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3399] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF3399]"></span>
                </span>
                Live Control Center
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Welcome Back, <span className="text-gradient">Administrator</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-300 mt-2.5 leading-relaxed font-normal">
                Monitor incoming customer inquiries, manage published blogs, track training courses, and review submissions across Digital ORRA in real time.
              </p>
            </div>
          </div>

          {/* Quick Stat Cards - 6 Item Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5">
            {/* Inquiries Card - Clickable to /admin/inquiries */}
            <Link 
              href="/admin/inquiries"
              className="relative group p-6 rounded-2xl bg-[#0F1B4C]/50 border border-white/10 hover:border-[#FF3399]/60 backdrop-blur-md transition-all duration-300 hover:shadow-[0_10px_30px_rgba(255,51,153,0.2)] block"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-white transition-colors">
                  Inquiries
                </span>
                <div className="p-2.5 rounded-xl bg-pink-500/15 text-[#FF3399] group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white mt-4">{stats.inquiries}</div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium mt-2">
                <CheckCircle className="w-3.5 h-3.5" />
                Active leads →
              </div>
            </Link>

            {/* Free Audits Card - Clickable to /admin/audits */}
            <Link 
              href="/admin/audits"
              className="relative group p-6 rounded-2xl bg-[#0F1B4C]/50 border border-pink-500/30 hover:border-pink-500 backdrop-blur-md transition-all duration-300 hover:shadow-[0_10px_30px_rgba(255,51,153,0.3)] block"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-pink-300 uppercase tracking-wider group-hover:text-white transition-colors">
                  Free Audits
                </span>
                <div className="p-2.5 rounded-xl bg-pink-500/20 text-pink-400 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white mt-4">{stats.audits || 0}</div>
              <div className="flex items-center gap-1.5 text-xs text-pink-400 font-medium mt-2">
                <Sparkles className="w-3.5 h-3.5" />
                Audit queries →
              </div>
            </Link>

            {/* Blogs Card */}
            <Link
              href="/admin/blogs"
              className="relative group p-6 rounded-2xl bg-[#0F1B4C]/50 border border-white/10 hover:border-cyan-500/60 backdrop-blur-md transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,229,255,0.2)] block"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-white transition-colors">
                  Live Blogs
                </span>
                <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-400 group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white mt-4">{stats.blogs}</div>
              <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-medium mt-2">
                <Layers className="w-3.5 h-3.5" />
                Published articles →
              </div>
            </Link>

            {/* Courses Card */}
            <Link
              href="/admin/courses"
              className="relative group p-6 rounded-2xl bg-[#0F1B4C]/50 border border-white/10 hover:border-indigo-500/60 backdrop-blur-md transition-all duration-300 hover:shadow-[0_10px_30px_rgba(99,102,241,0.2)] block"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-white transition-colors">
                  Courses
                </span>
                <div className="p-2.5 rounded-xl bg-indigo-500/15 text-indigo-400 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white mt-4">{stats.courses}</div>
              <div className="flex items-center gap-1.5 text-xs text-indigo-300 font-medium mt-2">
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                Curriculum batches →
              </div>
            </Link>

            {/* Services Card */}
            <Link
              href="/admin/services"
              className="relative group p-6 rounded-2xl bg-[#0F1B4C]/50 border border-white/10 hover:border-teal-500/60 backdrop-blur-md transition-all duration-300 hover:shadow-[0_10px_30px_rgba(20,184,166,0.2)] block"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-white transition-colors">
                  Services
                </span>
                <div className="p-2.5 rounded-xl bg-teal-500/15 text-teal-400 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white mt-4">{stats.services || 0}</div>
              <div className="flex items-center gap-1.5 text-xs text-teal-300 font-medium mt-2">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                Agency packages →
              </div>
            </Link>

            {/* Media Gallery */}
            <Link
              href="/admin/gallery"
              className="relative group p-6 rounded-2xl bg-[#0F1B4C]/50 border border-white/10 hover:border-amber-500/60 backdrop-blur-md transition-all duration-300 hover:shadow-[0_10px_30px_rgba(245,158,11,0.2)] block"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-white transition-colors">
                  Gallery
                </span>
                <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400 group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white mt-4">{stats.gallery}</div>
              <div className="flex items-center gap-1.5 text-xs text-amber-300 font-medium mt-2">
                <Camera className="w-3.5 h-3.5 text-amber-400" />
                Media assets →
              </div>
            </Link>

            {/* Careers */}
            <Link
              href="/admin/careers"
              className="relative group p-6 rounded-2xl bg-[#0F1B4C]/50 border border-white/10 hover:border-purple-500/60 backdrop-blur-md transition-all duration-300 hover:shadow-[0_10px_30px_rgba(168,85,247,0.2)] block"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-white transition-colors">
                  Careers
                </span>
                <div className="p-2.5 rounded-xl bg-purple-500/15 text-purple-400 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white mt-4">{stats.careers}</div>
              <div className="flex items-center gap-1.5 text-xs text-purple-400 font-medium mt-2">
                <Clock className="w-3.5 h-3.5" />
                Applications →
              </div>
            </Link>
          </div>

          {/* Recent Inquiries List - Expanded Card */}
          <div className="rounded-3xl bg-[#0F1B4C]/50 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2.5">
                  <MessageSquare className="w-5 h-5 text-[#FF3399]" />
                  Recent Customer Inquiries
                </h2>
                <p className="text-xs text-gray-400 mt-1">Live inquiries received from the website contact and lead capture forms</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#FF3399] px-3.5 py-1.5 rounded-full bg-[#FF3399]/10 border border-[#FF3399]/25 shadow-sm">
                  Total Records: {stats.inquiries}
                </span>
              </div>
            </div>

            {recentInquiries.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-20 text-[#FF3399]" />
                <p className="text-sm font-semibold text-gray-300">No inquiries found in database.</p>
                <p className="text-xs text-gray-500 mt-1">New submissions will show up here automatically.</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0A1128]/80 text-gray-400 uppercase tracking-wider font-semibold border-b border-white/10">
                    <tr>
                      <th className="px-5 py-3.5">Client Name</th>
                      <th className="px-5 py-3.5">Email & Contact</th>
                      <th className="px-5 py-3.5">Requested Service</th>
                      <th className="px-5 py-3.5">Budget</th>
                      <th className="px-5 py-3.5">Message / Note</th>
                      <th className="px-5 py-3.5">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 bg-[#0A1128]/40">
                    {recentInquiries.map((inq, idx) => (
                      <tr key={inq._id || idx} className="hover:bg-white/[0.04] transition-colors">
                        <td className="px-5 py-4 font-bold text-white text-sm">
                          {inq.fullName || "Anonymous"}
                        </td>
                        <td className="px-5 py-4 text-gray-300">
                          <div className="font-medium text-white/90">{inq.email}</div>
                          {inq.phone && (
                            <div className="text-cyan-400/90 text-[11px] font-mono mt-0.5">
                              {inq.phone}
                            </div>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 font-semibold text-[11px]">
                            {inq.service || "General"}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-white font-semibold text-[13px]">
                          {inq.budget || "Not Specified"}
                        </td>
                        <td className="px-5 py-4 text-gray-400 max-w-xs truncate">
                          {inq.message || "—"}
                        </td>
                        <td className="px-5 py-4 text-gray-400 whitespace-nowrap font-medium">
                          {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString("en-US", {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          }) : "Recent"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
    </main>
  );
}
