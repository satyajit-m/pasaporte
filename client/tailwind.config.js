module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spin: "spin 3s linear infinite",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
