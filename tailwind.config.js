module.exports = {
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./sections/**/*.{js,ts,jsx,tsx}",
    "./shared/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#010156",
        secondary: "#0000ff",
      },
      keyframes: {
        pulse: {
          "0%": {
            color: "violet",
          },
          "20%": {
            color: "indigo",
          },
          "40%": {
            color: "blue",
          },
          "60%": {
            color: "green",
          },
          "80%": {
            color: "yellow",
          },
          "100%": {
            color: "red",
          },
        },
      },
      animation: {
        pulse: "pulse 4s infinite alternate-reverse",
      },
    },
  },
  variants: {
    extend: {
      margin: ["last"],
    },
  },
  plugins: [],
};
