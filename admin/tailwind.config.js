/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canopy: '#1E4029',
        'canopy-deep': '#132B1B',
        harmattan: '#F7F3E8',
        sand: '#EDE4CE',
        baobab: '#A9702E',
        leaf: '#7FA65C',
        ink: '#23281F',
        'ink-soft': '#5B6153',
        card: '#FFFFFF',
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Fraunces', 'serif'],
        sans: ['var(--font-work-sans)', 'Work Sans', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '28px',
      },
    },
  },
  plugins: [],
};
