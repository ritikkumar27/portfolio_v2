import type { Metadata } from "next";
import { PT_Mono } from "next/font/google";
import "./globals.css";

const ptMono = PT_Mono({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Ritik Kumar - Aspiring DevOps Engineer",
  description: "Portfolio of Ritik Kumar, a passionate DevOps Engineer specializing in modern web Architecture, Networking, and System Design.",
  keywords: "Ritik Kumar, Full Stack Developer, DevOps Engineer, Server Deployment, Portfolio",
  authors: [{ name: "Ritik Kumar" }],
  openGraph: {
    title: "Ritik Kumar - DevOps Engineer",
    description: "Portfolio of Ritik Kumar, a passionate DevOps Engineer specializing in modern web Architecture, Networking, and System Design.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className={ptMono.className}>
        {children}
      </body>
    </html>
  );
}