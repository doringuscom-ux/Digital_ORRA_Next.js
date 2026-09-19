"use client";
import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Phone, User, Globe, Mail } from 'lucide-react';

export default function AuditModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [auditType, setAuditType] = useState('website-audit');
  const [formData, setFormData] = useState({
    targetUrl: '',
    name: '',
    phone: '',
    email: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const auditOptions = [
    {
      id: 'website-audit',
      title: 'Website Audit',
      desc: 'SEO, speed, technical health & UI performance audit',
      iconImage: '/audit-website.png',
      targetUrl: 'https://audit.digitalorra.com/website-audit',
      placeholder: 'e.g. yourwebsite.com',
      label: 'Website URL',
    },
    {
      id: 'youtube-audit',
      title: 'YouTube Audit',
      desc: 'Channel growth, video SEO, tags & audience engagement',
      iconImage: '/audit-youtube.png',
      targetUrl: 'https://audit.digitalorra.com/youtube-audit',
      placeholder: 'e.g. youtube.com/@yourchannel',
      label: 'YouTube Channel Link / Name',
    },
    {
      id: 'insta-audit',
      title: 'Instagram Audit',
      desc: 'Profile reach, engagement rate, hashtags & follower growth',
      iconImage: '/audit-instagram.png',
      targetUrl: 'https://audit.digitalorra.com/insta-audit',
      placeholder: 'e.g. @yourusername or profile link',
      label: 'Instagram Username / Link',
    },
  ];

  const selectedOption = auditOptions.find(o => o.id === auditType) || auditOptions[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setSubmitting(true);
    const redirectUrl = selectedOption.targetUrl;

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.name,
          phone: formData.phone,
          email: formData.email || `${formData.phone.replace(/[^0-9]/g, '') || 'lead'}@digitalorra-audit.com`,
          service: `Free Audit: ${selectedOption.title}`,
          budget: 'Free Audit Request',
          message: `Free Audit Request for ${selectedOption.title}. Target URL/Handle: ${formData.targetUrl || 'Not specified'}. Phone: ${formData.phone}`,
        }),
      });
      setSubmitted(true);
      // Redirect to selected audit portal
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 1200);
    } catch (err) {
      console.error('Audit submission error:', err);
      window.location.href = redirectUrl;
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setSubmitted(false);
    setFormData({ website: '', name: '', phone: '', email: '' });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
      onClick={handleClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl rounded-3xl bg-gradient-to-b from-[#111A3A] via-[#0A1128] to-[#060B1C] border border-white/20 p-5 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden"
      >
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/15 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Close Button - positioned safely */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          /* Success State */
          <div className="text-center py-10 px-3 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(52,211,153,0.35)] animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight">
              Audit Request Received!
            </h3>
            <p className="text-sm text-gray-300 max-w-sm mx-auto leading-relaxed">
              Thanks <strong className="text-white">{formData.name}</strong>. Opening your live <span className="text-pink-400 font-bold">{selectedOption.title}</span> portal...
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 text-xs text-pink-300 font-bold bg-pink-500/15 px-5 py-2.5 rounded-full border border-pink-500/30 shadow-[0_0_20px_rgba(255,51,153,0.25)]">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-400 animate-ping"></span>
                <span>Connecting live tools...</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="pt-1">
            {/* Clean Modern Header */}
            <div className="mb-6 text-left pr-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-semibold text-pink-400 tracking-wider uppercase">
                  Digital ORRA • Live Audit
                </span>
                <span className="text-gray-600">•</span>
                <span className="text-[11px] font-mono text-gray-400 font-medium">
                  Step {step} of 2
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {step === 1 ? "Select Your Audit Category" : `Get Your Free ${selectedOption.title}`}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300/80 font-normal mt-1 leading-relaxed">
                {step === 1 
                  ? "Choose the platform you want our growth specialists to analyze" 
                  : "Enter your details to receive your customized performance audit"}
              </p>
            </div>

            {/* Step 1: 3-Box Horizontal Grid with Glowing Neon Effect */}
            {step === 1 && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5">
                  {auditOptions.map((opt) => {
                    const isSelected = auditType === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => setAuditType(opt.id)}
                        className={`group relative p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex sm:flex-col items-center justify-between sm:justify-center text-left sm:text-center gap-3.5 ${
                          isSelected
                            ? 'bg-gradient-to-b from-[#1C2652] to-[#121A3B] border-pink-500 shadow-[0_0_30px_rgba(255,51,153,0.35)] scale-[1.02]'
                            : 'bg-[#0B1328]/80 border-white/10 hover:border-pink-500/40 hover:bg-[#101A38]'
                        }`}
                      >
                        {/* Selected Tick Tag in Top Right on Desktop */}
                        {isSelected && (
                          <div className="hidden sm:flex absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-pink-500 items-center justify-center shadow-[0_0_12px_rgba(255,51,153,0.8)]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}

                        {/* Icon Container with glowing aura */}
                        <div className="flex items-center gap-3.5 sm:block">
                          <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl p-2.5 sm:mx-auto flex items-center justify-center transition-transform duration-300 ${
                            isSelected 
                              ? 'bg-pink-500/20 border border-pink-500/40 shadow-[0_0_20px_rgba(255,51,153,0.35)] scale-105' 
                              : 'bg-white/5 border border-white/10 group-hover:scale-105 group-hover:bg-white/10'
                          }`}>
                            <img 
                              src={opt.iconImage} 
                              alt={opt.title} 
                              className="w-full h-full object-contain filter drop-shadow"
                            />
                          </div>

                          {/* Mobile text inside container */}
                          <div className="sm:hidden">
                            <span className={`text-[15px] font-semibold tracking-tight block ${
                              isSelected ? 'text-white' : 'text-gray-200'
                            }`}>
                              {opt.title}
                            </span>
                            <span className="text-[11px] text-gray-400 font-normal">
                              Instant Growth Report
                            </span>
                          </div>
                        </div>

                        {/* Desktop Title */}
                        <div className="hidden sm:block">
                          <span className={`text-sm font-semibold tracking-tight block leading-snug transition-colors ${
                            isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'
                          }`}>
                            {opt.title}
                          </span>
                        </div>

                        {/* Mobile Radio Button */}
                        <div className={`sm:hidden w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? 'border-pink-500 bg-pink-500 shadow-[0_0_10px_rgba(255,51,153,0.8)]'
                            : 'border-white/20'
                        }`}>
                          {isSelected && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Continue Button */}
                <div>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="btn-glow-pink w-full py-3 sm:py-3.5 rounded-2xl font-semibold text-sm sm:text-[15px] flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,51,153,0.4)] hover:scale-[1.01] transition-all cursor-pointer tracking-wide"
                  >
                    <span>Continue with {selectedOption.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: High-Converting Premium Details Form */}
            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Visual Value Props / What they get banner */}
                <div className="relative overflow-hidden p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-[#172352]/90 via-[#10193D]/90 to-[#182353]/90 border border-pink-500/30 shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-pink-500/20 p-2 flex items-center justify-center border border-pink-500/40 shadow-[0_0_15px_rgba(255,51,153,0.3)] shrink-0">
                        <img src={selectedOption.iconImage} alt={selectedOption.title} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs sm:text-sm font-bold text-white tracking-tight">{selectedOption.title}</span>
                          <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">Free • 100%</span>
                        </div>
                        <div className="text-[11px] text-gray-300/80">Instant SEO, Reach & Growth Analysis</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-[11px] font-semibold text-pink-400 hover:text-pink-300 bg-pink-500/10 hover:bg-pink-500/20 px-2.5 py-1 rounded-lg border border-pink-500/20 transition-all cursor-pointer shrink-0"
                    >
                      Change
                    </button>
                  </div>
                </div>

                {/* Target URL / Handle */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-white tracking-wide flex items-center gap-1.5">
                      <span>{selectedOption.label}</span>
                      <span className="text-xs text-gray-400 font-normal">(Optional)</span>
                    </label>
                  </div>
                  <div className="relative group">
                    <Globe className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors pointer-events-none" />
                    <input
                      type="text"
                      placeholder={selectedOption.placeholder}
                      value={formData.targetUrl}
                      onChange={(e) => setFormData({ ...formData, targetUrl: e.target.value })}
                      className="w-full bg-[#131F46] border border-white/25 focus:border-cyan-400 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition-all shadow-inner"
                    />
                  </div>
                </div>

                {/* Two Column Grid for Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-white tracking-wide mb-2">
                      Your Name <span className="text-pink-400 font-bold">*</span>
                    </label>
                    <div className="relative group">
                      <User className="w-4 h-4 text-pink-400 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors pointer-events-none" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#131F46] border border-white/25 focus:border-pink-500 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-pink-500/30 transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-white tracking-wide mb-2">
                      WhatsApp Number <span className="text-pink-400 font-bold">*</span>
                    </label>
                    <div className="relative group">
                      <Phone className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors pointer-events-none" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 98963 84224"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#131F46] border border-white/25 focus:border-emerald-400 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400/30 transition-all shadow-inner"
                      />
                    </div>
                  </div>
                </div>

                {/* Email (Optional) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-white tracking-wide">
                      Email Address <span className="text-xs text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <span className="text-xs text-cyan-300 font-medium">To receive report copy</span>
                  </div>
                  <div className="relative group">
                    <Mail className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors pointer-events-none" />
                    <input
                      type="email"
                      placeholder="e.g. rahul@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#131F46] border border-white/25 focus:border-cyan-400 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition-all shadow-inner"
                    />
                  </div>
                </div>

                {/* Submit & Back Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-3.5 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold transition-all cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-glow-pink flex-1 py-3.5 rounded-2xl font-bold text-sm sm:text-[15px] flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,51,153,0.5)] hover:scale-[1.01] transition-all cursor-pointer disabled:opacity-60 tracking-wide"
                  >
                    <span>{submitting ? 'Connecting Tools...' : `Analyze My ${selectedOption.title.split(' ')[0]} Now`}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Your number is safe. No spam calls or promotional bulk SMS.</span>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
