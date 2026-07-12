/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Lato"', 'sans-serif'],
      },
      colors: {
        ponto: {
          azul: '#1e40af',
          dourado: '#debb05',
          claro: '#eff6ff',
          cinza: '#64748b',
          escuro: '#1e293b'
        }
      }
    },
  },
  plugins: [],
}
