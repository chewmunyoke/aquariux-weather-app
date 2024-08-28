import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      transitionProperty: {
        inset: 'inset',
      },
      transitionTimingFunction: {
        bounce: 'cubic-bezier(0.35, 0.12, 0.14, 1.42)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(2rem)' },
          '100%': { transform: 'translateY(0rem)' },
        },
      },
      animation: {
        'fade-in-ease': 'fade-in 0.3s ease both',
        'slide-up-ease': 'slide-up 0.3s ease both',
      },
    },
  },
  plugins: [],
};
export default config;
