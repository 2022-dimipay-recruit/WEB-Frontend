import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Vexile } from '@haechi/flexile';
import { config, defaultProfile, FindUser, Notification } from '@/constants/types';
import { api } from '@/api';

import { Wrapper, Container, ProfileImg, Name, UserName, NotiTitle } from './style';
import { useRecoilValue } from 'recoil';
import { MyInfoState } from '@/state';

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
  const [notifications, setNotifications] = useState<Array<Notification>>([]);
  const myInfo = useRecoilValue(MyInfoState);

  useEffect(() => {
    (async () => {;
      setData(await api<'userFind'>(
        'GET',
        `/user/find?keyword=${content || ''}&${content ? 'preview=false' : `preview=true`}`
      ));
    })();
  }, [content]);

  useEffect(() => {
    (async () => {
      if(type === 'notification' && myInfo) setNotifications(await api<'getNotification'>('GET', '/notification?type=all'));
    })();
  }, [myInfo]);

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
      {type === 'notification' && (
        notifications.map((info, idx) => (
          <Vexile y='center' gap={.2} fillx key={idx+500}>
            <NotiTitle>{info.title}</NotiTitle>
            <UserName>{info.message}</UserName>
          </Vexile>
        ))
      )}
    </Wrapper>
  );
};