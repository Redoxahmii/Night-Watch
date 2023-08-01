/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "black",
      {
        black: {
          ...require("daisyui/src/theming/themes")["[data-theme=black]"],
          primary: "#a855f7",
          secondary: "#3b82f6",
        },
      },
    ],
  },
};
