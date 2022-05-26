import React from 'react';
import { Hexile } from '@haechi/flexile';
import { styled } from '#/stitches.config';

const FlexilsTest: React.FC = () => {
  return (
    <Wrapper>
      <Hexile fillx filly x='space' y='center'>
        <h1>Flexile Test</h1>
        <h1>Flexile Test</h1>
      </Hexile>
    </Wrapper>
  );
}

export default FlexilsTest;

const Wrapper = styled('div', {
  width: '100vw',
  height: '100vh'
});