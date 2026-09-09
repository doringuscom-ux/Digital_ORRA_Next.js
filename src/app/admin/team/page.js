"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Plus,
  Upload,
  Search,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  X,
  Users,
  Image as ImageIcon
} from "lucide-react";

export default function AdminTeamPage() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [feedback, setFeedback] = useState({ type: "", text: "" });

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fileInputRef = useRef(null);

  const initialFormState = {
    image: "",
    name: "",
    role: "",
    order: 1,
  };

  const [formData, setFormData] = useState(initialFormState);

  // Fetch Team Photos
  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/team");
      if (res.ok) {
        const data = await res.json();
        setTeam(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      showFeedback("error", "Failed to load team photos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const showFeedback = (type, text) => {
    setFeedback({ type, text });
    setTimeout(() => setFeedback({ type: "", text: "" }), 4000);
  };

  // Cloudinary Direct Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      if (!res.ok) throw new Error("Upload failed. Check Cloudinary settings.");
      const data = await res.json();
      setFormData((prev) => ({ ...prev, image: data.url }));
      showFeedback("success", "Photo uploaded successfully!");
    } catch (err) {
      alert("Error uploading photo: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  // Open Create Modal
  const handleOpenCreate = () => {
    setIsEditing(false);
    setEditingId(null);
    const nextOrder = team.length > 0 ? Math.max(...team.map((t) => Number(t.order) || 0)) + 1 : 1;
    setFormData({ ...initialFormState, order: nextOrder });
    setModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (item) => {
    setIsEditing(true);
    setEditingId(item._id);
    setFormData({
      image: item.image || "",
      name: item.name || "",
      role: item.role || "",
      order: item.order !== undefined ? item.order : 1,
    });
    setModalOpen(true);
  };

  // Save Photo (Create / Update)
  const handleSaveMember = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please upload or provide a photo URL.");
      return;
    }

    setSaving(true);
    try {
      let res;
      if (isEditing) {
        res = await fetch("/api/team", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: editingId, ...formData }),
        });
      } else {
        res = await fetch("/api/team", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save");
      }

      showFeedback("success", isEditing ? "Photo details updated!" : "New photo added to Our Team!");
      setModalOpen(false);
      fetchTeam();
    } catch (err) {
      showFeedback("error", err.message);
    } finally {
      setSaving(false);
    }
  };

  // Delete Photo
  const handleDeleteMember = async (id) => {
    if (!confirm("Are you sure you want to remove this photo?")) return;

    try {
      const res = await fetch(`/api/team?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        showFeedback("success", "Photo removed!");
        fetchTeam();
      } else {
        throw new Error("Failed to delete");
      }
    } catch (err) {
      showFeedback("error", err.message);
    }
  };

  // Move Place (Up / Down)
  const handleMovePosition = async (index, direction) => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= team.length) return;

    const updatedList = [...team];
    const temp = updatedList[index];
    updatedList[index] = updatedList[targetIndex];
    updatedList[targetIndex] = temp;

    const reorderPayload = updatedList.map((item, idx) => ({
      _id: item._id,
      order: idx + 1,
    }));

    setTeam(
      updatedList.map((item, idx) => ({
        ...item,
        order: idx + 1,
      }))
    );

    try {
      const res = await fetch("/api/team", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reorder: reorderPayload }),
      });
      if (res.ok) {
        showFeedback("success", "Place position updated!");
      }
    } catch (err) {
      showFeedback("error", "Failed to update position");
      fetchTeam();
    }
  };

  const filteredTeam = team.filter((item) => {
    if (!searchQuery) return true;
    return (
      (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.role && item.role.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="w-full max-w-[1520px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Toast Notification */}
      {feedback.text && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-xl animate-fade-in ${
            feedback.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              : "bg-pink-500/10 border-pink-500/30 text-pink-400"
          }`}
        >
          {feedback.type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span className="text-sm font-semibold">{feedback.text}</span>
        </div>
      )}

      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#0F1B4C] via-[#091336] to-[#0A1128] border border-white/10 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/25">
              Photo Position Manager
            </span>
            <span className="text-xs text-gray-400 font-mono">
              Total Photos: {team.length}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <Users className="w-7 h-7 text-pink-500" />
            Our Team Photos
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-xl">
            Control which photo appears at which place on <Link href="/our-team" target="_blank" className="text-cyan-400 underline hover:text-cyan-300">/our-team</Link>. Use Place Number or Up/Down arrows to change photo order anytime.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/our-team"
            target="_blank"
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <span>Live Preview</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleOpenCreate}
            className="btn-glow-pink px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Photo</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0F1B4C]/50 border border-white/10 flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name or label..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all"
          />
        </div>
        <span className="text-xs text-gray-400 font-mono hidden sm:inline-block">
          Use Place # to control order (1 = 1st card)
        </span>
      </div>

      {/* Grid of Team Photos with Place Badges */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-12">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-80 rounded-3xl bg-white/5 animate-pulse border border-white/10" />
          ))}
        </div>
      ) : filteredTeam.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-white/[0.02] border border-white/10">
          <ImageIcon className="w-12 h-12 text-gray-500 mx-auto mb-3 opacity-60" />
          <h3 className="text-lg font-bold text-white mb-1">No Photos Uploaded</h3>
          <p className="text-xs text-gray-400 mb-6">Upload photos and set their display order.</p>
          <button onClick={handleOpenCreate} className="btn-glow-pink px-5 py-2.5 text-xs font-bold rounded-xl">
            Upload First Photo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {filteredTeam.map((member, index) => (
            <div
              key={member._id}
              className="group relative rounded-2xl bg-gradient-to-b from-[#111C3D] via-[#0B132B] to-[#070D1E] border border-white/15 hover:border-cyan-400/60 overflow-hidden transition-all duration-300 shadow-xl flex flex-col justify-between hover:-translate-y-1"
            >
              {/* Place Badge */}
              <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#0A1128]/90 border border-white/20 backdrop-blur-md shadow-lg">
                <span className="text-[11px] font-mono font-black text-cyan-300">
                  Place #{member.order !== undefined ? member.order : index + 1}
                </span>
              </div>

              {/* Photo Showcase Area */}
              <div className="relative w-full aspect-square overflow-hidden bg-[#050B18]">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name || `Photo ${index + 1}`}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <ImageIcon className="w-12 h-12 opacity-40" />
                  </div>
                )}

                {/* Quick Move Re-ordering Controls */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/70 backdrop-blur-md p-1.5 rounded-xl border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleMovePosition(index, "up")}
                    disabled={index === 0}
                    title="Move to earlier place"
                    className="p-1 rounded-lg hover:bg-white/20 text-white disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleMovePosition(index, "down")}
                    disabled={index === team.length - 1}
                    title="Move to later place"
                    className="p-1 rounded-lg hover:bg-white/20 text-white disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 flex items-center justify-between border-t border-white/10 bg-[#0B132B]">
                <div>
                  <div className="text-sm font-bold text-white truncate max-w-[150px]">
                    {member.name || `Photo #${member.order}`}
                  </div>
                  {member.role && (
                    <div className="text-xs text-gray-400 truncate max-w-[150px]">
                      {member.role}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(member)}
                    title="Edit Photo / Place"
                    className="p-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-gray-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-400/30 transition-all"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteMember(member._id)}
                    title="Delete Photo"
                    className="p-2 rounded-xl bg-white/5 hover:bg-pink-500/20 text-gray-300 hover:text-pink-400 border border-white/10 hover:border-pink-500/30 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#0F1B4C] border border-white/20 p-6 sm:p-8 shadow-2xl my-8">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse"></span>
              <h2 className="text-xl font-black text-white">
                {isEditing ? "Edit Photo Placement" : "Upload Team Photo"}
              </h2>
            </div>

            <form onSubmit={handleSaveMember} className="space-y-4">
              {/* Photo Upload */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Photo * (Upload or Paste URL)
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative flex-1 w-full">
                    <input
                      type="text"
                      required
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="Paste image URL or click Upload"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 text-xs font-bold flex items-center justify-center gap-2 transition-all flex-shrink-0 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploading ? "Uploading..." : "Upload Photo"}</span>
                  </button>
                </div>

                {formData.image && (
                  <div className="mt-3 flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-14 h-16 rounded-lg object-cover object-top border border-white/20"
                    />
                    <div>
                      <span className="text-xs font-bold text-white block">Photo Selected</span>
                      <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Ready for display
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Display Place Number */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Display Place / Order Number *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                  placeholder="1 = First place, 2 = Second place..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
                <span className="text-[10px] text-gray-400 mt-1 block">
                  Determines the exact card position on the page (1 = 1st card).
                </span>
              </div>

              {/* Optional Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Aman Sharma"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Designation (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Creative Lead"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-glow-pink px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-lg transition-all"
                >
                  {saving ? "Saving..." : isEditing ? "Update Photo" : "Save Photo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
