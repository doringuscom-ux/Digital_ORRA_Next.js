"use client";
import React, { useState, useEffect } from 'react';
import { ExternalLink, Layers, Loader2 } from 'lucide-react';
import './Portfolio.css';

export default function Portfolio() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const res = await fetch('/api/portfolio');
      if (res.ok) {
        const data = await res.json();
        setPortfolios(data);
      }
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);

  // Fallback dummy data if backend is empty or unreachable
  const displayData = portfolios.length > 0 ? portfolios : [
    {
      _id: '1',
      title: 'E-Commerce Platform',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop',
      link: '#'
    },
    {
      _id: '2',
      title: 'Real Estate App',
      category: 'App Design',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
      link: '#'
    },
    {
      _id: '3',
      title: 'Fintech Dashboard',
      category: 'UI/UX Design',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
      link: '#'
    },
    {
      _id: '4',
      title: 'Brand Identity',
      category: 'Branding',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop',
      link: '#'
    }
  ];

  const categories = ['All', ...new Set(displayData.map(item => item.category))];

  const filteredData = activeFilter === 'All' 
    ? displayData 
    : displayData.filter(item => item.category === activeFilter);

  return (
    <section className="portfolio-section" id="portfolio">
      {/* Background Ambience */}
      <div className="port-bg-orb orb-left"></div>
      <div className="port-bg-orb orb-right"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>

      {/* Background Watermark */}
      <div className="absolute top-4 md:-top-4 left-0 w-full flex justify-center pointer-events-none select-none z-0 [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]">
        <span 
          style={{ 
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.5) 55%, rgba(255, 255, 255, 0.18) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
          className="text-[7.5vw] md:text-[8vw] font-black uppercase tracking-widest whitespace-nowrap select-none"
        >
          OUR PORTFOLIO
        </span>
      </div>

      <div className="port-container relative z-10 pt-8 md:pt-14">

        {/* Filter Buttons */}
        {!loading && categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mb-10 relative z-20" style={{ marginTop: '20px' }}>
            {categories.map((cat, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveFilter(cat);
                  setVisibleCount(6);
                }}
                className={`px-6 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 border ${
                  activeFilter === cat
                    ? 'bg-cyan-500 text-slate-900 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'bg-[#0B1320] text-[#94A3B8] border-white/10 hover:border-cyan-500/50 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Portfolio Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-cyan-400" size={40} />
          </div>
        ) : (
          <>
            <div className="port-grid relative z-20">
              {filteredData.slice(0, visibleCount).map((item) => (
                <div key={item._id} className="port-card group">
                  <div className="port-image-wrapper">
                    <img src={item.image} alt={item.title} className="port-image" />
                    <div className="port-overlay">
                      <div className="port-content">
                        <span className="port-category">{item.category}</span>
                        <h3 className="port-item-title">{item.title}</h3>
                        {item.link && (
                          <a href={item.link} target="_blank" rel="noopener noreferrer" className="port-link-btn">
                            View Project <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View More Button */}
            {visibleCount < filteredData.length && (
              <div className="flex justify-center mt-12 relative z-20">
                <button 
                  onClick={() => setVisibleCount(prev => prev + 6)}
                  className="px-8 py-3 rounded-full text-sm font-bold tracking-widest text-white uppercase bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500 hover:border-cyan-500 hover:text-slate-900 transition-all duration-300"
                >
                  View More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
