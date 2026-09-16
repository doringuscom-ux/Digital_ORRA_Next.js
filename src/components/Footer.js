"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight
} from 'lucide-react';

const FacebookIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function Footer({ hideCta = false }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#070E22] pt-12 md:pt-20 overflow-hidden border-t border-white/10">
      
      {/* Ambient Top Light Beam & Glow */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-b from-white/[0.05] via-cyan-500/[0.06] to-transparent rounded-full blur-[140px] pointer-events-none z-0"></div>

      {/* Absolute Massive Background Watermark */}
      <div className="absolute top-1/2 left-0 w-full flex justify-center -translate-y-1/2 pointer-events-none select-none z-0 opacity-25 mix-blend-screen">
        <div className="w-[120%] overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-marquee" style={{ animationDuration: '40s' }}>
            {[1, 2, 3].map((i) => (
              <span key={i} className="text-[12vw] font-black text-transparent bg-clip-text bg-gradient-to-b from-white/[0.06] to-transparent uppercase tracking-tight px-4">
                DIGITAL ORRA • WE BUILD DIGITAL DOMINANCE • 
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Radiant Glowing Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-pink-500/15 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '12s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-purple-600/15 rounded-full blur-[150px]"></div>
      </div>

      {/* Subtle White Tech Grid Overlay for Depth & Light */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff07_1px,transparent_1px),linear-gradient(to_bottom,#ffffff07_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>

      <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* Massive Typographic CTA (Hidden on Contact Page) */}
        {!hideCta && (
          <div className="flex flex-col md:flex-row items-center justify-between pb-8 md:pb-16 border-b border-white/10 mb-10 md:mb-16 gap-6 md:gap-8">
            <div className="group cursor-default text-center md:text-left w-full md:w-auto">
              <h2 className="text-3xl sm:text-4xl md:text-7xl lg:text-[6rem] font-black tracking-tight md:tracking-tighter text-white leading-tight md:leading-none">
                LET'S BUILD
                <br className="hidden sm:inline" />{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                  SOMETHING GREAT
                </span>
              </h2>
            </div>
            
            <div className="hidden md:block flex-shrink-0">
              <Link 
                href="/contact" 
                className="group relative inline-flex items-center justify-center w-40 h-40 md:w-48 md:h-48 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="flex flex-col items-center gap-2 relative z-10 text-white">
                  <span className="font-bold tracking-widest uppercase text-sm">Start</span>
                  <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform duration-500" />
                  <span className="font-bold tracking-widest uppercase text-sm">Project</span>
                </div>
                
                {/* Spinning text ring */}
                <div className="absolute inset-2 border-[0.5px] border-white/10 rounded-full group-hover:rotate-180 transition-transform duration-1000 ease-in-out"></div>
              </Link>
            </div>
          </div>
        )}

        {/* 4-Column Grid Layout with enhanced proportion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 pb-16">
          
          {/* Column 1: Brand Info (Span 4) */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:pr-6">
            <Link href="/" className="inline-block group w-max">
              <div className="bg-white px-3.5 py-2.5 rounded-xl inline-block shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300">
                <Image 
                  src="/DO JPG.jpeg" 
                  alt="Digital ORRA Logo" 
                  title="Digital ORRA Logo"
                  width={195} 
                  height={62} 
                  style={{ width: "auto", height: "auto" }}
                  className="object-contain max-h-[58px] sm:max-h-[64px]"
                />
              </div>
            </Link>
            
            <p className="text-gray-400 text-sm leading-relaxed font-light max-w-sm">
              Architects of digital dominance. Empowering brands with cutting-edge marketing, AI integrations, and high-performance development.
            </p>
            
            <div className="flex items-center gap-3 mt-2">
              {[
                { name: 'Facebook', href: 'https://www.facebook.com/digitalorra', Icon: FacebookIcon, color: 'hover:text-blue-400 hover:border-blue-400/60 hover:bg-blue-500/15 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]' },
                { name: 'Twitter', href: 'https://x.com/Digital_ORRA', Icon: TwitterIcon, color: 'hover:text-cyan-400 hover:border-cyan-400/60 hover:bg-cyan-500/15 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]' },
                { name: 'Instagram', href: 'https://www.instagram.com/digitalorra/', Icon: InstagramIcon, color: 'hover:text-pink-400 hover:border-pink-400/60 hover:bg-pink-500/15 hover:shadow-[0_0_15px_rgba(236,72,153,0.4)]' },
                { name: 'LinkedIn', href: 'https://www.linkedin.com/company/digitalorra', Icon: LinkedinIcon, color: 'hover:text-sky-400 hover:border-sky-400/60 hover:bg-sky-500/15 hover:shadow-[0_0_15px_rgba(14,165,233,0.4)]' }
              ].map((Social, idx) => (
                <a
                  key={idx}
                  href={Social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit Digital ORRA on ${Social.name}`}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border border-white/25 bg-white/10 text-white hover:scale-110 transition-all duration-300 ${Social.color}`}
                >
                  <Social.Icon className="w-4 h-4 text-gray-100 group-hover:text-current" />
                </a>
              ))}
            </div>
          </div>

          {/* Wrapper for Column 2 & 3: 2 columns on mobile phone, natural separate columns on md/lg */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:contents">
            {/* Column 2: Useful Links (Span 2) */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-bold text-xs sm:text-sm tracking-wider uppercase mb-5 md:mb-8 flex items-center gap-2">
                <span>Useful Links</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              </h4>
              <ul className="flex flex-col gap-3 sm:gap-3.5">
                {[
                  { name: 'Our Locations', href: '/locations' },
                  { name: 'About Us', href: '/about-us' },
                  { name: 'Company Profile', href: '/company-profile' },
                  { name: 'Our Services', href: '/services' },
                  { name: 'Our Team', href: '/our-team' },
                  { name: 'Join Our Team', href: '/join-our-team' },
                  { name: 'Contact Us', href: '/contact' }
                ].map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-gray-300 hover:text-white text-xs sm:text-sm flex items-center group transition-colors">
                      <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-cyan-400 mr-2.5 transition-all duration-300"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300 font-medium">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Explore ORRA (Span 2) */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-bold text-xs sm:text-sm tracking-wider uppercase mb-5 md:mb-8 flex items-center gap-2">
                <span>Explore ORRA</span>
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
              </h4>
              <ul className="flex flex-col gap-3 sm:gap-3.5">
                {[
                  { name: 'Academy Courses', href: '/courses' },
                  { name: 'Agency Gallery', href: '/gallery' },
                  { name: 'Client Testimonials', href: '/testimonial' },
                  { name: 'Latest Insights & Blog', href: '/blog' },
                  { name: 'Featured Work', href: '/portfolio' },
                  { name: 'Workshops', href: '/skill-development-workshop' },
                  { name: 'Help & FAQs', href: '/faqs' }
                ].map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-gray-300 hover:text-white text-xs sm:text-sm flex items-center group transition-colors">
                      <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-pink-400 mr-2.5 transition-all duration-300"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300 font-medium">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4: Connect */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h4 className="text-white font-bold text-xs sm:text-sm tracking-wider uppercase mb-1 md:mb-2 flex items-center gap-2">
              <span>Connect</span>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
            </h4>
            
            <ul className="flex flex-col gap-5">
              {/* Address */}
              <li className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-cyan-300 shadow-sm">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-sm font-semibold leading-snug">
                    SCO 19, Sector 11, Panchkula, Haryana 134109
                  </span>
                  <span className="text-[12.5px] text-gray-300 mt-1 leading-relaxed">
                    <strong className="text-cyan-300 font-semibold">Offices:</strong> Panchkula, Chandigarh, Mohali, Solan, Zirakpur, Delhi, Canada, USA
                  </span>
                </div>
              </li>

              {/* Phone Numbers */}
              <li className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-purple-300 shadow-sm">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col gap-1 text-sm">
                  <a href="tel:+919896384224" className="text-white font-medium hover:text-cyan-300 transition-colors">
                    +91 98963 84224
                  </a>
                  <a href="tel:+916280458005" className="text-white font-medium hover:text-cyan-300 transition-colors">
                    +91 62804 58005
                  </a>
                </div>
              </li>

              {/* Emails */}
              <li className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-pink-300 shadow-sm">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col gap-1 text-sm">
                  <a href="mailto:info@digitalorra.com" className="text-white font-medium hover:text-pink-300 transition-colors">
                    info@digitalorra.com
                  </a>
                  <a href="mailto:hello@digitalorra.com" className="text-white font-medium hover:text-pink-300 transition-colors">
                    hello@digitalorra.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Minimalist Bottom Bar */}
        <div className="py-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm font-light">
            &copy; {currentYear} Digital ORRA. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-5 sm:gap-6 text-sm font-light text-gray-400">
            <Link href="/locations" className="hover:text-cyan-400 font-medium text-gray-300 transition-colors">Locations</Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/sitemap" className="hover:text-cyan-400 transition-colors">Sitemap</Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
