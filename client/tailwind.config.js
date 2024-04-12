/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Customize background colors
      colors: {
        'bg-header': '#A82825',
      },
      spacing: {
        'w-logo': '200px',
        'h-logo': '60px', // Add a new size named 'custom-size'
      },
    },
  },
  plugins: [
  ],
}

