import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAccessToken, refetchToken } from '@/api';
import { LoadableComponent } from '@loadable/component';
import { styled } from '#/stitches.config';
import { Topbar } from '@/components';

const checkAuth = (Component: LoadableComponent<{}>) => {
  try {
    const accessToken = getAccessToken();
    if(!accessToken) throw new Error('Cannot find access token');

    if(!refetchToken()) throw new Error('Cannot login with refresh token');
    return <Component />;
  } catch {
    return <Navigate to='/login' />;
  }
};

export const Screen: React.FC<{
  Children: LoadableComponent<{}>;
  needAuth?: boolean;
}> = ({ Children, needAuth=false }) => {
  return (
    <Container>
      <Topbar />
      {needAuth ? checkAuth(Children) : <Children />}
    </Container>
  );
};

const Container = styled('div', {
  width: '100vw',
  height: '100vh',
  '@desktop': {
    padding: '6rem 20rem 0 20rem',
  },
  '@pad': {
    padding: '4rem 10rem 0 10rem',
  },
  '@mobile': {
    padding: '1rem 3rem 0 3rem',
  }
});