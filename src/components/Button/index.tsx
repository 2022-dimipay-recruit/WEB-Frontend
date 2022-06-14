import React from 'react';
import { Wrapper } from './style';

export const Button: React.FC<{
  large?: boolean;
  color: 'black' | 'bright' | 'deep';
  type?: 'button' | 'submit';
  children: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}> = ({
  large = false,
  color,
  type = 'button',
  children,
  onClick,
}) => {
  return (
    <Wrapper color={color} large={large} onClick={onClick} type={type}>{children}</Wrapper>
  );
};
