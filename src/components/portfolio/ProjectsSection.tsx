"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { projects, type Project } from "@/lib/projects";
import SectionHeading from "./SectionHeading";

function Tag({ label }: { label: string }) {
  return (
    <span
      className="inline-block text-xs text-white px-2.5 py-1 leading-none"
      style={{
        borderRadius: "var(--radius-chip)",
        outline: "1px solid rgba(0, 173, 181, 0.35)",
        opacity: 0.85,
      }}
    >
      {label}
    </span>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex items-center gap-3 mt-4">
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-white text-sm px-4 py-2 transition-all duration-300 hover:-translate-y-0.5"
          style={{
            backgroundColor: "var(--color-btn-primary)",
            borderColor: "var(--color-btn-primary)",
            borderRadius: "var(--radius-btn)",
            borderWidth: "1px",
          }}
          aria-label="View source on GitHub"
        >
          <Icon icon="mdi:github" width={16} height={16} />
          GitHub
        </a>
      )}
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-white text-sm px-4 py-2 transition-all duration-300 hover:-translate-y-0.5"
          style={{
            backgroundColor: "var(--color-btn-primary)",
            borderColor: "var(--color-btn-primary)",
            borderRadius: "var(--radius-btn)",
            borderWidth: "1px",
          }}
          aria-label="Open live site"
        >
          <Icon icon="mdi:web" width={16} height={16} />
          Demo
        </a>
      )}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="project-card group flex flex-col h-full text-white transition-all duration-500"
      style={{
        backgroundColor: "transparent",
        boxShadow: "var(--shadow-card)",
        opacity: 0.9,
        padding: "50px 25px",
      }}
    >
      {/* Title */}
      <h3 className="text-lg text-white mb-3 leading-snug" style={{ fontWeight: 600 }}>
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: "var(--color-text-body)", textAlign: "justify" }}>
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>

      {/* Links */}
      <ProjectLinks project={project} />

      <style jsx>{`
        .project-card:hover {
          transform: scale(1.02);
          box-shadow: var(--shadow-card-hover) !important;
        }
      `}</style>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-padding relative">
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <SectionHeading text="My Recent" highlight="Works" />
        <p className="mt-4 text-white" style={{ fontSize: "var(--font-size-body-lg)" }}>
          Things I&apos;ve built — from web apps and CI/CD pipelines to self-hosted infrastructure.
        </p>
      </motion.div>

      {/* Grid — 3 columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
