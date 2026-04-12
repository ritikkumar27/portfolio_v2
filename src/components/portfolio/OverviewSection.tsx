"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import SectionHeading from "./SectionHeading";

const technologies = [
  { name: "Linux", icon: "logos:linux-tux" },
  { name: "Docker", icon: "logos:docker-icon" },
  { name: "Caddy", icon: "mdi:proxy" },
  { name: "Cloudflare", icon: "cib:cloudflare" },
  { name: "AWS", icon: "mdi:aws" },
  { name: "JavaScript", icon: "logos:javascript" },
  { name: "TypeScript", icon: "logos:typescript-icon" },
  { name: "React", icon: "logos:react" },
  { name: "Next.js", icon: "logos:nextjs-icon" },
  { name: "Astro", icon: "devicon-plain:astro" },
  { name: "Tailwind CSS", icon: "devicon:tailwindcss" },
  { name: "Node.js", icon: "logos:nodejs-icon" },
  { name: "Ollama", icon: "simple-icons:ollama" },
  { name: "Git", icon: "logos:git-icon" },
];

export default function OverviewSection() {
  return (
    <section id="about" className="section-padding relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <SectionHeading text="About" highlight="Me" />
      </motion.div>

      {/* About intro — transparent card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-16"
      >
        <div className="max-w-3xl mx-auto text-left" style={{ fontSize: "var(--font-size-body-lg)" }}>
          <p className="text-white mb-4">
            I am a passionate <span className="purple">DevOps Enthusiast</span> from India, specializing in modern{" "}
            <span className="purple">Web Architecture</span>,{" "}
            <span className="purple">Networking</span>, and{" "}
            <span className="purple">System Design</span>.
          </p>
          <p className="text-white mb-4">
            I bridge the gap between development and operations to deliver reliable applications.
          </p>

          <h3 className="text-white text-xl mt-8 mb-4" style={{ fontWeight: 500 }}>
            What I <span className="purple">Do</span>
          </h3>
          <ul className="space-y-3" style={{ listStyle: "none", paddingLeft: "1px" }}>
            {[
              "Infrastructure & Networking — Managing home server deployments, secure routing via Cloudflare Tunnels",
              "Linux & Systems — Exploring Linux internals, systemd, disk management and window managers on CachyOS",
              "Container Architecture — Self-hosted deployments with multi-stage Docker builds and Docker Compose",
              "Web & Local AI — Building apps with React & Next.js, self-hosting local LLMs via Ollama",
            ].map((activity, idx) => (
              <li key={idx} className="text-white flex items-start gap-3">
                <Icon
                  icon="im:point-right"
                  width={18}
                  height={18}
                  className="flex-shrink-0 mt-1"
                  style={{ color: "var(--color-accent-200)" }}
                />
                <span>{activity}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6" style={{ color: "var(--color-text-quote)" }}>
            &ldquo;Learning to build things that make a difference!&rdquo;
          </p>
        </div>
      </motion.div>

      {/* Tech Skill Chips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-white text-xl text-center mb-8" style={{ fontWeight: 500 }}>
          Professional <span className="purple">Skillset</span>
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
          {technologies.map((tech, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="tech-chip flex items-center justify-center gap-2 cursor-pointer text-white"
              style={{
                padding: "10px 20px",
                borderRadius: "var(--radius-chip)",
                outline: "1.7px solid rgba(0, 173, 181, 0.6)",
                boxShadow: "var(--shadow-chip)",
                transition: "outline-color 0.3s, outline-width 0.3s, transform 0.3s",
                opacity: 0.93,
              }}
            >
              <Icon icon={tech.icon} width={24} height={24} />
              <span className="text-sm">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <style jsx>{`
        .tech-chip:hover {
          outline: 2.2px solid rgba(0, 173, 181, 0.85) !important;
        }
      `}</style>
    </section>
  );
}
