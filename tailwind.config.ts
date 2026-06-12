import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kina: {
          navy:    "#1A1A2E",
          crimson: "#E94560",
          parchment: "#F5F0EB",
          gold:    "#C9A84C",
          ink:     "#333333",
          muted:   "#888888",
        },
      },
      fontFamily: {
        display: ["Georgia", "Cambria", "serif"],
        body:    ["Inter", "system-ui", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#333333",
            fontFamily: "Georgia, serif",
            lineHeight: "1.9",
            fontSize: "1.125rem",
            "h1,h2,h3": { fontFamily: "Georgia, serif", color: "#1A1A2E" },
            a: { color: "#E94560" },
            blockquote: {
              borderLeftColor: "#E94560",
              fontStyle: "italic",
              color: "#555555",
            },
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
