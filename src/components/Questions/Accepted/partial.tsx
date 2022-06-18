import React, { useCallback, useEffect } from 'react';
import { Answer, ContentBox, Name, ProfileImg, QuestionTitle } from '../style';
import { config, defaultProfile, Question } from '@/constants/types';
import { Hexile, Vexile } from '@haechi/flexile';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import { FetchUserData, MyInfoState, UserParamState } from '@/state';
import { Button } from '@/components/Button';
import { Heart } from '@/components/Heart';
import { api } from '@/api';
import { makeAlert } from '@/funtions';

export const QCard: React.FC<{
  mypage: boolean;
  question: Question;
  fetchData: Function;
}> = ({
  mypage,
  question,
  fetchData
}) => {
  const username = useRecoilValue(UserParamState);
  const userData = useRecoilValue(FetchUserData(username));
  const refetchUserData = useRecoilRefresher_UNSTABLE(FetchUserData(username));

  return (
    <Hexile x='space' y='center' fillx>
      <ContentBox x='left' y='space'>
        <Vexile x='left' gap={.6}>
          <Name>{question.authorName || '익명'}</Name>
          <QuestionTitle>{question.question}</QuestionTitle>
        </Vexile>
        <Hexile y='center' gap={2.4} fillx>
          <ProfileImg
          src={userData?.image === config.defaultProfile
          ? defaultProfile
          : userData?.image}
          crossOrigin='anonymous' />
          <Vexile gap={.6}>
            <Name>{userData?.name}</Name>
            <Answer>{question.answer}</Answer>
          </Vexile>
        </Hexile>
      </ContentBox>
      {mypage ? (
        <Controller
          question={question}
          fetchData={fetch}
          refetchUserData={refetchUserData} />
      ) : (
        <GuestBtns
          question={question}
          fetchData={fetchData}
          refetchUserData={refetchUserData} />)
      }
    </Hexile>
  );
};

const Controller: React.FC<{
  question: Question;
  fetchData: Function;
  refetchUserData: Function;
}> = ({
  question,
  fetchData,
  refetchUserData,
}) => {
  const deleteQ = useCallback(async () => {
    await api<'questionReject'>('DELETE', '/post/question', {
      questionId: question.id
    });
    makeAlert.success('질문을 삭제했어요');
    await fetchData(true);
    refetchUserData();
  }, [question]);

  return (
    <Vexile gap={1}>
      <Button color='black'>수정</Button>
      <Button color='black' onClick={deleteQ}>삭제</Button>
    </Vexile>
  );
};

const GuestBtns: React.FC<{
  question: Question;
  fetchData: Function;
  refetchUserData: Function;
}> = ({ question, fetchData, refetchUserData }) => {
  const myInfo = useRecoilValue(MyInfoState);

  const questionLike = async () => {
    if(!myInfo) return makeAlert.error('로그인 후에 이용해주세요');
    await api<'questionLike'>('POST', '/post/like', {
      questionId: question.id, 
    });
    await fetchData(true);
    refetchUserData();
  };

  return (
    <Vexile x='center' gap={.8}>
      <Button color='black'>신고하기</Button>
      <Heart heart={question.likeCount} active={question.liked} onClick={questionLike} />
    </Vexile>
  );
};