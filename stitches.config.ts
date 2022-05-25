import { createStitches } from '@stitches/react';

export const COLORS = {
  whiteGreen: '#FCFEFD',
  brightGreen: '#C7F5DF',
  baseGreen: '#A1EEC9',
  darkGreen: '#97C5AF',
  blackGreen: '#618F79',
  deepGreen: '#507765'
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
});