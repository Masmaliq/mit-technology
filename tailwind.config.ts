import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        navy: "#0F172A"
      },
      boxShadow: {
        "glass-lg": "0 24px 80px rgba(15, 23, 42, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
