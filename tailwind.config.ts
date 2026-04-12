import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        "cosmic-deep":    "#1a1f26",
        "cosmic-base":    "#222831",
        "cosmic-surface": "#393E46",
        "cosmic-card":    "rgba(57, 62, 70, 0.45)",

        // Primary accent — Teal
        "accent": {
          "100": "#3FC1C9",
          "200": "#00ADB5",
          "300": "#00c4cd",
          "400": "#009aa2",
          "500": "#007f86",
        },

        // Secondary accent — Pink
        "accent-pink":   "#FC5185",

        // Text
        "text-primary":  "#EEEEEE",
        "text-muted":    "#8a9bb0",
      },
      fontFamily: {
        mono: ["PT Mono", "monospace"],
        sans: ["PT Mono", "monospace"],
      },
      boxShadow: {
        "card":        "0 4px 5px 3px rgba(0, 173, 181, 0.15)",
        "card-hover":  "0 4px 8px 5px rgba(0, 173, 181, 0.28)",
        "chip":        "4px 5px 4px 3px rgba(0, 173, 181, 0.08)",
        "navbar":      "0px 10px 10px 0px rgba(10, 14, 20, 0.4)",
        "social-glow": "0 0 15px rgba(0, 173, 181, 0.7)",
        "icon-hover":  "0 0 8px rgba(0, 173, 181, 0.6)",
        "pink-glow":   "0 0 15px rgba(252, 81, 133, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
