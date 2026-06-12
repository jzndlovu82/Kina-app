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
          black:    "#0D0D0D",
          surface:  "#141414",
          elevated: "#1C1C1C",
          gold:     "#C9A84C",
          "gold-light": "#E5C97A",
          "gold-dark":  "#A88830",
          white:    "#FFFFFF",
          muted:    "#888888",
          subtle:   "#444444",
        },
      },
      fontFamily: {
        display: ["Georgia", "Cambria", "serif"],
        body:    ["Inter", "system-ui", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#CCCCCC",
            fontFamily: "Georgia, serif",
            lineHeight: "1.9",
            fontSize: "1.125rem",
            "h1,h2,h3": { fontFamily: "Georgia, serif", color: "#FFFFFF" },
            a: { color: "#C9A84C" },
            blockquote: {
              borderLeftColor: "#C9A84C",
              fontStyle: "italic",
              color: "#888888",
              margin: "2rem 0",
            },
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
