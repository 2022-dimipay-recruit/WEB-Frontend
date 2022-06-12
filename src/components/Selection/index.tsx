import React from 'react';
import { Wrapper } from './style';

export const Selection: React.FC<{
  active?: boolean;
  children: string;
}> = ({ active = false, children }) => {
  return (
    <Wrapper active={active}>
      {children}
    </Wrapper>
  );
};