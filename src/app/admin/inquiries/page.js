"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Search,
  RefreshCw,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Briefcase,
  CheckCircle,
  Clock,
  Trash2,
  ExternalLink,
  MessageSquare,
  AlertCircle,
  ChevronDown
} from "lucide-react";

export default function ContactInquiriesPage() {
  const router = useRouter();
  const isClient = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState(null);
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

    async function loadInquiries() {
      try {
        const res = await fetch("/api/contact");
        if (res.ok) {
          const json = await res.json();
          const list = Array.isArray(json.data) ? json.data : (Array.isArray(json) ? json : []);
          if (isSubscribed) {
            setInquiries(list);
            setSelectedInquiry((prev) => prev || (list.length > 0 ? list[0] : null));
            setLoading(false);
          }
        }
      } catch (err) {
        console.error("Failed to load inquiries:", err);
        if (isSubscribed) setLoading(false);
      }
    }

    loadInquiries();

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
        setInquiries((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedInquiry?._id === id) {
          setSelectedInquiry((prev) => ({ ...prev, status: newStatus }));
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

  // Delete Inquiry
  const handleDeleteInquiry = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer inquiry?")) return;

    setActionLoading(true);
    try {
      const res = await fetch(`/api/contact/manage?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const updated = inquiries.filter((item) => item._id !== id);
        setInquiries(updated);
        setSelectedInquiry(updated.length > 0 ? updated[0] : null);
        setFeedback({ type: "success", text: "Inquiry removed successfully." });
      } else {
        setFeedback({ type: "error", text: "Failed to delete inquiry." });
      }
    } catch (err) {
      setFeedback({ type: "error", text: err.message || "Error deleting." });
    } finally {
      setActionLoading(false);
      setTimeout(() => setFeedback({ type: "", text: "" }), 3000);
    }
  };

  // Filters
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.phone?.includes(searchTerm) ||
      inq.service?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || (inq.status || "new") === statusFilter;

    return matchesSearch && matchesStatus;
  });

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
    <div className="w-full max-w-[1700px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Banner with Total Count & Feedback Toast */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0F1B4C]/40 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#FF3399]/10 border border-[#FF3399]/30 text-xs font-semibold text-[#FF3399] uppercase mb-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3399] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF3399]"></span>
              </span>
              Inquiry Manager
            </div>
            <h2 className="text-2xl font-black text-white">
              Client Messages & Leads
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Read customer queries, call or email them directly, and update inquiry status.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-3 rounded-2xl bg-[#0A1128]/70 border border-white/10 text-center min-w-[100px]">
              <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total</span>
              <span className="text-2xl font-black text-white">{inquiries.length}</span>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-[#0A1128]/70 border border-white/10 text-center min-w-[100px]">
              <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">New</span>
              <span className="text-2xl font-black text-[#FF3399]">
                {inquiries.filter((i) => !i.status || i.status === "new").length}
              </span>
            </div>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback.text && (
          <div
            className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-medium border ${
              feedback.type === "success"
                ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                : "bg-red-500/15 border-red-500/30 text-red-400"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle className="w-5 h-5 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0" />
            )}
            <span>{feedback.text}</span>
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by client name, email, phone, or service..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#0F1B4C]/50 border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FF3399]"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 bg-[#0F1B4C]/50 border border-white/10 rounded-2xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#FF3399] cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="new">New Inquiries</option>
              <option value="in-review">In Review</option>
              <option value="contacted">Contacted</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Master-Detail Split View (2-Column Easy UX) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: List of Inquiries (5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-[#0F1B4C]/40 border border-white/10 p-4 space-y-3 overflow-hidden">
            <div className="px-2 py-1 text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center justify-between">
              <span>Client Inquiries ({filteredInquiries.length})</span>
            </div>

            {loading ? (
              <div className="text-center py-16 text-gray-400">
                <div className="w-6 h-6 border-2 border-[#FF3399] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <span className="text-xs">Loading inquiries...</span>
              </div>
            ) : filteredInquiries.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-30 text-[#FF3399]" />
                <p className="text-sm font-medium">No matching inquiries found.</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1">
                {filteredInquiries.map((inq) => {
                  const isSelected = selectedInquiry?._id === inq._id;
                  const status = inq.status || "new";

                  return (
                    <div
                      key={inq._id}
                      onClick={() => setSelectedInquiry(inq)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-gradient-to-r from-[#FF3399]/20 to-[#0F1B4C] border-[#FF3399] shadow-[0_0_15px_rgba(255,51,153,0.2)]"
                          : "bg-[#0A1128]/50 border-white/10 hover:border-white/20 hover:bg-[#0A1128]/80"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="font-bold text-white text-sm truncate">
                          {inq.fullName || "Anonymous Client"}
                        </h3>
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${getStatusBadge(
                            status
                          )}`}
                        >
                          {status}
                        </span>
                      </div>

                      <p className="text-xs text-cyan-400 font-medium truncate mb-2">
                        {inq.service || "General Consultation"}
                      </p>

                      <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-3">
                        {inq.message || "No specific message provided."}
                      </p>

                      <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-white/5">
                        <span className="truncate">{inq.email}</span>
                        <span>
                          {inq.createdAt
                            ? new Date(inq.createdAt).toLocaleDateString()
                            : "Recent"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Complete Inquiry Detail Card (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-[#0F1B4C]/50 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
            {selectedInquiry ? (
              <>
                {/* Detail Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-black text-white">
                        {selectedInquiry.fullName || "Anonymous"}
                      </h2>
                      <span
                        className={`text-xs font-bold uppercase px-3 py-1 rounded-full border ${getStatusBadge(
                          selectedInquiry.status
                        )}`}
                      >
                        {selectedInquiry.status || "new"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-gray-500" />
                      Submitted on:{" "}
                      {selectedInquiry.createdAt
                        ? new Date(selectedInquiry.createdAt).toLocaleString("en-US", {
                            dateStyle: "full",
                            timeStyle: "short",
                          })
                        : "Recent"}
                    </p>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteInquiry(selectedInquiry._id)}
                    disabled={actionLoading}
                    className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-all cursor-pointer flex items-center gap-2 text-xs font-bold self-start sm:self-center"
                    title="Delete this inquiry"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>

                {/* Quick Contact & Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email Action */}
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-[#0A1128]/70 border border-white/10 hover:border-cyan-400/50 transition-all group"
                  >
                    <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-400 group-hover:scale-105 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                        Send Email
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-white truncate block">
                        {selectedInquiry.email}
                      </span>
                    </div>
                  </a>

                  {/* Phone / Call Action */}
                  {selectedInquiry.phone ? (
                    <a
                      href={`tel:${selectedInquiry.phone}`}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-[#0A1128]/70 border border-white/10 hover:border-emerald-400/50 transition-all group"
                    >
                      <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 group-hover:scale-105 transition-transform">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div className="overflow-hidden">
                        <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                          Call Client
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-white truncate block">
                          {selectedInquiry.phone}
                        </span>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#0A1128]/40 border border-white/5 opacity-60">
                      <div className="p-2.5 rounded-xl bg-white/5 text-gray-400">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                          Phone Number
                        </span>
                        <span className="text-xs text-gray-400">Not provided</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Service & Budget Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#0A1128]/60 border border-white/10">
                    <span className="flex items-center gap-1.5 text-[11px] uppercase font-bold text-gray-400 tracking-wider mb-1">
                      <Briefcase className="w-3.5 h-3.5 text-[#FF3399]" />
                      Requested Service
                    </span>
                    <p className="text-base font-bold text-white">
                      {selectedInquiry.service || "General Inquiry"}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0A1128]/60 border border-white/10">
                    <span className="flex items-center gap-1.5 text-[11px] uppercase font-bold text-gray-400 tracking-wider mb-1">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                      Client Budget
                    </span>
                    <p className="text-base font-bold text-white">
                      {selectedInquiry.budget || "Flexible / Not set"}
                    </p>
                  </div>
                </div>

                {/* Full Message Box */}
                <div className="p-5 rounded-2xl bg-[#0A1128]/80 border border-white/10 space-y-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Full Customer Message:
                  </span>
                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal whitespace-pre-wrap">
                    {selectedInquiry.message || "No message content."}
                  </p>
                </div>

                {/* Status Changer Buttons */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Update Inquiry Status:
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      { id: "new", label: "Mark as New", color: "hover:border-[#FF3399]" },
                      { id: "in-review", label: "In Review", color: "hover:border-amber-500" },
                      { id: "contacted", label: "Client Contacted", color: "hover:border-emerald-500" },
                      { id: "closed", label: "Mark Closed", color: "hover:border-gray-500" },
                    ].map((btn) => {
                      const isActive = (selectedInquiry.status || "new") === btn.id;
                      return (
                        <button
                          key={btn.id}
                          disabled={actionLoading}
                          onClick={() => handleUpdateStatus(selectedInquiry._id, btn.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                            isActive
                              ? "bg-white text-slate-900 border-white shadow-lg"
                              : `bg-white/5 text-gray-300 border-white/10 ${btn.color} hover:text-white`
                          }`}
                        >
                          {btn.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-24 text-gray-400">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-20 text-[#FF3399]" />
                <p className="text-base font-bold text-gray-300">No Inquiry Selected</p>
                <p className="text-xs text-gray-500 mt-1">Select an inquiry from the left list to view full details.</p>
              </div>
            )}
          </div>
        </div>
    </div>
  );
}
