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
    <div className="flex flex-col h-[420px] bg-white/5 dark:bg-gray-800/20 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Icon icon="lucide:message-square" className="text-pink-500" width={20} />
        <h3 className="font-semibold text-lg">Recent Messages</h3>
        <span className="ml-auto text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-full">
          {messages.length} {messages.length === 1 ? 'Message' : 'Messages'}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pr-3 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-white/20 dark:bg-white/5 border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-4">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-3" />
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
            </div>
          ))
        ) : messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 text-sm opacity-80">
            <Icon icon="lucide:inbox" width={48} className="mb-3 opacity-40 text-gray-400" />
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
                className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-gray-200/80 dark:border-gray-700/80 rounded-xl p-4 hover:border-pink-500/30 dark:hover:border-purple-500/30 transition-all duration-300 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm truncate pr-4 text-gray-800 dark:text-gray-200">
                    {msg.name}
                  </span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 whitespace-nowrap bg-gray-100 dark:bg-gray-800/60 px-2 py-0.5 rounded-full">
                    {new Date(msg.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 break-words leading-relaxed font-sans">
                  {msg.message}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
