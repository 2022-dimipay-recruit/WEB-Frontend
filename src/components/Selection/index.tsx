import React from 'react';
import { Wrapper } from './style';

export const Selection: React.FC<{
  active?: boolean;
  children: string;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}> = ({ active = false, children, onClick }) => {
  return (
    <Wrapper active={active} onClick={onClick}>
      {children}
    </Wrapper>
  );
};