/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // Changed from {html,js} to include jsx/tsx files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}