import { styled } from '#/stitches.config';

export const Wrapper = styled('button', {
  borderRadius: '2.6rem',
  padding: '1rem 2.8rem',
  cursor: 'pointer',
  fontSize: '2rem',
  fontWeight: 700,
  border: 'none',
  outline: 'none',
  variants: {
    color: {
      'black': {
        background: '$blackGreen',
        color: '$brightGreen',
      },
      'bright': {
        background: '$brightGreen',
        color: '$blackGreen',
      },
      'deep': {
        background: '$deepGreen',
        color: '$brightGreen',
      }
    },
    large: {
      true: {
        width: '100%',
      },
      false: {
        width: 'auto',
      }
    }
  }
});