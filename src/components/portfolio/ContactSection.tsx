"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import SectionHeading from "./SectionHeading";
import SocialIconButton from "./SocialIconButton";

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

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

  const inputStyle: React.CSSProperties = {
    backgroundColor: "transparent",
    border: "1px solid rgba(200, 137, 230, 0.3)",
    borderRadius: "var(--radius-btn)",
    color: "var(--color-text-body)",
  };

  return (
    <section id="contact" className="section-padding relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <SectionHeading text="Get In" highlight="Touch" />
        <p className="text-white mt-4 max-w-2xl mx-auto" style={{ fontSize: "var(--font-size-body-lg)" }}>
          I&apos;m currently open to new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-12 items-start">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:col-span-2 space-y-6"
        >
          <div>
            <h3 className="text-xl text-white mb-6" style={{ fontWeight: 600 }}>
              Contact <span className="purple">Information</span>
            </h3>

            <div className="space-y-6">
              {[
                { href: "mailto:pantherlily2771@gmail.com", icon: "mdi:email-outline", label: "Email", text: "Say Hello" },
                { href: "https://www.linkedin.com/in/ritik-kumar-4a0231246", icon: "mdi:linkedin", label: "LinkedIn", text: "Let's Connect" },
                { href: "https://github.com/ritikkumar27", icon: "mdi:github", label: "GitHub", text: "View Projects" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="flex items-center gap-4 text-white transition-colors group"
                >
                  <SocialIconButton href={item.href} icon={item.icon} label={item.label} />
                  <div>
                    <p className="text-sm mb-0.5" style={{ color: "var(--color-text-muted)" }}>{item.label}</p>
                    <p className="text-white">{item.text}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="md:col-span-3"
        >
          <form
            onSubmit={handleSubmit}
            className="p-8"
            style={{
              outline: "var(--border-chip)",
              borderRadius: "var(--radius-btn)",
            }}
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm text-white ml-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="user_name"
                  required
                  className="w-full px-4 py-3 focus:ring-2 outline-none transition-shadow text-white"
                  style={inputStyle}
                  placeholder="🫥"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-white ml-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="user_email"
                  required
                  className="w-full px-4 py-3 focus:ring-2 outline-none transition-shadow text-white"
                  style={inputStyle}
                  placeholder="📧"
                />
              </div>
            </div>

            <div className="space-y-2 mb-8">
              <label htmlFor="message" className="text-sm text-white ml-1">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full px-4 py-3 focus:ring-2 outline-none transition-shadow text-white resize-y"
                style={inputStyle}
                placeholder="Relay your idea through SMTP 💡❕"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              style={{
                backgroundColor: "var(--color-btn-primary)",
                borderRadius: "var(--radius-btn)",
              }}
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
