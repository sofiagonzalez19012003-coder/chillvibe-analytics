/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f5f0e8',
        'dark-brown': '#2a2018',
        orange: '#e8631a',
        'brown-mid': '#7a4a28',
        teal: '#3abfbf',
        gold: '#d4a027',
        'red-alert': '#ef4444',
        'green-ok': '#22c55e',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
