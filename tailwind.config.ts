import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette (from the ADISHI brief; refine once the logo file is in)
        emerald: { DEFAULT: '#063D30' },
        forest: '#082F27',
        gold: '#C6A15B',
        champagne: '#DCC18A',
        ivory: '#F8F5EF',
        cream: '#F1EDE4',
        charcoal: '#202321',
        // Supporting tones for floral / handmade warmth
        blush: '#EBD3CC',
        sage: '#8FA692',
        // Darker gold for TEXT on ivory (antique gold alone fails contrast on light backgrounds)
        gilt: '#8A6A2C',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
