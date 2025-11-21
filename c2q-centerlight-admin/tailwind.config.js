/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@gluestack-ui/themed/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        c2q: {
          primary: "#0f766e",
          primaryDark: "#0f4f52",
          secondary: "#1d4ed8",
          background: "#020617",
          surface: "#020617",
        },
      },
    },
  },
  plugins: [],
};
