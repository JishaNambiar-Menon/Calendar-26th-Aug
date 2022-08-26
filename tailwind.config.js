const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];


module.exports = {
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    //Because we made a dynamic class with the label we need to add those clases
    // to the safe list so the purge does not remove that
    safelist: [
      ...labelsClasses.map((lbl) => `bg-${lbl}-500`),
      ...labelsClasses.map((lbl) => `bg-${lbl}-200`),
      ...labelsClasses.map((lbl) => `text-${lbl}-400`),
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontWeight: {
        big: 700,
        med: 400,
        bmed: 500,
        medium: 600,
      },
      fontSize: {
        lg: "24px",
        ml: "16px",
        md: "14px",
      },
      lineHeight: {
        32: "32px",
      },
      fontFamily: {
        sans: ["Open Sans"],
        roboto: ["Roboto"],
        dmsans: ["DM Sans"],
        inter: ["Inter"],
        mono: ["Monospace"],
      },
      gridTemplateColumns: {
        "1/5": "1fr 5fr",
      },
      boxShadow: {
        "3xl": "0 4px 16px 8px rgba(166, 170, 193, 0.3)",
      },
      colors: {
        header: {
          gray: "#1F1D25",
          heading: "#1F1D25",
          bggray: "#EFEFF0",
          white: "#FFFFFF",
          bordergray: "#E4E6F2",
          textgray: "#787580",
          medgray: "#4B4950",
          whitegray: "#FCFCFD",
          lightgray: "#BDBFC6",
          orange: "#F6A43A",

          lightorange: "#F8CA17",
        },
      },
      backgroundImage: {
        search:
          "url('/Users/jishanambiar/Desktop/google-calendar copy/src/frontend-ui-kit-main-src-icons/src/icons/search.svg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar-hide")],
};
