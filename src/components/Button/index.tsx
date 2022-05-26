import React from 'react';
import { Wrapper } from './style';

const Button: React.FC<{
  large?: boolean;
  type: 'black' | 'bright' | 'deep';
  value: string;
}> = ({large = false, type, value}) => {
  return (
    <Wrapper type={type} fillx={large} x='center' y='center'>{value}</Wrapper>
  );
}

export default Button;
