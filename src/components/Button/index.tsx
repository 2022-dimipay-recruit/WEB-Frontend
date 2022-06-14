import React from 'react';
import { Wrapper } from './style';

export const Button: React.FC<{
  large?: boolean;
  type: 'black' | 'bright' | 'deep';
  children: string;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}> = ({large = false, type, children, onClick}) => {
  return (
    <Wrapper type={type} fillx={large} x='center' y='center' onClick={onClick}>{children}</Wrapper>
  );
};
