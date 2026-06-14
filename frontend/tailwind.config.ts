import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "Courier New", "monospace"],
      },
      colors: {
        yellow: "#FFEE00",
        blue: "#0000FF",
        green: "#00FF00",
        coral: "#FF6B6B",
      },
    },
  },
  plugins: [],
};

export default config;
