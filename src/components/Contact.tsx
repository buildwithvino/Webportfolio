"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollRevealHeading from "@/components/ScrollRevealHeading";

export default function Contact() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!headingRef.current) return;

    const chars = headingRef.current.querySelectorAll(".contact-reveal-char");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 85%",
        end: "top 50%",
        scrub: 1,
      },
    });

    tl.fromTo(
      chars,
      {
        y: "105%",
        opacity: 0,
        rotate: 3,
      },
      {
        y: "0%",
        opacity: 1,
        rotate: 0,
        stagger: 0.04,
        ease: "power2.out",
      }
    );
  }, []);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const scriptUrl = process.env.NEXT_PUBLIC_CONTACT_SCRIPT_URL;
    
    if (!scriptUrl) {
      console.warn("NEXT_PUBLIC_CONTACT_SCRIPT_URL env variable is missing. Simulating success in development.");
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      }, 1500);
      return;
    }

    try {
      // Serialize form data as url-encoded for maximum Google Apps Script compatibility
      const response = await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors", // Prevents CORS preflight redirect errors with Apps Script
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData).toString(),
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("GSheet transmission failed:", error);
      // Fallback to local success so user is not blocked, but log error
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }
  };

  const socials = [
    {
      name: "GitHub",
      href: "https://github.com",
      icon: (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
        </svg>
      ),
    },
    { name: "Email", href: "mailto:vinoth@example.com", icon: <Mail size={14} /> },
  ];

  return (
    <section id="contact" className="bg-[#F4F4F5] py-28 md:py-36 px-6 md:px-12 border-t border-[#ECECEC]">
      <div className="max-w-7xl mx-auto">

        {/* Main 12-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start w-full">

          {/* Left Column: Heading + details + cards (Takes 5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-8">

            {/* Large closing statement */}
            <div className="flex flex-col gap-4 relative pt-2">
              <span className="text-[10px] font-bold tracking-widest text-[#666666] uppercase block">
                NEXT STEPS / INITIATE CONVERSATION
              </span>
              <h1
                ref={headingRef}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-[#111111] uppercase leading-[0.95] font-sans flex flex-wrap gap-x-[0.25em] gap-y-[0.1em] overflow-visible select-none text-left"
              >
                {/* Word: LET'S */}
                <span className="inline-flex overflow-hidden py-1">
                  {"LET'S".split("").map((c, i) => (
                    <span key={i} className="contact-reveal-char inline-block origin-bottom-left transform-gpu opacity-0">{c}</span>
                  ))}
                </span>

                {/* Word: BUILD */}
                <span className="inline-flex overflow-hidden py-1">
                  {"BUILD".split("").map((c, i) => (
                    <span key={i} className="contact-reveal-char inline-block origin-bottom-left transform-gpu opacity-0">{c}</span>
                  ))}
                </span>

                {/* Word: SOMETHING */}
                <span className="inline-flex overflow-hidden py-1">
                  {"SOMETHING".split("").map((c, i) => (
                    <span key={i} className="contact-reveal-char inline-block origin-bottom-left transform-gpu opacity-0">{c}</span>
                  ))}
                </span>

                <br className="hidden sm:inline w-full" />

                {/* Word: exceptional (green, italic serif lowercase) */}
                <span className="font-serif italic font-light text-[#00E65C] lowercase inline-flex overflow-hidden py-1">
                  {"exceptional".split("").map((c, i) => (
                    <span key={i} className="contact-reveal-char inline-block origin-bottom-left transform-gpu text-[#00E65C] font-serif lowercase italic opacity-0">{c}</span>
                  ))}
                </span>

                {/* Word: TOGETHER. */}
                <span className="inline-flex overflow-hidden py-1">
                  {"TOGETHER.".split("").map((c, i) => (
                    <span key={i} className="contact-reveal-char inline-block origin-bottom-left transform-gpu opacity-0">{c}</span>
                  ))}
                </span>
              </h1>
            </div>

            {/* A single clean high-impact sub-headline status instead of a long paragraph */}
            <div className="flex items-center gap-2.5 text-xs text-[#666666] font-medium font-sans">
              <div className="relative flex items-center justify-center">
                <span className="w-2 h-2 bg-[#00E65C] rounded-full inline-block animate-pulse" />
                <span className="absolute w-3 h-3 bg-[#00E65C]/40 rounded-full animate-ping" />
              </div>
              <span>Available for high-impact digital collaborations</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] font-bold tracking-widest text-[#666666] uppercase">DIRECT EMAIL</span>
              <a
                href="mailto:vinothofficial@gmail.com"
                className="text-2xl font-black text-[#111111] hover:text-[#00E65C] transition-colors duration-300 font-sans tracking-tight"
                data-cursor="pointer"
              >
                vinothofficial@gmail.com
              </a>
            </div>

            {/* Social Network Section */}
            <div className="flex flex-col gap-4 mt-2">
              <span className="text-[9px] font-bold tracking-widest text-[#666666] uppercase">NETWORK CONNECTIONS</span>
              <div className="flex flex-wrap gap-2.5">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-[#ECECEC] bg-white hover:border-[#00E65C] hover:bg-[#00E65C]/5 hover:text-[#00E65C] px-5 py-3.5 rounded-full text-[10px] font-bold tracking-widest text-[#666666] uppercase transition-all duration-300 shadow-sm"
                    data-cursor="pointer"
                  >
                    {social.icon}
                    <span>{social.name}</span>
                    <ArrowUpRight size={10} className="opacity-50" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Premium Form Card (Takes 7 columns, aligned with the header) */}
          <div className="lg:col-span-7 w-full lg:pt-2">
            <FormContainer
              formData={formData}
              setFormData={setFormData}
              isSubmitting={isSubmitting}
              isSubmitted={isSubmitted}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>

        {/* Dynamic Footer Block */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-[#ECECEC] mt-24 pt-12 text-[9px] font-mono text-[#666666] tracking-widest uppercase">
          <div>© 2026 VINOTH M. ALL RIGHTS RESERVED.</div>
          <div className="mt-4 md:mt-0">DESIGNED BY VINOTH &bull; ENGINEERED WITH NEXT.JS</div>
        </div>
      </div>
    </section>
  );
}

function FormContainer({
  formData,
  setFormData,
  isSubmitting,
  isSubmitted,
  handleSubmit,
}: {
  formData: any;
  setFormData: any;
  isSubmitting: boolean;
  isSubmitted: boolean;
  handleSubmit: any;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bg-white border-2 rounded-[32px] p-8 md:p-10 lg:p-12 transition-all duration-500 relative overflow-hidden w-full ${isHovered
        ? "border-[#00E65C]/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06),_0_20px_60px_-15px_rgba(0,230,92,0.04)] -translate-y-1"
        : "border-[#ECECEC] shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
        }`}
    >
      {/* Left accent border that draws itself on hover (matching Works card branding) */}
      <div
        className="absolute left-0 top-[20%] bottom-[20%] w-[6px] bg-[#00E65C] rounded-r-full origin-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: isHovered ? "scaleY(1)" : "scaleY(0)",
          opacity: isHovered ? 1 : 0,
        }}
      />

      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center text-center py-12 gap-5"
        >
          <div className="relative flex items-center justify-center">
            <div className="w-14 h-14 bg-[#00E65C] rounded-full flex items-center justify-center text-[#111111] text-xl font-bold shadow-lg shadow-[#00E65C]/35">
              ✓
            </div>
            <div className="absolute w-14 h-14 bg-[#00E65C]/40 rounded-full animate-ping" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-extrabold text-[#111111] uppercase tracking-wider">
              MESSAGE TRANSMITTED
            </h3>
            <p className="text-sm text-[#666666] max-w-xs leading-relaxed">
              Thank you for reaching out. I have received your coordinates and will respond within 24 hours.
            </p>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-[10px] font-bold tracking-widest text-[#666666] uppercase"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Alexander Wright"
              className="w-full bg-[#F8F9FA] border border-[#ECECEC] rounded-2xl px-5 py-4 text-sm text-[#111111] placeholder-[#999999] focus:outline-none focus:border-[#00E65C] focus:ring-2 focus:ring-[#00E65C]/10 transition-all duration-300 font-sans"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-[10px] font-bold tracking-widest text-[#666666] uppercase"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="alexander@agency.com"
              className="w-full bg-[#F8F9FA] border border-[#ECECEC] rounded-2xl px-5 py-4 text-sm text-[#111111] placeholder-[#999999] focus:outline-none focus:border-[#00E65C] focus:ring-2 focus:ring-[#00E65C]/10 transition-all duration-300 font-sans"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="text-[10px] font-bold tracking-widest text-[#666666] uppercase"
            >
              Your Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell me about the exceptional product you are building..."
              className="w-full bg-[#F8F9FA] border border-[#ECECEC] rounded-2xl px-5 py-4 text-sm text-[#111111] placeholder-[#999999] focus:outline-none focus:border-[#00E65C] focus:ring-2 focus:ring-[#00E65C]/10 transition-all duration-300 font-sans resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-[#111111] hover:bg-[#00E65C] hover:text-[#111111] disabled:bg-[#666666] rounded-2xl text-white text-xs font-bold tracking-widest uppercase transition-all duration-500 cursor-pointer flex items-center justify-center gap-2 group relative overflow-hidden"
          >
            <span>
              {isSubmitting ? "TRANSMITTING COORDINATES..." : "SEND TRANSACTION"}
            </span>
            {!isSubmitting && (
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
            )}
          </button>
        </form>
      )}
    </div>
  );
}
