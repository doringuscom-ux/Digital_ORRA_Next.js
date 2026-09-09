"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Briefcase,
  Users,
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  X,
  MapPin,
  Clock,
  DollarSign,
  Mail,
  Phone,
  Eye,
  Save
} from "lucide-react";

export default function AdminCareersPage() {
  const [activeTab, setActiveTab] = useState("jobs"); // "jobs" or "applications"
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedDept, setSelectedDept] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [feedback, setFeedback] = useState({ type: "", text: "" });

  // Job Modal State
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [isEditingJob, setIsEditingJob] = useState(false);
  const [editingJobId, setEditingJobId] = useState(null);

  // Application Preview Modal State
  const [selectedApp, setSelectedApp] = useState(null);

  const initialJobForm = {
    title: "",
    department: "Marketing & Paid Ads",
    location: "Panchkula, India",
    experience: "1 - 3 Years",
    type: "Full-Time (On-site)",
    salary: "₹30,000 - ₹50,000 / mo",
    description: "",
    requirementsText: "",
    responsibilitiesText: "",
    isOpen: true,
  };

  const [jobFormData, setJobFormData] = useState(initialJobForm);

  // Fetch Jobs & Applications
  const fetchData = async () => {
    setLoading(true);
    try {
      const [jRes, aRes] = await Promise.all([
        fetch("/api/careers"),
        fetch("/api/careers/applications"),
      ]);

      if (jRes.ok) {
        const jData = await jRes.json();
        setJobs(Array.isArray(jData) ? jData : []);
      }

      if (aRes.ok) {
        const aData = await aRes.json();
        setApplications(Array.isArray(aData) ? aData : []);
      }
    } catch (err) {
      setFeedback({ type: "error", text: "Failed to load data: " + err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Open Create Job Modal
  const handleOpenCreateJob = () => {
    setIsEditingJob(false);
    setEditingJobId(null);
    setJobFormData(initialJobForm);
    setJobModalOpen(true);
  };

  // Open Edit Job Modal
  const handleOpenEditJob = (job) => {
    setIsEditingJob(true);
    setEditingJobId(job._id);
    setJobFormData({
      title: job.title || "",
      department: job.department || "Marketing & Paid Ads",
      location: job.location || "Panchkula, India",
      experience: job.experience || "1 - 3 Years",
      type: job.type || "Full-Time (On-site)",
      salary: job.salary || "Competitive",
      description: job.description || "",
      requirementsText: Array.isArray(job.requirements) ? job.requirements.join("\n") : "",
      responsibilitiesText: Array.isArray(job.responsibilities) ? job.responsibilities.join("\n") : "",
      isOpen: job.isOpen ?? true,
    });
    setJobModalOpen(true);
  };

  // Save Job
  const handleSaveJob = async (e) => {
    e.preventDefault();
    if (!jobFormData.title.trim()) {
      alert("Please provide a job title.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: jobFormData.title,
        department: jobFormData.department,
        location: jobFormData.location,
        experience: jobFormData.experience,
        type: jobFormData.type,
        salary: jobFormData.salary,
        description: jobFormData.description,
        requirements: jobFormData.requirementsText.split("\n").map((r) => r.trim()).filter(Boolean),
        responsibilities: jobFormData.responsibilitiesText.split("\n").map((r) => r.trim()).filter(Boolean),
        isOpen: jobFormData.isOpen,
      };

      let res;
      if (isEditingJob) {
        res = await fetch("/api/careers", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: editingJobId, ...payload }),
        });
      } else {
        res = await fetch("/api/careers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        setFeedback({
          type: "success",
          text: isEditingJob ? "Job opening updated!" : "New job opening published!",
        });
        setJobModalOpen(false);
        fetchData();
      } else {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to save job.");
      }
    } catch (err) {
      setFeedback({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  // Delete Job Opening
  const handleDeleteJob = async (id, title) => {
    if (!window.confirm(`Delete job opening "${title}"?`)) return;

    try {
      const res = await fetch(`/api/careers?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setFeedback({ type: "success", text: `Deleted "${title}" successfully.` });
        setJobs((prev) => prev.filter((j) => j._id !== id));
      }
    } catch (err) {
      alert("Error deleting job: " + err.message);
    }
  };

  // Delete Application
  const handleDeleteApp = async (id, candidateName) => {
    if (!window.confirm(`Remove candidate application from "${candidateName}"?`)) return;

    try {
      const res = await fetch(`/api/careers/applications?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setFeedback({ type: "success", text: `Deleted application from ${candidateName}.` });
        setApplications((prev) => prev.filter((a) => a._id !== id));
        if (selectedApp?._id === id) setSelectedApp(null);
      }
    } catch (err) {
      alert("Error deleting application: " + err.message);
    }
  };

  // Distinct departments only from current jobs
  const departmentsList = [
    "all",
    ...Array.from(new Set(jobs.map((j) => j.department).filter(Boolean))),
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchesDept = selectedDept === "all" || job.department === selectedDept;
    const matchesSearch =
      searchQuery.trim() === "" ||
      (job.title && job.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (job.department && job.department.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDept && matchesSearch;
  });

  const filteredApps = applications.filter((app) => {
    return (
      searchQuery.trim() === "" ||
      (app.fullName && app.fullName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (app.jobTitle && app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (app.email && app.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="w-full max-w-[1520px] mr-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink-400 mb-1">
            <Briefcase className="w-4 h-4" />
            <span>Talent & Hiring Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Manage <span className="text-gradient">Careers & Applications</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
            Post open job positions and view candidate job submissions live.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/join-our-team"
            target="_blank"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 px-4 py-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 transition-all"
          >
            <span>Live Join Us Page</span>
            <ExternalLink className="w-4 h-4" />
          </Link>

          <button
            onClick={handleOpenCreateJob}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#FF3399] to-[#d6006e] hover:from-[#ff4d9d] hover:to-[#e60077] shadow-[0_8px_20px_rgba(255,51,153,0.35)] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Job</span>
          </button>
        </div>
      </div>

      {/* Main Mode Tabs: Open Positions vs Candidate Applications */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab("jobs")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "jobs"
              ? "bg-[#FF3399] text-white shadow-lg shadow-[#FF3399]/25"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Job Openings ({jobs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("applications")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "applications"
              ? "bg-[#FF3399] text-white shadow-lg shadow-[#FF3399]/25"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Candidate Applications ({applications.length})</span>
        </button>
      </div>

      {/* Feedback Toast */}
      {feedback.text && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between gap-3 text-sm font-medium border ${
            feedback.type === "success"
              ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
              : "bg-red-500/15 border-red-500/30 text-red-400"
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === "success" ? (
              <CheckCircle className="w-5 h-5 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0" />
            )}
            <span>{feedback.text}</span>
          </div>
          <button
            onClick={() => setFeedback({ type: "", text: "" })}
            className="text-gray-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* TAB 1: JOB OPENINGS LIST */}
      {activeTab === "jobs" && (
        <div className="space-y-6">
          {/* Department Pills */}
          {departmentsList.length > 1 && (
            <div className="flex flex-wrap items-center gap-2 bg-[#0F1B4C]/40 border border-white/10 p-4 rounded-2xl backdrop-blur-xl">
              {departmentsList.map((dep) => (
                <button
                  key={dep}
                  onClick={() => setSelectedDept(dep)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold capitalize transition-all cursor-pointer ${
                    selectedDept === dep
                      ? "bg-[#FF3399] text-white shadow-md shadow-[#FF3399]/20"
                      : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {dep === "all" ? "All Openings" : dep}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="py-20 text-center text-gray-400 space-y-3">
              <RefreshCw className="w-8 h-8 animate-spin text-[#FF3399] mx-auto" />
              <p className="text-sm font-medium">Loading career openings...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="py-16 text-center rounded-3xl bg-[#0F1B4C]/20 border border-white/10 space-y-3">
              <Briefcase className="w-12 h-12 text-gray-500 mx-auto opacity-50" />
              <h3 className="text-base font-bold text-white">No Job Openings Found</h3>
              <p className="text-xs sm:text-sm text-gray-400">
                Post your first open position using the button above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredJobs.map((job, idx) => (
                <div
                  key={job._id || idx}
                  className="rounded-3xl bg-[#0F1B4C]/45 border border-white/10 p-6 sm:p-7 backdrop-blur-xl shadow-xl hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-5 group"
                >
                  <div className="space-y-3">
                    {/* Header: Dept & Location */}
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs sm:text-[13px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                        {job.department}
                      </span>
                      <span className="text-xs sm:text-[13px] font-mono text-gray-400 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-pink-400" />
                        <span>{job.location || "Panchkula, India"}</span>
                      </span>
                    </div>

                    {/* Job Title */}
                    <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {job.title}
                    </h3>

                    {/* Meta Badges */}
                    <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs sm:text-sm text-gray-200">
                      <span className="px-3 py-1.5 rounded-xl bg-[#0A1128] border border-white/10 flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        <span>{job.experience}</span>
                      </span>
                      <span className="px-3 py-1.5 rounded-xl bg-[#0A1128] border border-white/10 flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-pink-400" />
                        <span>{job.type}</span>
                      </span>
                      <span className="px-3 py-1.5 rounded-xl bg-[#0A1128] border border-white/10 flex items-center gap-1.5 text-emerald-400 font-bold">
                        <DollarSign className="w-4 h-4" />
                        <span>{job.salary}</span>
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-[15px] text-gray-300 line-clamp-3 leading-relaxed pt-1">
                      {job.description}
                    </p>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <span
                      className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${
                        job.isOpen !== false
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                          : "bg-red-500/10 text-red-400 border border-red-500/30"
                      }`}
                    >
                      {job.isOpen !== false ? "Active Hiring" : "Closed"}
                    </span>

                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEditJob(job)}
                        className="px-3.5 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteJob(job._id, job.title)}
                        className="p-2 sm:p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CANDIDATE SUBMISSIONS LIST */}
      {activeTab === "applications" && (
        <div className="space-y-6">
          {loading ? (
            <div className="py-20 text-center text-gray-400 space-y-3">
              <RefreshCw className="w-8 h-8 animate-spin text-[#FF3399] mx-auto" />
              <p className="text-sm font-medium">Loading applications...</p>
            </div>
          ) : filteredApps.length === 0 ? (
            <div className="py-16 text-center rounded-3xl bg-[#0F1B4C]/20 border border-white/10 space-y-3">
              <Users className="w-12 h-12 text-gray-500 mx-auto opacity-50" />
              <h3 className="text-base font-bold text-white">No Applications Received Yet</h3>
              <p className="text-xs sm:text-sm text-gray-400">
                Candidate submissions from /join-our-team will instantly appear here.
              </p>
            </div>
          ) : (
            <div className="rounded-3xl bg-[#0F1B4C]/45 border border-white/10 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#0A1128] border-b border-white/10 text-gray-300 font-bold uppercase text-[11px] tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Candidate</th>
                      <th className="px-6 py-4">Applied Role</th>
                      <th className="px-6 py-4">Contact</th>
                      <th className="px-6 py-4">Experience</th>
                      <th className="px-6 py-4">Applied Date</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-200 font-medium">
                    {filteredApps.map((app) => (
                      <tr key={app._id} className="hover:bg-white/[0.03] transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-white sm:text-base">{app.fullName}</div>
                          {app.currentCompany && (
                            <div className="text-xs text-gray-400">Company: {app.currentCompany}</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-cyan-300 px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/20 inline-block">
                            {app.jobTitle}
                          </span>
                        </td>
                        <td className="px-6 py-4 space-y-1">
                          <div className="flex items-center gap-1.5 text-xs text-gray-300 font-mono">
                            <Mail className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                            <span>{app.email}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-300 font-mono">
                            <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{app.phone}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs font-mono text-gray-300">
                          {app.experience}
                        </td>
                        <td className="px-6 py-4 text-xs font-mono text-gray-400">
                          {new Date(app.createdAt || Date.now()).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedApp(app)}
                              className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View</span>
                            </button>
                            <button
                              onClick={() => handleDeleteApp(app._id, app.fullName)}
                              className="p-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODAL 1: CREATE / EDIT JOB OPENING */}
      {jobModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0A1128] border border-white/20 p-6 sm:p-8 shadow-2xl space-y-6 custom-editor-scrollbar my-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-gradient-to-r from-[#FF3399] to-[#d6006e] text-white">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-white">
                    {isEditingJob ? "Edit Job Opening" : "Post New Job Opening"}
                  </h2>
                  <p className="text-xs text-gray-400">
                    Positions will appear instantly on the live /join-our-team careers portal.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setJobModalOpen(false)}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveJob} className="space-y-6">
              {/* Row 1: Title */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-200 uppercase tracking-wider mb-2">
                  Job Position Title *
                </label>
                <input
                  type="text"
                  required
                  value={jobFormData.title}
                  onChange={(e) => setJobFormData({ ...jobFormData, title: e.target.value })}
                  placeholder="e.g. Senior Performance Marketing Specialist"
                  className="w-full px-5 py-3.5 bg-[#0F1B4C]/80 border border-white/15 rounded-2xl text-white text-base sm:text-lg font-bold focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Row 2: Department, Location, Type */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs sm:text-[13px] font-bold text-gray-200 uppercase tracking-wider mb-2">
                    Department *
                  </label>
                  <input
                    type="text"
                    required
                    value={jobFormData.department}
                    onChange={(e) => setJobFormData({ ...jobFormData, department: e.target.value })}
                    placeholder="e.g. Marketing, Growth, Tech"
                    className="w-full px-4 py-3 bg-[#0F1B4C]/80 border border-white/15 rounded-xl text-white text-sm font-medium focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-[13px] font-bold text-gray-200 uppercase tracking-wider mb-2">
                    Job Location
                  </label>
                  <input
                    type="text"
                    value={jobFormData.location}
                    onChange={(e) => setJobFormData({ ...jobFormData, location: e.target.value })}
                    placeholder="Panchkula, India"
                    className="w-full px-4 py-3 bg-[#0F1B4C]/80 border border-white/15 rounded-xl text-white text-sm font-medium focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-[13px] font-bold text-gray-200 uppercase tracking-wider mb-2">
                    Employment Type
                  </label>
                  <input
                    type="text"
                    value={jobFormData.type}
                    onChange={(e) => setJobFormData({ ...jobFormData, type: e.target.value })}
                    placeholder="Full-Time (On-site)"
                    className="w-full px-4 py-3 bg-[#0F1B4C]/80 border border-white/15 rounded-xl text-white text-sm font-medium focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Row 3: Experience & Salary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-[13px] font-bold text-gray-200 uppercase tracking-wider mb-2">
                    Experience Level
                  </label>
                  <input
                    type="text"
                    value={jobFormData.experience}
                    onChange={(e) => setJobFormData({ ...jobFormData, experience: e.target.value })}
                    placeholder="e.g. 2 - 4 Years"
                    className="w-full px-4 py-3 bg-[#0F1B4C]/80 border border-white/15 rounded-xl text-white text-sm font-medium focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-[13px] font-bold text-gray-200 uppercase tracking-wider mb-2">
                    Salary / Compensation
                  </label>
                  <input
                    type="text"
                    value={jobFormData.salary}
                    onChange={(e) => setJobFormData({ ...jobFormData, salary: e.target.value })}
                    placeholder="e.g. ₹35,000 - ₹60,000 / mo"
                    className="w-full px-4 py-3 bg-[#0F1B4C]/80 border border-white/15 rounded-xl text-emerald-400 font-bold text-sm focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              {/* Row 4: Description */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-gray-200 uppercase tracking-wider mb-2">
                  Job Overview Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={jobFormData.description}
                  onChange={(e) => setJobFormData({ ...jobFormData, description: e.target.value })}
                  placeholder="Overview of the role and key goals..."
                  className="w-full px-4 py-3 bg-[#0F1B4C]/80 border border-white/15 rounded-xl text-white text-sm leading-relaxed focus:outline-none focus:border-[#FF3399]"
                />
              </div>

              {/* Row 5: Requirements & Responsibilities (line by line) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-200 uppercase tracking-wider mb-2">
                    Key Requirements (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={jobFormData.requirementsText}
                    onChange={(e) => setJobFormData({ ...jobFormData, requirementsText: e.target.value })}
                    placeholder="2+ years running profitable ad campaigns&#10;Proficiency in Meta Pixel & GA4&#10;Analytical mindset"
                    className="w-full px-4 py-3 bg-[#0F1B4C]/80 border border-white/15 rounded-xl text-white text-xs sm:text-sm leading-relaxed focus:outline-none focus:border-cyan-400 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-200 uppercase tracking-wider mb-2">
                    Key Responsibilities (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={jobFormData.responsibilitiesText}
                    onChange={(e) => setJobFormData({ ...jobFormData, responsibilitiesText: e.target.value })}
                    placeholder="Manage daily ad spend across client accounts&#10;A/B test creatives & hooks&#10;Deliver weekly reports"
                    className="w-full px-4 py-3 bg-[#0F1B4C]/80 border border-white/15 rounded-xl text-white text-xs sm:text-sm leading-relaxed focus:outline-none focus:border-cyan-400 font-sans"
                  />
                </div>
              </div>

              {/* Status Switch */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                <input
                  type="checkbox"
                  id="isOpenCheckbox"
                  checked={jobFormData.isOpen}
                  onChange={(e) => setJobFormData({ ...jobFormData, isOpen: e.target.checked })}
                  className="w-4 h-4 accent-[#FF3399] rounded cursor-pointer"
                />
                <label htmlFor="isOpenCheckbox" className="text-sm font-semibold text-gray-200 cursor-pointer">
                  Position is actively open for hiring
                </label>
              </div>

              {/* Footer Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setJobModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-white/15 text-xs sm:text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#FF3399] to-[#d6006e] hover:from-[#ff4d9d] hover:to-[#e60077] shadow-[0_8px_20px_rgba(255,51,153,0.35)] transition-all cursor-pointer disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Saving Job...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>{isEditingJob ? "Save Changes" : "Publish Job"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: VIEW APPLICATION DETAILS */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0A1128] border border-white/20 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono uppercase text-pink-400 font-bold">
                  Candidate Application
                </span>
                <h2 className="text-xl font-black text-white">{selectedApp.fullName}</h2>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#0F1B4C]/50 border border-white/10">
                <div>
                  <span className="text-gray-400 block text-[11px] uppercase">Applied Role:</span>
                  <span className="font-bold text-cyan-300">{selectedApp.jobTitle}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px] uppercase">Experience:</span>
                  <span className="font-bold text-white">{selectedApp.experience}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px] uppercase">Email:</span>
                  <span className="font-bold text-white">{selectedApp.email}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px] uppercase">Phone:</span>
                  <span className="font-bold text-white">{selectedApp.phone}</span>
                </div>
              </div>

              {selectedApp.portfolioLink && (
                <div>
                  <span className="text-gray-400 block text-xs font-bold uppercase mb-1">
                    Portfolio / Website Link:
                  </span>
                  <a
                    href={selectedApp.portfolioLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline flex items-center gap-1 font-mono break-all"
                  >
                    <span>{selectedApp.portfolioLink}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              )}

              {selectedApp.resumeUrl && (
                <div>
                  <span className="text-gray-400 block text-xs font-bold uppercase mb-1">
                    Resume / CV Link:
                  </span>
                  <a
                    href={selectedApp.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-pink-400 hover:underline flex items-center gap-1 font-mono break-all"
                  >
                    <span>{selectedApp.resumeUrl}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              )}

              {selectedApp.coverLetter && (
                <div>
                  <span className="text-gray-400 block text-xs font-bold uppercase mb-1">
                    Cover Letter / Candidate Note:
                  </span>
                  <div className="p-4 rounded-2xl bg-[#0F1B4C]/40 border border-white/10 text-gray-200 leading-relaxed whitespace-pre-wrap">
                    {selectedApp.coverLetter}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
