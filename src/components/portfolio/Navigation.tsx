"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = ["Overview","Blog", "Contact"];

export default function Navigation() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-4 md:top-6 w-full z-50 flex justify-center px-4 md:px-0 pointer-events-none">
      
      <div className="pointer-events-auto relative group w-full max-w-[280px] md:max-w-fit flex justify-center">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/30 to-purple-600/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-700 md:block hidden"></div>

        <div className="relative flex items-center justify-between gap-8 md:gap-12 px-6 py-2.5 bg-white/70 dark:bg-black/40 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-2xl shadow-black/5 dark:shadow-black/20 rounded-full w-full min-w-full md:min-w-0">
          
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

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="hidden md:flex items-center space-x-1">
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

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[3.5rem] left-0 right-0 p-2 bg-white/80 dark:bg-black/60 backdrop-blur-3xl border border-white/40 dark:border-white/10 rounded-2xl shadow-xl flex flex-col gap-1 md:hidden"
            >
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10 rounded-xl transition-colors"
                >
                  {item}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </nav>
  );
}