import React from 'react';
import { Wrapper } from './style';

export const Button: React.FC<{
  large?: boolean;
  color: 'black' | 'bright' | 'deep';
  type?: 'button' | 'submit';
  children: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  responsive?: boolean;
}> = ({
  large = false,
  color,
  type = 'button',
  children,
  onClick,
  responsive = false,
}) => {
  return (
    <Wrapper
    color={color}
    large={large}
    onClick={onClick}
    type={type}
    responsive={responsive}>{children}</Wrapper>
  );
};
