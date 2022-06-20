import { api } from '@/api';
import { useNavigate } from 'react-router-dom';
import { Heart } from '@/components/Heart';
import { config, defaultProfile, myQuestion } from '@/constants/types';
import { MyInfoState } from '@/state';
import { Hexile, Vexile } from '@haechi/flexile';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { Answer, ContentBox, Name, ProfileImg, QuestionTitle } from '../style';

export const QCard: React.FC<{
  question: myQuestion;
  fetchData: Function;
}> = ({
  question,
  fetchData
}) => {
  const history = useNavigate();
  const myInfo = useRecoilValue(MyInfoState);

  const questionLike = async () => {
    await api<'questionLike'>('POST', '/post/like', {
      questionId: question.id,
    });
    await fetchData();
  };

  return (
    <Hexile x='space' y='center' fillx>
      <ContentBox x='left' y='space'>
        <Vexile x='left' gap={.6}>
          <Name>{question.type === 'onymous' ? myInfo?.name : '익명'}</Name>
          <QuestionTitle>{question.question}</QuestionTitle>
        </Vexile>
        <Hexile y='center' gap={2.4} fillx>
          <ProfileImg
          src={question.receiver.image === config.defaultProfile
          ? defaultProfile
          : question.receiver.image}
          crossOrigin='anonymous' />
          <Vexile gap={.6}>
            <Name onClick={() => history(`/${question.receiver.userName}`)}>{question.receiver.name}</Name>
            <Answer>{question.answer}</Answer>
          </Vexile>
        </Hexile>
      </ContentBox>
      <Vexile x='center' y='center'>
        <Heart heart={question.likeCount} active={question.liked} onClick={questionLike} />
      </Vexile>
    </Hexile>
  );
};