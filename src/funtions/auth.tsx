import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAccessToken } from '@/api';
import { LoadableComponent } from '@loadable/component';
import { styled } from '#/stitches.config';
import { Topbar } from '@/components';
import { useSetRecoilState } from 'recoil';
import { MyInfoState, UserParamState } from '@/state';
import { fetchMyData } from '@/api/user';
import { checkAuth } from '.';

export const Screen: React.FC<{
  Children: LoadableComponent<{}>;
  needAuth?: boolean;
}> = ({ Children, needAuth=false }) => {
  const setInfo = useSetRecoilState(MyInfoState);
  const setUserParam = useSetRecoilState(UserParamState);
  const [Element, setElement] = useState<JSX.Element>();

  const { username } = useParams();

  useEffect(() => {
    (async () => {
      setElement(await checkAuth(Children));

      if(!getAccessToken()) return setInfo(null);
      setInfo(await fetchMyData());
    })();
  }, []);
  useEffect(() => {
    if(!username) return;
    setUserParam(username);
  }, [username]);

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
  position: 'relative',
  '@desktop': {
    padding: '0 20rem',
  },
  '@pad': {
    padding: '0 10rem',
  },
  '@mobile': {
    padding: '0 3rem',
  }
});