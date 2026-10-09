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
            50: "var(--theme-navy-50, #f0f5ff)",
            100: "var(--theme-navy-100, #e0ecff)",
            200: "var(--theme-navy-200, #c2d9ff)",
            300: "var(--theme-navy-300, #94bcff)",
            400: "var(--theme-navy-400, #5f95ff)",
            500: "var(--theme-navy-500, #336dfa)",
            600: "var(--theme-navy-600, #174ee9)",
            700: "var(--theme-navy-700, #103ac4)",
            800: "var(--theme-navy-800, #13329e)",
            900: "var(--theme-navy-900, #0f2b5c)",
            950: "var(--theme-navy-950, #081a3d)",
          },
          gold: {
            50: "var(--theme-gold-50, #fefce8)",
            100: "var(--theme-gold-100, #fef9c3)",
            200: "var(--theme-gold-200, #fef08a)",
            300: "var(--theme-gold-300, #fde047)",
            400: "var(--theme-gold-400, #facc15)",
            500: "var(--theme-gold-500, #eab308)",
            600: "#ca8a04",
            700: "#a16207",
            800: "#854d0e",
            900: "#713f12",
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
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['"Outfit"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Cinzel"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -5px rgba(15, 43, 92, 0.08), 0 4px 12px -2px rgba(15, 43, 92, 0.04)',
        'luxury-lg': '0 20px 40px -10px rgba(15, 43, 92, 0.12), 0 8px 16px -4px rgba(15, 43, 92, 0.06)',
        'gold-glow': '0 0 25px -5px rgba(234, 179, 8, 0.35)',
        'navy-glow': '0 0 30px -5px rgba(15, 43, 92, 0.3)',
      },
    },
  },
  plugins: [],
};
