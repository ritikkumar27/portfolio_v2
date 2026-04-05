"use client";

import{
  Background,
  OverviewSection,
  ContactSection,
  MusicSection,
  Blog,
  GuestbookSection,
  ProjectsSection,
  GitHubGraph
} from "@/components/portfolio";

import Navigation from "@/components/portfolio/Navigation";
import HeroSection from "@/components/portfolio/HeroSection";

export default function Portfolio() {
  return (
    <div className="min-h-screen text-gray-900 dark:text-white relative">
      <Background />

      <Navigation/>

      <div className="max-w-6xl mx-auto px-6 pt-24">

        <HeroSection />
        
        <OverviewSection />

        <ProjectsSection />

        <GitHubGraph />

        <Blog />

        <GuestbookSection />

        <MusicSection />
        
        <ContactSection />
      </div>


    </div>
  );
} 