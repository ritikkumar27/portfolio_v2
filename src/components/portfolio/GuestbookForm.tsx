"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

export default function GuestbookForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message })
      });

      if (res.ok) {
        setSubmitStatus("success");
        setName("");
        setMessage("");
        // trigger list refresh
        window.dispatchEvent(new Event('guestbook_update'));
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }
  };

  return (
    <div className="bg-white/5 dark:bg-gray-800/30 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-2">Leave a Message</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
        Sign the digital guestbook and say hi!
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-sans"
            placeholder="John Doe"
            required
            maxLength={50}
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2 bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none h-24 font-sans"
            placeholder="Your message here..."
            required
            maxLength={250}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !name.trim() || !message.trim()}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          {isSubmitting ? (
            <Icon icon="eos-icons:loading" width={20} />
          ) : (
            <>
              Sign Guestbook <Icon icon="lucide:pen-line" width={18} />
            </>
          )}
        </button>
      </form>

      <AnimatePresence>
        {submitStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mt-4 p-3 bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 text-sm rounded-lg flex items-center gap-2 backdrop-blur-sm"
          >
            <Icon icon="lucide:check-circle-2" width={18} className="shrink-0" />
            Message posted successfully!
          </motion.div>
        )}
        {submitStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400 text-sm rounded-lg flex items-center gap-2 backdrop-blur-sm"
          >
            <Icon icon="lucide:alert-circle" width={18} className="shrink-0" />
            Failed to post message. Try again later.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
