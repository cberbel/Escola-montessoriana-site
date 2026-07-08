/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Lato"', 'sans-serif'],
        logo: ['"Nunito"', 'sans-serif'],
      },
      colors: {
        montessori: {
          green: '#1e40af', // Deep blue
          gold: '#debb05', // Montessori gold
          cream: '#eff6ff', // Light blue background
          stone: '#64748b', // Blue-grey
          dark: '#1e293b' // Dark blue
        }
      }
    },
  },
  plugins: [],
}
