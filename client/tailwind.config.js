/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports =  withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#334155',
        success: '#4CD964',
        warning: "#E9B376",
        secondary: '#333333',
        title: '#333333',
        tableTitle:'#808080',
        subtitle: '#666666',
        bgTile: '#F9F9F9',
        archive:'#FF3B30',
        lightPrimary: '#EFE2EC',
        lightPrimaryBg: '#7FC7D9'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
});
