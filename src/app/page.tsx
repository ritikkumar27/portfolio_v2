"use client";

import{
  Background
} from "@/components/portfolio";

import Navigation from "@/components/portfolio/Navigation";


export default function Portfolio() {
  return (
    <div className="min-h-screen text-gray-900 dark:text-white relative">
      {/* Background */}
      <Background />

      {/* Navigation */}
      <Navigation/>


    </div>
  );
} 