"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

interface GuestBookMessage {
  id: string;
  name: string;
  message: string;
  createdAt: number;
}

export default function GuestbookList() {
  const [messages, setMessages] = useState<GuestBookMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/guestbook", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (e) {
      console.error("Failed to fetch messages", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    window.addEventListener("guestbook_update", fetchMessages);
    return () => window.removeEventListener("guestbook_update", fetchMessages);
  }, []);

  return (
    <div
      className="flex flex-col h-[420px] p-6"
      style={{
        backgroundColor: "transparent",
        outline: "var(--border-chip)",
        borderRadius: "var(--radius-btn)",
      }}
    >
      <div className="flex items-center gap-2 mb-6">
        <Icon icon="lucide:message-square" width={20} style={{ color: "var(--color-accent-200)" }} />
        <h3 className="text-lg text-white" style={{ fontWeight: 600 }}>
          Recent <span className="purple">Messages</span>
        </h3>
        <span
          className="ml-auto text-xs px-2 py-1 rounded-full"
          style={{
            backgroundColor: "rgba(0, 173, 181, 0.08)",
            color: "var(--color-accent-100)",
          }}
        >
          {messages.length} {messages.length === 1 ? "Message" : "Messages"}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pr-3 space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse p-4 rounded-lg"
              style={{ backgroundColor: "rgba(0, 173, 181, 0.04)" }}
            >
              <div className="h-4 rounded w-1/4 mb-3" style={{ backgroundColor: "rgba(0,173,181,0.12)" }} />
              <div className="h-3 rounded w-3/4 mb-2" style={{ backgroundColor: "rgba(0,173,181,0.08)" }} />
              <div className="h-3 rounded w-1/2" style={{ backgroundColor: "rgba(0,173,181,0.08)" }} />
            </div>
          ))
        ) : messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-sm opacity-80" style={{ color: "var(--color-text-muted)" }}>
            <Icon icon="lucide:inbox" width={48} className="mb-3 opacity-40" />
            <p>No messages yet. Be the first!</p>
          </div>
        ) : (
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="message-card p-4 transition-all duration-300"
                style={{
                  backgroundColor: "transparent",
                  boxShadow: "var(--shadow-chip)",
                  borderRadius: "var(--radius-btn)",
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm truncate pr-4 text-white" style={{ fontWeight: 600 }}>
                    {msg.name}
                  </span>
                  <span
                    className="text-[11px] whitespace-nowrap px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: "rgba(0, 173, 181, 0.08)",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {new Date(msg.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-sm break-words leading-relaxed" style={{ color: "var(--color-text-body)" }}>
                  {msg.message}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      <style jsx>{`
        .message-card:hover {
          box-shadow: var(--shadow-card-hover) !important;
        }
      `}</style>
    </div>
  );
}
