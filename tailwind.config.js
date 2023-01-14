/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: "#FF6700",
        gray: "#DADADA",
      },
      screens: {
        "md-h": { raw: "(min-height: 400px)" },
        // => @media (min-height: 400px) { ... }
      },
    },
  },
  plugins: [],
};
