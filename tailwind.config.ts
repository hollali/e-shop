import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sanity/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FD0048",
          50: "#FFE5EE",
          100: "#FFB3CB",
          200: "#FF80A8",
          300: "#FF4D85",
          400: "#FF1A62",
          500: "#FD0048",
          600: "#CA0039",
          700: "#97002B",
          800: "#64001D",
          900: "#31000E",
        },
        dark: "#1a1a2e",
        accent: "#e94560",
      },
      fontFamily: {
        sans: ["Montserrat", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
