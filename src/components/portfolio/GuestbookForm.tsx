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

  const inputStyle: React.CSSProperties = {
    backgroundColor: "transparent",
    border: "1px solid rgba(0, 173, 181, 0.3)",
    borderRadius: "var(--radius-btn)",
    color: "var(--color-text-body)",
  };

  return (
    <div
      className="p-6"
      style={{
        backgroundColor: "transparent",
        outline: "var(--border-chip)",
        borderRadius: "var(--radius-btn)",
      }}
    >
      <h3 className="text-xl text-white mb-2" style={{ fontWeight: 600 }}>
        Leave a <span className="purple">Message</span>
      </h3>
      <p className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>
        Sign the digital guestbook and say hi!
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm text-white mb-1">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 focus:outline-none focus:ring-2 transition-all"
            style={{
              ...inputStyle,
              focusRingColor: "var(--color-accent-200)",
            } as React.CSSProperties}
            placeholder="Name"
            required
            maxLength={50}
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm text-white mb-1">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2 focus:outline-none focus:ring-2 transition-all resize-none h-24"
            style={inputStyle}
            placeholder="Drop a message or feedback for me 💬"
            required
            maxLength={250}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !name.trim() || !message.trim()}
          className="w-full py-2.5 px-4 text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:-translate-y-0.5"
          style={{
            backgroundColor: "var(--color-btn-primary)",
            borderRadius: "var(--radius-btn)",
          }}
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
            className="mt-4 p-3 text-sm rounded-lg flex items-center gap-2"
            style={{
              backgroundColor: "rgba(0, 173, 181, 0.08)",
              border: "1px solid rgba(0, 173, 181, 0.25)",
              color: "var(--color-accent-100)",
            }}
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
            className="mt-4 p-3 text-sm rounded-lg flex items-center gap-2"
            style={{
              backgroundColor: "rgba(200, 50, 50, 0.15)",
              border: "1px solid rgba(200, 50, 50, 0.3)",
              color: "#f87171",
            }}
          >
            <Icon icon="lucide:alert-circle" width={18} className="shrink-0" />
            Failed to post message. Try again later.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
