/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kea-blue': '#0A2540',
        'kea-green': '#10B981',
        'kea-cyan': '#00B4D8',
        'kea-orange': '#FF6B00',
        'kea-gray': '#64748B',
      },
    },
  },
  plugins: [],
}
