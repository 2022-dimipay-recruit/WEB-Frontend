import React from 'react';
import { Hexile } from '@haechi/flexile';
import { styled } from '#/stitches.config';

const Loading: React.FC = () => {
  return (
    <Wrapper x='center' y='center'>
      로딩 중
    </Wrapper>
  );
};

export default Loading;

const Wrapper = styled(Hexile, {
  width: '100vw',
  height: '100vh',
  fontSize: '4rem',
  fontWeight: 700,
  color: '$blackGreen',
});