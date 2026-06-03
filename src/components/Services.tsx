"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, X, Bookmark, Heart, Share2, Send } from "lucide-react";
import ScrollRevealHeading from "@/components/ScrollRevealHeading";

interface ServiceItem {
  id: string;
  num: string;
  name: string;
  subtitle: string;
  desc: string;
  theme: "dark-blue" | "white-ai" | "white-saas" | "dark-green";
  deliverables: string[];
  metaTech: string;
  metaTypeface: string;
  metaPalette: string[];
}

export default function Services() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const services: ServiceItem[] = [
    {
      id: "webdev",
      num: "01",
      name: "High-End Web Development",
      subtitle: "Bespoke Portals & High-End Code",
      desc: "Creating visually striking, high-performance web experiences utilizing state-of-the-art architectures. Engineered for fluid animations, immediate rendering, and robust search indices.",
      theme: "dark-blue",
      deliverables: ["Next.js & App Route Setup", "GSAP & ScrollTrigger Storytelling", "Buttery Smooth Transitions", "Semantic SEO Audit Setup"],
      metaTech: "BUILD INFRASTRUCTURE: NextJS x Turbopack",
      metaTypeface: "TYPEFACE: Outfit Sans",
      metaPalette: ["#0B0B0D", "#1E3A8A", "#2563EB", "#FFFFFF"],
    },
    {
      id: "ai",
      num: "02",
      name: "Intelligent AI Integrations",
      subtitle: "Cognitive Agents & Automations",
      desc: "Integrating customized AI capabilities and smart automated processes directly into web platforms. Engineered to enhance search efficiency, automate support tasks, and offer personalized user experiences.",
      theme: "white-ai",
      deliverables: ["AI Chat & Support Integrations", "Personalized User Flow Logic", "Lightning-Fast Semantic Search", "Custom API & Database Bridges"],
      metaTech: "COGNITIVE SYSTEM: Higgsfield x OpenAI",
      metaTypeface: "TYPEFACE: Manrope Mono",
      metaPalette: ["#0B0B0D", "#0A3622", "#00E65C", "#FFFFFF"],
    },
    {
      id: "saas",
      num: "03",
      name: "Premium SaaS Development",
      subtitle: "High-Performance Financial Engines",
      desc: "Building highly interactive web software architectures. Driven by reliable APIs, safe database query caching, real-time telemetry, and modular client-side state handling.",
      theme: "white-saas",
      deliverables: ["Real-Time Dashboard Logic", "Secure Stripe / Ledger Integrations", "Interactive Chart Render Engines", "Tailwind Custom Component Systems"],
      metaTech: "LEDGER INTEGRATION: Stripe x LedgerDB",
      metaTypeface: "TYPEFACE: Roboto Mono",
      metaPalette: ["#0B0B0D", "#4C1D95", "#6D28D9", "#FFFFFF"],
    },
    {
      id: "ux",
      num: "04",
      name: "Luxury UI/UX Design",
      subtitle: "Premium Layouts & Editorial Visuals",
      desc: "Fusing clean grid alignments, rich typography hierarchies, and buttery animations to design premium digital products that wow users. Focused on luxury brand editorial visuals.",
      theme: "dark-green",
      deliverables: ["High-Fidelity Wireframes", "Interactive Framer Motion Prototyping", "Design Token CSS Configurations", "Interactive Graphic SVG Assets"],
      metaTech: "DESIGN PLATFORM: Figma x HSL Tokens",
      metaTypeface: "TYPEFACE: Bodoni Moda",
      metaPalette: ["#0B0B0D", "#0A2F18", "#00E65C", "#FFFFFF"],
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedService(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="services" className="bg-[#F8F8F8] pt-32 pb-24 md:pt-40 md:pb-32 px-6 md:px-12 border-t border-b border-[#ECECEC] relative overflow-hidden">
      {/* Background layout details */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(to_right,#111111_1px,transparent_1px),linear-gradient(to_bottom,#111111_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-20 relative z-10">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end w-full">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <span className="text-[10px] font-bold tracking-widest text-[#666666] uppercase block">
              CORE OFFERINGS / 2026
            </span>
            <ScrollRevealHeading
              text="PREMIUM SERVICES."
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-[#111111] uppercase font-sans leading-none"
            />
          </div>
          
          <div className="lg:col-span-5 flex flex-col gap-6 items-start lg:pl-6">
            <p className="text-sm text-[#666666] leading-relaxed">
              Tailor-made software engineering solutions that fuse executive design aesthetics with high-performance code quality. Meticulously engineered to drive authority, hold attention, and scale conversions.
            </p>
          </div>
        </div>

        {/* Decorative Luxury Horizontal Line */}
        <div className="w-full relative h-[1px] bg-[#ECECEC] overflow-hidden">
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00E65C] to-transparent origin-left"
          />
        </div>

        {/* Services Grid (Compact Horizontal Cards - 210px desktop height) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {services.map((service, idx) => (
            <ServiceGridCard 
              key={service.id} 
              service={service} 
              index={idx} 
              onClick={() => setSelectedService(service)}
            />
          ))}
        </div>
      </div>

      {/* FULLSCREEN LUXURY DETAILS SHOWCASE MODAL */}
      <AnimatePresence>
        {selectedService && (
          <ServiceDetailsShowcase 
            service={selectedService} 
            onClose={() => setSelectedService(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ==========================================================================
   SERVICE GRID CARD COMPONENT (Refined landscape split card layout)
   ========================================================================== */
function ServiceGridCard({ service, index, onClick }: { service: ServiceItem; index: number; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.matchMedia("(max-width: 1024px)").matches);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 180, damping: 28 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 180, damping: 28 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  let cardClass = "";
  let btnClass = "";
  let arrowColor = "";

  if (service.theme === "dark-blue") {
    cardClass = "bg-[#0B0F19] text-white border-transparent shadow-sm";
    btnClass = "bg-white text-black hover:scale-105";
    arrowColor = "text-black";
  } else if (service.theme === "dark-green") {
    cardClass = "bg-[#0A170F] text-white border-transparent shadow-sm";
    btnClass = "bg-white text-black hover:scale-105";
    arrowColor = "text-black";
  } else {
    cardClass = "bg-white text-[#111111] border-[#ECECEC] hover:shadow-[0_15px_40px_rgba(0,0,0,0.04)]";
    btnClass = "bg-[#111111] text-white hover:scale-105";
    arrowColor = "text-white";
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: "easeOut" }}
      className={`border rounded-[28px] overflow-visible select-none cursor-pointer transition-all duration-500 relative flex items-center h-[210px] w-full ${cardClass} ${
        service.theme === "white-ai" ? "hover:border-[#00E65C]" : service.theme === "white-saas" ? "hover:border-[#2563EB]" : ""
      }`}
      data-cursor="pointer"
    >
      <div className="grid grid-cols-12 w-full h-full items-center px-6 md:px-8 relative overflow-visible">
        
        {/* Left Col (65% width) - Text content and button */}
        <div className="col-span-8 flex flex-col justify-between h-full py-6 text-left z-10 select-none">
          <div className="flex flex-col gap-1 select-none">
            <span className="text-[8.5px] font-mono tracking-widest uppercase opacity-50 font-bold">
              {service.subtitle}
            </span>
            <h3 className="text-xl md:text-2xl font-black font-sans leading-[1.1] uppercase tracking-tight">
              {service.name.split(" ").slice(0, 2).join(" ")} <br/>
              <span className="opacity-70 font-semibold font-sans">{service.name.split(" ").slice(2).join(" ")}</span>
            </h3>
            <p className="text-[10px] leading-relaxed opacity-60 max-w-[210px] mt-1.5 line-clamp-2">
              {service.desc}
            </p>
          </div>

          {/* Polished circular Learn More button (Reference 2 style) */}
          <div className="flex items-center gap-2.5 mt-auto group/btn">
            <motion.span 
              className={`w-7.5 h-7.5 rounded-full flex items-center justify-center transition-transform duration-300 shadow-sm shrink-0 ${btnClass}`}
              animate={{
                rotate: isHovered ? 45 : 0
              }}
            >
              <ArrowUpRight size={13.5} className={`${arrowColor} stroke-[2.5]`} />
            </motion.span>
            <span className="text-[9.5px] font-black tracking-widest uppercase opacity-85 group-hover:opacity-100 transition-opacity">
              LEARN MORE
            </span>
          </div>
        </div>

        {/* Right Col (35% width) - HIGH-FIDELITY MINIMALIST ABSTRACT GEOMETRIC SVG */}
        <div className="col-span-4 h-full relative overflow-visible pointer-events-none select-none z-0">
          <div className="absolute inset-0 overflow-visible flex items-center justify-center">
            {service.id === "webdev" && <WebDevAbstractSVG isHovered={isHovered} />}
            {service.id === "ai" && <AIAbstractSVG isHovered={isHovered} />}
            {service.id === "saas" && <SaaSAbstractSVG isHovered={isHovered} />}
            {service.id === "ux" && <UXAbstractSVG isHovered={isHovered} />}
          </div>
        </div>

      </div>
    </motion.div>
  );
}

/* ==========================================================================
   HIGH-END, PROFESSIONAL MINIMALIST ABSTRACT GEOMETRIC SVGs
   ========================================================================== */

// 1. High-End Web Development: Abstract Responsive Grid Blueprint (Dark Theme)
function WebDevAbstractSVG({ isHovered }: { isHovered: boolean }) {
  return (
    <svg className="w-24 h-24 overflow-visible scale-110" viewBox="0 0 100 100">
      {/* Outer elegant browser shell frame */}
      <rect 
        x="10" 
        y="15" 
        width="80" 
        height="60" 
        rx="6" 
        fill="none" 
        stroke="#FFFFFF" 
        strokeWidth="1.2" 
        strokeOpacity={isHovered ? 0.35 : 0.2}
        className="transition-all duration-300"
      />
      
      {/* Header window dot indicators */}
      <circle cx="18" cy="21" r="1.5" fill="#FFFFFF" fillOpacity="0.3" />
      <circle cx="23" cy="21" r="1.5" fill="#FFFFFF" fillOpacity="0.3" />
      <circle cx="28" cy="21" r="1.5" fill="#FFFFFF" fillOpacity="0.3" />

      {/* Grid Blueprint helper guides */}
      <g stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.1" strokeDasharray="3 3">
        <line x1="36" y1="27" x2="36" y2="70" />
        <line x1="64" y1="27" x2="64" y2="70" />
        <line x1="15" y1="48" x2="85" y2="48" />
      </g>

      {/* Responsive central layout block container */}
      <motion.rect
        x="36"
        y="32"
        rx="3"
        animate={{
          width: isHovered ? 48 : 28,
          x: isHovered ? 26 : 36,
          fillOpacity: isHovered ? 0.2 : 0.08,
          strokeOpacity: isHovered ? 0.8 : 0.4
        }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        height="26"
        fill="#2563EB"
        stroke="#2563EB"
        strokeWidth="1.2"
      />

      {/* Floating coordinates indicator tags */}
      <motion.line 
        x1="50" 
        y1="15" 
        x2="50" 
        y2="75" 
        stroke="#00E65C" 
        strokeWidth="0.8" 
        strokeOpacity="0.4"
        animate={{ scaleY: isHovered ? 1.05 : 0.95 }}
      />
      
      {/* Glowing blueprint coordinate nodes */}
      <motion.circle 
        cx="50" 
        cy="48" 
        r={isHovered ? 3.5 : 2} 
        fill="#00E65C"
        animate={{ fillOpacity: isHovered ? [0.4, 1, 0.4] : 0.7 }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
    </svg>
  );
}

// 2. Intelligent AI Integrations: Abstract Neural Quantum Matrix (Light Theme)
function AIAbstractSVG({ isHovered }: { isHovered: boolean }) {
  return (
    <svg className="w-24 h-24 overflow-visible scale-110" viewBox="0 0 100 100">
      <defs>
        <radialGradient id="aiCoreGlowGrid" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00E65C" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#00E65C" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient background blur glow */}
      {isHovered && <circle cx="50" cy="50" r="30" fill="url(#aiCoreGlowGrid)" />}

      {/* Orbiting Concentric Dashed Ring 1 */}
      <motion.circle
        cx="50"
        cy="50"
        r="24"
        fill="none"
        stroke="#111111"
        strokeWidth="0.8"
        strokeDasharray="4 6"
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ originX: "50px", originY: "50px" }}
      />

      {/* Orbiting Concentric Dashed Ring 2 */}
      <motion.circle
        cx="50"
        cy="50"
        r="16"
        fill="none"
        stroke="#00E65C"
        strokeWidth="1.2"
        strokeDasharray="8 4"
        animate={{ rotate: -360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ originX: "50px", originY: "50px" }}
      />

      {/* Radiating node paths */}
      <g stroke="#111111" strokeWidth="0.8" strokeOpacity="0.15">
        <line x1="50" y1="50" x2="25" y2="35" />
        <line x1="50" y1="50" x2="75" y2="35" />
        <line x1="50" y1="50" x2="50" y2="76" />
      </g>

      {/* Outer Mini Nodes */}
      <motion.circle 
        cx="25" 
        cy="35" 
        r={isHovered ? 3.5 : 2.5} 
        fill="#111111" 
        animate={{ scale: isHovered ? 1.25 : 1 }}
      />
      <motion.circle 
        cx="75" 
        cy="35" 
        r={isHovered ? 3.5 : 2.5} 
        fill="#111111" 
        animate={{ scale: isHovered ? 1.25 : 1 }}
      />
      <motion.circle 
        cx="50" 
        cy="76" 
        r={isHovered ? 3.5 : 2.5} 
        fill="#00E65C" 
        animate={{ scale: isHovered ? 1.25 : 1 }}
      />

      {/* Central Neural Quantum Node */}
      <motion.circle
        cx="50"
        cy="50"
        r={isHovered ? 6.5 : 5}
        fill="#111111"
        stroke="#00E65C"
        strokeWidth="1.5"
        animate={{ scale: isHovered ? [1, 1.15, 1] : 1 }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
    </svg>
  );
}

// 3. Premium SaaS Development: Abstract Financial Ledger Telemetry (Light Theme)
function SaaSAbstractSVG({ isHovered }: { isHovered: boolean }) {
  const bars = [25, 45, 30, 60, 35, 55, 40, 50];

  return (
    <svg className="w-24 h-24 overflow-visible scale-110" viewBox="0 0 100 100">
      {/* Horizontal Baseline */}
      <line x1="10" y1="75" x2="90" y2="75" stroke="#111111" strokeWidth="1" strokeOpacity="0.2" />

      {/* Metric equalizer bars depicting telemetry rods */}
      {bars.map((h, i) => (
        <g key={i}>
          {/* Telemetry vertical line */}
          <motion.line
            x1={18 + i * 9}
            y1={75}
            x2={18 + i * 9}
            y2={75 - h}
            animate={{
              y2: isHovered 
                ? [75 - h, 75 - h * 1.3, 75 - h * 0.7, 75 - h] 
                : 75 - h
            }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: "easeInOut",
              delay: i * 0.12
            }}
            stroke={i === 3 || i === 5 ? "#2563EB" : "#111111"}
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Telemetry nodes at tips */}
          <motion.circle
            cx={18 + i * 9}
            animate={{
              cy: isHovered 
                ? [75 - h, 75 - h * 1.3, 75 - h * 0.7, 75 - h] 
                : 75 - h
            }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: "easeInOut",
              delay: i * 0.12
            }}
            r="2"
            fill={i === 3 || i === 5 ? "#2563EB" : "#111111"}
          />
        </g>
      ))}

      {/* Subtle indicator grid line overlay */}
      <line 
        x1="10" 
        y1="38" 
        x2="90" 
        y2="38" 
        stroke="#2563EB" 
        strokeWidth="0.8" 
        strokeDasharray="2 4" 
        strokeOpacity={isHovered ? 0.5 : 0.25} 
      />
    </svg>
  );
}

// 4. Luxury UI/UX Design: Abstract Vector Bezier Curve Morph (Dark Theme)
function UXAbstractSVG({ isHovered }: { isHovered: boolean }) {
  // Spring handles that morph the Bezier points
  const c1Y = useSpring(isHovered ? 75 : 25, { stiffness: 80, damping: 14 });
  const c2Y = useSpring(isHovered ? 25 : 75, { stiffness: 80, damping: 14 });

  // Map springs into dynamic path string
  const pathD = useTransform([c1Y, c2Y], ([val1, val2]) => `M 15 50 C 35 ${val1}, 65 ${val2}, 85 50`);

  return (
    <svg className="w-24 h-24 overflow-visible scale-110" viewBox="0 0 100 100">
      {/* Background elegant Dot grid */}
      <defs>
        <pattern id="dotGrid" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.6" fill="#FFFFFF" fillOpacity="0.1" />
        </pattern>
      </defs>
      <rect x="5" y="10" width="90" height="80" rx="4" fill="url(#dotGrid)" />

      {/* Blueprint guide outline */}
      <rect x="5" y="10" width="90" height="80" rx="4" fill="none" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.08" />

      {/* Primary Bezier Curve path morphs on hover */}
      <motion.path
        d={pathD}
        fill="none"
        stroke="#00E65C"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="transition-all duration-300"
      />

      {/* Blueprint anchor handles A */}
      <motion.line 
        x1="15" 
        y1="50" 
        x2="35" 
        y2={c1Y} 
        stroke="#2563EB" 
        strokeWidth="0.8" 
        strokeDasharray="2 2" 
        strokeOpacity="0.4"
      />
      <circle cx="15" cy="50" r="2.5" fill="#FFFFFF" stroke="#111111" strokeWidth="1" />
      <motion.circle cx="35" cy={c1Y} r="2" fill="#2563EB" stroke="#FFFFFF" strokeWidth="0.5" />

      {/* Blueprint anchor handles B */}
      <motion.line 
        x1="85" 
        y1="50" 
        x2="65" 
        y2={c2Y} 
        stroke="#2563EB" 
        strokeWidth="0.8" 
        strokeDasharray="2 2" 
        strokeOpacity="0.4"
      />
      <circle cx="85" cy="50" r="2.5" fill="#FFFFFF" stroke="#111111" strokeWidth="1" />
      <motion.circle cx="65" cy={c2Y} r="2" fill="#2563EB" stroke="#FFFFFF" strokeWidth="0.5" />
    </svg>
  );
}

/* ==========================================================================
   LUXURY EXPANDED SHOWCASE MODAL COMPONENT (Inspired by Reference 1)
   ========================================================================== */
function ServiceDetailsShowcase({ service, onClose }: { service: ServiceItem; onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fanned, setFanned] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => setFanned(true), 300);
    return () => {
      document.body.style.overflow = "unset";
      clearTimeout(timer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[1000] bg-[#090B0D] overflow-y-auto px-6 py-12 md:py-16 flex flex-col justify-between items-center"
      ref={containerRef}
    >
      {/* Background radial overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute -left-1/4 top-1/4 w-[600px] h-[600px] rounded-full bg-[#00E65C]/10 blur-[130px]" />
        
        {/* Radial grid circles */}
        <svg className="absolute w-[800px] h-[800px] -left-10 -top-10 opacity-[0.04]" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="10" fill="none" stroke="#FFFFFF" strokeWidth="0.1" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="#FFFFFF" strokeWidth="0.1" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="#FFFFFF" strokeWidth="0.1" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="#FFFFFF" strokeWidth="0.1" />
          <circle cx="50" cy="50" r="48" fill="none" stroke="#FFFFFF" strokeWidth="0.1" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="#FFFFFF" strokeWidth="0.05" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="#FFFFFF" strokeWidth="0.05" />
        </svg>
      </div>

      {/* Header controls */}
      <div className="w-full max-w-5xl flex justify-between items-center z-10 mb-8 select-none">
        <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">
          SERVICE CASE STUDY // {service.num}
        </span>
        <button
          onClick={onClose}
          className="group w-10 h-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
          data-cursor="pointer"
        >
          <X size={16} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      {/* Main Grid contents (Reference 1) */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10 my-auto">
        
        {/* Left Column: Bold Typography & Details */}
        <div className="lg:col-span-6 flex flex-col gap-6 text-left select-none">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold tracking-widest text-[#00E65C] uppercase">
              EXECUTIVE SOLUTIONS
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-sans text-white tracking-tight uppercase leading-[0.9] flex flex-col">
              <span className="text-neutral-400 font-normal">{service.name.split(" ").slice(0, 2).join(" ")}</span>
              <span className="text-[#00E65C]">{service.name.split(" ").slice(2).join(" ")}</span>
            </h1>
          </div>

          <p className="text-sm leading-relaxed text-neutral-400 max-w-lg">
            {service.desc}
          </p>

          {/* Key Deliverables Bullet Grid */}
          <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
            <span className="text-[9px] font-bold tracking-widest text-white uppercase">
              DELIVERABLE SPECIFICATIONS:
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-400">
              {service.deliverables.map((del) => (
                <li key={del} className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E65C] shrink-0" />
                  {del}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Fanned Cards Stack & Glassmorphic Tab Folder (Centerpiece Reference 1) */}
        <div className="lg:col-span-6 flex justify-center items-center w-full relative overflow-visible pt-10 lg:pt-0">
          <div className="relative w-full max-w-[380px] h-[340px] md:h-[380px] flex items-center justify-center overflow-visible scale-75 sm:scale-90 md:scale-100 origin-center">
            
            {/* 1. BACK FANNED STACK CARDS */}
            {/* Card 1: Back-Left */}
            <motion.div
              animate={{
                rotate: fanned ? -22 : 0,
                x: fanned ? -95 : 0,
                y: fanned ? -15 : 0,
              }}
              transition={{ type: "spring", stiffness: 90, damping: 18 }}
              className={`absolute w-[180px] h-[220px] rounded-2xl p-4 flex flex-col justify-between text-left shadow-[0_12px_24px_rgba(0,0,0,0.4)] z-0 ${
                service.theme.includes("blue") 
                  ? "bg-[#101625] border border-white/10 text-white" 
                  : service.theme.includes("green")
                  ? "bg-[#09170F] border border-white/10 text-white"
                  : "bg-[#16161C] border border-white/5 text-white"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[7px] font-mono opacity-50">TAB_A // SHELL</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E65C]" />
              </div>
              <h4 className="text-xs font-bold leading-tight font-sans tracking-wide uppercase mt-4">
                High-Contrast <br/> Design Assets
              </h4>
              <div className="h-10 border border-white/10 rounded-lg bg-black/40 mt-auto flex items-center justify-center text-[7px] font-mono opacity-50">
                WIDGET_PREVIEW
              </div>
            </motion.div>

            {/* Card 2: Back-Middle-Left */}
            <motion.div
              animate={{
                rotate: fanned ? -10 : 0,
                x: fanned ? -35 : 0,
                y: fanned ? -35 : 0,
              }}
              transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.05 }}
              className="absolute w-[180px] h-[220px] bg-[#121216] border border-white/10 rounded-2xl p-4 flex flex-col justify-between text-left shadow-[0_15px_30px_rgba(0,0,0,0.5)] z-10 text-white"
            >
              <div className="flex justify-between items-center">
                <span className="text-[7px] font-mono opacity-50">TAB_B // MODULE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              </div>
              
              <div className="flex flex-col gap-1.5 my-auto">
                <span className="w-10 h-1.5 bg-white/20 rounded-full" />
                <span className="w-16 h-1.5 bg-[#00E65C]/80 rounded-full" />
                <span className="w-12 h-1.5 bg-white/10 rounded-full" />
              </div>
              
              <span className="text-[7.5px] font-mono opacity-50 mt-auto">SYS_OK: 100%</span>
            </motion.div>

            {/* Card 3: Back-Middle-Right */}
            <motion.div
              animate={{
                rotate: fanned ? 10 : 0,
                x: fanned ? 35 : 0,
                y: fanned ? -35 : 0,
              }}
              transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.1 }}
              className="absolute w-[180px] h-[220px] bg-[#1A1A22] border border-white/15 rounded-2xl p-4 flex flex-col justify-between text-left shadow-[0_15px_30px_rgba(0,0,0,0.5)] z-20 text-white"
            >
              <div className="flex justify-between items-center">
                <span className="text-[7px] font-mono opacity-50">TAB_C // METRICS</span>
                <div className="bg-[#00E65C]/15 border border-[#00E65C]/35 rounded px-1 text-[5px] text-[#00E65C] font-bold">LIVE</div>
              </div>
              
              <div className="my-auto flex gap-1 justify-center items-end h-12 pt-2 border-b border-white/5 pb-1">
                {[15, 30, 45, 20, 60].map((h, i) => (
                  <div key={i} className="flex-1 bg-[#2563EB]/40 rounded-t-sm" style={{ height: `${h}%` }} />
                ))}
              </div>
              
              <span className="text-[6.5px] font-mono text-neutral-400 mt-auto">COMPILATION_SEC</span>
            </motion.div>

            {/* Card 4: Back-Right */}
            <motion.div
              animate={{
                rotate: fanned ? 22 : 0,
                x: fanned ? 95 : 0,
                y: fanned ? -15 : 0,
              }}
              transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.15 }}
              className={`absolute w-[180px] h-[220px] rounded-2xl p-4 flex flex-col justify-between text-left shadow-[0_12px_24px_rgba(0,0,0,0.4)] z-30 ${
                service.theme.includes("blue") 
                  ? "bg-[#101625] border border-white/10 text-white" 
                  : service.theme.includes("green")
                  ? "bg-[#09170F] border border-white/10 text-white"
                  : "bg-[#16161C] border border-white/5 text-white"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[7px] font-mono opacity-50">TAB_D // UX</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E65C]" />
              </div>
              <h4 className="text-xs font-bold leading-tight font-sans tracking-wide uppercase mt-4">
                Premium Editorial <br/> Spacing Grid
              </h4>
              <div className="text-[7px] font-mono text-neutral-500 mt-auto">
                GRID_COMPLIANT
              </div>
            </motion.div>

            {/* 2. FOREGROUND GLASSMORPHIC FOLDER CARD (Reference 1) */}
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
              className="absolute bottom-0 inset-x-0 h-44 rounded-3xl backdrop-blur-xl bg-[#092B19]/35 border border-white/15 shadow-[0_24px_60px_rgba(0,0,0,0.6),_inset_0_1px_0_rgba(255,255,255,0.15)] z-40 p-6 flex flex-col justify-between select-none"
            >
              <div className="absolute -top-[17px] left-6 w-24 h-4.5 bg-[#092B19]/35 border-t border-l border-r border-white/15 rounded-t-lg backdrop-blur-xl" />
              
              <div className="flex justify-between items-start pt-1.5">
                <div className="flex flex-col gap-0.5 text-left">
                  <span className="text-[7px] font-mono text-[#00E65C]/80 uppercase tracking-widest">
                    ACTIVE PROJECT SHELL
                  </span>
                  <span className="text-sm font-bold text-white font-sans tracking-tight">
                    {service.id === "webdev" && "NextJS Web Portal"}
                    {service.id === "ai" && "Semantic AI Neural"}
                    {service.id === "saas" && "Ledger Payment Dashboard"}
                    {service.id === "ux" && "Figma Editorial System"}
                  </span>
                </div>
                <div className="bg-[#00E65C]/15 border border-[#00E65C]/35 rounded px-2 py-0.5 text-[6.5px] text-[#00E65C] font-mono font-bold tracking-widest">
                  SECURE
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center bg-white/10">
                    <span className="w-2 h-2 rounded-full bg-[#00E65C]" />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-white font-mono">
                    EKIEPAY
                  </span>
                </div>

                <div className="flex gap-2.5 bg-black/45 border border-white/10 px-3.5 py-1.5 rounded-full shadow-sm text-neutral-300">
                  <Bookmark size={11} className="hover:text-[#00E65C] transition-colors cursor-pointer" />
                  <Heart size={11} className="hover:text-red-500 transition-colors cursor-pointer" />
                  <Share2 size={11} className="hover:text-blue-400 transition-colors cursor-pointer" />
                  <Send size={11} className="hover:text-[#00E65C] transition-colors cursor-pointer" />
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>

      {/* THREE PREVIEW THUMBNAILS (Reference 1) */}
      <div className="w-full max-w-5xl z-10 select-none my-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          {[0, 1, 2, 3].map((idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + idx * 0.05 }}
              whileHover={{ y: -3, borderColor: "#00E65C/50" }}
              className="aspect-square rounded-2xl border-2 border-white/10 bg-[#121215] p-4 flex flex-col justify-between shadow-md group relative overflow-hidden select-none text-left"
            >
              {idx === 0 && (
                <div className="w-full h-full flex flex-col justify-between relative z-10 opacity-70 group-hover:opacity-100 transition-opacity">
                  <span className="text-[6px] font-mono text-neutral-500">THUMB_01 // MODEL</span>
                  <div className="w-8 h-8 rounded-full border border-white/15 bg-white/5 my-auto flex items-center justify-center">
                    <span className="w-4 h-4 rounded-full bg-white/20" />
                  </div>
                  <span className="text-[6.5px] font-mono text-neutral-400">LAYOUT_SHELL</span>
                </div>
              )}
              {idx === 1 && (
                <div className="w-full h-full flex flex-col justify-between relative z-10 opacity-70 group-hover:opacity-100 transition-opacity">
                  <span className="text-[6px] font-mono text-neutral-500">THUMB_02 // SYSTEM</span>
                  <div className="flex flex-col gap-1 my-auto w-12">
                    <div className="h-1 bg-white/20 rounded" />
                    <div className="h-1 bg-[#00E65C]/60 rounded" />
                    <div className="h-1 bg-white/10 rounded" />
                  </div>
                  <span className="text-[6.5px] font-mono text-neutral-400">DB_TELEMETRY</span>
                </div>
              )}
              {idx === 2 && (
                <div className="w-full h-full flex flex-col justify-between relative z-10 opacity-70 group-hover:opacity-100 transition-opacity">
                  <span className="text-[6px] font-mono text-neutral-500">THUMB_03 // SEARCH</span>
                  <div className="w-10 h-3.5 border border-white/15 bg-white/5 rounded-full my-auto flex items-center px-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E65C]" />
                  </div>
                  <span className="text-[6.5px] font-mono text-neutral-400">VECTOR_MATCH</span>
                </div>
              )}
              {idx === 3 && (
                <div className="w-full h-full flex flex-col justify-between relative z-10 opacity-70 group-hover:opacity-100 transition-opacity">
                  <span className="text-[6px] font-mono text-neutral-500">THUMB_04 // WIRE</span>
                  <div className="my-auto flex gap-1 items-end h-8">
                    <div className="w-1 bg-white/20 h-4" />
                    <div className="w-1 bg-[#00E65C]/60 h-6" />
                    <div className="w-1 bg-white/10 h-2" />
                  </div>
                  <span className="text-[6.5px] font-mono text-neutral-400">STABILITY_CHECK</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40 z-0" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* METADATA TECHNICAL FOOTER swatches (Reference 1) */}
      <div className="w-full max-w-5xl flex flex-col sm:flex-row gap-6 items-center justify-between border-t border-white/10 pt-8 z-10 select-none text-[8.5px] font-mono tracking-widest text-neutral-500">
        <span>{service.metaTech}</span>

        {/* Color swatches */}
        <div className="flex gap-2.5 bg-[#121215] border border-white/10 px-4 py-2.5 rounded-2xl shadow-sm">
          {service.metaPalette.map((color) => (
            <div 
              key={color} 
              className="w-3.5 h-3.5 rounded border border-white/15 shadow-sm"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <span>{service.metaTypeface}</span>
      </div>
    </motion.div>
  );
}
