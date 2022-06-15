import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { styled } from '#/stitches.config';
import { useRecoilState } from 'recoil';
import { MyInfoState } from '@/state';
import { Hexile, Vexile } from '@haechi/flexile';
import { QuestionType, UserInfoType } from '@/constants/types';
import { api } from '@/api';
import { makeAlert } from '@/funtions';
import { Button, Radio, Selection } from '@/components';

import { ReactComponent as InstaIcn } from '@/assets/icons/instagram.svg';
import { ReactComponent as FacebookIcn } from '@/assets/icons/facebook.svg';

const User: React.FC = () => {
  const history = useNavigate();
  const { username } = useParams();
  const [myInfo, setMyInfo] = useRecoilState(MyInfoState);
  const [isMyPage, setIsMyPage] = useState<boolean>(username == myInfo?.userName);
  const [userInfo, setUserInfo] = useState<UserInfoType>();

  const [questionContent, setQuestionContent] = useState<string>('');

  const fetchUserData = async () => {
    try {
      const res = await api<'userInfo'>('GET', `/user/${username}`);
      setUserInfo(res);
    } catch {
      if(!myInfo) history(`/`);
      else history(`/${myInfo?.userName}`);
    }
  };

  useEffect(() => {
    setIsMyPage(username == myInfo?.userName);
    (async () => {
      await fetchUserData()
    })();
  }, [username, myInfo]);

  const questionRegistration = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if(
      !(questionContent.length >= 2 && questionContent.length <= 300)
    ) return makeAlert.error('질문은 2자 이상 300자 이내로 작성해주세요');

    await api<'questionRegi'>('POST', '/post/question', {
      receiver: userInfo?.userName as string,
      post: questionContent,
      type: (e.target as any).type.value,
    });

    await fetchUserData();
    setQuestionContent('');
    makeAlert.success('질문을 등록했어요');
  }, [questionContent]);

  return (
    <Wrapper x='center' gap={4.8} fillx>
      <ProfileContainer x='center' gap={3.6}>
        <Hexile x='center' y='center' gap={7.5} fillx>
          <Hexile y='center' gap={3.1} linebreak>
            <ProfileImg
            src={userInfo
              ?`${import.meta.env.VITE_API_URI}/assets${userInfo?.image}`
              : `${import.meta.env.VITE_API_URI}/assets/defaultProfile.jpg`}
            crossOrigin='anonymous' />
            <Vexile y='center' gap={2.7} filly>
              <Vexile gap={1}>
                <Name>{userInfo?.name} 님</Name>
                <Hexile gap={2} linebreak>
                  <Hexile gap={1}>
                    <InfoTitle>팔로워</InfoTitle>
                    <InfoNum>9</InfoNum>
                  </Hexile>
                  <Hexile gap={1}>
                    <InfoTitle>답변 질문</InfoTitle>
                    <InfoNum>{userInfo?.questions.accepted}</InfoNum>
                  </Hexile>
                  <Hexile gap={1}>
                    <InfoTitle>거절 질문</InfoTitle>
                    <InfoNum>{userInfo?.questions.rejected}</InfoNum>
                  </Hexile>
                  <Hexile gap={1}>
                    <InfoTitle>새 질문</InfoTitle>
                    <InfoNum>{userInfo?.questions.received}</InfoNum>
                  </Hexile>
                </Hexile>
              </Vexile>
              <SnsBox gap={2} nosns={!userInfo?.facebook && !userInfo?.instagram}>
                {userInfo?.instagram && (
                  <Instagram onClick={() => window.open(userInfo.instagram as string, '_blank')} />
                )}
                {userInfo?.facebook && (
                  <Facebook onClick={() => window.open(userInfo.facebook as string, '_blank')} />
                )}
              </SnsBox>
            </Vexile>
          </Hexile>
          {isMyPage ? (
            <Button color='black'>수정</Button>
          ) : (
            <Button color='black'>팔로우</Button>
          )}
        </Hexile>
        <WriteBox mypage={isMyPage} gap={1.3}>
          <WriteTitle>질문 작성</WriteTitle>
          <WriteForm onSubmit={questionRegistration}>
            <Hexile gap={4.4} fillx linebreak>
              <WriteTextArea
              maxLength={300}
              minLength={2}
              rows={5}
              placeholder='건전한 인터넷 문화를 위해 에티켓을 지켜주세요!'
              value={questionContent}
              onChange={({target: {value}}) => setQuestionContent(value)}></WriteTextArea>
              <Vexile gap={2.4} filly>
                <Vexile x='center' gap={1.8} fillx>
                  <Radio
                  id='anonymous'
                  name='type'
                  label='익명'
                  value='anonymous'
                  check />
                  <Radio
                  id='onymous'
                  name='type'
                  label='공개'
                  value='onymous' />
                </Vexile>
                <Button color='black' type='submit'>작성</Button>
              </Vexile>
            </Hexile>
          </WriteForm>
        </WriteBox>
      </ProfileContainer>
      <Vexile gap={3.6} fillx>
        <Hexile fillx>
          <Selection active>답변한 질문</Selection>
          <Selection>보낸 질문</Selection>
          <Selection>거절 질문</Selection>
          <Selection>새 질문</Selection>
        </Hexile>
        <QuestionContainer gap={3.6} fillx>

        </QuestionContainer>
      </Vexile>
    </Wrapper>
  );
};

export default User;

const Wrapper = styled(Vexile, {
  height: '100%',
  paddingTop: '14rem',
  '@mobile': {
    paddingTop: '7rem',
  },
});
const ProfileContainer = styled(Vexile, {
  '@desktop': {
    width: '70%',
  },
  '@pad': {
    width: '80%',
  },
  '@mobile': {
    width: '90%',
  }
});

const ProfileImg = styled('img', {
  width: '10rem',
  height: '10rem',
  borderRadius: '50%',
});
const Name = styled('span', {
  color: '$blackGreen',
  fontWeight: 700,
  fontSize: '2.4rem',
});
const InfoTitle = styled('span', {
  color: '$darkGreen',
  fontWeight: 500,
  fontSize: '1.4rem',
});
const InfoNum = styled('span', {
  color: '$blackGreen',
  fontWeight: 700,
  fontSize: '1.4rem',
});

const SnsBox = styled(Hexile, {
  variants: {
    nosns: {
      true: {
        display: 'none',
      },
    },
  }
});
const Instagram = styled(InstaIcn, {
  width: '2.4rem',
  height: '2.4rem',
  cursor: 'pointer',
});
const Facebook = styled(FacebookIcn, {
  width: '2.4rem',
  height: '2.4rem',
  cursor: 'pointer',
});

const WriteBox = styled(Vexile, {
  variants: {
    mypage: {
      true: {
        display: 'none',
      },
    },
  }
});
const WriteTitle = styled('span', {
  fontSize: '2rem',
  fontWeight: 700,
  color: '$blackGreen',
});
const WriteForm = styled('form', {
  width: '100%',
});
const WriteTextArea = styled('textarea', {
  padding: '1.8rem',
  outline: 'none',
  border: 'none',
  borderRadius: '1.6rem',
  width: '50rem',
  background: '$brightGreen',
  resize: 'none',
  '&::placeholder': {
    fontSize: '1.4rem',
    fontWeight: 500,
    color: '$darkGreen'
  }
});

const QuestionContainer = styled(Vexile, {
  padding: '2.4rem',
});