export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        caramel: { DEFAULT: '#d3ad7f', dark: '#b8924a', light: '#e8c99a' },
        espresso: { DEFAULT: '#13131a', light: '#1e1e2a' },
        roast: '#010103',
      },
      fontFamily: {
        condensed: ['"Roboto Condensed"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
