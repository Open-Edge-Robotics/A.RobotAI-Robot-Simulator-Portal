import type { Config } from "tailwindcss";
import { colors } from "./src/styles/colors";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/globals.css",
  ],
  theme: {
    extend: {
      colors,
      animation: {
        "shrink-1s": "shrink 1s linear forwards",
        "shrink-2s": "shrink 2s linear forwards",
        "shrink-3s": "shrink 3s linear forwards",
      },
      keyframes: {
        shrink: {
          "0%": { width: "100%" },
          "100%": { width: "0%" },
        },
      },
    },
  },
  important: true,
  plugins: [],
};
export default config;
