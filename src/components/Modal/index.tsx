import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Vexile } from '@haechi/flexile';
import { config, defaultProfile, FindUser } from '@/constants/types';
import { api } from '@/api';

import { Wrapper, Container, ProfileImg, Name, UserName } from './style';

export const Modal: React.FC<{
  type: 'search' | 'notification';
  active?: boolean;
  content?: string;
}> = ({
  type,
  active = false,
  content,
}) => {
  const history = useNavigate();
  const [data, setData] = useState<FindUser[]>([]);

  useEffect(() => {
    (async () => {
      const res = await api<'userFind'>(
        'GET',
        `/user/find?keyword=${content || ''}&${content ? 'preview=false' : `preview=true`}`
      );
      setData(res);
    })();
  }, [content]);

  return (
    <Wrapper gap={1.8} type={type} active={active}>
      {type === 'search' && (
        data.map((info, idx) => (
          <Container gap={.9} fillx onMouseDown={() => history(`/${info.userName}`)} key={idx}>
            <ProfileImg src={info.image === config.defaultProfile ? defaultProfile : info.image} crossOrigin='anonymous' />
            <Vexile y='center' gap={.2}>
              <Name>{info.name}</Name>
              <UserName>@{info.userName}</UserName>
            </Vexile>
          </Container>
        ))
      )}
    </Wrapper>
  );
};