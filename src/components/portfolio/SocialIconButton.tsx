"use client";

import { Icon } from "@iconify/react";

interface SocialIconButtonProps {
  href: string;
  icon: string;
  label: string;
}

export default function SocialIconButton({ href, icon, label }: SocialIconButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="social-icon-btn relative inline-flex items-center justify-center w-10 h-10 rounded-full text-[1.2em] transition-all duration-500"
      style={{
        background: "rgba(255, 255, 255, 0.972)",
        color: "var(--color-accent-950)",
      }}
    >
      <Icon icon={icon} width={30} height={30} />

      {/* Glow pseudo-element replacement using a span */}
      <span
        className="absolute inset-0 rounded-full -z-10 transition-all duration-500 scale-90 group-hover:scale-110"
        style={{ background: "var(--color-accent-900)" }}
      />

      <style jsx>{`
        .social-icon-btn:hover {
          color: var(--color-accent-200);
          box-shadow: 0 0 5px var(--color-accent-200);
          text-shadow: 0 0 2px var(--color-accent-200);
        }
        .social-icon-btn::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: var(--color-accent-900);
          transition: 0.5s;
          transform: scale(0.9);
          z-index: -1;
        }
        .social-icon-btn:hover::before {
          transform: scale(1.1);
          box-shadow: var(--shadow-social-glow);
        }
      `}</style>
    </a>
  );
}
