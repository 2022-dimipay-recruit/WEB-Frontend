import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getAccessToken, refetchToken } from '@/api';
import { LoadableComponent } from '@loadable/component';
import { styled } from '#/stitches.config';
import { Topbar } from '@/components';
import { useSetRecoilState } from 'recoil';
import { MyInfoState } from '@/state';
import { fetchMyData } from '@/api/user';

const checkAuth = async (Component: LoadableComponent<{}>) => {
  try {
    const accessToken = getAccessToken();
    if(!accessToken) throw new Error('Cannot find access token');
    
    if(!(await refetchToken())) throw new Error('Cannot login with token');
    return <Component />;
  } catch {
    return <Navigate to='/login' />;
  }
};

export const Screen: React.FC<{
  Children: LoadableComponent<{}>;
  needAuth?: boolean;
}> = ({ Children, needAuth=false }) => {
  const setInfo = useSetRecoilState(MyInfoState);
  const [Element, setElement] = useState<JSX.Element>();

  useEffect(() => {
    (async () => {
      console.log("Aa");
      setElement(await checkAuth(Children));

      if(!getAccessToken()) return;
      setInfo(await fetchMyData());
    })();
  }, []);

  return (
    <Container>
      <Topbar />
      {needAuth ? Element : <Children />}
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