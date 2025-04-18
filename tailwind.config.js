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
          100: "#522546",
          200: "#88304E",
          300: "#F7374F",
        },
        secondary: {
          100: "#FDFAF6",
          200: "#E4EFE7",
          300: "#336D82",
        },
      }
  	}
  },
}