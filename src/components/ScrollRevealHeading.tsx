"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollRevealHeadingProps {
  text: string;
  className?: string;
  tag?: "h2" | "h1";
}

export default function ScrollRevealHeading({
  text,
  className = "",
  tag = "h2",
}: ScrollRevealHeadingProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll(".reveal-char");

    // Standard high-fidelity scroll timeline scrub animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        end: "top 50%",
        scrub: 1, // Binds animation timeline directly to scroll progress
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
        stagger: 0.05,
        ease: "power2.out",
      }
    );

    return () => {
      // ScrollTriggers are cleaned up automatically by GSAP context or on refresh
    };
  }, []);

  const words = text.split(" ");
  const Tag = tag;

  return (
    <Tag
      ref={containerRef}
      className={`${className} flex flex-wrap gap-x-[0.22em] overflow-visible`}
    >
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-flex overflow-hidden py-1 select-none">
          {word.split("").map((char, cIdx) => (
            <span
              key={cIdx}
              className="reveal-char inline-block origin-bottom-left transform-gpu opacity-0"
              style={{ display: "inline-block" }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
