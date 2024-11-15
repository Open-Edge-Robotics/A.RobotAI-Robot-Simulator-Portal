import type { Config } from "tailwindcss";
import { colors } from "./src/styles/colors";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors,
    },
  },
  important: true,
  plugins: [],
};
export default config;
