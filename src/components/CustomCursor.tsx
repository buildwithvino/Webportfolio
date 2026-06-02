"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "view" | "text">("default");
  const [isVisible, setIsVisible] = useState(false);

  // Mouse coordinate tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Immediate instant-response springs for primary arrow pointer (Zero Lag feel)
  const arrowX = useSpring(mouseX, { damping: 35, stiffness: 1000, mass: 0.1 });
  const arrowY = useSpring(mouseY, { damping: 35, stiffness: 1000, mass: 0.1 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactiveEl = target.closest("[data-cursor]");
      if (interactiveEl) {
        const type = interactiveEl.getAttribute("data-cursor") as any;
        setCursorType(type || "pointer");
      } else {
        const isClickable = target.closest("a, button, [role='button']");
        if (isClickable) {
          setCursorType("pointer");
        } else {
          setCursorType("default");
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver);

    // Apply cursor: none to html to hide default browser cursor
    document.documentElement.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block overflow-visible select-none">
      
      {/* Sleek Primary Rounded Arrow Pointer (Matches Image) */}
      <motion.div
        className="absolute top-0 left-0 -translate-x-[4px] -translate-y-[4px]"
        style={{
          x: arrowX,
          y: arrowY,
        }}
      >
        <AnimatePresence mode="wait">
          {cursorType === "text" ? (
            <motion.div
              key="text-cursor"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-[2.5px] h-[18px] bg-[#111111] border border-white/80 rounded-full"
            />
          ) : (
            <motion.div
              key="arrow-cursor"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: cursorType === "pointer" ? 1.15 : 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className="text-[#111111] overflow-visible"
            >
              {/* Premium 3D Apple Depth cursor pointer matching user's image */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="overflow-visible"
              >
                {/* 3D Depth Shadow Extrusion Face */}
                <path
                  d="M2.5 17.5 L2.5 19 L6.5 17 L11 23.5 L13 22.5 L9.5 15.5 L15.5 14.5 L15.5 13.5 L9.5 14.5 L6.5 16 Z"
                  fill="#000000"
                  stroke="#000000"
                  strokeWidth="0.5"
                  strokeLinejoin="round"
                />
                {/* 3D Main Top Face (Apple Arrow) */}
                <path
                  d="M2 2 L15.5 12.5 L9.5 13.5 L14 20 L11 21.5 L6.5 15 L2 17 Z"
                  fill="#1E1E1F"
                  stroke="#FFFFFF"
                  strokeWidth="0.8"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

    </div>
  );
}
