/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5B4CDB',
        secondary: '#FF6B6B',
        accent: '#4ECDC4',
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        },
        success: '#51CF66',
        warning: '#FFD93D',
        error: '#FF6B6B',
        info: '#339AF0'
      },
      fontFamily: {
        display: ['Fredoka One', 'cursive'],
        sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui'],
        heading: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui']
      },
      animation: {
        'pulse-success': 'pulse-success 0.3s ease-out',
        'bounce-in': 'bounce-in 0.3s ease-out',
        'celebration': 'celebration 0.5s ease-out'
      },
      keyframes: {
        'pulse-success': {
          '0%': { transform: 'scale(1)', backgroundColor: 'rgb(81, 207, 102)' },
          '50%': { transform: 'scale(1.05)', backgroundColor: 'rgb(34, 197, 94)' },
          '100%': { transform: 'scale(1)', backgroundColor: 'rgb(81, 207, 102)' }
        },
        'bounce-in': {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        'celebration': {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '25%': { transform: 'scale(1.1) rotate(-5deg)' },
          '50%': { transform: 'scale(1.2) rotate(5deg)' },
          '75%': { transform: 'scale(1.1) rotate(-2deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' }
        }
      }
    },
  },
  plugins: [],
}