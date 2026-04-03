"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function Blog() {
  return (
    <section id="blog" className="py-20 relative">
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "-100px" }}
         transition={{ duration: 0.6 }}
         className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-6 pb-2 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
          Blog Section
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          This is under construction right now and i am working on it.
        </p>
      </motion.div>
    </section>
  );
}
