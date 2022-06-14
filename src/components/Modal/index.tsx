import { Vexile } from '@haechi/flexile';
import React from 'react';
import { Wrapper, Container, ProfileImg, Name, UserName } from './style';

export const Modal: React.FC<{
  type: 'search' | 'notification';
  active?: boolean;
}> = ({
  type,
  active = false,
}) => {
  return (
    <Wrapper gap={1.8} type={type} active={active}>
      <Container gap={.9} fillx>
        <ProfileImg src={`${import.meta.env.VITE_API_URI}/assets/defaultProfile.jpg`} crossOrigin='anonymous' />
        <Vexile y='center' gap={.2}>
          <Name>오명훈</Name>
          <UserName>@audgns23</UserName>
        </Vexile>
      </Container>
    </Wrapper>
  );
};