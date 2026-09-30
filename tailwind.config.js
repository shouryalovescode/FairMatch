/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#FFFFFF",
          soft: "#F7FEF9",
          muted: "#F0FDF4",
        },
        brand: {
          50: "#F7FEF9",
          100: "#F0FDF4",
          200: "#DCFCE7",
          300: "#BBF7D0",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#166534",
          800: "#14532D",
        },
        ink: {
          DEFAULT: "#1F2937",
          soft: "#6B7280",
        },
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        sans: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(22, 101, 52, 0.06), 0 8px 24px -12px rgba(22, 101, 52, 0.15)",
        card: "0 1px 3px rgba(22, 101, 52, 0.08)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
