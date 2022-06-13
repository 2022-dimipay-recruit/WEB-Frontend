import { styled } from '#/stitches.config';
import { Hexile } from '@haechi/flexile';
import Heart from '@/assets/icons/heart.svg';
import HeartFill from '@/assets/icons/heartFill.svg';

export const Wrapper = styled(Hexile, {
  height: '2.4rem',
});
export const HeartIcn = styled('div', {
  width: '2.4rem',
  height: '2.4rem',
  cursor: 'pointer',
  variants: {
    active: {
      true: {
        backgroundImage: `url(${HeartFill})`,
      },
      false: {
        backgroundImage: `url(${Heart})`,
      }
    }
  }
});
export const Text = styled('span', {
  color: '$darkGreen',
  fontWeight: 500,
});