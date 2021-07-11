const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        night: "#111",
      },
    },
    colors: {
      // Now we build the full color palette, using all colors available
      // as shown at this link: https://tailwindcss.com/docs/customizing-colors#color-palette-reference
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",
      blueGray: colors.blueGray,
      coolGray: colors.coolGray,
      gray: colors.gray,
      trueGray: colors.trueGray,
      warmGray: colors.warmGray,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      lightBlue: colors.lightBlue,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
