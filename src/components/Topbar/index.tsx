import React, { useState } from 'react';
import { ChatIcn, NotificationIcn, Title, ProfileImg, Name } from './style';
import { Hexile } from '@haechi/flexile';
import { SearchBar } from '@/components';
import { useRecoilValue } from 'recoil';
import { MyInfoState } from '@/state';

export const Topbar: React.FC = () => {
  const userData = useRecoilValue(MyInfoState);
  const [content, setContent] = useState<string>("");

  return (
    <Hexile x='space' y='center' fillx>
      <Title to='/'>Pasked</Title>
      <SearchBar placeholder='닉네임, 아이디로 검색' value={content} setValue={setContent} />
      <Hexile y='center' filly gap={3.6}>
        <Hexile y='center' filly gap={2.4}>
          <ChatIcn />
          <NotificationIcn />
        </Hexile>
        <Hexile y='center' filly gap={1}>
          <ProfileImg src={`${import.meta.env.VITE_API_URI}${userData?.profile || '/defaultProfile.jpg'}`} />
          <Name>{userData?.name || '로그인'}</Name>
        </Hexile>
      </Hexile>
    </Hexile>
  );
};