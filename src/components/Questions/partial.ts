import { styled } from '#/stitches.config';

export const ProfileImg = styled('img', {
  width: '7.2rem',
  height: '7.2rem',
  borderRadius: '50%',
});
export const Name = styled('span', {
  color: '$baseGreen',
  fontWeight: 500,
});
export const QuestionTitle = styled('span', {
  color: '$darkGreen',
  fontWeight: 700,
  fontSize: '2rem',
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