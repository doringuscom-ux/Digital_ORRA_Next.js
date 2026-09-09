"use client";

import React from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DynamicSeoHead from "../../components/DynamicSeoHead";
import { ShieldCheck, ArrowRight, FileText, CheckCircle2, AlertCircle, PhoneCall, Mail } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#070D1E] text-white selection:bg-pink-500 selection:text-white relative overflow-hidden flex flex-col justify-between">
      <DynamicSeoHead path="/privacy-policy" />
      <Navbar />

      {/* Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[150px] animate-pulse duration-1000"></div>
        <div className="absolute top-[35%] right-[10%] w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[160px] animate-pulse duration-700"></div>
        <div className="absolute bottom-[10%] left-[30%] w-[650px] h-[650px] bg-indigo-600/10 rounded-full blur-[170px]"></div>
      </div>

      {/* Giant Edge-to-Edge Watermark Section */}
      <section className="relative w-full pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div style={{ pointerEvents: "none" }} className="absolute top-20 md:top-24 left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden z-0 [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]">
          <span style={{ pointerEvents: "none" }} className="text-[7.5vw] md:text-[8vw] font-black uppercase tracking-wider whitespace-nowrap select-none text-transparent bg-clip-text bg-gradient-to-b from-white/[0.48] via-white/[0.28] to-white/[0.08]">
            POLICIES & TERMS
          </span>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-28 md:pt-36">

          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider mb-5 shadow-lg shadow-cyan-500/10">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Official Terms & Consumer Protection</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.08] mb-4">
              Privacy & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500">Refund Policy</span>
            </h1>

            <p className="text-sm sm:text-base text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
              Transparency and mutual trust form the cornerstone of our client partnerships. Please review our project execution and refund guidelines below.
            </p>
          </div>

          {/* Scope & Commitment Box */}
          <div className="relative rounded-3xl p-7 sm:p-9 bg-gradient-to-br from-[#111C3D] via-[#0B132B] to-[#070D1E] border border-white/15 shadow-2xl mb-12 group hover:border-cyan-400/50 transition-all">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"></div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white mb-3 tracking-tight">
                  Project Scope & Delivery Agreement
                </h2>
                <p className="text-sm sm:text-[15px] text-gray-200/90 leading-relaxed font-light">
                  All Web Design / Web Development / Mobile Application Development / Software Development / Search Engine Optimization / Digital Marketing / Maintenance of a website are carried out and accepted after total analysis and creation of a complete scope document, in order to ensure that our teams have full understanding of the work needed to be done, eliminating possibilities of any project cancellation / reversal / dispute.
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Clauses List */}
          <div className="space-y-5 mb-16">
            <h3 className="text-lg font-mono uppercase tracking-wider text-pink-400 font-bold px-1">
              Refund & Cancellation Terms
            </h3>

            {/* Clause 1 */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#0B132B]/90 border border-white/10 hover:border-white/20 transition-all flex items-start gap-4 shadow-lg">
              <div className="w-8 h-8 rounded-xl bg-pink-500/15 border border-pink-500/30 text-pink-400 font-mono font-black text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                01
              </div>
              <p className="text-[14.5px] sm:text-[15.5px] text-gray-200 leading-relaxed font-light">
                The client understands that there is work involved to achieve every milestone of the project and completion of every module, a refund would not be possible for the work once assigned to us.
              </p>
            </div>

            {/* Clause 2 (Admin / Processing charges) */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#0B132B]/90 border border-white/10 hover:border-white/20 transition-all flex items-start gap-4 shadow-lg">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono font-black text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                02
              </div>
              <p className="text-[14.5px] sm:text-[15.5px] text-gray-200 leading-relaxed font-light">
                We shall deduct the administrative/processing charges not less than Rs. (amount only) if we are unable to process the application due to non-submission of required documents as per government guidelines or any kind of non-cooperation from the applicant or any other circumstances which restrict us from processing the application.
              </p>
            </div>

            {/* Clause 3 (Government fees) */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#0B132B]/90 border border-white/10 hover:border-white/20 transition-all flex items-start gap-4 shadow-lg">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono font-black text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                03
              </div>
              <p className="text-[14.5px] sm:text-[15.5px] text-gray-200 leading-relaxed font-light">
                If any government fee, duty, challan, or any other sum is paid in the course of processing your registration application, we are not liable to refund such government fees paid in the course of delivering the service. <span className="text-cyan-300 font-normal">(Don’t worry, no government fee shall be deducted until the Government challan or any other payment proof is provided to you.)</span>
              </p>
            </div>

            {/* Clause 4 (Complimentary / discount offers) */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#0B132B]/90 border border-white/10 hover:border-white/20 transition-all flex items-start gap-4 shadow-lg">
              <div className="w-8 h-8 rounded-xl bg-pink-500/15 border border-pink-500/30 text-pink-400 font-mono font-black text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                04
              </div>
              <p className="text-[14.5px] sm:text-[15.5px] text-gray-200 leading-relaxed font-light">
                No refund shall be issued if you have already availed of any complimentary service or discount offer which was attached to the paid service for which you are seeking a refund, such as one-day ad banner publication, software subscription, etc.
              </p>
            </div>

            {/* Clause 5 (Subscription packages) */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#0B132B]/90 border border-white/10 hover:border-white/20 transition-all flex items-start gap-4 shadow-lg">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono font-black text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                05
              </div>
              <p className="text-[14.5px] sm:text-[15.5px] text-gray-200 leading-relaxed font-light">
                No refund shall be possible at any stage with respect to any subscription-based service such as GST return packages or Company annual compliance packages if the same service is partially processed or delivered.
              </p>
            </div>

            {/* Clause 6 (Max Refund Limit) */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#0B132B]/90 border border-white/10 hover:border-white/20 transition-all flex items-start gap-4 shadow-lg">
              <div className="w-8 h-8 rounded-xl bg-pink-500/15 border border-pink-500/30 text-pink-400 font-mono font-black text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                06
              </div>
              <p className="text-[14.5px] sm:text-[15.5px] text-gray-200 leading-relaxed font-light">
                Under any circumstances, the amount of refund cannot exceed the amount paid by the customer.
              </p>
            </div>
          </div>

          {/* Need Assistance Help Desk Box */}
          <div className="rounded-3xl bg-gradient-to-r from-[#142042] via-[#0D152F] to-[#142042] border border-white/20 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
                Have Queries Regarding Billing or Delivery?
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Reach Out to Our Executive Helpdesk
              </h3>
              <p className="text-sm text-gray-300 mt-1 font-light">
                Our support and legal team in Panchkula & Chandigarh is here to assist you with all documentation.
              </p>
            </div>

            <div className="flex items-center gap-4 flex-shrink-0">
              <Link
                href="/contact#form"
                className="btn-glow-pink px-7 py-3.5 text-sm font-bold rounded-full inline-flex items-center gap-2 shadow-[0_0_20px_rgba(255,51,153,0.35)] hover:scale-105 transition-all"
              >
                <span>Contact Helpdesk</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      <Footer hideCta={true} />
    </main>
  );
}
