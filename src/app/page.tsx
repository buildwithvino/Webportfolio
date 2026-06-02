"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WorkShowcase from "@/components/WorkShowcase";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Contact from "@/components/Contact";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  useEffect(() => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard easeOutExpo
      touchMultiplier: 1.5,
    });

    // Update ScrollTrigger when Lenis scrolls
    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis to requestAnimationFrame ticker
    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);

    // Disable lag smoothing in GSAP to keep it in sync with inertia scrolling
    gsap.ticker.lagSmoothing(0);

    // Expose lenis instance globally for navigation scroll hooks
    (window as any).lenis = lenis;

    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafCallback);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Header />
      <main className="relative z-10 w-full min-h-screen bg-white">
        <Hero />
        <WorkShowcase />
        <Services />
        <WhyChooseUs />
        <Contact />
      </main>
    </>
  );
}
