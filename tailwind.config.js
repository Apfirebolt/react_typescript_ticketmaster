/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
        primary: {
          100: "#80CBC4",
          200: "#A94A4A",
          300: "#E4EFE7",
        },
        secondary: {
          100: "#FFB433",
          200: "#3F72AF",
          300: "#112D4E",
        },
      }
  	}
  },
}