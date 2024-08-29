/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      backgroundImage: {
        "home-green": "url('./home-bg-green.png')", // Adjust path based on your public directory setup
        "home-grey": "url('./home-bg-grey.png')",
        greengradient: "linear-gradient(90deg, #EAFFDA, #84e296)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          ".cutoff-left": {
            "clip-path": "circle(58vw at 100% 50%)",
          },
        },
        ["responsive", "hover"]
      );
    },
  ],
};
