"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const navItems = [
  { label: "Home", icon: "mdi:home-outline", href: "#hero" },
  { label: "About", icon: "mdi:account-outline", href: "#about" },
  { label: "Projects", icon: "mdi:monitor-dashboard", href: "#projects" },
  { label: "Blog", icon: "mdi:post-outline", href: "#blog" },
  { label: "Contact", icon: "mdi:email-outline", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "shadow-nav"
          : ""
      }`}
      style={{
        backgroundColor: isScrolled ? "var(--color-bg-surface)" : "transparent",
        backdropFilter: isScrolled ? "blur(15px)" : "none",
        padding: "0.3rem 2rem",
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="text-lg font-normal text-white no-underline"
          style={{ fontSize: "1.4em" }}
        >
          <span className="purple">R</span>K
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="nav-link relative text-white no-underline flex items-center gap-1.5 px-4 py-3"
              style={{ fontSize: "1.2rem", fontWeight: 400 }}
            >
              <Icon icon={item.icon} width={18} height={18} />
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden flex flex-col gap-[6px] p-2 bg-transparent border-none cursor-pointer"
          aria-label="Toggle navigation"
        >
          <span
            className="block h-[4px] w-[27px] rounded-sm transition-all duration-300"
            style={{
              backgroundColor: "var(--color-accent-700)",
              transform: isMobileOpen ? "rotate(135deg) translateY(10px)" : "none",
            }}
          />
          <span
            className="block h-[4px] w-[27px] rounded-sm transition-all duration-300"
            style={{
              backgroundColor: "var(--color-accent-700)",
              opacity: isMobileOpen ? 0 : 1,
            }}
          />
          <span
            className="block h-[4px] w-[27px] rounded-sm transition-all duration-300"
            style={{
              backgroundColor: "var(--color-accent-700)",
              transform: isMobileOpen ? "rotate(-135deg) translateY(-10px)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div
          className="md:hidden flex flex-col items-center py-4 gap-2"
          style={{ backgroundColor: "var(--color-bg-mobile-nav)" }}
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className="nav-link relative text-white no-underline flex items-center gap-2 px-4 py-3 w-full justify-center"
              style={{ fontSize: "1.4rem", fontWeight: 400 }}
            >
              <Icon icon={item.icon} width={20} height={20} />
              {item.label}
            </a>
          ))}
        </div>
      )}

      <style jsx>{`
        .nav-link::after {
          content: "";
          position: relative;
          display: block;
          height: 5px;
          width: 0;
          border-radius: 16px;
          background: var(--color-accent-500);
          transition: all 0.3s ease-out 0s;
          bottom: -2px;
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
    </nav>
  );
}