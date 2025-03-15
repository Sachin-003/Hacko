module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Ensures Tailwind purges unused styles from the correct files
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Source Code Pro', 'sans-serif'], // Set Poppins as the default sans font
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
