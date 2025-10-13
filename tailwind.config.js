const colors = require('./src/shared/ui/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        bevietnampro: ['BeVietnamPro'], // regular
        'bevietnampro-bold': ['BeVietnamPro-Bold'], // bold
        'bevietnampro-medium': ['BeVietnamPro-Medium'], // bold
        'bevietnampro-italic': ['BeVietnamPro-ItalicBold'], // bold
        'bevietnampro-semibold': ['BeVietnamPro-SemiBold'], // bold
        baloo: ['Baloo'], // regular
      },
      colors,
      fontSize: {
        xxs: ['var(--fs-xxs)', { lineHeight: 'var(--lh-xxs)' }],
        xs: ['var(--fs-xs)', { lineHeight: 'var(--lh-xs)' }],
        sm: ['var(--fs-sm)', { lineHeight: 'var(--lh-sm)' }],
        base: ['var(--fs-base)', { lineHeight: 'var(--lh-base)' }],
        lg: ['var(--fs-lg)', { lineHeight: 'var(--lh-lg)' }],
        xl: ['var(--fs-xl)', { lineHeight: 'var(--lh-xl)' }],
        '2xl': ['var(--fs-2xl)', { lineHeight: 'var(--lh-2xl)' }],
        '3xl': ['var(--fs-3xl)', { lineHeight: 'var(--lh-x3l)' }],
      },
      filter: {
        dropShadowDark: 'drop-shadow(0 1px 1px rgb(255 255 255 / 1))',
        dropShadowLight: 'drop-shadow(0 1px 1px rgb(0 0 0 / 1))',
      },
      borderRadius: {
        lg: '0.5rem',
        md: 'calc(0.5rem - 2px)',
        sm: 'calc(0.5rem - 4px)',
      },
      borderWidth: {
        0: 'var(--bw-0)',
        DEFAULT: 'var(--bw-default)',
        2: 'var(--bw-2)',
        3: 'var(--bw-3)',
        4: 'var(--bw-4)',
        5: 'var(--bw-5)',
        6: 'var(--bw-6)',
        7: 'var(--bw-7)',
        8: 'var(--bw-8)',
        9: 'var(--bw-9)',
        10: 'var(--bw-10)',
      },
      maxWidth: {
        'screen-basic': '1440px',
        'screen-md-half': '384px',
      },
      width: {
        'screen-basic': '1440px',
        'screen-md-half': '384px',
      },
      spacing: {
        // NOTE 0.5 bị lỗi
        0.5: 'var(--space-0.5)',
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
        7: 'var(--space-7)',
        8: 'var(--space-8)',
        9: 'var(--space-9)',
        10: 'var(--space-10)',
        11: 'var(--space-11)',
        12: 'var(--space-12)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {},
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.custom-text': {
          '@apply font-bevietnampro leading-snug': {},
        },
        '.border-custom-3-light': {
          '@apply pb-[3px] bg-background-dark-light md:pb-[4px]': {},
        },
        '.border-custom-5-light': {
          '@apply pb-[5px] bg-background-dark-light md:pb-[6px]': {},
        },
        '.border-custom-7-light': {
          '@apply pb-[7px] bg-background-dark-light md:pb-[8px]': {},
        },
        '.border-custom-3': {
          '@apply pb-[3px] bg-border md:pb-[4px]': {},
        },
        '.border-custom-5': {
          '@apply pb-[5px] bg-border md:pb-[6px]': {},
        },
        '.border-custom-7': {
          '@apply pb-[7px] bg-border md:pb-[8px]': {},
        },
      });
    },
  ],
};
