import React from 'react';
import { LoadableComponent } from '@loadable/component';
import { styled } from '#/stitches.config';
import { Hexile } from '@haechi/flexile';

export const ExceptionPage: React.FC<{
  Children: LoadableComponent<{}>;
}> = ({ Children }) => {
  return (
    <Container>
      <Hexile x='center' y='center' fillx filly>
        <Children />
      </Hexile>
    </Container>
  );
};

const Container = styled('div', {
  width: '100vw',
  height: '100vh',
});