"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DynamicSeoHead from '../../components/DynamicSeoHead';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight, 
  Send, 
  X, 
  Users, 
  Rocket, 
  HeartHandshake, 
  Coffee,
  AlertCircle,
  FileText
} from 'lucide-react';

export default function JoinOurTeamPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDept, setActiveDept] = useState('all');
  
  // Modal & Form State
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '1 - 3 Years',
    currentCompany: '',
    portfolioLink: '',
    resumeUrl: '',
    coverLetter: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch('/api/careers');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setJobs(data);
          }
        }
      } catch (err) {
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  const departments = [
    { id: 'all', label: 'All Openings' },
    ...Array.from(new Set(jobs.map(j => j.department).filter(Boolean))).map(dep => ({
      id: dep,
      label: dep
    }))
  ];

  const filteredJobs = jobs.filter(j => activeDept === 'all' || j.department === activeDept);

  const handleOpenModal = (job) => {
    setSelectedJob(job);
    setSubmitStatus(null);
    setErrorMessage('');
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
    setSubmitStatus(null);
    setErrorMessage('');
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: selectedJob?._id,
          jobTitle: selectedJob?.title || 'General Application',
          ...formData
        })
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          experience: '1 - 3 Years',
          currentCompany: '',
          portfolioLink: '',
          resumeUrl: '',
          coverLetter: ''
        });
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Failed to submit application. Please try again.');
      }
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#070D1E] text-white flex flex-col relative selection:bg-pink-500 selection:text-white overflow-hidden">
      <DynamicSeoHead path="/join-our-team" />
      {/* Global Navbar */}
      <Navbar />

      {/* Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[12%] left-[10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] animate-pulse duration-1000"></div>
        <div className="absolute top-[35%] right-[10%] w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[160px] animate-pulse duration-700"></div>
        <div className="absolute bottom-[10%] left-[30%] w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[180px]"></div>
      </div>

      {/* Main Header with Edge-to-Edge Watermark */}
      <section className="relative w-full pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        {/* Giant Edge-to-Edge Watermark */}
        <div style={{ pointerEvents: 'none' }} className="absolute top-20 md:top-24 left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden z-0 [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]">
          <span 
            style={{ 
              pointerEvents: 'none',
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.5) 55%, rgba(255, 255, 255, 0.18) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }} 
            className="text-[8vw] md:text-[8.5vw] font-black uppercase tracking-wider whitespace-nowrap select-none"
          >
            JOIN OUR TEAM
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 md:pt-44">
          


          {/* Openings Section Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">Current Open Positions</h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">Found a match? Apply directly online below.</p>
            </div>

            {/* Department Filter Tabs: Open & Clean */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 w-full sm:w-auto">
              {departments.map(dept => (
                <button
                  key={dept.id}
                  onClick={() => setActiveDept(dept.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                    activeDept === dept.id 
                      ? 'bg-gradient-to-r from-[var(--color-primary-pink)] to-pink-600 text-white shadow-[0_0_15px_rgba(255,51,153,0.4)]' 
                      : 'text-gray-300 hover:text-white bg-[#0B132B]/90 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {dept.label}
                </button>
              ))}
            </div>
          </div>

          {/* Job Listings Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-64 rounded-2xl bg-white/[0.02] border border-white/10 animate-pulse"></div>
              ))}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-white/10">
              <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-3 opacity-60" />
              <h3 className="text-lg font-bold text-white mb-1">No open positions in this department</h3>
              <button
                onClick={() => setActiveDept('all')}
                className="mt-3 px-5 py-2 text-xs font-bold rounded-full btn-glow-pink"
              >
                View All Openings
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="group relative rounded-2xl bg-[#091024] hover:bg-[#0C1530] border border-white/[0.08] hover:border-cyan-400/50 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                >
                  <div>
                    {/* Department Tag & Location */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                        {job.department}
                      </span>
                      <span className="text-xs font-medium text-gray-300 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-pink-400" />
                        <span>{job.location}</span>
                      </span>
                    </div>

                    {/* Job Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                      {job.title}
                    </h3>

                    {/* Badges: Type, Experience, Salary */}
                    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-gray-200 mb-4">
                      <span className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{job.experience}</span>
                      </span>
                      <span className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-pink-400" />
                        <span>{job.type}</span>
                      </span>
                      <span className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 flex items-center gap-1.5 text-emerald-400">
                        <DollarSign className="w-3.5 h-3.5" />
                        <span>{job.salary}</span>
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-300 leading-relaxed font-normal mb-6">
                      {job.description}
                    </p>
                  </div>

                  {/* Apply Button */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-400">Immediate Hiring</span>
                    <button
                      onClick={() => handleOpenModal(job)}
                      className="btn-glow-pink px-6 py-2.5 text-xs font-bold rounded-full inline-flex items-center gap-2"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* General Inquiries Bottom Banner */}
          <div className="mt-16 rounded-3xl bg-gradient-to-r from-[#142042] via-[#0D152F] to-[#142042] border border-white/20 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
            <div>
              <span className="text-xs uppercase tracking-wider text-cyan-400 font-bold">Don't See Your Role?</span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">Send Us Your Open Application</h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-xl">
                We are always eager to meet talented media buyers, creative artists, developers, and leaders.
              </p>
            </div>
            <button
              onClick={() => handleOpenModal({ title: 'Open / General Application', department: 'Any Department' })}
              className="btn-glow-pink px-7 py-3 text-xs sm:text-sm font-bold rounded-full shadow-lg flex-shrink-0"
            >
              Submit Open Application
            </button>
          </div>

        </div>
      </section>

      {/* Interactive Job Application Modal Form */}
      {selectedJob && (
        <div 
          onClick={handleCloseModal}
          className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-[#091024] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)] my-8"
          >
            {/* Close Button */}
            <button 
              onClick={handleCloseModal}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 inline-block mb-2">
                {selectedJob.department || 'Job Application'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Apply for {selectedJob.title}
              </h3>
              <p className="text-sm text-gray-300 mt-1">Fill out the form below and our recruitment squad will contact you.</p>
            </div>

            {/* Status Alert */}
            {submitStatus === 'success' ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Application Submitted Successfully!</h4>
                <p className="text-xs text-gray-300 mb-5">Thank you for showing interest in Digital ORRA. Our HR squad will review your profile and reach out soon.</p>
                <button
                  onClick={handleCloseModal}
                  className="btn-glow-pink px-6 py-2.5 text-xs font-bold rounded-full"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {submitStatus === 'error' && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2.5 text-xs text-red-300">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-[#0E1736] border border-white/15 rounded-xl px-4 py-3 text-sm sm:text-base text-white font-medium focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-2">Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. rahul@example.com"
                      className="w-full bg-[#0E1736] border border-white/15 rounded-xl px-4 py-3 text-sm sm:text-base text-white font-medium focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-2">Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-[#0E1736] border border-white/15 rounded-xl px-4 py-3 text-sm sm:text-base text-white font-medium focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-2">Experience Level</label>
                    <select 
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full bg-[#0E1736] border border-white/15 rounded-xl px-4 py-3 text-sm sm:text-base text-white font-medium focus:outline-none focus:border-cyan-400 transition-colors cursor-pointer"
                    >
                      <option value="Fresher" className="bg-[#091024]">Fresher (0 - 1 Year)</option>
                      <option value="1 - 3 Years" className="bg-[#091024]">1 - 3 Years</option>
                      <option value="3 - 5 Years" className="bg-[#091024]">3 - 5 Years</option>
                      <option value="5+ Years" className="bg-[#091024]">5+ Years</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-2">
                      Current Company / College <span className="text-gray-400 font-normal text-xs">(Optional)</span>
                    </label>
                    <input 
                      type="text" 
                      name="currentCompany"
                      value={formData.currentCompany}
                      onChange={handleChange}
                      placeholder="e.g. Agency Name or Freelance"
                      className="w-full bg-[#0E1736] border border-white/15 rounded-xl px-4 py-3 text-sm sm:text-base text-white font-medium focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-2">
                      Portfolio / LinkedIn Link <span className="text-gray-400 font-normal text-xs">(Optional)</span>
                    </label>
                    <input 
                      type="url" 
                      name="portfolioLink"
                      value={formData.portfolioLink}
                      onChange={handleChange}
                      placeholder="https://behance.net/... or linkedin.com/..."
                      className="w-full bg-[#0E1736] border border-white/15 rounded-xl px-4 py-3 text-sm sm:text-base text-white font-medium focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-2">
                    Resume Link (Google Drive / Dropbox) <span className="text-gray-400 font-normal text-xs">(Optional)</span>
                  </label>
                  <input 
                    type="url" 
                    name="resumeUrl"
                    value={formData.resumeUrl}
                    onChange={handleChange}
                    placeholder="https://drive.google.com/file/..."
                    className="w-full bg-[#0E1736] border border-white/15 rounded-xl px-4 py-3 text-sm sm:text-base text-white font-medium focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-2">
                    Why are you excited to join Digital ORRA? <span className="text-gray-400 font-normal text-xs">(Optional)</span>
                  </label>
                  <textarea 
                    name="coverLetter"
                    rows={3}
                    value={formData.coverLetter}
                    onChange={handleChange}
                    placeholder="Tell us briefly about your core strengths and goals..."
                    className="w-full bg-[#0E1736] border border-white/15 rounded-xl p-4 text-sm sm:text-base text-white font-medium focus:outline-none focus:border-cyan-400 transition-colors resize-none leading-relaxed"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-glow-pink w-full py-3 text-sm font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Submitting Application...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Job Application</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Global Footer */}
      <Footer hideCta={true} />
    </main>
  );
}
