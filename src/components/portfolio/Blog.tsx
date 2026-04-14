"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import SectionHeading from "./SectionHeading";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  readingTime: number | string;
  createdAt: string;
  likes: number;
  views?: number;
  viewCount?: number;
  comments?: number;
  commentCount?: number;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("https://blog.ritikkumar.dev/api/posts/latest?limit=6");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (error) {
    return null; // Gracefully hide the section
  }

  const getImageUrl = (url: string | null) => {
    if (!url) return null;
    if (url.startsWith("/")) {
      return `https://blog.ritikkumar.dev${url}`;
    }
    return url;
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <section id="blog" className="section-padding relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <SectionHeading text="Latest" highlight="Thoughts" accent="pink" />
        <p className="mt-4 text-white" style={{ fontSize: "var(--font-size-body-lg)" }}>
          I write about things I learn — from DevOps to system design.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse flex flex-col h-full rounded-lg"
              style={{
                height: "350px",
                backgroundColor: "var(--color-bg-card)",
                boxShadow: "var(--shadow-card)",
                border: "var(--border-surface)",
              }}
            >
              <div className="w-full h-48 bg-gray-800/80 rounded-t-lg"></div>
              <div className="flex-1 p-6 flex flex-col gap-3">
                <div className="h-4 w-1/3 bg-gray-700/50 rounded"></div>
                <div className="h-6 w-full bg-gray-700/50 rounded"></div>
                <div className="h-4 w-full bg-gray-700/50 rounded mt-2"></div>
                <div className="h-4 w-2/3 bg-gray-700/50 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => {
            const imageUrl = getImageUrl(post.coverImage);
            return (
              <motion.a
                key={post.id}
                href={`https://blog.ritikkumar.dev/p/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col h-full text-white transition-all duration-500 rounded-lg overflow-hidden"
                style={{
                  backgroundColor: "var(--color-bg-card)",
                  boxShadow: "var(--shadow-card)",
                  border: "var(--border-surface)",
                }}
              >
                {/* Cover Image */}
                <div className="relative w-full h-48 overflow-hidden" style={{ backgroundColor: "var(--color-bg-deep)" }}>
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white/20 text-5xl font-bold opacity-30 group-hover:scale-110 transition-transform duration-500">
                        {post.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col p-6">
                  <div className="text-xs mb-3 flex items-center gap-2" style={{ color: "var(--color-text-dim)" }}>
                    <span style={{ color: "var(--color-teal)" }}>{formatDate(post.createdAt)}</span>
                    {post.readingTime && (
                      <>
                        <span>•</span>
                        <span>{typeof post.readingTime === 'number' ? `${post.readingTime} min read` : post.readingTime}</span>
                      </>
                    )}
                  </div>
                  
                  <h3 className="text-xl mb-3 leading-snug font-semibold text-white transition-colors" style={{ fontFamily: "var(--font-primary)" }}>
                    {post.title}
                  </h3>
                  
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--color-text-body)" }}>
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: "var(--color-pink)" }}>
                      Read Article <span>→</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs" style={{ color: "var(--color-text-dim)", opacity: 0.8 }}>
                      <div className="flex items-center gap-1" title="Views">
                        <Icon icon="mdi:eye-outline" width={14} />
                        <span>{post.views ?? post.viewCount ?? 0}</span>
                      </div>
                      <div className="flex items-center gap-1" title="Comments">
                        <Icon icon="mdi:comment-outline" width={14} />
                        <span>{post.comments ?? post.commentCount ?? 0}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <style jsx>{`
                  a:hover {
                    box-shadow: var(--shadow-card-hover) !important;
                    transform: translateY(-4px);
                  }
                  a:hover h3 {
                    color: var(--color-pink) !important;
                  }
                `}</style>
              </motion.a>
            );
          })}
        </div>
      ) : (
         <div className="mt-8 text-center text-white" style={{ fontSize: "var(--font-size-body-lg)" }}>
            <p className="mb-6">Stay tuned! More posts are coming soon.</p>
            <a
              href="https://blog.ritikkumar.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white px-6 py-3 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor: "var(--color-btn-ghost)",
                borderRadius: "var(--radius-btn)",
              }}
            >
              Visit my Blog →
            </a>
         </div>
      )}
    </section>
  );
}
