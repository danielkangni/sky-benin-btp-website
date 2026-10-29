import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'surface': '#f9f9ff',
        'surface-bright': '#f9f9ff',
        'surface-container': '#e7eeff',
        'surface-container-high': '#dee8ff',
        'on-surface': '#111c2c',
        'on-surface-variant': '#45464e',
        'outline': '#76767f',
        'outline-variant': '#c6c6cf',
        'primary': '#00020e',
        'on-primary': '#ffffff',
        'primary-container': '#0d1b3e',
        'on-primary-container': '#7784ad',
        'secondary': '#ac3235',
        'on-secondary': '#ffffff',
        'secondary-container': '#fd6d6b',
      },
      fontFamily: {
        sans: ['"Work Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'headline-xl': ['64px', { lineHeight: '72px', letterSpacing: '-0.03em', fontWeight: '800' }],
        'headline-lg': ['40px', { lineHeight: '48px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-md': ['28px', { lineHeight: '36px', fontWeight: '600' }],
        'body-lg': ['20px', { lineHeight: '32px', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '26px', fontWeight: '400' }],
        'label-bold': ['14px', { lineHeight: '20px', fontWeight: '700' }],
      },
      spacing: {
        'gutter': '24px',
        'xs': '4px',
        'sm': '16px',
        'md': '32px',
        'lg': '64px',
        'xl': '120px',
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
