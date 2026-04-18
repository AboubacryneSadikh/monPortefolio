/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        deep:      '#0d1117',
        card:      '#161b22',
        hover:     '#1c2128',
        border:    '#30363d',
        muted:     '#8b949e',
        blue:      '#58a6ff',
        blueDark:  '#1f6feb',
        green:     '#238636',
        greenDark: '#196027',
        red:       '#f85149',
        redDark:   '#da3633',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono:    ['Fira Code', 'monospace'],
      },
      keyframes: {
        fadeUp:  { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:  { from: { opacity: '0' }, to: { opacity: '1' } },
        checkIn: { from: { transform: 'scale(0) rotate(-20deg)', opacity: '0' }, to: { transform: 'scale(1) rotate(0)', opacity: '1' } },
        ping:    { '75%, 100%': { transform: 'scale(1.15)', opacity: '0' } },
        pulse:   { '0%, 100%': { opacity: '1' }, '50%': { opacity: '.4' } },
        slideIn: { from: { transform: 'translateX(100%)', opacity: '0' }, to: { transform: 'translateX(0)', opacity: '1' } },
      },
      animation: {
        'fade-up':   'fadeUp 0.5s ease both',
        'fade-in':   'fadeIn 0.3s ease both',
        'check-in':  'checkIn 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.2s both',
        'ping-slow': 'ping 3s cubic-bezier(0,0,0.2,1) infinite',
        'pulse':     'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
        'slide-in':  'slideIn 0.3s ease both',
      },
    },
  },
  plugins: [],
}
