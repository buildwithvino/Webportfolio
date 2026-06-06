"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollRevealHeading from "@/components/ScrollRevealHeading";
import Image from "next/image";

interface Project {
  id: string;
  name: string;
  category: string;
  year: string;
  description: string;
  tech: string[];
  color: string;
  url: string;
}

export default function WorkShowcase() {
  const projects: Project[] = [
    {
      id: "apexmarketing",
      name: "Apex Marketing",
      category: "Performance Marketing Platform",
      year: "2025",
      description: "A high-performance marketing and client acquisition engine built to scale conversion pipelines. Leverages interactive analytics dashboards, real-time lead telemetry, automated campaign funnels, and an SEO-optimized landing architecture.",
      tech: ["Next.js", "Tailwind CSS", "GSAP ScrollTrigger", "Framer Motion", "Conversion API"],
      color: "bg-[#FFFFFF] border-[#ECECEC]",
      url: "https://catalistemliswebflowio.vercel.app/",
    },
    {
      id: "ideovate",
      name: "Ideovate",
      category: "Digital Agency Platform",
      year: "2026",
      description: "A premium marketing and interactive brand experience website designed for high-end boutique agencies. Built to convert premium leads through smooth storytelling parallax, exceptional editorial layouts, and near-zero loading speed.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP ScrollTrigger", "Framer Motion"],
      color: "bg-[#FFFFFF] border-[#ECECEC]",
      url: "https://ideovate1.vercel.app/",
    },
    {
      id: "ksquare",
      name: "KSquare Demo",
      category: "Enterprise Software Dashboard",
      year: "2025",
      description: "A modern software interface and dashboard optimized for executive client coordination. Fuses complex customer data, live telemetry metrics, and secure invoicing models into a gorgeous, understandable dashboard.",
      tech: ["React", "TypeScript", "Tailwind CSS", "Interactive Canvas", "REST API"],
      color: "bg-[#0A0D0F] border-neutral-900",
      url: "https://ksquaredemo.vercel.app/",
    },
    {
      id: "trinity",
      name: "Trinity Interiors",
      category: "Architecture & Design Portfolio",
      year: "2024",
      description: "A tailored, creative media platform built to showcase high-contrast images and interior design portfolios for high-end boutique firms. Leverages beautiful horizontal gallery logic and smooth GSAP layouts that load instantly.",
      tech: ["Next.js", "Tailwind CSS", "GSAP ScrollTrigger", "Lenis Scrolling", "Figma Design"],
      color: "bg-[#F8F8F8] border-[#ECECEC]",
      url: "https://trinityinteriors.netlify.app/",
    },
  ];

  return (
    <section id="work" className="bg-[#F4F4F5] py-24 md:py-32 px-6 md:px-12 border-t border-[#ECECEC]">
      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end w-full">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-[#666666] uppercase block mb-3">
              SELECT CLIENT WEBSITES / 2024 — 2026
            </span>
            <ScrollRevealHeading
              text="HIGH-IMPACT WORK."
              className="text-4xl md:text-6xl font-extrabold tracking-tighter text-[#111111] uppercase font-sans"
            />
          </div>
          <p className="text-sm md:text-base text-[#666666] max-w-md leading-relaxed">
            A meticulously curated selection of marketing platforms, creative storefronts, and premium SaaS dashboards built to drive client conversions and executive brand authority.
          </p>
        </div>

        {/* Magazine-inspired alternating layouts */}
        <div className="flex flex-col gap-24 md:gap-32 w-full">
          {projects.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const isEven = index % 2 === 0;
  const [isHovered, setIsHovered] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register scrollTrigger on client-side
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Animate card frame sliding up & fading in
      gsap.fromTo(
        rowRef.current,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power4.out",
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        }
      );

      // 2. Animate the visual column sliding in from left/right
      const visualEl = rowRef.current?.querySelector(".project-visual");
      if (visualEl) {
        gsap.fromTo(
          visualEl,
          {
            opacity: 0,
            x: isEven ? -40 : 40,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1.1,
            ease: "power3.out",
            delay: 0.1,
            scrollTrigger: {
              trigger: rowRef.current,
              start: "top 92%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 3. Animate the text column sliding in from right/left (opposite)
      const textEl = rowRef.current?.querySelector(".project-text");
      if (textEl) {
        gsap.fromTo(
          textEl,
          {
            opacity: 0,
            x: isEven ? 40 : -40,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1.1,
            ease: "power3.out",
            delay: 0.18,
            scrollTrigger: {
              trigger: rowRef.current,
              start: "top 92%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, rowRef);

    return () => ctx.revert();
  }, [isEven]);

  return (
    <div
      ref={rowRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ opacity: 0 }} // Start hidden so GSAP takes over cleanly without flash
      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center w-full p-6 md:p-10 lg:p-12 rounded-[32px] border-2 transition-all duration-500 relative overflow-hidden ${
        isHovered
          ? "bg-white border-[#00E65C]/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1),_0_20px_60px_-15px_rgba(0,230,92,0.1)] -translate-y-1"
          : "bg-white border-[#E5E5E5] shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
      }`}
    >
      {/* Left accent border that draws itself on hover */}
      <div 
        className="absolute left-0 top-[20%] bottom-[20%] w-[6px] bg-[#00E65C] rounded-r-full origin-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: isHovered ? "scaleY(1)" : "scaleY(0)",
          opacity: isHovered ? 1 : 0
        }}
      />

      {/* Visual Preview Block - Takes 7 Cols */}
      <div
        className={`project-visual lg:col-span-7 w-full aspect-video rounded-3xl border overflow-hidden shadow-sm relative group ${
          project.color
        } ${isEven ? "lg:order-1" : "lg:order-2"}`}
      >
        <ProjectVisual project={project} isRowHovered={isHovered} setIsRowHovered={setIsHovered} />
      </div>

      {/* Text Content Block - Takes 5 Cols */}
      <div
        className={`project-text lg:col-span-5 flex flex-col gap-6 ${
          isEven ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <div className="flex items-center gap-4 text-xs font-bold tracking-widest uppercase text-[#666666]">
          <span>{project.category}</span>
          <div className="relative w-2 h-2 flex items-center justify-center">
            {/* Glowing Dot linking the visual hover state directly to text column */}
            <motion.span
              animate={{
                scale: isHovered ? [1, 1.4, 1] : 1,
                backgroundColor: isHovered ? "#00E65C" : "#CCCCCC",
              }}
              transition={{ repeat: isHovered ? Infinity : 0, duration: 1.5 }}
              className="w-1.5 h-1.5 rounded-full inline-block"
            />
            {isHovered && (
              <span className="absolute w-2.5 h-2.5 bg-[#00E65C]/40 rounded-full animate-ping" />
            )}
          </div>
          <span>{project.year}</span>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#111111]">
            {project.name}
          </h3>
          <p className="text-sm leading-relaxed text-[#666666]">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech.map((t) => (
            <motion.span
              key={t}
              whileHover={{ y: -2 }}
              className="px-3 py-1 rounded-full border border-[#ECECEC] bg-white text-[9px] font-bold tracking-widest uppercase text-[#111111]/80 cursor-default transition-all duration-300 hover:border-[#00E65C] hover:bg-[#00E65C]/5 hover:text-[#00E65C]"
            >
              {t}
            </motion.span>
          ))}
        </div>

        <div className="pt-4">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block relative group"
            data-cursor="pointer"
          >
            <div className="relative pb-1">
              <span className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#111111] transition-colors duration-300">
                EXPLORE LIVE PROJECT
                <ArrowUpRight
                  size={14}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                />
              </span>
              <motion.div
                className="absolute bottom-0 left-0 h-[1.5px] bg-[#00E65C]"
                initial={{ width: "0%" }}
                animate={{ width: isHovered ? "100%" : "0%" }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

function ProjectVisual({
  project,
  isRowHovered,
  setIsRowHovered,
}: {
  project: Project;
  isRowHovered: boolean;
  setIsRowHovered: (h: boolean) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we are on a mobile touch screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 1024px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Motion values for tilt relative to container
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for tilt rotation
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 22 });

  // Floating parallax offsets for nested elements
  const px = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 22 });
  const py = useSpring(useTransform(y, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    setIsRowHovered(false);
    x.set(0);
    y.set(0);
  };

  const hasImage = ["ideovate", "ksquare", "trinity", "apexmarketing"].includes(project.id);

  if (hasImage) {
    return (
      <div 
        className="w-full h-full relative overflow-hidden select-none cursor-pointer rounded-3xl bg-neutral-100"
        onClick={() => window.open(project.url, "_blank")}
        onMouseEnter={() => setIsRowHovered(true)}
        onMouseLeave={() => setIsRowHovered(false)}
      >
        <Image 
          src={`/images/${project.id}.png`} 
          alt={`${project.name} - ${project.category}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={project.id === "apexmarketing"}
          className={`object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isRowHovered ? 'scale-[1.03]' : 'scale-100'}`}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsRowHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => window.open(project.url, "_blank")}
      className="w-full h-full relative overflow-hidden select-none cursor-pointer rounded-3xl"
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full relative"
      >
        <RenderVisualContent id={project.id} isHovered={isRowHovered} px={px} py={py} />
      </motion.div>
    </div>
  );
}

function RenderVisualContent({
  id,
  isHovered,
  px,
  py,
}: {
  id: string;
  isHovered: boolean;
  px: any;
  py: any;
}) {
  const pxStats = useTransform(px, (v: number) => v * 1.5);
  const pyStats = useTransform(py, (v: number) => v * 1.5);
  const bgX = useTransform(px, (v: number) => v * -0.4);
  const bgY = useTransform(py, (v: number) => v * -0.4);

  if (id === "apexmarketing") {
    return (
      <div className="w-full h-full relative flex flex-col justify-between overflow-hidden bg-[#FAFBFD]">
        {/* Soft elegant warm glow */}
        <motion.div
          style={{ x: bgX, y: bgY }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#EEF2FF_0%,transparent_60%)]"
        />
        
        <div className="flex items-center justify-between border-b border-[#ECECEC] p-6 z-10 bg-white/40 backdrop-blur-sm">
          <span className="text-[9px] font-bold tracking-widest text-[#111111] uppercase font-sans">APEX // PERFORMANCE</span>
          <div className="flex gap-2 text-[8px] font-mono text-[#666666]">
            <span>CAMPAIGNS: (04)</span>
            <span className="text-[#00E65C] font-bold">ACTIVE</span>
          </div>
        </div>

        {/* App mockup layout */}
        <div className="my-auto w-[85%] mx-auto flex items-center justify-between gap-4 py-4 z-10">
          {/* Conversion trend card */}
          <div className="border border-[#ECECEC] bg-white rounded-2xl p-4 flex-1 flex flex-col gap-2 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-[7px] font-bold tracking-widest text-[#666666] uppercase">CONVERSION FUNNEL</span>
              <span className="text-[8px] font-mono text-[#00E65C] font-bold">+18.4%</span>
            </div>
            
            {/* Custom SVG line chart mockup */}
            <div className="w-full h-12 relative mt-1">
              <svg viewBox="0 0 120 40" className="w-full h-full text-[#6366F1]" fill="none">
                <defs>
                  <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M0 35 Q15 25 30 30 T60 15 T90 20 T120 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
                <path
                  d="M0 35 Q15 25 30 30 T60 15 T90 20 T120 5 L120 40 L0 40 Z"
                  fill="url(#chartGlow)"
                />
                <motion.circle
                  cx="120"
                  cy="5"
                  r="3"
                  fill="#00E65C"
                  animate={{ r: isHovered ? [3, 5, 3] : 3 }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              </svg>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-[#F1F5F9] mt-1">
              <span className="text-[7px] font-mono text-[#666666]">CTR: 5.8%</span>
              <span className="text-[7px] font-mono text-[#111111] font-bold">ROAS: 4.8x</span>
            </div>
          </div>

          {/* Floating lead telemetry ticket */}
          <motion.div
            style={{ x: pxStats, y: pyStats }}
            className="flex flex-col gap-2 flex-1 justify-center bg-white border border-[#ECECEC] rounded-2xl p-4 shadow-lg"
          >
            <span className="text-[7px] font-bold tracking-widest text-[#666666] uppercase">LEAD ACQUISITION</span>
            <h5 className="text-xs font-black tracking-tight text-[#111111] uppercase leading-none">TELEMETRY</h5>
            <div className="text-sm font-extrabold text-[#111111]">
              4,820 <span className="text-[8px] font-mono text-[#666666] font-normal">/mo</span>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#111111] hover:bg-[#6366F1] hover:text-white py-1.5 rounded-lg text-[7px] font-bold tracking-widest text-center text-white uppercase transition-colors duration-300 cursor-pointer"
            >
              OPTIMIZE FUNNEL
            </motion.div>
          </motion.div>
        </div>

        <div className="flex items-center justify-between p-6 text-[8px] font-mono text-[#666666] z-10 border-t border-[#ECECEC]/50 bg-white/40">
          <div>LEAD PIPELINE: INSTANT</div>
          <div>CONVERSION RATE: +24%</div>
        </div>
      </div>
    );
  }

  return null;
}
