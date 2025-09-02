// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Fontu koruyoruz, çünkü harika bir font.
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
      // İsterseniz buraya özel renkler ekleyebilirsiniz ama şimdilik standart renkler yeterli.
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}