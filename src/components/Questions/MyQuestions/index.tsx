import React, { useEffect, useState } from 'react';
import { myQuestion } from '@/constants/types';
import { UserParamState } from '@/state';
import { Vexile } from '@haechi/flexile';
import { useRecoilValue } from 'recoil';
import { api } from '@/api';
import { QCard } from './partial';
import { LoadingIcn, LoadingSpan, NonSpan } from '../style';

export const MyQuestions: React.FC = () => {
  const username = useRecoilValue(UserParamState);
  const [questions, setQuestions] = useState<Array<myQuestion>>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setQuestions(await api<'myQuestionList'>('GET', '/user/me/questions'));
    setIsLoading(false);
  };
  
  useEffect(() => setIsLoading(true), []);

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, [username]);

  return (
    <Vexile gap={3.6} fillx>
      {isLoading && (
        <LoadingSpan x='center' y='center' gap={1} fillx><span>불러 오는 중</span><LoadingIcn /></LoadingSpan>
      )}
      {(!isLoading && questions.length === 0) && (
        <NonSpan x='center' y='center' fillx>답변 받은 질문이 없어요!</NonSpan>
      )}
      {questions.map((info, idx) => (
        <QCard question={info} fetchData={fetchData} key={idx+300} />
      ))}
    </Vexile>
  );
};