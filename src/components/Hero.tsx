"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textPortRef = useRef<HTMLSpanElement>(null);
  const textFolioRef = useRef<HTMLSpanElement>(null);
  const fRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const microLabelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. Reveal the centerpiece typographic "f" drawing/unveiling from top to bottom
      tl.fromTo(
        fRef.current,
        {
          clipPath: "polygon(-50% -50%, 150% -50%, 150% -50%, -50% -50%)",
          opacity: 0,
          y: -25,
        },
        {
          clipPath: "polygon(-50% -50%, 150% -50%, 150% 150%, -50% 150%)",
          opacity: 1,
          y: 0,
          duration: 2.2,
          ease: "power3.inOut",
          clearProps: "clipPath",
        }
      );

      // 2. Reveal typography (Port and folio)
      tl.fromTo(
        textPortRef.current,
        { y: "100%", opacity: 0, rotate: 1 },
        { y: "0%", opacity: 1, rotate: 0, duration: 1.5 },
        "-=1.6"
      );
      tl.fromTo(
        textFolioRef.current,
        { y: "100%", opacity: 0, rotate: -1 },
        { y: "0%", opacity: 1, rotate: 0, duration: 1.5 },
        "-=1.4"
      );

      // 3. Stagger reveal subtitle, micro labels, and scroll indicator
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
          "-=1.0"
        );
      }

      if (microLabelsRef.current) {
        const labels = microLabelsRef.current.querySelectorAll(".micro-anim");
        if (labels.length > 0) {
          tl.fromTo(
            labels,
            { opacity: 0, y: -8 },
            { opacity: 0.3, y: 0, duration: 1.0, ease: "power2.out", stagger: 0.1 },
            "-=1.2"
          );
        }
      }

      // 4. Interactive Mouse Parallax Effect
      const xToGlow = gsap.quickTo(".interactive-glow", "x", { duration: 1, ease: "power3" });
      const yToGlow = gsap.quickTo(".interactive-glow", "y", { duration: 1, ease: "power3" });

      const xToPort = gsap.quickTo(".parallax-port", "x", { duration: 0.8, ease: "power3" });
      const yToPort = gsap.quickTo(".parallax-port", "y", { duration: 0.8, ease: "power3" });

      const xToF = gsap.quickTo(".parallax-f", "x", { duration: 0.5, ease: "power3" });
      const yToF = gsap.quickTo(".parallax-f", "y", { duration: 0.5, ease: "power3" });

      const xToFolio = gsap.quickTo(".parallax-folio", "x", { duration: 0.9, ease: "power3" });
      const yToFolio = gsap.quickTo(".parallax-folio", "y", { duration: 0.9, ease: "power3" });

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Calculate normalized offset (-1 to 1)
        const normalizedX = (clientX - centerX) / centerX;
        const normalizedY = (clientY - centerY) / centerY;

        // Move glow (follows mouse closely)
        xToGlow(normalizedX * 100);
        yToGlow(normalizedY * 100);

        // Move text layers in opposite directions for deep parallax
        xToPort(normalizedX * -20);
        yToPort(normalizedY * -20);

        // 'f' moves more dramatically to simulate being closer to the user
        xToF(normalizedX * -45);
        yToF(normalizedY * -45);

        xToFolio(normalizedX * -15);
        yToFolio(normalizedY * -15);
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="w-full relative min-h-screen bg-[#0D0D0D] overflow-hidden select-none flex flex-col justify-center items-center"
    >
      {/* Background Blueprint Grid */}
      <div className="absolute inset-0 pointer-events-none -z-20 grid grid-cols-4 md:grid-cols-8 gap-0 px-6 md:px-12 max-w-7xl mx-auto opacity-[0.015]">
        <div className="border-r border-white h-full" />
        <div className="border-r border-white h-full" />
        <div className="border-r border-white h-full" />
        <div className="border-r border-white h-full" />
        <div className="border-r border-white h-full" />
        <div className="border-r border-white h-full" />
        <div className="border-r border-white h-full" />
        <div className="h-full" />
      </div>

      {/* Ambient Premium Radial Glow behind centerpiece - Interactive */}
      <div className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center pointer-events-none -z-10">
        <div className="interactive-glow w-[400px] md:w-[800px] h-[400px] md:h-[800px] rounded-full bg-[radial-gradient(circle,rgba(0,230,92,0.08)_0%,transparent_70%)] blur-2xl transform-gpu" />
      </div>

      {/* Top Left/Right Micro-Typography (System Coordinates & Status) */}
      <div ref={microLabelsRef} className="absolute inset-x-8 top-28 md:top-32 flex justify-between pointer-events-none z-30">
        <div className="micro-anim hidden md:flex flex-col gap-1 font-mono text-[9px] text-white/30 tracking-widest opacity-0">
          <span>SYS.LOC // BLR_GRID_01</span>
          <span>COORD // 12.9716° N, 77.5946° E</span>
        </div>
        <div className="micro-anim hidden md:flex items-center gap-2 font-mono text-[9px] text-white/30 tracking-widest opacity-0">
          <span>STATUS: ONLINE</span>
          <span className="w-1 h-1 rounded-full bg-[#00E65C] inline-block animate-pulse" />
        </div>
      </div>

      {/* Symmetrical Typographic Centerpiece Layout */}
      <div className="flex flex-col items-center justify-center relative w-full z-10 max-w-[1200px] 2xl:max-w-[1600px] px-6">

        {/* Relative wrapper for Port + folio */}
        <div className="relative w-full flex flex-col items-center justify-center py-4 overflow-visible">

          {/* Top Line "Port" */}
          <div className="relative flex items-center -translate-x-[18vw] md:-translate-x-[12vw] py-4 px-8 overflow-visible">
            <div className="parallax-port transform-gpu">
              <div className="overflow-hidden py-2 px-2">
                <span
                  ref={textPortRef}
                  className="font-tempting italic font-light text-[22vw] md:text-[15vw] leading-none tracking-tight bg-gradient-to-b from-[#FFFFFF] via-[#E5E5E5] to-[#A3A3A3] bg-clip-text text-transparent transform-gpu inline-block opacity-0"
                >
                  Port
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Line "folio" */}
          <div className="relative flex items-baseline translate-x-[18vw] md:translate-x-[12vw] -mt-[4vw] md:-mt-[3vw] overflow-visible">

            {/* Absolutely positioned green 'f' */}
            <div
              className="absolute left-0 bottom-0 pointer-events-none z-20 select-none text-[#00E65C] font-tempting italic font-medium text-[32vw] md:text-[22vw] leading-none translate-x-[7vw] md:translate-x-[4.5vw] translate-y-[0.1vw] md:translate-y-[0.4vw]"
              style={{
                textShadow: "0 0 70px rgba(0, 230, 92, 0.3)",
              }}
            >
              <div className="parallax-f transform-gpu origin-bottom">
                <div ref={fRef} className="opacity-0">f</div>
              </div>
            </div>

            {/* Mask wrapper for 'olio' text */}
            <div className="ml-[16vw] md:ml-[11vw] overflow-visible">
              <div className="parallax-folio transform-gpu">
                <div className="overflow-hidden py-2 px-2">
                  <span
                    ref={textFolioRef}
                    className="font-sans font-extrabold text-[19vw] md:text-[13vw] leading-none tracking-tighter bg-gradient-to-b from-[#CCCCCC] via-[#999999] to-[#737373] bg-clip-text text-transparent transform-gpu inline-block -skew-x-[12deg] lowercase opacity-0"
                  >
                    olio
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Elegant Editorial Subtitle / Communication hook */}
        <div ref={subtitleRef} className="mt-12 md:mt-16 flex flex-col items-center gap-4 text-center max-w-lg z-30 pointer-events-none opacity-0">
          <span className="font-mono text-[9px] md:text-[10px] text-[#00E65C] tracking-[0.35em] uppercase font-bold">
            Digital Product Architect
          </span>
          <p className="font-sans text-[11px] md:text-[13px] text-white/50 tracking-[0.2em] uppercase leading-relaxed max-w-sm md:max-w-md">

          </p>
        </div>

      </div>

      {/* Bottom Decorative Bar & Scroll Indicator */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center z-10 border-t border-white/[0.04] pt-6 pointer-events-none">
        <span className="font-mono text-[9px] text-white/20 tracking-widest hidden sm:inline">
          EDITION // 2026 // CREATIVE DEV
        </span>
        <div className="flex flex-col items-center gap-2 mx-auto sm:mx-0">
          <span className="font-mono text-[8px] md:text-[9px] text-[#00E65C]/80 tracking-[0.25em] uppercase font-bold animate-pulse">
            Scroll to Explore
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#00E65C]/80 to-transparent" />
        </div>
        <span className="font-mono text-[9px] text-white/20 tracking-widest hidden sm:inline">
          DESIGNED WITH PRECISION
        </span>
      </div>
    </section>
  );
}
