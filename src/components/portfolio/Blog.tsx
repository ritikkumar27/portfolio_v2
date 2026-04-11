"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

export default function Blog() {
  return (
    <section id="blog" className="section-padding relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <SectionHeading text="Blog" highlight="Posts" />
        <p className="text-white mt-4 mb-8" style={{ fontSize: "var(--font-size-body-lg)" }}>
          I write about things I learn — from DevOps to system design.
        </p>
        <a
          href="https://blog.ritikkumar.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white px-6 py-3 transition-all duration-300 hover:-translate-y-0.5"
          style={{
            backgroundColor: "var(--color-btn-ghost)",
            borderRadius: "var(--radius-btn)",
          }}
        >
          Visit my Blog →
        </a>
      </motion.div>
    </section>
  );
}
