"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useState } from "react";
import emailjs from '@emailjs/browser';

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // console.log(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
  // console.log(process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID);
  // console.log(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        e.currentTarget,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setSubmitStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
          Get In Touch
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          I'm currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:col-span-2 space-y-6"
        >
          <div className="bg-white/40 dark:bg-gray-800/40 border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-6 dark:text-white">Contact Information</h3>
            
            <div className="space-y-6">
              <a href="mailto:pantherlily2771@gmail.com" className="flex items-center gap-4 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl group-hover:scale-110 transition-transform">
                  <Icon icon="mdi:email-outline" width={24} height={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400 dark:text-gray-500 mb-0.5">Email</p>
                  <p className="font-medium">Say Hello</p>
                </div>
              </a>
              
              <a href="https://www.linkedin.com/in/ritik-kumar-4a0231246" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl group-hover:scale-110 transition-transform">
                  <Icon icon="mdi:linkedin" width={24} height={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400 dark:text-gray-500 mb-0.5">LinkedIn</p>
                  <p className="font-medium">Let's Connect</p>
                </div>
              </a>

              <a href="https://github.com/ritikkumar27" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors group">
                <div className="p-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl group-hover:scale-110 transition-transform">
                  <Icon icon="mdi:github" width={24} height={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400 dark:text-gray-500 mb-0.5">GitHub</p>
                  <p className="font-medium">View Projects</p>
                </div>
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="md:col-span-3"
        >
          <form 
            onSubmit={handleSubmit}
            className="bg-white/40 dark:bg-gray-800/40 border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 backdrop-blur-sm shadow-sm"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="user_name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow text-gray-900 dark:text-white"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="user_email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow text-gray-900 dark:text-white"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2 mb-8">
              <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Message</label>
              <textarea 
                id="message" 
                name="message"
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow text-gray-900 dark:text-white resize-y"
                placeholder="How can I help you?"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Icon icon="mdi:loading" className="animate-spin" width={20} height={20} />
                  Sending...
                </>
              ) : submitStatus === "success" ? (
                <>
                  <Icon icon="mdi:check-circle" width={20} height={20} />
                  Message Sent!
                </>
              ) : submitStatus === "error" ? (
                <>
                  <Icon icon="mdi:alert-circle" width={20} height={20} />
                  Error Sending
                </>
              ) : (
                <>
                  <Icon icon="mdi:send" width={20} height={20} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
