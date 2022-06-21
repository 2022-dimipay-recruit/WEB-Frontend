import { styled } from '#/stitches.config';

export const Wrapper = styled('div', {
  width: '25%',
  paddingBottom: '1.4rem',
  fontSize: '2rem',
  lineHeight: '2.4rem',
  textAlign: 'center',
  cursor: 'pointer',
  '@mobile': {
    width: 'fit-content',
  },
  variants: {
    active: {
      true: {
        borderBottom: '1px solid $blackGreen',
        color: '$blackGreen',
        fontWeight: 700,
      },
      false: {
        borderBottom: '1px solid $baseGreen',
        color: '$baseGreen',
        fontWeight: 500,
      },
    },
  }
});