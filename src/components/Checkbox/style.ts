import { styled } from '#/stitches.config';
import CheckIcn from '@/assets/icons/check.svg';

export const Wrapper = styled('div', {
  height: '2.2rem',
});
export const Input = styled('input', {
  display: 'none',
  '&:checked + label:after': {
    content: '',
    position: 'absolute',
    width: '2rem',
    height: '2rem',
    transform: 'translateY(-50%)',
    top: '50%',
    left: '.3rem',
    backgroundImage: `url(${CheckIcn})`,
  }
});
export const Label = styled('label', {
  color: '$blackGreen',
  fontWeight: 700,
  fontSize: '1.4rem',
  paddingLeft: '3rem',
  position: 'relative',
  cursor: 'pointer',
  userSelect: 'none',
  '&:before': {
    content: '',
    position: 'absolute',
    left: 0,
    width: '2rem',
    height: '2rem',
    textAlign: 'center',
    background: '$brightGreen',
    border: '2px solid $blackGreen',
    borderRadius: '.5rem',
    transform: 'translateY(-50%)',
    top: '50%',
  },
});