/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens : {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px'

      },
      fontSize : {
        '0.5rem' : '0.5rem',
      },
    }
  },
  plugins: [],
}