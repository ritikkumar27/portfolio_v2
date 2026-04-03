"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { projects, type Project } from "@/lib/projects";

const categoryColors: Record<string, string> = {
  blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
  indigo: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300",
  emerald: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
  purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
  orange: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
};

const accentBorders: Record<string, string> = {
  blue: "border-l-blue-500/60",
  indigo: "border-l-indigo-500/60",
  emerald: "border-l-emerald-500/60",
  purple: "border-l-purple-500/60",
  orange: "border-l-orange-500/60",
};

function Tag({ label }: { label: string }) {
  return (
    <span className="inline-block text-[11px] font-medium px-2.5 py-1 rounded-full bg-gray-100/80 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300 border border-gray-200/60 dark:border-gray-600/40 leading-none">
      {label}
    </span>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex items-center gap-3">
      {project.github && (
        <motion.a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          aria-label="View source on GitHub"
        >
          <Icon icon="mdi:github" width={16} height={16} />
          Source
        </motion.a>
      )}
      {project.live && (
        <motion.a
          href={project.live}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          aria-label="Open live site"
        >
          <Icon icon="mdi:arrow-top-right" width={16} height={16} />
          Live
        </motion.a>
      )}
    </div>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      whileHover={{ y: -4 }}
      className={`relative overflow-hidden rounded-3xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 border-l-4 ${accentBorders[project.categoryColor]} shadow-sm hover:shadow-lg hover:shadow-blue-500/10 transition-shadow duration-300`}
    >
      <div className="p-8 md:p-10">
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-gray-200 dark:text-gray-700 select-none leading-none font-mono">
              {project.number}
            </span>
            <div>
              <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-2 ${categoryColors[project.categoryColor]}`}>
                {project.category}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                {project.title}
              </h3>
            </div>
          </div>
          <ProjectLinks project={project} />
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3 max-w-3xl">
          {project.description}
        </p>
        {project.longDescription && (
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 max-w-3xl">
            {project.longDescription}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-6">
          {project.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className={`group relative flex flex-col rounded-3xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 border-l-4 ${accentBorders[project.categoryColor]} shadow-sm hover:shadow-lg hover:shadow-blue-500/10 transition-shadow duration-300`}
    >
      <div className="flex flex-col flex-1 p-7">
        {/* Number + category */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-3xl font-bold text-gray-200 dark:text-gray-700 font-mono leading-none select-none">
            {project.number}
          </span>
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${categoryColors[project.categoryColor]}`}>
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 leading-snug group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1 mb-5">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>

        {/* Links */}
        <ProjectLinks project={project} />
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 relative">
      {/* Subtle background blobs */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-700" />
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
            Projects
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-gray-300 dark:from-gray-700 to-transparent" />
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
          Things I've built — from web apps and CI/CD pipelines to self-hosted infrastructure and local AI setups.
        </p>
      </motion.div>

      {/* Featured project */}
      {featured && (
        <div className="mb-8">
          <FeaturedCard project={featured} />
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rest.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
