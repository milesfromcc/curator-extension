import type { Config } from 'tailwindcss';

import withMT from '@material-tailwind/react/utils/withMT';

/** @type {import('tailwindcss').Config} */

export default withMT({
  darkMode: ['class'],
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backdropBlur: {
        '2px': '2px',
      },
      transitionProperty: {
        'max-height': 'max-height',
        spacing: 'margin, padding',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      colors: {
        primary: {
          '50': '#f9fafb',
          '100': '#f0f2f4',
          '200': '#e2e5e9',
          '300': '#cbd1d8',
          '400': '#96a3b0',
          '500': '#657586',
          '600': '#485460',
          '700': '#353d46',
          '800': '#1f2429',
          '900': '#0f1214',
          '950': '#090a0c',
        },
        secondary: {
          '50': '#f7fdfc',
          '100': '#ebf9f8',
          '200': '#d7f4f2',
          '300': '#b7ebe7',
          '400': '#70d7d0',
          '500': '#34b7ae',
          '600': '#25837d',
          '700': '#1b5f5b',
          '800': '#103835',
          '900': '#081c1b',
          '950': '#04100f',
        },
        tertiary: {
          '50': '#fcfef5',
          '100': '#f6fde7',
          '200': '#eefccf',
          '300': '#e0f9a9',
          '400': '#c0f353',
          '500': '#9bdb0f',
          '600': '#6f9d0b',
          '700': '#517208',
          '800': '#2f4305',
          '900': '#182102',
          '950': '#0d1301',
        },
        quaternary: {
          '50': '#fff5f5',
          '100': '#ffe5e5',
          '200': '#ffcccc',
          '300': '#ffa3a3',
          '400': '#ff4747',
          '500': '#eb0000',
          '600': '#a80000',
          '700': '#7a0000',
          '800': '#470000',
          '900': '#240000',
          '950': '#140000',
        },
        quinary: {
          '50': '#fcf7f8',
          '100': '#f9eced',
          '200': '#f2d9db',
          '300': '#e8babf',
          '400': '#d1757e',
          '500': '#b03b46',
          '600': '#7e2a32',
          '700': '#5c1f25',
          '800': '#361215',
          '900': '#1b090b',
          '950': '#0f0506',
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar'),
  ],
} satisfies Config);
