import { styled } from '#/stitches.config';
import { Hexile } from '@haechi/flexile';
import { ReactComponent as Search } from '@/assets/icons/search.svg';

export const Wrapper = styled(Hexile, {
  padding: '.6rem 1rem',
  width: '75%',
  background: '$brightGreen',
  borderRadius: '2rem',
});
export const SearchIcn = styled(Search, {
  width: '1.5rem',
  height: '1.5rem',
});
export const Input = styled('input', {
  outline: 'none',
  border: 'none',
  fontSize: '1.2rem',
  fontWeight: 700,
  color: '$blackGreen',
  width: 'calc(100% - 2.1rem)',
  background: 'none',
  '&::placeholder': {
    color: '$darkGreen',
    fontWeight: 500,
  }
});