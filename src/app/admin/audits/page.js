"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  RefreshCw,
  Phone,
  Mail,
  Calendar,
  Globe,
  Trash2,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  Clock,
  ChevronDown,
  Filter,
  Layers,
  ArrowRight,
  TrendingUp,
  Award
} from "lucide-react";

export default function AdminAuditInquiriesPage() {
  const router = useRouter();
  const isClient = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAudit, setSelectedAudit] = useState(null);
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", text: "" });
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (!isClient) return;
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    let isSubscribed = true;

    async function loadAuditInquiries() {
      try {
        const res = await fetch("/api/contact");
        if (res.ok) {
          const json = await res.json();
          const list = Array.isArray(json.data) ? json.data : (Array.isArray(json) ? json : []);
          
          // Filter only queries originating from Free Audit
          const auditList = list.filter((item) => {
            const serv = (item.service || "").toLowerCase();
            const msg = (item.message || "").toLowerCase();
            return serv.includes("audit") || msg.includes("audit");
          });

          if (isSubscribed) {
            setAudits(auditList);
            setSelectedAudit((prev) => {
              if (prev) {
                const found = auditList.find((a) => a._id === prev._id);
                return found || (auditList.length > 0 ? auditList[0] : null);
              }
              return auditList.length > 0 ? auditList[0] : null;
            });
            setLoading(false);
          }
        }
      } catch (err) {
        console.error("Failed to load audit inquiries:", err);
        if (isSubscribed) setLoading(false);
      }
    }

    loadAuditInquiries();

    return () => {
      isSubscribed = false;
    };
  }, [isClient, router, refreshTrigger]);

  // Update Status
  const handleUpdateStatus = async (id, newStatus) => {
    setActionLoading(true);
    try {
      const res = await fetch("/api/contact/manage", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (res.ok) {
        setAudits((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedAudit?._id === id) {
          setSelectedAudit((prev) => ({ ...prev, status: newStatus }));
        }
        setFeedback({ type: "success", text: "Status updated successfully!" });
      } else {
        setFeedback({ type: "error", text: data.message || "Failed to update." });
      }
    } catch (err) {
      setFeedback({ type: "error", text: err.message || "Something went wrong." });
    } finally {
      setActionLoading(false);
      setTimeout(() => setFeedback({ type: "", text: "" }), 3000);
    }
  };

  // Delete Audit Query
  const handleDeleteAudit = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Audit lead?")) return;

    setActionLoading(true);
    try {
      const res = await fetch(`/api/contact/manage?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const updated = audits.filter((item) => item._id !== id);
        setAudits(updated);
        setSelectedAudit(updated.length > 0 ? updated[0] : null);
        setFeedback({ type: "success", text: "Audit lead deleted." });
      } else {
        setFeedback({ type: "error", text: "Failed to delete." });
      }
    } catch (err) {
      setFeedback({ type: "error", text: err.message || "Error deleting." });
    } finally {
      setActionLoading(false);
      setTimeout(() => setFeedback({ type: "", text: "" }), 3000);
    }
  };

  // Filtered Leads
  const filteredAudits = audits.filter((aud) => {
    const textMatch =
      aud.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aud.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aud.phone?.includes(searchTerm) ||
      aud.message?.toLowerCase().includes(searchTerm.toLowerCase());

    const servLower = (aud.service || "").toLowerCase();
    const typeMatch =
      typeFilter === "all" ||
      (typeFilter === "website" && servLower.includes("website")) ||
      (typeFilter === "youtube" && servLower.includes("youtube")) ||
      (typeFilter === "instagram" && (servLower.includes("instagram") || servLower.includes("insta")));

    const statusMatch =
      statusFilter === "all" || (aud.status || "new") === statusFilter;

    return textMatch && typeMatch && statusMatch;
  });

  const getAuditBadge = (serviceStr = "") => {
    const s = serviceStr.toLowerCase();
    if (s.includes("youtube")) {
      return {
        label: "YouTube Audit",
        color: "bg-red-500/15 text-red-400 border-red-500/30",
        icon: "▶️",
      };
    }
    if (s.includes("instagram") || s.includes("insta")) {
      return {
        label: "Instagram Audit",
        color: "bg-pink-500/15 text-pink-400 border-pink-500/30",
        icon: "📸",
      };
    }
    return {
      label: "Website Audit",
      color: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
      icon: "🌐",
    };
  };

  const getStatusBadge = (status = "new") => {
    switch (status) {
      case "contacted":
        return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
      case "in-review":
        return "bg-amber-500/15 text-amber-400 border-amber-500/30";
      case "closed":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default:
        return "bg-[#FF3399]/15 text-[#FF3399] border-[#FF3399]/30";
    }
  };

  if (!isClient) return null;

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {feedback.text && (
        <div
          className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl border text-sm font-semibold shadow-2xl backdrop-blur-xl animate-fade-in ${
            feedback.type === "success"
              ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
              : "bg-rose-500/20 border-rose-500/40 text-rose-300"
          }`}
        >
          {feedback.text}
        </div>
      )}

      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#1E112A] via-[#120F24] to-[#0D152F] border border-pink-500/20 p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-60 h-60 bg-pink-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>Lead Generation Tracking</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Free Audit Inquiries
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              All leads captured when visitors clicked & submitted the <strong className="text-pink-300">Free Audit</strong> modal.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setRefreshTrigger((prev) => prev + 1)}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-bold inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
            <a
              href="https://audit.digitalorra.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow-pink px-4 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-lg"
            >
              <span>Visit Audit Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6">
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-3.5">
            <span className="text-xs text-gray-400 font-medium">Total Audits</span>
            <p className="text-xl sm:text-2xl font-black text-white mt-0.5">{audits.length}</p>
          </div>
          <div className="bg-white/[0.04] border border-cyan-500/20 rounded-2xl p-3.5">
            <span className="text-xs text-cyan-300 font-medium">Website Audits</span>
            <p className="text-xl sm:text-2xl font-black text-cyan-400 mt-0.5">
              {audits.filter((a) => (a.service || "").toLowerCase().includes("website")).length}
            </p>
          </div>
          <div className="bg-white/[0.04] border border-red-500/20 rounded-2xl p-3.5">
            <span className="text-xs text-red-300 font-medium">YouTube Audits</span>
            <p className="text-xl sm:text-2xl font-black text-red-400 mt-0.5">
              {audits.filter((a) => (a.service || "").toLowerCase().includes("youtube")).length}
            </p>
          </div>
          <div className="bg-white/[0.04] border border-pink-500/20 rounded-2xl p-3.5">
            <span className="text-xs text-pink-300 font-medium">Instagram Audits</span>
            <p className="text-xl sm:text-2xl font-black text-pink-400 mt-0.5">
              {audits.filter((a) => (a.service || "").toLowerCase().includes("insta")).length}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Left List + Right Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Filters + List (Span 7) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#0B132B] border border-white/10 rounded-2xl p-3 shadow-lg">
            {/* Search */}
            <div className="relative w-full sm:flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by name, phone, handle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl pl-10 pr-3 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-pink-400"
              />
            </div>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full sm:w-auto bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-400 cursor-pointer"
            >
              <option value="all" className="bg-[#0B132B]">All Audits</option>
              <option value="website" className="bg-[#0B132B]">Website</option>
              <option value="youtube" className="bg-[#0B132B]">YouTube</option>
              <option value="instagram" className="bg-[#0B132B]">Instagram</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-pink-400 cursor-pointer"
            >
              <option value="all" className="bg-[#0B132B]">All Status</option>
              <option value="new" className="bg-[#0B132B]">New</option>
              <option value="contacted" className="bg-[#0B132B]">Contacted</option>
              <option value="in-review" className="bg-[#0B132B]">In-Review</option>
              <option value="closed" className="bg-[#0B132B]">Closed</option>
            </select>
          </div>

          {/* List Card */}
          <div className="rounded-2xl bg-[#0B132B] border border-white/10 overflow-hidden shadow-xl">
            {loading ? (
              <div className="p-12 text-center text-gray-400 text-sm">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-pink-400" />
                <span>Loading audit inquiries...</span>
              </div>
            ) : filteredAudits.length === 0 ? (
              <div className="p-12 text-center text-gray-400 text-sm">
                <Sparkles className="w-8 h-8 mx-auto mb-2 text-gray-500" />
                <p className="font-semibold text-white">No audit inquiries found</p>
                <p className="text-xs text-gray-400 mt-1">
                  When visitors submit the Free Audit popup form, they will appear here instantly.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-white/5 max-h-[680px] overflow-y-auto">
                {filteredAudits.map((item) => {
                  const badge = getAuditBadge(item.service);
                  const isSelected = selectedAudit?._id === item._id;

                  return (
                    <div
                      key={item._id}
                      onClick={() => setSelectedAudit(item)}
                      className={`p-4 transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        isSelected
                          ? "bg-pink-500/10 border-l-4 border-pink-500"
                          : "hover:bg-white/[0.03]"
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg flex-shrink-0">
                          {badge.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-sm font-bold text-white truncate">
                              {item.fullName}
                            </h4>
                            <span
                              className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${badge.color}`}
                            >
                              {badge.label}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 truncate mt-0.5">
                            📞 {item.phone || "No phone"} {item.email ? `• ✉️ ${item.email}` : ""}
                          </p>
                          <p className="text-[11px] text-gray-500 mt-1 line-clamp-1">
                            {item.message}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getStatusBadge(
                            item.status
                          )}`}
                        >
                          {item.status || "new"}
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono">
                          {new Date(item.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                          })}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Detailed View of Selected Lead (Span 5) */}
        <div className="lg:col-span-5">
          {selectedAudit ? (
            <div className="sticky top-6 rounded-3xl bg-[#0B132B] border border-white/10 p-6 shadow-2xl space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 pb-5 border-b border-white/10">
                <div>
                  <span
                    className={`inline-block text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border mb-2 ${
                      getAuditBadge(selectedAudit.service).color
                    }`}
                  >
                    {getAuditBadge(selectedAudit.service).icon} {getAuditBadge(selectedAudit.service).label}
                  </span>
                  <h3 className="text-xl font-black text-white">
                    {selectedAudit.fullName}
                  </h3>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">
                    Submitted: {new Date(selectedAudit.createdAt).toLocaleString("en-IN")}
                  </p>
                </div>

                <button
                  onClick={() => handleDeleteAudit(selectedAudit._id)}
                  className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 transition-all cursor-pointer"
                  title="Delete Lead"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Lead Status
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["new", "contacted", "in-review", "closed"].map((st) => (
                    <button
                      key={st}
                      disabled={actionLoading}
                      onClick={() => handleUpdateStatus(selectedAudit._id, st)}
                      className={`py-2 text-xs font-bold uppercase rounded-xl border transition-all cursor-pointer ${
                        (selectedAudit.status || "new") === st
                          ? getStatusBadge(st)
                          : "bg-white/[0.02] border-white/10 text-gray-400 hover:text-white hover:bg-white/[0.05]"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Contact Coordinates
                </h4>

                {/* Phone & WhatsApp Quick Click */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Phone:</span>
                  <div className="flex items-center gap-2 font-bold text-white">
                    <span>{selectedAudit.phone || "N/A"}</span>
                    {selectedAudit.phone && (
                      <a
                        href={`https://wa.me/${selectedAudit.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold inline-flex items-center gap-1 transition-all"
                      >
                        <span>WhatsApp</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Email:</span>
                  <span className="font-mono text-cyan-300 select-all">
                    {selectedAudit.email || "N/A"}
                  </span>
                </div>

                {/* Service Tag */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Request Type:</span>
                  <span className="font-semibold text-white">
                    {selectedAudit.service}
                  </span>
                </div>
              </div>

              {/* Target Handle / Audit URL Message */}
              <div className="space-y-2 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Audit Details & Target URL
                </h4>
                <div className="text-xs text-gray-200 leading-relaxed bg-[#050914] p-3 rounded-xl border border-white/5 font-mono whitespace-pre-wrap">
                  {selectedAudit.message || "No message provided."}
                </div>
              </div>

              {/* Direct Quick Actions */}
              <div className="flex items-center gap-2 pt-2">
                {selectedAudit.phone && (
                  <a
                    href={`tel:${selectedAudit.phone}`}
                    className="flex-1 py-3 rounded-2xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-bold flex items-center justify-center gap-2 transition-all"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Customer</span>
                  </a>
                )}
                {selectedAudit.phone && (
                  <a
                    href={`https://wa.me/${selectedAudit.phone.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(selectedAudit.fullName)},%20we%20received%20your%20request%20for%20a%20Free%20Audit%20at%20Digital%20ORRA.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Send WhatsApp</span>
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-3xl bg-[#0B132B] border border-white/10 p-12 text-center text-gray-400">
              <Layers className="w-10 h-10 mx-auto mb-3 text-gray-500" />
              <h4 className="text-sm font-bold text-white">No Audit Lead Selected</h4>
              <p className="text-xs text-gray-400 mt-1">
                Click on any query from the left list to view full client information and contact them directly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
