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
        'tet-red': '#D32F2F',
        'tet-red-dark': '#B71C1C',
        'tet-gold': '#FFD700',
        'tet-gold-dark': '#C7A600',
        'tet-green': '#2E7D32',
        'tet-green-light': '#4CAF50',
        'tet-cream': '#FFF8E1',
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'shake': 'shake 0.6s ease-in-out infinite',
        'petal-fall': 'petalFall 8s linear infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'bounce-slow': 'bounce 3s infinite',
        'firework': 'firework 1.5s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'horse-run': 'horseRun 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shake: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '25%': { transform: 'rotate(5deg)' },
          '50%': { transform: 'rotate(-3deg)' },
          '75%': { transform: 'rotate(3deg)' },
        },
        petalFall: {
          '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0.3' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #FFD700, 0 0 10px #FFD700' },
          '100%': { boxShadow: '0 0 20px #FFD700, 0 0 40px #FFD700, 0 0 60px #FFD700' },
        },
        firework: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '50%': { opacity: '1' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(60px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        horseRun: {
          '0%, 100%': { transform: 'translateX(0) scaleX(1)' },
          '25%': { transform: 'translateX(10px) scaleX(1)' },
          '50%': { transform: 'translateX(0) scaleX(1)' },
          '75%': { transform: 'translateX(-10px) scaleX(1)' },
        },
      },
      backgroundImage: {
        'gradient-tet': 'linear-gradient(135deg, #D32F2F 0%, #B71C1C 50%, #880E4F 100%)',
        'gradient-gold': 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)',
        'gradient-card': 'linear-gradient(180deg, #FFF8E1 0%, #FFECB3 100%)',
      },
    },
  },
  plugins: [],
};
