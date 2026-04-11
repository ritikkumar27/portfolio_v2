"use client";

interface SectionHeadingProps {
  text: string;
  highlight: string;
  className?: string;
}

export default function SectionHeading({ text, highlight, className = "" }: SectionHeadingProps) {
  return (
    <h2
      className={`text-white font-normal ${className}`}
      style={{ fontSize: "var(--font-size-section-h)", fontWeight: 500 }}
    >
      {text} <strong className="purple">{highlight}</strong>
    </h2>
  );
}
