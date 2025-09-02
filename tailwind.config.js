// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx,mdx}",
    "./Components/**/*.{js,jsx,ts,tsx,mdx}", // <- add this
    "./components/**/*.{js,jsx,ts,tsx,mdx}", // (optional, future-proof)
    "./app/**/*.{js,jsx,ts,tsx,mdx}",        // if you ever use App Router
  ],
  theme: { extend: {} },
  plugins: [],
};
