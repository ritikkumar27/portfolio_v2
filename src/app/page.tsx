"use client";

import {
  Background,
  OverviewSection,
  ContactSection,
  MusicSection,
  Blog,
  GuestbookSection,
  ProjectsSection,
  GitHubGraph,
  ResumeSection,
} from "@/components/portfolio";

import Navigation from "@/components/portfolio/Navigation";
import HeroSection from "@/components/portfolio/HeroSection";
import Footer from "@/components/portfolio/Footer";
import Preloader from "@/components/portfolio/Preloader";

export default function Portfolio() {
  return (
    <>
      <Preloader />
      <div className="min-h-screen text-white relative">
        <Background />
        <Navigation />

        <main className="max-w-6xl mx-auto px-6">
          <HeroSection />
          <OverviewSection />
          <ResumeSection />
          <ProjectsSection />
          <GitHubGraph />
          <Blog />
          <GuestbookSection />
          {/* <MusicSection /> */}
          <ContactSection />
        </main>

        <Footer />
      </div>
    </>
  );
}