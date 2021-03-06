import React, { useEffect, useState } from 'react';
import { LoadableComponent } from '@loadable/component';
import { styled } from '#/stitches.config';
import { Hexile } from '@haechi/flexile';
import { checkAuth } from '.';
import { useSetRecoilState } from 'recoil';
import { LoadingState } from '@/state';
import { useLocation } from 'react-router-dom';

export const ExceptionPage: React.FC<{
  Children: LoadableComponent<{}>;
  needAuth?: boolean;
}> = ({
  Children,
  needAuth = false,
}) => {
  const [Element, setElement] = useState<JSX.Element>();
  const setLoading = useSetRecoilState(LoadingState);
  const { pathname } = useLocation();

  useEffect(() => {
    setLoading(true);
    (async () => {
      if(needAuth) setElement(await checkAuth(Children));
      setLoading(false);
    })();
  }, [pathname]);

  return (
    <Container>
      <Hexile x='center' y='center' fillx filly>
        {needAuth ? Element : <Children />}
      </Hexile>
    </Container>
  );
};

const Container = styled('div', {
  width: '100vw',
  height: '100vh',
});