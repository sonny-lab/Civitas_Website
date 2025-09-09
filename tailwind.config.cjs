/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./civitas_pages/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tw-animate")],
}
