/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'space': ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        'black': '#000000',
        'white': '#FFFFFF',
        'gray-light': '#F8FAFC',
        'gray-medium': '#94A3B8',
        'gray-dark': '#64748B',
        'accent': '#38BDF8', // Bleu ciel - plus clair
        'accent-light': '#BAE6FD',
        'accent-dark': '#0EA5E9',
        'success': '#34D399', // Vert menthe - plus clair
        'warning': '#FBBF24', // Jaune - plus clair
        'error': '#F87171',   // Rouge saumon - plus clair
        'info': '#60A5FA',    // Bleu clair
      },
      spacing: {
        '0.5': '0.5rem',
        '1': '1rem',
        '1.5': '1.5rem',
        '2': '2rem',
        '2.5': '2.5rem',
        '3': '3rem',
        '3.5': '3.5rem',
        '4': '4rem',
      },
      transitionDuration: {
        '2000': '2000ms',
      },
      transitionDelay: {
        '2000': '2000ms',
      },
      boxShadow: {
        'soft': '0 5px 20px -5px rgba(0, 0, 0, 0.07)',
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.05)',
        'button': '0 4px 6px -1px rgba(56, 189, 248, 0.2), 0 2px 4px -2px rgba(56, 189, 248, 0.1)',
      },
      animation: {
        'blob': 'blob 7s infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'scale(1)' },
          '33%': { transform: 'scale(1.1) translateX(4%) translateY(-4%)' },
          '66%': { transform: 'scale(0.9) translateX(-2%) translateY(2%)' },
          '100%': { transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(56, 189, 248, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(56, 189, 248, 0.6)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
} 