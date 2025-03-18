module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Ensures Tailwind purges unused styles from the correct files
  ],
  theme: {
    extend: {
      colors: {
        background: "#121212", // Dark gray
        text: "#EAEAEA", // Light gray/white
        accent: "#3B82F6", // Blue (you can change this)
      },
      fontFamily: {
        sans: ['Source Code Pro', 'sans-serif'], // Set Poppins as the default sans font
        inter: ["Inter", "sans-serif"],
        jetbrains: ["JetBrains Mono", "monospace"],
        grotesk: ["Space Grotesk", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
