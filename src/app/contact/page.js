"use client";

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DynamicSeoHead from '../../components/DynamicSeoHead';
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  ArrowUpRight,
  MessageSquare,
  HelpCircle,
  Phone,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Zap,
  Award
} from 'lucide-react';

const BUDGETS = [
  'Under ₹10,000',
  '₹10,000 - ₹25,000',
  '₹25,000 - ₹50,000',
  '₹50,000 - ₹1,00,000',
  '₹1,00,000 - ₹2,00,000',
  '₹2,00,000+'
];

const FAQS = [
  {
    q: "How fast will I hear back from your team?",
    a: "We provide a personal, expert response within 2 hours during active business hours."
  },
  {
    q: "What does the initial consultation cover?",
    a: "Our discovery session is 100% free. We audit your digital presence and outline a tailored scaling plan."
  },
  {
    q: "Do you work with startups or only established brands?",
    a: "Both! We work with growing startups as well as established enterprises seeking digital dominance."
  },
  {
    q: "How do you structure pricing & milestones?",
    a: "We offer transparent milestone-based deliverables as well as monthly performance retainers."
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    budget: BUDGETS[1],
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({
          type: 'success',
          message: 'Thank you! Your request has been sent. We will get back to you within 2 hours.'
        });
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          budget: BUDGETS[1],
          message: ''
        });
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Something went wrong. Please try again.'
        });
      }
    } catch (err) {
      console.error(err);
      setStatus({
        type: 'error',
        message: 'Unable to reach the server. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0A1128] text-white flex flex-col relative selection:bg-[#FF3399]/40 selection:text-white">
      <DynamicSeoHead path="/contact" />
      <Navbar />

      {/* Cyber Grid Background Layer identical to Home Hero */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[var(--color-primary-pink)]/15 blur-[140px] animate-pulse"></div>
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] rounded-full bg-cyan-500/15 blur-[140px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_20%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Hero Header */}
      <section className="relative z-10 pt-32 pb-8 px-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-4 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
          <span>Let's Connect • Digital ORRA</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-3">
          Transform Your Brand Into A{' '}
          <span className="text-gradient drop-shadow-[0_0_25px_rgba(234,0,122,0.4)]">
            Digital Powerhouse
          </span>
        </h1>
        <p className="text-gray-300 text-sm md:text-base max-w-lg mx-auto font-light leading-relaxed">
          Tell us about your brand targets. Our team will engineer a high-impact strategy built for measurable growth.
        </p>
      </section>

      {/* Main Content Grid: Clean 2-Column Split */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">

          {/* Left Column: Direct Action & Information */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-4">

            {/* Direct Connect Box */}
            <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4 border border-white/10">
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">Direct Channels</h2>
                <p className="text-gray-400 text-xs mt-0.5">Reach our strategy desk immediately</p>
              </div>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/919990432321"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-xl bg-white/[0.03] border border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Fastest</div>
                    <div className="text-sm font-bold text-white">Chat on WhatsApp</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* Direct Call Button */}
              <a
                href="tel:+919990432321"
                className="group p-4 rounded-xl bg-white/[0.03] border border-cyan-500/30 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Phone</div>
                    <div className="text-sm font-bold text-white">+91 99904 32321</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* Email Button */}
              <a
                href="mailto:hello@digitalorra.com"
                className="group p-4 rounded-xl bg-white/[0.03] border border-[var(--color-primary-pink)]/30 hover:border-[var(--color-primary-pink)] hover:bg-[var(--color-primary-pink)]/10 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-primary-pink)]/15 border border-[var(--color-primary-pink)]/30 flex items-center justify-center text-[var(--color-primary-pink)] group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-[var(--color-primary-pink)] uppercase tracking-wider">Email</div>
                    <div className="text-sm font-bold text-white">hello@digitalorra.com</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-[var(--color-primary-pink)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>

            {/* Clean Key Highlights */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col gap-3">
              <div className="flex items-center gap-3 text-xs font-semibold text-gray-200">
                <div className="w-7 h-7 rounded-md bg-cyan-500/15 text-cyan-400 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <span>2-Hour Response Time</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-gray-200">
                <div className="w-7 h-7 rounded-md bg-pink-500/15 text-pink-400 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>Strict NDA & 100% Privacy</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-gray-200">
                <div className="w-7 h-7 rounded-md bg-purple-500/15 text-purple-400 flex items-center justify-center flex-shrink-0">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <span>100+ Brands Scaled Globally</span>
              </div>
            </div>

          </div>

          {/* Right Column: Project Brief Form */}
          <div className="md:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 h-full flex flex-col justify-between shadow-2xl">

              <div>
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white tracking-tight">Send Us a Project Brief</h3>
                  <p className="text-gray-400 text-xs mt-0.5">Let us know how we can collaborate</p>
                </div>

                {status.message && (
                  <div className={`p-3 rounded-xl mb-4 text-xs font-medium flex items-center gap-2 border ${status.type === 'success'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                    }`}>
                    {status.type === 'success' ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> : <HelpCircle className="w-4 h-4 flex-shrink-0" />}
                    <span>{status.message}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-[#050B17]/90 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1.5">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#050B17]/90 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone & Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1.5">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 99999 99999"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#050B17]/90 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1.5">
                        Estimated Budget (INR)
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-[#050B17] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors cursor-pointer"
                      >
                        {BUDGETS.map((b) => (
                          <option key={b} value={b} className="bg-[#0A1128] text-white">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-gray-300 font-semibold mb-1.5">
                      Project Details & Goals *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Briefly describe what your brand needs or targets..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#050B17]/90 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-glow-pink w-full py-3 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span>Submit Project Inquiry</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 text-center text-[11px] text-gray-400">
                100% Confidential. We review every project personally within 2 hours.
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Office & Map Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
        <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-pink-500/15 text-pink-400 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Agency Headquarters</h3>
                <p className="text-xs text-gray-400">2nd Floor, SCO 19, Sector 11, Panchkula, Haryana 134117</p>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              Mon – Sat: 9:00 AM – 7:00 PM IST
            </div>
          </div>

          <div className="mt-4 rounded-xl overflow-hidden h-60 sm:h-72 w-full border border-white/10 relative">
            <iframe
              title="Digital ORRA Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d34059.63437186353!2d76.8437218630294!3d30.690810471335936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f953cee3b4fc9%3A0x1530eb9d9658d765!2z8J2Xl_Cdl7bwnZe08J2XtvCdmIHwnZeu8J2XuSDwnZei8J2XpfCdl6XwnZeUIC0g8J2XlfCdl7zwnZe88J2YgPCdmIEg8J2XrPCdl7zwnZiC8J2XvyDwnZeV8J2YgvCdmIDwnZe28J2Xu_Cdl7LwnZiA8J2YgCAmIPCdl5bwnZeu8J2Xv_Cdl7LwnZey8J2XvyDwnZeq8J2XtvCdmIHwnZe1IPCdl5fwnZe28J2XtPCdl7bwnZiB8J2XrvCdl7kg8J2XoPCdl67wnZe_8J2XuPCdl7LwnZiB8J2XtvCdl7vwnZe0LCDwnZea8J2Xv_Cdl67wnZe98J2XtfCdl7bwnZewIPCdl5fwnZey8J2YgPCdl7bwnZe08J2Xu_Cdl7bwnZe78J2XtA!5e1!3m2!1sen!2sin!4v1788847537624!5m2!1sen!2sin"
              className="w-full h-full border-0 filter invert-[0.9] hue-rotate-[180deg] contrast-[1.2] opacity-85 hover:opacity-100 transition-opacity"
              loading="lazy"
              allowFullScreen=""
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Quick FAQ Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 w-full">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Frequently Asked <span className="text-cyan-400">Questions</span>
          </h2>
        </div>

        <div className="space-y-2.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full flex items-center justify-between p-4 text-left cursor-pointer hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-semibold text-white text-xs sm:text-sm pr-3">
                    {faq.q}
                  </span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-white/5 border border-white/10 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-pink-400' : 'text-cyan-400'}`}>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-gray-300 text-xs leading-relaxed border-t border-white/[0.05] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <Footer hideCta={true} />
    </main>
  );
}
