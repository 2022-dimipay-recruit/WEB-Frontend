import React from 'react';
import { Wrapper } from './style';

export const Button: React.FC<{
  large?: boolean;
  type: 'black' | 'bright' | 'deep';
  children: string;
}> = ({large = false, type, children}) => {
  return (
    <Wrapper type={type} fillx={large} x='center' y='center'>{children}</Wrapper>
  );
};
