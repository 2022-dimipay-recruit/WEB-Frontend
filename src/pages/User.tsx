import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '#/stitches.config';
import { useRecoilState, useRecoilValue, useRecoilRefresher_UNSTABLE } from 'recoil';
import { FetchUserData, MyInfoState, UserParamState } from '@/state';
import { Hexile, Vexile } from '@haechi/flexile';
import { PageType, QuestionType } from '@/constants/types';
import { api, clearToken } from '@/api';
import { makeAlert } from '@/funtions';
import { Button, Radio, ReceivedQ, Selection } from '@/components';
import { config, defaultProfile } from '@/constants/types';

const User: React.FC = () => {
  const history = useNavigate();
  const [myInfo, setMyInfo] = useRecoilState(MyInfoState);
  const username = useRecoilValue(UserParamState);
  const userData = useRecoilValue(FetchUserData(username));
  const refetchUserData = useRecoilRefresher_UNSTABLE(FetchUserData(username));
  const [isMyPage, setIsMyPage] = useState<boolean>(username == myInfo?.userName);

  const [page, setPage] = useState<PageType>('acceptdQ');

  const [questionContent, setQuestionContent] = useState<string>('');
  const [questionType, setQuestionType] = useState<QuestionType>('anonymous');

  useEffect(() => {
    setPage('acceptdQ');
  }, []);
  useEffect(() => {
    if(!userData) return history(`/${myInfo?.userName}`);
    setIsMyPage(username == myInfo?.userName);
  }, [myInfo, userData]);

  const questionRegistration = useCallback(async () => {
    if(
      !(questionContent.length >= 2 && questionContent.length <= 300)
    ) return makeAlert.error('질문은 2자 이상 300자 이내로 작성해주세요');

    await api<'questionRegi'>('POST', '/post/question', {
      receiver: userData?.userName as string,
      post: questionContent,
      type: questionType,
    });

    refetchUserData();
    setQuestionContent('');
    makeAlert.success('질문을 등록했어요');
  }, [questionContent, questionType]);

  const QRegiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await questionRegistration();
  };

  const logout = () => {
    clearToken();
    setMyInfo(undefined);
    history('/');
  };

  const textareaHandler = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      await questionRegistration();
    }
  };
  
  const changePage = useCallback((pageType: PageType) => {
    if(pageType !== 'acceptdQ') {
      if(!myInfo) return makeAlert.error('로그인해주세요\n* 자기질문만 확인할 수 있어요');
      else if(!isMyPage) return makeAlert.error('자기질문만 확인할 수 있어요');
    }
    setPage(pageType);
  }, [myInfo, isMyPage]);

  return (
    <Wrapper x='center' gap={4.8} fillx>
      <ProfileContainer x='center' gap={3.6}>
        <Hexile x='center' y='center' gap={7.5} fillx>
          <Hexile y='center' gap={3.1} linebreak>
            <Profile>
              <ProfileImg
              src={userData
                ? userData.image === config.defaultProfile ? defaultProfile : userData.image
                : defaultProfile}
              crossOrigin='anonymous' />
              {isMyPage && (
                <ProfileUpdate x='center' y='center' fillx>수정</ProfileUpdate>
              )}
            </Profile>
            <Vexile filly>
              <Name>{userData?.name} 님</Name>
              <Hexile gap={2} linebreak>
                <Hexile gap={1}>
                  <InfoTitle>팔로워</InfoTitle>
                  <InfoNum>9</InfoNum>
                </Hexile>
                <Hexile gap={1}>
                  <InfoTitle>답변 질문</InfoTitle>
                  <InfoNum>{userData?.questions.accepted}</InfoNum>
                </Hexile>
                <Hexile gap={1}>
                  <InfoTitle>거절 질문</InfoTitle>
                  <InfoNum>{userData?.questions.rejected}</InfoNum>
                </Hexile>
                <Hexile gap={1}>
                  <InfoTitle>새 질문</InfoTitle>
                  <InfoNum>{userData?.questions.received}</InfoNum>
                </Hexile>
              </Hexile>
            </Vexile>
          </Hexile>
          {isMyPage ? (
            <Button color='black' onClick={logout}>로그아웃</Button>
          ) : (
            <Button color='black'>팔로우</Button>
          )}
        </Hexile>
        <WriteBox mypage={isMyPage} gap={1.3}>
          <WriteTitle>질문 작성</WriteTitle>
          <WriteForm onSubmit={QRegiSubmit}>
            <Hexile gap={4.4} fillx linebreak>
              <WriteTextArea
              maxLength={300}
              minLength={2}
              rows={5}
              placeholder='건전한 인터넷 문화를 위해 에티켓을 지켜주세요!'
              value={questionContent}
              onKeyDown={textareaHandler}
              onChange={({target: {value}}) => setQuestionContent(value)}></WriteTextArea>
              <Vexile gap={2.4} filly>
                <Vexile x='center' gap={1.8} fillx>
                  <Radio
                  id='anonymous'
                  name='type'
                  label='익명'
                  value='anonymous'
                  onChange={({target: {value}}) => setQuestionType(value as QuestionType)}
                  check />
                  <Radio
                  id='onymous'
                  name='type'
                  label='공개'
                  onChange={({target: {value}}) => setQuestionType(value as QuestionType)}
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
          <Selection active={page === 'acceptdQ'} onClick={() => changePage('acceptdQ')}>답변한 질문</Selection>
          <Selection active={page === 'sendQ'} onClick={() => changePage('sendQ')}>보낸 질문</Selection>
          <Selection active={page === 'rejectedQ'} onClick={() => changePage('rejectedQ')}>거절 질문</Selection>
          <Selection active={page === 'receivedQ'} onClick={() => changePage('receivedQ')}>새 질문</Selection>
        </Hexile>
        <QuestionContainer>
          {page === 'receivedQ' && (
            <ReceivedQ />
          )}
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

const Profile = styled('div', {
  width: '10rem',
  height: '10rem',
  borderRadius: '50%',
  overflow: 'hidden',
  position: 'relative',
});
const ProfileImg = styled('img', {
  width: '100%',
  height: '100%',
});
const ProfileUpdate = styled(Hexile, {
  height: '3.2rem',
  position: 'absolute',
  bottom: 0,
  background: '$blackGreen',
  fontSize: '1.4rem',
  color: '$brightGreen',
  fontWeight: '1.4rem',
  cursor: 'pointer',
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
  color: '$blackGreen',
  '&::placeholder': {
    fontSize: '1.4rem',
    fontWeight: 500,
    color: '$darkGreen',
  }
});

const QuestionContainer = styled('div', {
  padding: '0 2.4rem',
  width: '100%',
});