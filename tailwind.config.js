/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        school: {
          navy: {
            50: "var(--theme-navy-50, #eef4ff)",
            100: "var(--theme-navy-100, #d9e6ff)",
            200: "var(--theme-navy-200, #bcd3ff)",
            300: "var(--theme-navy-300, #8eb9ff)",
            400: "var(--theme-navy-400, #5993ff)",
            500: "var(--theme-navy-500, #2b6bf8)",
            600: "var(--theme-navy-600, #144ee9)",
            700: "var(--theme-navy-700, #0e39c4)",
            800: "var(--theme-navy-800, #11329e)",
            900: "var(--theme-navy-900, #0f2b5c)",
            950: "var(--theme-navy-950, #0b1c3d)",
          },
          gold: {
            50: "var(--theme-gold-50, #fdfbe9)",
            100: "var(--theme-gold-100, #fbf6c6)",
            200: "var(--theme-gold-200, #f7ea8e)",
            300: "var(--theme-gold-300, #f2d84d)",
            400: "var(--theme-gold-400, #eec520)",
            500: "var(--theme-gold-500, #d4a712)",
            600: "#b7830d",
            700: "#925f0e",
            800: "#794b13",
            900: "#673e15",
          },
          emerald: {
            50: "#ecfdf5",
            100: "#d1fae5",
            500: "#10b981",
            600: "#059669",
            700: "#047857",
          }
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Cinzel"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
