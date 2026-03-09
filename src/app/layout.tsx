import { ThemeProvider } from "@/components/ThemeProvider";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"] });

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
      <body className={inter.className}>
        <ThemeProvider>
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}