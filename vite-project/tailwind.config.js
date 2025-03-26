/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lora: ['Lora', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        sourgummy: ['Sour Gummy', 'sans-serif'],
      },
      screens: {
        xs: '320px',   // Custom breakpoint for very small devices (start at 340px)
        ms: '400px', 
        
        mss:'520px',
        // Custom breakpoint for medium-small devices (400px and up)
        sm: '640px',   // Default breakpoint for small screens (640px and up)
        md: '768px',   // Default breakpoint for medium screens (768px and up)
        lg: '1024px',  // Default breakpoint for large screens (1024px and up)
        xl: '1280px',  // Default breakpoint for extra-large screens (1280px and up)
      },
    },
  },
  plugins: [


    require("daisyui")
  ],
};
