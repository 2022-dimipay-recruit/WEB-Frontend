import { styled, keyframes } from '#/stitches.config';
import { Hexile, Vexile } from '@haechi/flexile';

export const Form = styled('form', {
  width: '100%',
});
export const QBox = styled(Vexile, {
  width: '100%',
  overflow: 'hidden',
});
export const ContentBox = styled(Vexile, {
  width: '70%',
});
export const ProfileImg = styled('img', {
  width: '7.2rem',
  height: '7.2rem',
  borderRadius: '50%',
});
export const Name = styled('span', {
  color: '$baseGreen',
  fontWeight: 500,
  cursor: 'pointer',
});
export const QuestionTitle = styled('span', {
  color: '$darkGreen',
  fontWeight: 700,
  fontSize: '2rem',
  width: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  wordBreak: 'break-all',
});
export const Answer = styled('span', {
  color: '$blackGreen',
  fontWeight: 700,
  fontSize: '2rem',
});
export const Textarea = styled('textarea', {
  padding: '1.8rem',
  outline: 'none',
  border: 'none',
  borderRadius: '1.6rem',
  width: '100%',
  background: '$brightGreen',
  resize: 'none',
  color: '$blackGreen',
  '&::placeholder': {
    fontSize: '1.4rem',
    fontWeight: 500,
    color: '$darkGreen',
  }
});

export const LoadingSpan = styled(Hexile, {
  color: '$darkGreen',
  padding: '10rem',
});
export const NonSpan = styled(Hexile, {
  color: '$darkGreen',
  fontSize: '2rem',
  fontWeight: 700,
  padding: '10rem',
});

const loadingAnimation = keyframes({
  '0%': {transform: 'rotate(0deg)'},
  '100%': {transform: 'rotate(360deg)'}
});
export const LoadingIcn = styled('div', {
  width: '3rem',
  height: '3rem',
  borderRadius: '50%',
  border: '.3rem solid $brightGreen',
  borderTop: '.3rem solid $darkGreen',
  animation: `${loadingAnimation} .5s ease infinite`,
});