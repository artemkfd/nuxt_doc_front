/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        slide: {
          '0%': { transform: '-translateX(100%)' },
          '50%': { transform: '-translateX(50%)' },
          '100%': { transform: 'translateX(0%)' },
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        slide: 'slide 1s ease-in-out',
      },
    },
  },
  plugins: [],
}
