/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customNavbar: '#d9d9d9', //desired custom color
        customBlue: '#5777C7', // Added custom color here
      },
    },
  },
  plugins: [],
}

