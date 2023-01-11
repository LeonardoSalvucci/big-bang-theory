/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))'
      },
      colors: {
        'primary-orange': '#e67404',
        'primary-light-orange': '#fce08c',
        'bang-red': '#ae171a'
      },
      fontFamily: {
        title: ['Anton', 'sans-serif']
      }
    }
  },
  plugins: []
}
