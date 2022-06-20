import React from 'react';
import { Vexile } from '@haechi/flexile';
import { styled, keyframes } from '#/stitches.config';
import { Transition } from 'react-transition-group';

const Loading: React.FC<{
  show: boolean;
}> = ({ show = false, }) => {
  return (
    <Transition in={show} timeout={500} unmounOnExit>
      {status => (
        <Wrapper x='center' y='center' gap={2} status={status as 'exited' | 'entered'}>
          <LoadingIcn />
          Pasked
        </Wrapper>
      )}
    </Transition>
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
  animation: `${LoadingAnimation} 1s ease infinite`
});
const Wrapper = styled(Vexile, {
  width: '100vw',
  height: '100vh',
  fontSize: '4rem',
  fontWeight: 700,
  color: '$blackGreen',
  variants: {
    status: {
      exited: {
        display: 'none',
        opacity: 0,
      },
      entered: {
        display: 'flex',
        opacity: 1,
      }
    }
  }
});