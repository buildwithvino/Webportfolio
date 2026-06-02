"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Target, Search, TrendingUp, Gauge, BarChart3, Check, Award, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollRevealHeading from "@/components/ScrollRevealHeading";

interface Reason {
  id: string;
  num: string;
  title: string;
  icon: React.ReactNode;
  desc: string;
  tags: string[];
}

export default function WhyChooseUs() {
  const [activeReason, setActiveReason] = useState<string>("performance");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Soft luxury scroll revelations
      gsap.fromTo(
        ".why-header",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".why-header",
            start: "top 92%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".why-reason-item",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".why-reasons-list",
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".why-showcase-panel",
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".why-showcase-panel",
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const reasons: Reason[] = [
    {
      id: "performance",
      num: "01",
      title: "Conversion-First Speed",
      icon: <Zap className="text-[#2563EB]" size={18} />,
      desc: "Every 100ms delay cost platforms up to 7% in sales conversions. We engineer sub-second page loads and zero layout shifts so visitors remain locked, minimizing cart/form abandonment immediately.",
      tags: ["Bounce Rate Reduction", "Sub-0.4s LCP", "Optimized Core Web Vitals", "Instant Interactions"],
    },
    {
      id: "design",
      num: "02",
      title: "Intent-Driven UI/UX Design",
      icon: <Target className="text-[#111111] group-hover:text-[#2563EB] transition-colors duration-300" size={18} />,
      desc: "We reject purposeless visual noise. Every grid alignment, typography size ratio, and animated visual flow is meticulously calibrated to steer attention down high-converting sales pipelines.",
      tags: ["Attention Architecture", "Clear Call-to-Actions", "Frictionless UX Flow", "Premium Brand Authority"],
    },
    {
      id: "architecture",
      num: "03",
      title: "Organic SEO & Search Indexing",
      icon: <Search className="text-[#111111]" size={18} />,
      desc: "Beautiful sites fail if they aren't visible. We build strict, search-engine-accessible HTML hierarchies and high-performance server-side renders (SSR) to capture and convert warm, high-intent inbound search traffic.",
      tags: ["Semantic HTML5 Markup", "Strict Schema JSON-LD", "Instant Google Crawler Indexes", "High Core Vitals Rank"],
    },
    {
      id: "collaboration",
      num: "04",
      title: "High-Velocity Sales Launch",
      icon: <TrendingUp className="text-[#111111]" size={18} />,
      desc: "No account managers, bloated administration, or slow hand-offs. We iterate in direct, professional dev sprints, allowing your product to launch fast, test target markets early, and scale revenue streams sooner.",
      tags: ["Zero Administrative Lag", "Iterative Sprint Slices", "Direct Technical Counsel", "Rapid Revenue Capture"],
    },
  ];

  const premiumTransition = { ease: [0.16, 1, 0.3, 1], duration: 0.8 } as any;

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="bg-white py-24 md:py-32 px-6 md:px-12 border-t border-[#ECECEC]"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">
        {/* Section Header */}
        <div className="why-header flex flex-col gap-4 max-w-xl">
          <span className="text-[10px] font-bold tracking-widest text-[#666666] uppercase block">
            CONVERSION-DRIVEN DEVELOPMENT
          </span>
          <ScrollRevealHeading
            text="ENGINEERED TO CONVERT."
            className="text-4xl md:text-6xl font-extrabold tracking-tighter text-[#111111] uppercase font-sans"
          />
          <p className="text-sm text-[#666666] leading-relaxed">
            We don't just build visually premium portfolios; we construct high-performance customer conversion systems. Every visual element is strategically optimized to command authority, hold attention, and drive sales.
          </p>
        </div>

        {/* 12-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start w-full">
          
          {/* Left Column: Interactive Cards (Takes 5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-4 why-reasons-list">
            {reasons.map((reason) => {
              const isActive = activeReason === reason.id;
              return (
                <div
                  key={reason.id}
                  onClick={() => setActiveReason(reason.id)}
                  onMouseEnter={() => setActiveReason(reason.id)}
                  className={`why-reason-item text-left p-6 rounded-3xl border transition-all duration-500 relative overflow-hidden group select-none ${
                    isActive
                      ? "bg-white border-[#2563EB]/40 shadow-[0_12px_30px_rgba(0,0,0,0.03),_0_20px_40px_rgba(37,99,235,0.02)]"
                      : "bg-[#F9F9FA]/70 border-[#E5E5E6] hover:border-[#CCCCCC]"
                  }`}
                  data-cursor="pointer"
                >
                  {/* Left accent border that draws itself on active state */}
                  <div
                    className="absolute left-0 top-[20%] bottom-[20%] w-[3px] bg-[#2563EB] rounded-r-full origin-center transition-all duration-500"
                    style={{
                      transform: isActive ? "scaleY(1)" : "scaleY(0)",
                      opacity: isActive ? 1 : 0,
                    }}
                  />

                  <div className="flex items-start gap-4">
                    {/* Number label */}
                    <span className="text-[10px] font-mono font-bold text-[#2563EB] mt-0.5">
                      {reason.num}
                    </span>

                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`p-1.5 rounded-lg border transition-all duration-500 ${
                            isActive
                              ? "bg-[#2563EB]/10 border-[#2563EB]/20 text-[#2563EB]"
                              : "bg-white border-[#ECECEC] text-[#111111]"
                          }`}
                        >
                          {reason.icon}
                        </span>
                        <h3 className="text-xs font-bold tracking-wider text-[#111111] uppercase font-sans">
                          {reason.title}
                        </h3>
                      </div>

                      <p
                        className={`text-xs leading-relaxed text-[#666666] transition-all duration-500 ${
                          isActive ? "opacity-100 max-h-40 mt-1.5" : "opacity-0 max-h-0 overflow-hidden"
                        }`}
                      >
                        {reason.desc}
                      </p>

                      {/* Small tag pills when active */}
                      {isActive && (
                        <div className="flex flex-wrap gap-1.5 pt-3">
                          {reason.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-0.5 rounded-full border border-[#ECECEC] bg-white text-[8px] font-bold tracking-widest uppercase text-[#666666]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Premium Dynamic Visual Panels (Takes 7 columns) */}
          <div className="lg:col-span-7 w-full lg:sticky lg:top-32 why-showcase-panel">
            <div className="bg-[#F3F4F6]/50 border border-[#E5E7EB] rounded-[48px] p-8 md:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.04)] h-[480px] relative overflow-hidden flex flex-col justify-center items-center">
              
              <AnimatePresence mode="wait">
                
                {/* 1. PERFORMANCE GAUGE PANEL */}
                {activeReason === "performance" && (
                  <motion.div
                    key="performance-panel"
                    initial={{ opacity: 0, scale: 0.97, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97, y: -10 }}
                    transition={premiumTransition}
                    className="w-full max-w-[420px] aspect-[4/4.5] bg-white border border-[#E5E7EB] rounded-[40px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.02)] flex flex-col justify-between overflow-hidden text-left"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-bold tracking-wider text-neutral-400 font-sans uppercase">CORE PERFORMANCE</span>
                        <h4 className="text-3xl font-bold tracking-tight text-neutral-900 font-sans mt-0.5">LIGHTNING SPEED</h4>
                      </div>
                      <div className="bg-[#2563EB]/10 border border-[#2563EB]/20 rounded-full px-2.5 py-1 text-[9px] font-extrabold text-[#2563EB] uppercase">
                        99% Core Vitals
                      </div>
                    </div>

                    {/* Circular dynamic speed ring gauge */}
                    <div className="my-auto flex items-center justify-between gap-6 py-4">
                      <div className="relative w-28 h-28 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="42" fill="transparent" stroke="#F3F4F6" strokeWidth="6" />
                          <motion.circle
                            cx="50"
                            cy="50"
                            r="42"
                            fill="transparent"
                            stroke="#2563EB"
                            strokeWidth="7"
                            strokeDasharray="264"
                            initial={{ strokeDashoffset: 264 }}
                            animate={{ strokeDashoffset: 2.64 }}
                            transition={{ ease: [0.16, 1, 0.3, 1], duration: 1.8, delay: 0.1 }}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center select-none">
                          <span className="text-2xl font-black text-neutral-900 font-mono">100</span>
                          <span className="text-[7.5px] font-bold tracking-widest text-[#2563EB] uppercase font-sans">SPEED SCORE</span>
                        </div>
                      </div>

                      {/* Performance metrics grid */}
                      <div className="flex-1 flex flex-col gap-2 font-mono text-[10px]">
                        <div className="flex justify-between border-b border-[#F3F4F6] pb-1.5">
                          <span className="text-neutral-400">LCP (Load Speed)</span>
                          <span className="font-bold text-[#2563EB]">0.32s</span>
                        </div>
                        <div className="flex justify-between border-b border-[#F3F4F6] pb-1.5">
                          <span className="text-neutral-400">FID (Reaction)</span>
                          <span className="font-bold text-neutral-900">12ms</span>
                        </div>
                        <div className="flex justify-between pb-0.5">
                          <span className="text-neutral-400">CLS (Shifts)</span>
                          <span className="font-bold text-neutral-900">0.00</span>
                        </div>
                      </div>
                    </div>

                    {/* Bounce rate impact comparison bars */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[8.5px] font-bold tracking-wider text-neutral-400 uppercase">Speed Retention Analysis</span>
                      <div className="flex flex-col gap-1.5 font-mono text-[9px] border border-[#E5E7EB] p-3 rounded-2xl bg-[#FCFCFD]">
                        <div className="flex justify-between">
                          <span className="font-bold text-[#2563EB]">Our Custom Stack (0.3s)</span>
                          <span className="font-bold text-[#2563EB]">98% Retention</span>
                        </div>
                        <div className="w-full bg-[#F3F4F6] h-1.5 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: "98%" }} transition={{ duration: 1.4, ease: "easeOut" }} className="bg-[#2563EB] h-full" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2. PREMIUM FINANCIAL GRAPH & BANKNOTES (INTENT DESIGN - RECREATED FROM REFERENCE) */}
                {activeReason === "design" && (
                  <motion.div
                    key="design-panel"
                    initial={{ opacity: 0, scale: 0.97, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97, y: -10 }}
                    transition={premiumTransition}
                    className="w-full max-w-[420px] aspect-[4/4.5] bg-white border border-[#E5E7EB] rounded-[40px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.02)] flex flex-col justify-between overflow-hidden"
                  >
                    {/* Header Row */}
                    <div className="flex justify-between items-start select-none z-10">
                      <div className="flex flex-col gap-1 text-left">
                        <span className="text-[11px] font-bold tracking-wider text-neutral-400 font-sans uppercase">Budget Growth</span>
                        <h4 className="text-[32px] font-bold tracking-tight text-neutral-900 font-sans leading-none mt-0.5">$30,739</h4>
                        
                        {/* Subtrending badge */}
                        <div className="flex items-center gap-1 bg-[#F3F4F6] border border-[#E5E7EB] rounded-full px-2.5 py-1 w-fit mt-3 shadow-sm">
                          <span className="text-[9px] font-extrabold text-[#2563EB] font-sans">+$317</span>
                          <TrendingUp size={8} className="text-[#2563EB]" />
                        </div>
                      </div>

                      {/* SPECULAR FLOATING 3D BANKNOTES */}
                      <div className="relative w-36 h-28 overflow-visible select-none">
                        {/* Banknote 3 (Back) */}
                        <motion.div
                          animate={{ y: [0, -4, 0], rotate: [-24, -22, -24] }}
                          transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }}
                          className="absolute right-4 top-2 w-20 h-11 bg-white border border-[#E5E7EB] rounded-xl shadow-[0_6px_15px_rgba(0,0,0,0.03)] origin-center -rotate-[24deg] z-0 flex items-center justify-center opacity-70"
                        >
                          <div className="w-[88%] h-[80%] border border-[#F3F4F6] rounded-lg flex items-center justify-between px-2">
                            <span className="w-2 h-2 rounded-full bg-[#E5E7EB]" />
                            <span className="w-4 h-4 rounded-full bg-[#F3F4F6]" />
                            <span className="w-2 h-2 rounded-full bg-[#E5E7EB]" />
                          </div>
                        </motion.div>

                        {/* Banknote 2 (Middle) */}
                        <motion.div
                          animate={{ y: [0, -6, 0], rotate: [-16, -14, -16] }}
                          transition={{ repeat: Infinity, duration: 4.4, ease: "easeInOut", delay: 0.3 }}
                          className="absolute right-1 top-4 w-22 h-12 bg-[#FCFCFD] border border-[#E5E7EB] rounded-xl shadow-[0_8px_18px_rgba(0,0,0,0.03)] origin-center -rotate-[16deg] z-10 flex items-center justify-center"
                        >
                          <div className="w-[88%] h-[80%] border border-[#F3F4F6] rounded-lg flex items-center justify-between px-2">
                            <span className="w-2 h-2 rounded-full bg-[#E5E7EB]" />
                            <span className="w-5 h-5 rounded-full bg-[#F3F4F6]" />
                            <span className="w-2 h-2 rounded-full bg-[#E5E7EB]" />
                          </div>
                        </motion.div>

                        {/* Banknote 1 (Front - Matches layout exactly) */}
                        <motion.div
                          animate={{ y: [0, -8, 0], rotate: [-8, -5, -8] }}
                          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.6 }}
                          className="absolute right-0 top-8 w-24 h-13 bg-white border border-[#EBEBEF] rounded-2xl shadow-[0_12px_24px_rgba(0,0,0,0.04)] origin-center -rotate-[8deg] z-20 flex items-center justify-center"
                        >
                          <div className="w-[88%] h-[82%] border border-[#EBEBEF] rounded-xl flex items-center justify-between px-2.5 relative">
                            <span className="w-2 h-2 rounded-full bg-[#EBEBEF]" />
                            <span className="w-6 h-6 rounded-full bg-[#FAF9F6] border border-[#E5E7EB] flex items-center justify-center font-bold text-[6px] text-neutral-300">$</span>
                            <span className="w-2 h-2 rounded-full bg-[#EBEBEF]" />
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Graph Visual Area */}
                    <div className="relative h-[150px] w-full mt-auto select-none overflow-visible flex items-end">
                      
                      {/* Glowing active blue tooltip badge (Matches "$750" in reference) */}
                      <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        className="absolute left-[54%] top-[10%] -translate-x-1/2 -translate-y-full z-30"
                      >
                        <div className="bg-[#2563EB] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-[0_10px_20px_rgba(37,99,235,0.3)] relative">
                          $750
                          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[3px] w-1.5 h-1.5 bg-[#2563EB] rotate-45" />
                        </div>
                      </motion.div>

                      {/* SVG Bezier Growth Graph */}
                      <svg viewBox="0 0 300 120" className="w-full h-full overflow-visible z-10">
                        <defs>
                          <linearGradient id="blueGradient2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.45" />
                            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path d="M 0 110 Q 50 100 80 80 T 160 38 T 230 70 T 300 10 L 300 120 L 0 120 Z" fill="url(#blueGradient2)" />
                        <path d="M 0 110 Q 50 100 80 80 T 160 38 T 230 70 T 300 10" fill="none" stroke="#2563EB" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="162" cy="38" r="5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="3" />
                      </svg>

                      {/* Glowing White Floating Particles Inside Blue Gradient */}
                      <div className="absolute inset-x-0 bottom-0 top-[20%] overflow-hidden pointer-events-none rounded-b-[40px] z-20">
                        {Array.from({ length: 14 }).map((_, i) => {
                          const xOffset = 20 + i * 22;
                          const yOffset = 10 + Math.sin(i * 1.4) * 25 + Math.random() * 15;
                          return (
                            <motion.span
                              key={i}
                              className="absolute w-1 h-1 bg-white rounded-full opacity-70 shadow-[0_0_4px_rgba(255,255,255,1)]"
                              style={{ left: `${xOffset}px`, bottom: `${yOffset}px` }}
                              animate={{ y: [0, -12, 0], opacity: [0.3, 0.9, 0.3] }}
                              transition={{ duration: 3 + Math.random() * 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
                            />
                          );
                        })}
                      </div>

                      {/* Symmetrical Day labels */}
                      <div className="absolute inset-x-0 bottom-[-24px] flex justify-between px-3 font-semibold text-[9px] text-neutral-400 font-sans tracking-wider uppercase">
                        <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 3. GOOGLE ORGANIC RANK SNIPPET CARD (SEO TAB) */}
                {activeReason === "architecture" && (
                  <motion.div
                    key="seo-panel"
                    initial={{ opacity: 0, scale: 0.97, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97, y: -10 }}
                    transition={premiumTransition}
                    className="w-full max-w-[420px] aspect-[4/4.5] bg-white border border-[#E5E7EB] rounded-[40px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.02)] flex flex-col justify-between overflow-hidden text-left"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-bold tracking-wider text-neutral-400 font-sans uppercase">Google Crawler Indices</span>
                        <h4 className="text-3xl font-bold tracking-tight text-neutral-900 font-sans mt-0.5">RANK #1 AUTHORITY</h4>
                      </div>
                      <Award className="text-[#2563EB]" size={22} />
                    </div>

                    {/* Google Search Result Mockup */}
                    <div className="my-auto flex flex-col gap-4 py-4">
                      {/* Search Bar Input Mockup */}
                      <div className="flex items-center gap-3 border border-[#E5E7EB] bg-[#FAF9F6] rounded-2xl px-4 py-3 select-none">
                        <Search size={12} className="text-neutral-400" />
                        <span className="text-[10px] font-mono text-neutral-800">bespoke digital architecture ...</span>
                      </div>

                      {/* Google Index Result snippet */}
                      <div className="border border-[#E5E7EB] p-4 rounded-2xl bg-white shadow-sm flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded-full bg-[#FAF9F6] border border-[#E5E7EB] flex items-center justify-center text-[7.5px] font-bold font-sans">G</span>
                          <span className="text-[7.5px] text-neutral-400 leading-none">yourcompany.com</span>
                        </div>
                        <h5 className="text-[11.5px] font-bold text-[#1A0DAB] leading-tight">
                          Bespoke Digital Design & High-Performance Architecture
                        </h5>
                        <p className="text-[8.5px] text-neutral-500 leading-relaxed">
                          Discover intent-driven designs engineered exclusively to maximize sales conversions. Explore optimized sub-second load speeds, schema compliance...
                        </p>
                        <div className="flex gap-3 pt-1 text-[7.5px] font-mono text-[#2563EB] font-bold uppercase">
                          <span>★ rating: 5.0 - 100%</span>
                          <span>⚡ Speed: 0.3s</span>
                        </div>
                      </div>
                    </div>

                    {/* Ranking Climb stairs visual */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[8.5px] font-bold tracking-wider text-neutral-400 uppercase">SERP Placement Climb</span>
                      <div className="flex items-end gap-1.5 h-10 w-full pt-1">
                        {Array.from({ length: 6 }).map((_, idx) => {
                          const isFirst = idx === 5;
                          return (
                            <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full">
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${20 + idx * 16}%` }}
                                transition={{ ease: [0.16, 1, 0.3, 1], duration: 1.2, delay: idx * 0.08 }}
                                className={`w-full rounded-t-lg ${isFirst ? "bg-[#2563EB] shadow-[0_0_10px_rgba(37,99,235,0.4)]" : "bg-neutral-200"}`}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 4. HIGH-VELOCITY ROADMAP PIPELINE TIMELINE (SPRINTS TAB) */}
                {activeReason === "collaboration" && (
                  <motion.div
                    key="collaboration-panel"
                    initial={{ opacity: 0, scale: 0.97, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97, y: -10 }}
                    transition={premiumTransition}
                    className="w-full max-w-[420px] aspect-[4/4.5] bg-white border border-[#E5E7EB] rounded-[40px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.02)] flex flex-col justify-between overflow-hidden text-left"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-bold tracking-wider text-neutral-400 font-sans uppercase">Accelerated Sprints</span>
                        <h4 className="text-3xl font-bold tracking-tight text-neutral-900 font-sans mt-0.5">LAUNCH IN 4 WEEKS</h4>
                      </div>
                      <BarChart3 className="text-[#2563EB]" size={22} />
                    </div>

                    {/* Timeline road map steps */}
                    <div className="my-auto flex flex-col gap-3 py-2">
                      {[
                        { w: "W1", name: "Frictionless Strategy Blueprint", done: true },
                        { w: "W2", name: "High-Fi Visual Shell Construction", done: true },
                        { w: "W3", name: "Secure Systems & Payments", done: true },
                        { w: "W4", name: "Production Sales Launch", done: false, active: true },
                      ].map((step, idx) => (
                        <motion.div
                          key={step.w}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.8, delay: idx * 0.1 }}
                          className={`flex items-center justify-between border rounded-2xl p-3.5 ${
                            step.active
                              ? "bg-[#2563EB]/5 border-[#2563EB]/40 relative overflow-hidden"
                              : "bg-[#FCFCFD] border-[#E5E7EB]"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-5 h-5 rounded-full text-[8.5px] font-bold flex items-center justify-center font-mono ${
                                step.active
                                  ? "bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/35 animate-pulse"
                                  : "bg-neutral-800 text-white"
                              }`}
                            >
                              {step.w}
                            </span>
                            <span className={`text-[10px] font-bold ${step.active ? "text-[#2563EB]" : "text-neutral-800"}`}>
                              {step.name}
                            </span>
                          </div>
                          {step.done ? (
                            <Check size={12} className="text-[#2563EB] stroke-[3]" />
                          ) : (
                            <span className="text-[7.5px] font-mono font-bold tracking-widest text-[#2563EB] animate-pulse">ACTIVE</span>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    <div className="text-[8.5px] text-neutral-400 font-sans tracking-wide leading-relaxed border-t border-[#F3F4F6] pt-3 text-center">
                      Direct collaborative sprints cut out legacy agency management layers, ensuring your operational payment platform reaches target markets 2 months earlier.
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
