import React from 'react';
import { Vexile } from '@haechi/flexile';
import { styled, keyframes } from '#/stitches.config';

const Loading: React.FC = () => {
  return (
    <Wrapper x='center' y='center' gap={2}>
      <LoadingIcn />
      로딩 중
    </Wrapper>
  );
};

export default Loading;

const LoadingAnimation = keyframes({
  '0%': {transform: 'rotate(0deg)'},
  '100%': {transform: 'rotate(360deg)'},
});
const LoadingIcn = styled('div', {
  width: '7rem',
  height: '7rem',
  borderRadius: '50%',
  border: '.5rem solid $brightGreen',
  borderTop: '.5rem solid $darkGreen',
  animation: `${LoadingAnimation} 2s linear infinite`
});
const Wrapper = styled(Vexile, {
  width: '100vw',
  height: '100vh',
  fontSize: '4rem',
  fontWeight: 700,
  color: '$blackGreen',
});