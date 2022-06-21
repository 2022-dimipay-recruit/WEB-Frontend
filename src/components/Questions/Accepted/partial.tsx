import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Answer, ContentBox, Name, ProfileImg, QBox, QuestionTitle, Textarea } from '../style';
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
  fetchData,
}) => {
  const history = useNavigate();
  const username = useRecoilValue(UserParamState);
  const userData = useRecoilValue(FetchUserData(username));
  const refetchUserData = useRecoilRefresher_UNSTABLE(FetchUserData(username));
  const myInfo = useRecoilValue(MyInfoState);

  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [content, setContent] = useState<string>(question.answer);

  const updateQ = async () => {
    if(isUpdate) {
      await api<'questionAnswer'>('POST', '/post/answer', {
        questionId: question.id,
        post: content,
      });
      makeAlert.success('답변을 수정하였습니다.');
      await fetchData(true);
      refetchUserData();
      setIsUpdate(false);
    } else setIsUpdate(true);
  };

  const textareaHandler = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      await updateQ();
    }
  };

  const questionLike = async () => {
    if(!myInfo) return makeAlert.error('로그인 후에 이용해주세요');
    await api<'questionLike'>('POST', '/post/like', {
      questionId: question.id, 
    });
    await fetchData(true);
    refetchUserData();
  };

  return (
    <Hexile x='space' y='center' fillx>
      <ContentBox x='left' y='space' gap={2.4}>
        <QBox x='left' gap={.6}>
          <Name onClick={() => {
            if(question.authorName) history(`/${question.authorName}`);
          }}>{question.authorName || '익명'}</Name>
          <QuestionTitle>{question.question}</QuestionTitle>
        </QBox>
        <Hexile y='center' gap={2.4} fillx>
          <ProfileImg
          src={userData?.image === config.defaultProfile
          ? defaultProfile
          : userData?.image}
          crossOrigin='anonymous' />
          <Vexile gap={.6} fillx>
            {isUpdate ? (
              <Textarea
              rows={2}
              value={content}
              onChange={({target: {value}}) => setContent(value)}
              onKeyDown={textareaHandler}
              placeholder='건전한 인터넷 문화를 위해 에티켓을 지켜주세요!'></Textarea>
            ) : (
              <>
                <Name onClick={() => history(`/${userData?.userName}`)}>{userData?.name}</Name>
                <Answer>{question.answer}</Answer>
              </>
            )}
          </Vexile>
        </Hexile>
      </ContentBox>
      {mypage ? (
        <Controller
          question={question}
          fetchData={fetchData}
          refetchUserData={refetchUserData}
          isUpdate={isUpdate}
          setUpdate={setIsUpdate}
          updateQ={updateQ}
          questionLike={questionLike} />
      ) : (
        <GuestBtns
          question={question}
          questionLike={questionLike} />)
      }
    </Hexile>
  );
};

const Controller: React.FC<{
  question: Question;
  fetchData: Function;
  refetchUserData: Function;
  isUpdate: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  updateQ: React.MouseEventHandler<HTMLButtonElement>;
  questionLike: React.MouseEventHandler<HTMLDivElement>;
}> = ({
  question,
  fetchData,
  refetchUserData,
  isUpdate,
  setUpdate,
  updateQ,
  questionLike,
}) => {
  const deleteQ = useCallback(async () => {
    if(isUpdate) setUpdate(false);
    else {
      await api<'questionReject'>('DELETE', '/post/question', {
        questionId: question.id
      });
      makeAlert.success('질문을 삭제했어요');
      await fetchData(true);
      refetchUserData();
    }
  }, [question, isUpdate]);

  return (
    <Vexile x='center' gap={1}>
      <Button color='black' onClick={updateQ} responsive>수정</Button>
      <Button color='black' onClick={deleteQ} responsive>{isUpdate ? '취소' : '삭제'}</Button>
      <Heart heart={question.likeCount} active={question.liked} onClick={questionLike} />
    </Vexile>
  );
};

const GuestBtns: React.FC<{
  question: Question;
  questionLike: React.MouseEventHandler<HTMLDivElement>;
}> = ({ question, questionLike }) => {
  return (
    <Vexile x='center' y='center'>
      <Heart heart={question.likeCount} active={question.liked} onClick={questionLike} />
    </Vexile>
  );
};