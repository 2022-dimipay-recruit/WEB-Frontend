import React, { useEffect, useState } from 'react';
import { myQuestion } from '@/constants/types';
import { UserParamState } from '@/state';
import { Vexile } from '@haechi/flexile';
import { useRecoilValue } from 'recoil';
import { api } from '@/api';
import { QCard } from './partial';

export const MyQuestions: React.FC = () => {
  const username = useRecoilValue(UserParamState);
  const [questions, setQuestions] = useState<Array<myQuestion>>([]);

  const fetchData = async () => {
    setQuestions(await api<'myQuestionList'>('GET', '/user/me/questions'));
  };

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, [username]);

  return (
    <Vexile gap={3.6} fillx>
      {questions.map((info, idx) => (
        <QCard question={info} fetchData={fetchData} key={idx+300} />
      ))}
    </Vexile>
  );
};