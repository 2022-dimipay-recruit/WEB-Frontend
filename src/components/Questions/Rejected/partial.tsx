import React, { useCallback, useState } from 'react';
import { Question, QuestionStatus } from '@/constants/types';
import { Hexile, Vexile } from '@haechi/flexile';
import { Button } from '@/components';
import { Form, ContentBox, Name, QuestionTitle, Textarea } from '../style';
import { api } from '@/api';
import { makeAlert } from '@/funtions';
import { useRecoilValue, useRecoilRefresher_UNSTABLE } from 'recoil';
import { FetchUserData, UserParamState } from '@/state';

export const QCard: React.FC<{
  question: Question;
  fetchData: Function;
}> = ({ question, fetchData }) => {
  const [content, setContent] = useState<string>('');
  const username = useRecoilValue(UserParamState);
  const refetchUserData = useRecoilRefresher_UNSTABLE(FetchUserData(username));

  const answer = useCallback(async (status: QuestionStatus) => {
    if(status === 'accepted' && !(content.length >= 2 && content.length <= 300))
      return makeAlert.error('내용은 2자 이상 300자 이하로 작성해야해요');
    
    await api<'questionAnswer'>('POST', '/post/answer', {
      questionId: question.id,
      post: content,
    });
    makeAlert.success('질문에 답장했어요');
    setContent('');
    await fetchData(true);
    refetchUserData();
  }, [content, question]);
  
  const textareaHandler = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      await answer('accepted');
    }
  };

  const deleteQ = useCallback(async () => {
    await api<'questionReject'>('DELETE', '/post/question', {
      questionId: question.id
    });
    makeAlert.success('질문을 삭제했어요');
    await fetchData(true);
    refetchUserData();
  }, [question]);

  return (
    <Form>
      <Hexile x='space' y='center' fillx>
        <ContentBox x='left' y='space' gap={2.4}>
          <Vexile x='left' gap={.6}>
            <Name>{question.authorName || '익명'}</Name>
            <QuestionTitle>{question.question}</QuestionTitle>
          </Vexile>
          <Textarea
          rows={2}
          value={content}
          onChange={({target: {value}}) => setContent(value)}
          onKeyDown={textareaHandler}
          placeholder='건전한 인터넷 문화를 위해 에티켓을 지켜주세요!'></Textarea>
        </ContentBox>
        <Vexile x='center' gap={1}>
          <Button color='black' onClick={deleteQ}>삭제하기</Button>
          <Button color='black' type='submit'>답장하기</Button>
        </Vexile>
      </Hexile>
    </Form>
  );
};