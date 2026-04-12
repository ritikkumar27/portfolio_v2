"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import TypewriterRole from "./TypewriterRole";
import SocialIconButton from "./SocialIconButton";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex items-center"
      style={{ padding: "9rem 0 2rem", minHeight: "100vh" }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full"
      >
        {/* Left Column — Text */}
        <div className="md:col-span-7 text-left" style={{ paddingLeft: "50px" }}>
          <motion.h1
            className="text-white mb-2"
            style={{ fontSize: "var(--font-size-hero-greeting)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Hi There!{" "}
            <span className="wave" role="img" aria-label="wave">
              👋🏻
            </span>
          </motion.h1>

          <motion.h1
            className="text-white mb-4"
            style={{ fontSize: "var(--font-size-hero-name)", paddingLeft: "0" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            I&apos;M{" "}
            <strong style={{ color: "var(--color-teal)" }}>
              Ritik Kumar
            </strong>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{ padding: "20px 0" }}
          >
            <TypewriterRole />
          </motion.div>

          <motion.p
            className="mb-8 text-white"
            style={{ fontSize: "var(--font-size-body-lg)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            A passionate{" "}
            <span className="pink">DevOps Enthusiast</span>{" "}
            learning to build and deploy modern web Applications and Services.
          </motion.p>

          {/* Social Icons */}
          <motion.div
            className="flex gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <SocialIconButton
              href="https://github.com/ritikkumar27"
              icon="simple-icons:github"
              label="GitHub"
            />
            <SocialIconButton
              href="https://www.linkedin.com/in/ritik-kumar-4a0231246"
              icon="skill-icons:linkedin"
              label="LinkedIn"
            />
            <SocialIconButton
              href="https://www.instagram.com/duck.devlog/"
              icon="skill-icons:instagram"
              label="Instagram"
            />
            <SocialIconButton
              href="https://www.reddit.com/user/duckworth108/"
              icon="logos:reddit-icon"
              label="Reddit"
            />
            <SocialIconButton
              href="https://x.com/duckworth_108"
              icon="hugeicons:new-twitter-ellipse"
              label="X"
            />
          </motion.div>
        </div>

        {/* Right Column — Illustration */}
        <motion.div
          className="md:col-span-5 flex items-center justify-center"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{ paddingTop: "2em" }}
        >
          {/* Glowing ring border */}
          <div
            className="w-64 h-64 md:w-80 md:h-80 rounded-full p-[3px] flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #00ADB5, #FC5185)",
              boxShadow: "0 0 80px rgba(252, 81, 132, 0.92), 0 0 500px rgba(0, 172, 181, 0.92)",
            }}
          >
            {/* Inner circle — clip photo */}
            <div className="w-full h-full rounded-full overflow-hidden">
              <Image
                src="/profile.jpg"        
                alt="Ritik Kumar"
                width={320}
                height={320}
                priority
                className="w-full h-full object-cover object-top rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}