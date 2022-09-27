import { createStitches } from '@stitches/react';

export const {
  config,
  styled,
  globalCss,
  keyframes,
  getCssText,
  createTheme,
  theme,
  css,
} = createStitches({
  theme: {
    fontSizes: {
      md: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
      xxl: '2rem',
    },

    colors: {
      white: '#ffffff',

      gray100: '#e1e1e6',
      gray300: '#c4c4c4',
      gray500: '#8D8D99',
      gray800: '#202024',
      gray900: '#121214',

      green300: '#00b37e',
      green500: '#00875f',
    },
  },
});
