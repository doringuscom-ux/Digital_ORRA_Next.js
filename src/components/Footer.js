"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Send
} from 'lucide-react';

const FacebookIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function Footer({ hideCta = false }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#020510] pt-24 overflow-hidden border-t border-white/[0.05]">
      
      {/* Absolute Massive Background Watermark */}
      <div className="absolute top-1/2 left-0 w-full flex justify-center -translate-y-1/2 pointer-events-none select-none z-0 opacity-20 mix-blend-screen">
        <div className="w-[120%] overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-marquee" style={{ animationDuration: '40s' }}>
            {[1, 2, 3].map((i) => (
              <span key={i} className="text-[12vw] font-black text-transparent bg-clip-text bg-gradient-to-b from-white/[0.03] to-transparent uppercase tracking-tight px-4">
                DIGITAL ORRA • WE BUILD DIGITAL DOMINANCE • 
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Radiant Glowing Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '12s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-purple-600/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Massive Typographic CTA (Hidden on Contact Page) */}
        {!hideCta && (
          <div className="flex flex-col md:flex-row items-center justify-between pb-16 border-b border-white/10 mb-16 gap-8">
            <div className="group cursor-default">
              <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tighter text-white leading-none">
                LET'S BUILD
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                  SOMETHING GREAT
                </span>
              </h2>
            </div>
            
            <div className="flex-shrink-0">
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

        {/* 4-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-16">
          
          {/* Column 1: Brand Info */}
          <div className="flex flex-col gap-6 lg:pr-4">
            <Link href="/" className="inline-block group w-max">
              <div className="bg-white p-3 rounded-xl inline-block shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-shadow duration-300">
                <Image 
                  src="/DO JPG.jpeg" 
                  alt="Digital ORRA Logo" 
                  width={180} 
                  height={58} 
                  style={{ width: "auto", height: "auto" }}
                  className="object-contain max-h-[58px]"
                />
              </div>
            </Link>
            
            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light max-w-sm">
              We are the architects of digital dominance. Empowering brands with cutting-edge marketing, AI integrations, and high-performance development to crush the competition.
            </p>
            
            <div className="flex items-center gap-3 mt-2">
              {[
                { name: 'Facebook', href: 'https://www.facebook.com/digitalorra', Icon: FacebookIcon, color: 'hover:text-blue-500 hover:border-blue-500' },
                { name: 'Twitter', href: 'https://x.com/Digital_ORRA', Icon: TwitterIcon, color: 'hover:text-cyan-400 hover:border-cyan-400' },
                { name: 'Instagram', href: 'https://www.instagram.com/digitalorra/', Icon: InstagramIcon, color: 'hover:text-pink-500 hover:border-pink-500' },
                { name: 'LinkedIn', href: 'https://www.linkedin.com/company/digitalorra', Icon: LinkedinIcon, color: 'hover:text-blue-600 hover:border-blue-600' }
              ].map((Social, idx) => (
                <a
                  key={idx}
                  href={Social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit Digital ORRA on ${Social.name}`}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border border-white/10 text-gray-500 transition-all duration-300 ${Social.color} hover:bg-white/5`}
                >
                  <Social.Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Useful Links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-8">Useful Links</h4>
            <ul className="flex flex-col gap-4">
              {[
                { name: 'About Us', href: '/about-us' },
                { name: 'Company Profile', href: '/company-profile' },
                { name: 'Our Services', href: '/services' },
                { name: 'Our Team', href: '/our-team' },
                { name: 'Join Our Team', href: '/join-our-team' },
                { name: 'Contact Us', href: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-400 hover:text-cyan-400 text-sm flex items-center group transition-colors">
                    <span className="w-0 group-hover:w-3 h-[1px] bg-cyan-400 mr-0 group-hover:mr-3 transition-all duration-300 ease-out"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Explore ORRA */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-8">Explore ORRA</h4>
            <ul className="flex flex-col gap-4">
              {[
                { name: 'Academy Courses', href: '/courses' },
                { name: 'Agency Gallery', href: '/gallery' },
                { name: 'Client Testimonials', href: '/testimonial' },
                { name: 'Latest Insights & Blog', href: '/blog' },
                { name: 'Featured Work & Portfolio', href: '/portfolio' },
                { name: 'Skill Development Workshop', href: '/skill-development-workshop' },
                { name: 'Help & FAQs', href: '/faqs' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-400 hover:text-pink-400 text-sm flex items-center group transition-colors">
                    <span className="w-0 group-hover:w-3 h-[1px] bg-pink-400 mr-0 group-hover:mr-3 transition-all duration-300 ease-out"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-2">Connect</h4>
            
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-4 group">
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-cyan-500/20 transition-colors">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-gray-400 text-sm mt-1.5 font-light">2nd Floor, SCO 19, Sector 11, Panchkula, Haryana 134117</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-purple-500/20 transition-colors">
                  <Phone className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-gray-400 text-sm font-light">+91 99904 32321</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-pink-500/20 transition-colors">
                  <Mail className="w-4 h-4 text-pink-400" />
                </div>
                <span className="text-gray-400 text-sm font-light">hello@digitalorra.com</span>
              </li>
            </ul>

            <div className="mt-4 relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative flex items-center bg-[#050B17] rounded-xl p-1 border border-white/10">
                <input 
                  type="email" 
                  placeholder="Subscribe to our newsletter" 
                  className="w-full bg-transparent py-3 pl-4 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none"
                />
                <button className="absolute right-2 p-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-105 active:scale-95">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Minimalist Bottom Bar */}
        <div className="py-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm font-light">
            &copy; {currentYear} Digital ORRA. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm font-light text-gray-500">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
