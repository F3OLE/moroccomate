import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        morocco: {
          50: '#fef7f0',
          100: '#fdecd8',
          200: '#fbd5b0',
          300: '#f8b87a',
          400: '#f59342',
          500: '#f2751e',
          600: '#e35d14',
          700: '#bc4513',
          800: '#963817',
          900: '#7a3018',
        },
        desert: {
          50: '#fdf8f3',
          100: '#fbe9d9',
          200: '#f7d3b3',
          300: '#f1b583',
          400: '#e89052',
          500: '#e2752e',
          600: '#d35e24',
          700: '#ae4720',
          800: '#8c3a21',
          900: '#72321e',
        }
      },
      fontFamily: {
        arabic: ['Noto Sans Arabic', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
};
export default config;

