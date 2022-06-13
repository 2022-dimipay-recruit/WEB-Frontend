import React from 'react';
import { Wrapper, HeartIcn, Text } from './style';

export const Heart: React.FC<{
  heart: number;
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}> = ({
  heart,
  active = false,
  onClick,
}) => {
  return (
    <Wrapper gap={.6} y='center'>
      <HeartIcn active={active} onClick={onClick} />
      <Text>{heart > 99 ? '99+' : heart}</Text>
    </Wrapper>
  );
};