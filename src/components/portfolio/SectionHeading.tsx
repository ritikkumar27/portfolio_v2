"use client";

interface SectionHeadingProps {
  text: string;
  highlight: string;
  /** "teal" (default) | "pink" | "coral" */
  accent?: "teal" | "pink" | "coral";
  className?: string;
}

const accentClass: Record<string, string> = {
  teal:  "purple",   // resolves to --color-teal
  pink:  "pink",     // resolves to --color-pink
  coral: "coral",    // resolves to --color-coral
};

export default function SectionHeading({
  text,
  highlight,
  accent = "teal",
  className = "",
}: SectionHeadingProps) {
  return (
    <h2
      className={`text-white font-normal ${className}`}
      style={{ fontSize: "var(--font-size-section-h)", fontWeight: 500 }}
    >
      {text} <strong className={accentClass[accent]}>{highlight}</strong>
    </h2>
  );
}
