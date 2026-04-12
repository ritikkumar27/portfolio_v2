"use client";

import { Icon } from "@iconify/react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full py-4 mt-8"
      style={{ backgroundColor: "var(--color-bg-footer)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-center">
          {/* Name */}
          {/* <div>
            <h3 className="text-white text-base">
              <span className="purple">Ritik Kumar</span>
            </h3>
          </div> */}

          {/* Quote */}
          {/* <div>
            <h3 className="text-white text-base">
              Copyright © {currentYear} RK
            </h3>
          </div> */}

          {/* Social Icons */}
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/ritikkumar27"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-cosmic-accent-200 transition-colors"
              aria-label="GitHub"
            >
              <Icon icon="mdi:github" width={24} height={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/ritik-kumar-4a0231246/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-cosmic-accent-200 transition-colors"
              aria-label="LinkedIn"
            >
              <Icon icon="mdi:linkedin" width={24} height={24} />
            </a>
            <a
              href="https://www.instagram.com/duck.devlog/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-cosmic-accent-200 transition-colors"
              aria-label="Instagram"
            >
              <Icon icon="mdi:instagram" width={24} height={24} />
            </a>
          </div>
        </div>

        {/* Quote */}
        <div className="text-center mt-3">
          <p style={{ color: "var(--color-text-muted)" }} className="text-sm">
            &ldquo;Orchestrated complexity. Unified simplicity!&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
