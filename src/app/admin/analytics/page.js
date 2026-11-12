"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart3,
  CheckCircle,
  AlertCircle,
  X,
  Save,
  RefreshCw,
  ExternalLink,
  Info,
} from "lucide-react";

const GA_ID_PATTERN = /^G-[A-Z0-9]{4,20}$/;

export default function AdminAnalyticsPage() {
  const [gaMeasurementId, setGaMeasurementId] = useState("");
  const [gaEnabled, setGaEnabled] = useState(false);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", text: "" });

  const fetchSettings = () =>
    // Timestamp bypasses the CDN cache so the admin always sees the latest saved value
    fetch(`/api/settings?t=${Date.now()}`, { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load settings.");
        const data = await res.json();
        setGaMeasurementId(data.gaMeasurementId || "");
        setGaEnabled(Boolean(data.gaEnabled));
        setUpdatedAt(data.updatedAt || null);
      })
      .catch((err) => setFeedback({ type: "error", text: err.message }))
      .finally(() => setLoading(false));

  const loadSettings = () => {
    setLoading(true);
    fetchSettings();
  };

  useEffect(() => {
    // Initial load: `loading` already starts as true
    fetchSettings();
  }, []);

  const trimmedId = gaMeasurementId.trim().toUpperCase();
  const idIsValid = trimmedId === "" || GA_ID_PATTERN.test(trimmedId);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!idIsValid) {
      setFeedback({ type: "error", text: "Measurement ID should look like G-XXXXXXXXXX." });
      return;
    }
    if (gaEnabled && !trimmedId) {
      setFeedback({ type: "error", text: "Enter a Measurement ID before enabling tracking." });
      return;
    }

    const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
    if (!token) {
      setFeedback({ type: "error", text: "Admin token missing. Please log in again." });
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ gaMeasurementId: trimmedId, gaEnabled }),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setGaMeasurementId(data.gaMeasurementId || "");
        setGaEnabled(Boolean(data.gaEnabled));
        setUpdatedAt(data.updatedAt || null);
        setFeedback({
          type: "success",
          text: data.gaEnabled
            ? "Google Analytics saved & enabled. Live site is now tracking."
            : "Settings saved. Google Analytics tracking is OFF.",
        });
      } else {
        setFeedback({ type: "error", text: data.message || "Failed to save settings." });
      }
    } catch (err) {
      setFeedback({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const isLive = gaEnabled && trimmedId && idIsValid;

  return (
    <div className="space-y-8 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      {/* Toast Feedback */}
      {feedback.text && (
        <div
          className={`p-4 rounded-xl flex items-center justify-between border backdrop-blur-md ${
            feedback.type === "success"
              ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
              : "bg-red-500/15 border-red-500/30 text-red-300"
          }`}
        >
          <div className="flex items-center gap-3">
            {feedback.type === "success" ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span className="text-sm font-medium">{feedback.text}</span>
          </div>
          <button
            onClick={() => setFeedback({ type: "", text: "" })}
            className="text-gray-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#091122]/90 border border-white/10 p-6 rounded-2xl shadow-xl backdrop-blur-xl">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-cyan-400" />
            Google Analytics
          </h1>
          <p className="text-sm text-gray-400">
            Connect Google Analytics 4 to the live website. No code change or redeploy needed.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${
              isLive
                ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                : "bg-white/5 border-white/15 text-gray-400"
            }`}
          >
            <span className={`h-2 w-2 rounded-full ${isLive ? "bg-emerald-400" : "bg-gray-500"}`} />
            {isLive ? "Tracking ON" : "Tracking OFF"}
          </span>
          <button
            onClick={loadSettings}
            disabled={loading}
            className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all"
            title="Reload settings"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin text-cyan-400" : ""}`} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-10 h-10 border-3 border-[#FF3399] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-gray-400 font-medium">Loading settings...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Settings Form */}
          <form
            onSubmit={handleSave}
            className="lg:col-span-2 space-y-5 p-6 rounded-2xl bg-[#091122]/80 border border-white/10"
          >
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                GA4 Measurement ID
              </label>
              <input
                type="text"
                placeholder="G-XXXXXXXXXX"
                value={gaMeasurementId}
                onChange={(e) => setGaMeasurementId(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-500 text-sm font-mono focus:outline-none transition-colors ${
                  idIsValid ? "border-white/10 focus:border-cyan-400" : "border-red-500/60 focus:border-red-400"
                }`}
              />
              {!idIsValid && (
                <p className="text-[11px] text-red-400">Format should be G- followed by letters/numbers.</p>
              )}
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
              <div>
                <div className="text-sm font-bold text-white">Enable Tracking</div>
                <div className="text-xs text-gray-400">
                  Turn off to stop sending visitor data to Google Analytics.
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={gaEnabled}
                  onChange={(e) => setGaEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10">
              <span className="text-xs text-gray-500">
                {updatedAt ? `Last saved: ${new Date(updatedAt).toLocaleString()}` : "Not saved yet"}
              </span>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF007A] to-[#FF3399] text-white text-sm font-bold shadow-[0_0_20px_rgba(255,0,122,0.4)] transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                {saving ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>Save Settings</span>
              </button>
            </div>
          </form>

          {/* Help */}
          <div className="p-6 rounded-2xl bg-[#091122]/60 border border-white/10 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400" />
              Measurement ID kaise milega
            </h2>
            <ol className="text-xs text-gray-300 space-y-2 list-decimal pl-4 leading-relaxed">
              <li>Google Analytics kholo aur Admin (gear icon) pe jao.</li>
              <li>Data collection → Data streams → apni Web stream select karo (ya nayi banao).</li>
              <li>Upar right side &quot;Measurement ID&quot; (G-XXXXXXXXXX) copy karo.</li>
              <li>Yahan paste karo, Enable Tracking ON karo aur Save dabao.</li>
              <li>
                <span className="text-amber-300 font-semibold">Zaroori:</span> Usi Web stream mein Enhanced
                measurement ke gear icon pe click karke &quot;Page changes based on browser history events&quot; OFF
                karo. Website khud sahi title ke saath page views bhejti hai, ON rehne pe double count hoga.
              </li>
              <li>Check karne ke liye live site kholo aur GA mein Reports → Realtime dekho.</li>
            </ol>
            <a
              href="https://analytics.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
            >
              Open Google Analytics <ExternalLink className="w-3 h-3" />
            </a>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Admin panel ke pages track nahi hote, sirf public website.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
