import React, { useState } from 'react';
import {
  ChatIcn,
  NotificationIcn,
  Title,
  ProfileImg,
  Name,
  Wrapper,
  ProfileBox,
  NotificationIcnActive,
  ProfileContainer,
  IcnBox
} from './style';
import { SearchBar, Button, Modal } from '@/components';
import { useRecoilValue } from 'recoil';
import { MyInfoState } from '@/state';
import { useNavigate } from 'react-router-dom';
import { config, defaultProfile } from '@/constants/types';

export const Topbar: React.FC = () => {
  const userData = useRecoilValue(MyInfoState);
  const history = useNavigate();
  
  const [content, setContent] = useState<string>('');
  const [notifiFocus, setNotifiFocus] = useState<boolean>(false);

  return (
    <Wrapper x='space' y='center' fillx>
      <Title to='/'>Pasked</Title>
      <SearchBar placeholder='닉네임, 아이디로 검색' value={content} setValue={setContent} />
      {
        userData ? (
          <ProfileContainer y='center' filly>
            <IcnBox y='center' filly>
              <ChatIcn />
              {notifiFocus ? (
                <NotificationIcnActive onClick={() => setNotifiFocus(false)} />
              ) : (
                <NotificationIcn onClick={() => setNotifiFocus(true)} />
              )}
            </IcnBox>
            <ProfileBox y='center' filly gap={1} onClick={() => history(`/${userData.userName}`)}>
              <ProfileImg src={userData ? (userData.image === config.defaultProfile ? defaultProfile : userData.image) : defaultProfile} crossOrigin='anonymous' />
              <Name>{userData?.name}</Name>
            </ProfileBox>
          </ProfileContainer>
        ) : (
          <Button color='black' onClick={() => history('/login')} responsive>로그인</Button>
        )
      }
      <Modal type='notification' active={notifiFocus} content={content} />
    </Wrapper>
  );
};