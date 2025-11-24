/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'aqua': {
          50: '#ECEFF1',
          100: '#BBDEFB',
          400: '#64B5F6',
          500: '#1E88E5',
          900: '#0D47A1',
        }
      }
    },
  },
  plugins: [],
}

