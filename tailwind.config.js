/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // modify colours here according to figma design
        // setting these allows us to do e.g. bg-primary-500 to save time
        "gray-20": "#F8F4EB",
        "gray-50": "#EFE6E6",
        "gray-100": "#DFCCCC",
        "gray-500": "#5E0000",
        "primary-100": "#FFE1E0", // we stick to <3 colours but have multiple shades
        "primary-300": "#FFA6A3",
        "primary-500": "#FF6B66",
        "secondary-400": "#FFCD5B",
        "secondary-500": "#FFC132",
        "red-bright": "#DE0000",
        // "white": "#FFFFFF",
        // "black": "#000000",
      },
      backgroundImage: (theme) => ({
        "gradient-yellowred": // define what kind of gradient we want - also from figma
          "linear-gradient(90deg, #FF616A 0%, #FFC837 100%)",
        "mobile-home": "url('./assets/HomePageGraphic.png')", //TODO: background image to add to asset folder
      }),
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"], //TODO: update font later
        montserrat: ["Montserrat", "sans-serif"],
      },
      content: { // can put images via "content"
        evolvetext: "url('./assets/EvolveText.png')", //TODO: update images, add to assests
        abstractwaves: "url('./assets/AbstractWaves.png')",
        sparkles: "url('./assets/Sparkles.png')",
        circles: "url('./assets/Circles.png')",
      },
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1060px",
    },
  },
  plugins: [],
}

