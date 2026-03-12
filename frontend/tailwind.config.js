/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkBg:        '#0f172a',
        darkCard:      '#1e293b',
        neonBlue:      '#3b82f6',
        neonBlueHover: '#2563eb',
        accent:        '#60a5fa',
        whiteText:     '#f8fafc',
        dimText:       '#94a3b8',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      animation: {
        'fade-in':  'fadeIn 0.5s ease-out both',
        'bounce':   'bounce 1s infinite',
        'spin':     'spin 1s linear infinite',
        'pulse':    'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        neon:  '0 0 15px rgba(59,130,246,0.5)',
        neonLg:'0 0 30px rgba(59,130,246,0.7)',
      },
    },
  },
  plugins: [],
}
