/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1124px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '960px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '760px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '480px'},
      // => @media (max-width: 639px) { ... }

      'desk': {'min': '760px'},
      // => @media (max-width: 639px) { ... }
    },
    extend: {},
  },
  plugins: [],
}