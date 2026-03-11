"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const navItems = ["Overview","Blog", "Contact"];

export default function Navigation() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav className="fixed top-4 md:top-6 w-full z-50 flex justify-center px-4 md:px-0 pointer-events-none">
      
      <div className="pointer-events-auto relative group w-[90%] md:max-w-fit flex justify-center">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/30 to-purple-600/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-700 md:block hidden"></div>

        <div className="relative flex items-center justify-between gap-4 md:gap-12 px-4 py-2.5 bg-white/70 dark:bg-black/40 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-2xl shadow-black/5 dark:shadow-black/20 rounded-full w-full min-w-full md:min-w-0">
          
          {/* <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 dark:from-indigo-400 dark:via-purple-400 dark:to-violet-400 bg-clip-text text-transparent drop-shadow-sm"
          >
            RK
          </motion.div> */}

          <motion.a
            href="#hero"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 dark:from-indigo-400 dark:via-purple-400 dark:to-violet-400 bg-clip-text text-transparent drop-shadow-sm cursor-pointer"
            >
            RK
          </motion.a>

          <div className="flex items-center space-x-1">
            {navItems.map((item, index) => (
              <div
                key={item}
                className="relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {hoveredIndex === index && (
                  <motion.span
                    layoutId="navHover"
                    className="absolute inset-0 bg-black/5 dark:bg-white/10 rounded-full -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                <motion.a
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300"
                >
                  {item}
                </motion.a>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </nav>
  );
}