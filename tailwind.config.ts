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
        kalari: {
          black: "#0B0B0B",
          darkBrown: "#241A14",
          earth: "#5C3A21",
          gold: "#C89B3C",
          goldLight: "#DFB76C",
          goldDark: "#9E7422",
          beige: "#E8DCC8",
          white: "#F5F5F5",
          red: "#962D2D",
          amber: "#D97706",
          emerald: "#059669",
        },
      },
      fontFamily: {
        serif: ["Cinzel", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        gold: "0 0 25px -5px rgba(200, 155, 60, 0.25)",
        "gold-lg": "0 0 45px -5px rgba(200, 155, 60, 0.4)",
        lamp: "0 0 80px 20px rgba(200, 155, 60, 0.15)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #DFB76C 0%, #C89B3C 50%, #9E7422 100%)",
        "dark-gradient": "linear-gradient(180deg, rgba(11,11,11,0.9) 0%, rgba(36,26,20,0.85) 100%)",
        "radial-flame": "radial-gradient(circle at center, rgba(200,155,60,0.15) 0%, rgba(11,11,11,0) 70%)",
      },
    },
  },
  plugins: [],
};
export default config;
