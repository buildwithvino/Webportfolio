"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Work", href: "#work" },
  { name: "Services", href: "#services" },
  { name: "Why Us", href: "#why-us" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Helper to calculate true absolute offset top relative to document body (bypasses relative parent constraints)
    const getAbsoluteOffsetTop = (element: HTMLElement) => {
      let offsetTop = 0;
      let curr: HTMLElement | null = element;
      while (curr) {
        offsetTop += curr.offsetTop;
        curr = curr.offsetParent as HTMLElement | null;
      }
      return offsetTop;
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navItems.map((item) =>
        document.getElementById(item.href.replace("#", ""))
      );

      // Section trigger line: scroll position + 1/3 viewport height
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const absoluteTop = getAbsoluteOffsetTop(section);
          if (scrollPosition >= absoluteTop) {
            setActiveSection(navItems[i].href.replace("#", ""));
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.getElementById(href.replace("#", ""));
    if (element) {
      // If lenis is active, let lenis handle it, otherwise normal scrollTo
      const lenisEl = (window as any).lenis;
      if (lenisEl) {
        lenisEl.scrollTo(element, { offset: 0, duration: 1.2 });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
      setActiveSection(href.replace("#", ""));
      setMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 flex justify-center ${
        isScrolled ? "pt-4" : "pt-8"
      }`}
    >
      {/* Container wrapper for premium float feel */}
      <nav
        className={`w-[90%] max-w-5xl flex items-center justify-between rounded-full px-6 md:px-8 transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-white/70 backdrop-blur-md shadow-md border border-[#ECECEC]/80"
            : "py-5 bg-transparent border border-transparent"
        }`}
      >
        {/* Logo / Brand Mark */}
        <a
          href="#home"
          onClick={(e) => handleClick(e, "#home")}
          className="flex items-center gap-2 group font-sans"
          data-cursor="pointer"
        >
          <span
            className={`text-lg font-bold tracking-wider transition-colors duration-300 ${
              isScrolled ? "text-[#111111]" : "text-white"
            }`}
          >
            VINOTH
          </span>
          <span className="w-1.5 h-1.5 bg-[#00E65C] rounded-full inline-block group-hover:scale-150 transition-transform duration-300" />
          <span
            className={`text-[10px] tracking-widest uppercase font-light hidden sm:inline ml-2 transition-colors duration-300 ${
              isScrolled ? "text-[#666666]" : "text-white/60"
            }`}
          >
            Architect of Code
          </span>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1 relative">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-colors duration-300 z-10 ${
                  isActive
                    ? isScrolled
                      ? "text-[#111111]"
                      : "text-white"
                    : isScrolled
                    ? "text-[#666666] hover:text-[#111111]"
                    : "text-white/60 hover:text-white"
                }`}
                data-cursor="pointer"
              >
                {item.name}

                {/* Hover Background Capsule */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.span
                      layoutId="navHover"
                      className={`absolute inset-0 rounded-full -z-10 ${
                        isScrolled ? "bg-[#F8F8F8]" : "bg-white/10"
                      }`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                </AnimatePresence>

                {/* Active Underline Pill */}
                {isActive && (
                  <motion.span
                    layoutId="navActive"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#00E65C]"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Action Button (Availability Indicator) */}
        <div className="hidden sm:flex items-center">
          <a
            href="#contact"
            onClick={(e) => handleClick(e, "#contact")}
            className={`group relative flex items-center gap-2 px-5 py-2 rounded-full overflow-hidden text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
              isScrolled
                ? "border border-[#111111] bg-[#111111] text-white hover:bg-transparent hover:text-[#111111]"
                : "border border-white/20 bg-white/10 text-white hover:bg-white hover:text-black hover:border-white"
            }`}
            data-cursor="pointer"
          >
            <span className="w-1.5 h-1.5 bg-[#00E65C] rounded-full animate-ping absolute left-5" />
            <span className="w-1.5 h-1.5 bg-[#00E65C] rounded-full absolute left-5" />
            <span className="pl-4">Let's talk</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden flex items-center p-1 transition-colors duration-300 ${
            isScrolled ? "text-[#111111]" : "text-white"
          }`}
          aria-label="Toggle mobile menu"
          data-cursor="pointer"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-20 left-0 w-full px-[5%] md:hidden z-40"
          >
            <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 shadow-xl flex flex-col gap-4">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                    className={`py-3 px-4 rounded-xl text-sm font-semibold tracking-widest uppercase transition-colors ${
                      isActive
                        ? "bg-[#F8F8F8] text-[#111111] border-l-2 border-[#00E65C]"
                        : "text-[#666666] hover:text-[#111111] hover:bg-[#F8F8F8]"
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={(e) => handleClick(e, "#contact")}
                className="mt-2 w-full py-4 text-center rounded-xl bg-[#111111] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#333333] transition-colors"
              >
                Let's Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
