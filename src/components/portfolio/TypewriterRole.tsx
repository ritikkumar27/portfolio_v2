"use client";

import { useEffect, useState } from "react";

const ROLES = [
  "Aspiring DevOps Engineer",
  "I use Cachy OS with Niri wm ; it's Arch Btw",
  "Learning Networking Concepts",
  "Systems Designer",
  "Blogging what i learn everyday",
];

export default function TypewriterRole() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[currentRoleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentRole.length) {
            setDisplayText(currentRole.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
          }
        }
      },
      isDeleting ? 50 : 120
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex]);

  return (
    <div
      className="flex items-center"
      style={{ fontSize: "var(--font-size-typewriter)" }}
    >
      <span
        style={{
          color: "var(--color-accent-400)",
          fontWeight: 600,
        }}
      >
        {displayText}
      </span>
      <span
        className="cursor-blink inline-block ml-1"
        style={{
          color: "var(--color-accent-600)",
          fontSize: "1em",
        }}
      >
        |
      </span>
    </div>
  );
}