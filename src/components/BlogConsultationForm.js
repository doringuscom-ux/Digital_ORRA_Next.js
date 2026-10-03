"use client";

import React, { useState } from 'react';
import { User, Phone, Mail, FileText, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

export default function BlogConsultationForm({ articleTitle, slug }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    message: ''
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  const handleConsultationSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError('Please fill in Name, Email and Description.');
      return;
    }

    setFormSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          service: `Consultation from Blog: ${articleTitle || slug || 'Article'}`
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFormSuccess(true);
        setFormData({ fullName: '', phone: '', email: '', message: '' });
      } else {
        setFormError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setFormError('Network error. Please try again later.');
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="sidebar-widget consultation-widget">
      <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-slate-100">
        <h3 className="!text-[1.18rem] !font-black !text-slate-900 tracking-tight !mb-0 !pb-0 !border-0 flex items-center gap-2">
          <span>Book Free Consultation</span>
        </h3>
      </div>

      {formSuccess ? (
        <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-center space-y-2.5 animate-fade-in shadow-sm">
          <CheckCircle2 className="w-9 h-9 text-emerald-600 mx-auto" />
          <h4 className="font-extrabold text-emerald-900 text-sm">Thank You!</h4>
          <p className="text-xs text-emerald-700 leading-relaxed font-medium">
            Your request has been received. Our team will contact you shortly.
          </p>
          <button
            type="button"
            onClick={() => setFormSuccess(false)}
            className="text-xs text-pink-600 font-bold hover:underline pt-1 inline-block"
          >
            Submit another response
          </button>
        </div>
      ) : (
        <form onSubmit={handleConsultationSubmit} className="space-y-3.5">
          {formError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold">
              {formError}
            </div>
          )}

          {/* Name Input */}
          <div>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full text-[13px] font-medium px-3.5 py-2.5 pl-9 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-500/20 transition-all shadow-xs"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Phone Number Input */}
          <div>
            <div className="relative">
              <input
                type="tel"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full text-[13px] font-medium px-3.5 py-2.5 pl-9 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-500/20 transition-all shadow-xs"
              />
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Gmail / Email Input */}
          <div>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full text-[13px] font-medium px-3.5 py-2.5 pl-9 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-500/20 transition-all shadow-xs"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Description / Message Input */}
          <div>
            <div className="relative">
              <textarea
                rows={3}
                required
                placeholder="Tell us about your project or consultation requirements..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full text-[13px] font-medium px-3.5 py-2.5 pl-9 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-500/20 transition-all resize-none shadow-xs"
              />
              <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formSubmitting}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#FF007A] via-[#EA007A] to-[#D00068] text-white text-[13px] font-black tracking-wide flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(255,0,122,0.32)] hover:shadow-[0_10px_25px_rgba(255,0,122,0.48)] hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-60"
          >
            {formSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Submit Consultation</span>
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
