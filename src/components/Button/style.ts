import { styled } from '#/stitches.config';
import { Hexile } from '@haechi/flexile';

export const Wrapper = styled(Hexile, {
  borderRadius: '2.6rem',
  padding: '1rem 2.8rem',
  cursor: 'pointer',
  fontSize: '2rem',
  fontWeight: 700,
  variants: {
    type: {
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