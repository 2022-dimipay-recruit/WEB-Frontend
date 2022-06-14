import { styled } from '#/stitches.config';
import { Vexile } from '@haechi/flexile';
import { ReactComponent as Cancel } from '@/assets/icons/cancel.svg';
import { ReactComponent as Visible } from '@/assets/icons/visible.svg';

export const Wrapper = styled(Vexile, {
  height: '7rem',
});
export const Text = styled('span', {
  marginLeft: '2.2rem',
  color: '$blackGreen',
  fontWeight: 500,
});
export const Box = styled('div', {
  width: '100%',
  position: 'relative',
});
export const InputBox = styled('input', {
  color: '$deepGreen',
  fontWeight: 500,
  width: '100%',
  outline: 'none',
  border: 'none',
  background: '$brightGreen',
  borderRadius: '2rem',
  variants: {
    password: {
      true: {
        padding: '1.2rem 7.8rem 1.2rem 2rem',
      },
      false: {
        padding: '1.2rem 4.5rem 1.2rem 2rem',
      },
    }
  }
});
export const CancelIcn = styled(Cancel, {
  position: 'absolute',
  right: '1.2rem',
  width: '2.4rem',
  height: '2.4rem',
  cursor: 'pointer',
  transform: 'translateY(-50%)',
  top: '50%',
});
export const VisibleIcn = styled(Visible, {
  position: 'absolute',
  right: '4.6rem',
  width: '2.4rem',
  height: '2.4rem',
  cursor: 'pointer',
  transform: 'translateY(-50%)',
  top: '50%',
});