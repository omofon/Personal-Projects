/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        "navy-950": "var(--navy-950)",
        "navy-900": "var(--navy-900)",
        "purple-500": "var(--purple-500)",
        "navy-200": "var(--navy-200)",

        // Primary activity colors
        work: "var(--work)",
        play: "var(--play)",
        study: "var(--study)",
        exercise: "var(--exercise)",
        social: "var(--social)",
        selfcare: "var(--selfcare)",
      },
      fontFamily: {
        sans: ["var(--default-font-family)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
