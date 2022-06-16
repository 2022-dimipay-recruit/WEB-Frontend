import { createStitches } from '@stitches/react';

export const COLORS = {
  whiteGreen: '#FCFEFD',
  brightGreen: '#EBF7F1',
  baseGreen: '#D1EBDF',
  darkGreen: '#97C5AF',
  blackGreen: '#618F79',
  deepGreen: '#405F50'
};

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: COLORS
  },
  utils: {
    fontL: () => ({
      fontSize: '1.8rem'
    }),
    fontS: () => ({
      fontSize: '1.4rem'
    })
  },
  media: {
    mobile: '(max-width: 600px)',
    pad: '(min-width: 601px) and (max-width: 992px)',
    desktop: '(min-width: 993px)',
  },
});