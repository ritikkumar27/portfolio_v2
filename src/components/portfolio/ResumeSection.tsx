"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import SectionHeading from "./SectionHeading";

export default function ResumeSection() {
  const googleDriveLink = "https://drive.google.com/file/d/1GpNo9YGHOSKug0Va3z1b1UUMJIo6bpBx/view?usp=sharing";
  const downloadLink = "/resume.pdf";

  return (
    <section id="resume" className="section-padding relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <SectionHeading text="My" highlight="Resume" accent="teal" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-3xl mx-auto p-8 text-center"
        style={{
          outline: "var(--border-chip)",
          borderRadius: "var(--radius-btn)",
          backgroundColor: "var(--color-bg-surface, rgba(57, 62, 70, 0.45))",
        }}
      >
        <h3 className="text-xl text-white mb-4" style={{ fontWeight: 600 }}>
          Interested in my experience?
        </h3>
        <p className="mb-8" style={{ color: "var(--color-text-muted)" }}>
          You can view my full resume online or download it directly to your device to learn more about my background, skills, and projects.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href={googleDriveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{
              backgroundColor: "transparent",
              border: "1px solid rgba(0, 173, 181, 0.5)",
              borderRadius: "var(--radius-btn)",
            }}
          >
            <Icon icon="mdi:eye-outline" width={20} height={20} />
            <span>View Resume</span>
          </a>
          
          <a
            href={downloadLink}
            download="resume.pdf"
            className="flex items-center gap-2 px-6 py-3 text-white transition-all duration-300 hover:-translate-y-0.5 shadow-card hover:shadow-card-hover"
            style={{
              backgroundColor: "var(--color-btn-primary, #00ADB5)",
              borderRadius: "var(--radius-btn)",
            }}
          >
            <Icon icon="mdi:download-outline" width={20} height={20} />
            <span style={{ color: "var(--color-bg-base, #222831)", fontWeight: 600 }}>Download Resume</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
