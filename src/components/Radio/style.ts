import { styled } from '#/stitches.config';
import { Hexile } from '@haechi/flexile';

export const Wrapper = styled(Hexile, {
  height: '2.2rem',
});
export const RadioBtn = styled('input', {
  display: 'none',
  '&:checked + label:after': {
    content: '',
    position: 'absolute',
    left: '.5rem',
    width: '1.2rem',
    height: '1.2rem',
    background: '$blackGreen',
    borderRadius: '50%',
    transform: 'translateY(-50%)',
    top: '50%',
  }
});
export const Label = styled('label', {
  color: '$blackGreen',
  fontWeight: 700,
  fontSize: '1.6rem',
  paddingLeft: '3rem',
  position: 'relative',
  cursor: 'pointer',
  userSelect: 'none',
  '&:before': {
    content: '',
    position: 'absolute',
    left: 0,
    width: '1.8rem',
    height: '1.8rem',
    textAlign: 'center',
    background: '$brightGreen',
    border: '2px solid $blackGreen',
    borderRadius: '100%',
    transform: 'translateY(-50%)',
    top: '50%',
  },
});