"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Target, Layers, Code, CheckCircle, Rocket, Wrench, ShieldCheck, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import './ProcessSection.css';

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(1);
  const [slideDirection, setSlideDirection] = useState('next'); // 'next' | 'prev'
  const [isPaused, setIsPaused] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const processSteps = [
    {
      number: '01',
      id: 1,
      shortLabel: 'Goal',
      title: 'Goal Identification',
      subtitle: "Understanding Client's Needs",
      points: [
        'Deeply understand your business goals, vision, and core requirements.',
        'Analyze current processes and offer constructive strategic insights.',
        'Customize tailored solutions to foster long-term mutual success.'
      ],
      icon: <Target size={18} />,
      badge: 'Phase 01',
      color: '#06B6D4',
      gradient: 'linear-gradient(135deg, #06B6D4, #0891B2)'
    },
    {
      number: '02',
      id: 2,
      shortLabel: 'Scope',
      title: 'Scope Identification',
      subtitle: 'Deep Research and Analysis',
      points: [
        'Define precise project goals, technical requirements, and deliverables.',
        'Set clear boundaries and architecture for seamless development.',
        'Ensure project stays on track and meets expectations effectively.'
      ],
      icon: <Layers size={18} />,
      badge: 'Phase 02',
      color: '#8B5CF6',
      gradient: 'linear-gradient(135deg, #8B5CF6, #6D28D9)'
    },
    {
      number: '03',
      id: 3,
      shortLabel: 'Design',
      title: 'Design and Development',
      subtitle: 'Turn imagination into reality',
      points: [
        'Collaborate closely through interactive meetings, workshops, and prototypes.',
        'Develop in Agile sprints to iteratively build and test functionalities.',
        'Ensure transparent progress monitoring and flexible incorporation of feedback.'
      ],
      icon: <Code size={18} />,
      badge: 'Phase 03',
      color: '#FDE047',
      gradient: 'linear-gradient(135deg, #FDE047, #EAB308)'
    },
    {
      number: '04',
      id: 4,
      shortLabel: 'Testing',
      title: 'Integration and Testing',
      subtitle: 'Prelaunch process',
      points: [
        'Conduct comprehensive system, security, and performance testing.',
        'Enable client testing opportunities before the project goes live.',
        'Guarantee every detail delivers a seamless end-user experience.'
      ],
      icon: <CheckCircle size={18} />,
      badge: 'Phase 04',
      color: '#E6007E',
      gradient: 'linear-gradient(135deg, #E6007E, #EC4899)'
    },
    {
      number: '05',
      id: 5,
      shortLabel: 'Deploy',
      title: 'Deploy',
      subtitle: "It's time to launch the website",
      points: [
        'Install and configure software in the production environment.',
        'Perform pre-deployment validation to guarantee optimal performance.',
        'Deliver a smooth, hassle-free transition to live operations.'
      ],
      icon: <Rocket size={18} />,
      badge: 'Phase 05',
      color: '#10B981',
      gradient: 'linear-gradient(135deg, #10B981, #059669)'
    },
    {
      number: '06',
      id: 6,
      shortLabel: 'Support',
      title: 'Support & Maintenance',
      subtitle: 'Upgrading to latest technologies',
      points: [
        'Provide dedicated post-launch support and SLA-backed maintenance.',
        'Ensure continuous software optimization, upgrades, and security.',
        'Guarantee uninterrupted business operations and high uptime.'
      ],
      icon: <ShieldCheck size={18} />,
      badge: 'Phase 06',
      color: '#3B82F6',
      gradient: 'linear-gradient(135deg, #3B82F6, #1D4ED8)'
    },
    {
      number: '07',
      id: 7,
      shortLabel: 'Growth',
      title: 'Brand Scaling & Growth',
      subtitle: 'Maximizing Brand Reach & ROI',
      points: [
        'Amplify brand presence through data-driven omnichannel marketing.',
        'Scale performance ad campaigns to maximize ROI and conversions.',
        'Drive sustainable audience engagement and exponential revenue growth.'
      ],
      icon: <Award size={18} />,
      badge: 'Phase 07',
      color: '#F97316',
      gradient: 'linear-gradient(135deg, #F97316, #EA580C)'
    }
  ];

  const totalSteps = processSteps.length;

  // Intersection Observer for section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto Slider Timer (Rotates every 2 seconds = 2000ms, pauses ONLY on mouse hover)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setSlideDirection('next');
      setActiveStep((prev) => {
        const next = prev >= totalSteps ? 1 : prev + 1;
        setScrollProgress(((next - 1) / (totalSteps - 1)) * 100);
        return next;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused, totalSteps]);

  const nodeRefs = useRef({});
  const timelineWrapperRef = useRef(null);

  useEffect(() => {
    if (nodeRefs.current[activeStep] && timelineWrapperRef.current) {
      const node = nodeRefs.current[activeStep];
      const wrapper = timelineWrapperRef.current;
      const nodeLeft = node.offsetLeft;
      const nodeWidth = node.offsetWidth;
      const wrapperWidth = wrapper.offsetWidth;
      wrapper.scrollTo({
        left: nodeLeft - wrapperWidth / 2 + nodeWidth / 2,
        behavior: 'smooth'
      });
    }
  }, [activeStep]);

  const handleNext = () => {
    setSlideDirection('next');
    const nextStep = activeStep >= totalSteps ? 1 : activeStep + 1;
    setActiveStep(nextStep);
    setScrollProgress(((nextStep - 1) / (totalSteps - 1)) * 100);
  };

  const handlePrev = () => {
    setSlideDirection('prev');
    const prevStep = activeStep <= 1 ? totalSteps : activeStep - 1;
    setActiveStep(prevStep);
    setScrollProgress(((prevStep - 1) / (totalSteps - 1)) * 100);
  };

  const handleStepClick = (stepId) => {
    if (stepId === activeStep) return;
    setSlideDirection(stepId > activeStep ? 'next' : 'prev');
    setActiveStep(stepId);
    setScrollProgress(((stepId - 1) / (totalSteps - 1)) * 100);
  };

  const currentStep = processSteps.find((s) => s.id === activeStep) || processSteps[0];

  return (
    <section className="process-section-v2" id="process" ref={sectionRef}>

      {/* Background Glow Accents */}
      <div className="proc-bg-orb orb-cyan"></div>
      <div className="proc-bg-orb orb-purple"></div>
      <div className="proc-bg-orb orb-pink"></div>

      {/* Cyber Grid Lines */}
      <div style={{ pointerEvents: 'none' }} className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>

      {/* Massive Background Typography (Watermark) */}
      <div className="absolute top-4 md:-top-4 left-0 w-full flex justify-center pointer-events-none select-none z-0 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
        <span className="text-[8vw] md:text-[8vw] font-black uppercase tracking-widest whitespace-nowrap select-none text-transparent bg-clip-text bg-gradient-to-b from-white/[0.45] via-white/[0.25] to-transparent">
          HOW WE WORK
        </span>
      </div>

      <div className="proc-container">

        {/* Section Header */}
        <div className={`proc-header ${isVisible ? 'anim-in' : ''}`}>
          <h2 className="proc-title">
            Our Proven <span className="proc-gradient-text">Step-by-Step Process</span><br className="hidden md:block" /> to Scale Your Brand
          </h2>
          {/* <p className="proc-sub-desc">
            Explore our roadmap designed to transform strategy into measurable revenue growth.
          </p> */}
        </div>

        {/* Timeline Navigation Bar */}
        <div className={`proc-timeline-wrapper ${isVisible ? 'anim-in' : ''}`} ref={timelineWrapperRef}>
          <div className="proc-nodes-row-scroll-container">
            <div className="proc-track">
              <div
                className="proc-track-fill"
                style={{ width: `${scrollProgress}%` }}
              >
                <div className="proc-track-glow-dot"></div>
              </div>
            </div>

            <div className="proc-nodes-row">
              {processSteps.map((step) => (
                <button
                  key={step.id}
                  ref={(el) => (nodeRefs.current[step.id] = el)}
                  className={`proc-node ${activeStep === step.id ? 'is-active' : ''} ${activeStep > step.id ? 'is-done' : ''}`}
                  onClick={() => handleStepClick(step.id)}
                  style={{ '--step-color': step.color }}
                >
                  <div className="proc-node-ring">
                    <div className="proc-node-icon">{step.icon}</div>
                    {activeStep === step.id && <div className="proc-node-pulse"></div>}
                  </div>
                  <span className="proc-node-title-sm">{step.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SINGLE-CARD FEATURED SLIDER CONTAINER */}
        <div 
          className="proc-slider-stage"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Previous Arrow Button */}
          <button 
            className="proc-slider-arrow btn-prev" 
            onClick={handlePrev}
            aria-label="Previous Phase"
          >
            <ChevronLeft size={24} />
          </button>

          {/* SINGLE LARGE FEATURED CARD */}
          <div 
            key={activeStep}
            className={`proc-single-card slide-${slideDirection} animate-slide`}
            style={{ 
              '--step-color': currentStep.color, 
              '--step-gradient': currentStep.gradient 
            }}
          >
            {/* Top Glow Accent Line */}
            <div className="proc-card-top-line"></div>

            {/* Giant Watermark Number */}
            <span className="proc-card-watermark">{currentStep.number}</span>

            {/* Card Content Grid */}
            <div className="proc-card-main-grid">
              
              {/* Left Column: Icon, Phase Badge, Title & Subtitle */}
              <div className="proc-card-left-col">
                <div className="proc-card-head">
                  <div className="proc-icon-box">
                    <div className="proc-icon-inner">{React.cloneElement(currentStep.icon, { size: 22 })}</div>
                    <div className="proc-icon-ring"></div>
                  </div>
                  <span className="proc-phase-chip">{currentStep.badge}</span>
                </div>

                <div className="proc-card-title-group">
                  <h3 className="proc-card-title">{currentStep.title}</h3>
                  <p className="proc-card-subtitle">{currentStep.subtitle}</p>
                </div>

                <div className="proc-card-phase-counter">
                  <span>Phase {currentStep.number} of 0{totalSteps}</span>
                </div>
              </div>

              {/* Right Column: Point-wise Key Highlights */}
              <div className="proc-card-right-col">
                <div className="proc-activities-block">
                  <span className="proc-block-label">KEY HIGHLIGHTS & DELIVERABLES</span>
                  <ul className="proc-activities-list">
                    {currentStep.points.map((pt, pIdx) => (
                      <li key={pIdx} className="proc-activity-item">
                        <CheckCircle size={16} className="proc-act-icon" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

          </div>

          {/* Next Arrow Button */}
          <button 
            className="proc-slider-arrow btn-next" 
            onClick={handleNext}
            aria-label="Next Phase"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Slide Dots Indicator Bar */}
        <div className="proc-slider-dots">
          {processSteps.map((step) => (
            <button
              key={step.id}
              className={`proc-dot ${activeStep === step.id ? 'is-active' : ''}`}
              onClick={() => handleStepClick(step.id)}
              aria-label={`Go to Step ${step.number}`}
              style={{ '--step-color': step.color }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
