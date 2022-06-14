import React, { useState } from 'react';
import { ChatIcn, NotificationIcn, Title, ProfileImg, Name, Wrapper, ProfileBox } from './style';
import { Hexile } from '@haechi/flexile';
import { SearchBar, Button } from '@/components';
import { useRecoilValue } from 'recoil';
import { MyInfoState } from '@/state';
import { useNavigate } from 'react-router-dom';

export const Topbar: React.FC = () => {
  const userData = useRecoilValue(MyInfoState);
  const history = useNavigate();
  
  const [content, setContent] = useState<string>("");

  return (
    <Wrapper x='space' y='center' fillx>
      <Title to='/'>Pasked</Title>
      <SearchBar placeholder='닉네임, 아이디로 검색' value={content} setValue={setContent} />
      {
        userData ? (
          <Hexile y='center' filly gap={3.6}>
            <Hexile y='center' filly gap={2.4}>
              <ChatIcn />
              <NotificationIcn />
            </Hexile>
            <ProfileBox y='center' filly gap={1}>
              <ProfileImg src={`${import.meta.env.VITE_API_URI}/assets${userData?.profile || '/defaultProfile.jpg'}`} crossOrigin="anonymous" />
              <Name>{userData?.name}</Name>
            </ProfileBox>
          </Hexile>
        ) : (
          <Button color='black' onClick={() => history('/login')} responsive>로그인</Button>
        )
      }
    </Wrapper>
  );
};