import React, { useCallback, useEffect, useState } from 'react';
import { Vexile } from '@haechi/flexile';
import { api } from '@/api';
import { useRecoilValue } from 'recoil';
import { UserParamState } from '@/state';
import { Question } from '@/constants/types';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { QCard } from './partial';

export const AcceptedQ: React.FC<{
  mypage: boolean;
}> = ({ mypage }) => {
  const username = useRecoilValue(UserParamState);

  const [nowPage, setNowPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [questions, setQuestions] = useState<Array<Question>>([]);

  const fetchData = useCallback(async (refetch?: boolean) => {
    if(refetch) setNowPage(1);
    const res = await api<'questionList'>('GET', `/user/list?name=${username}&type=accepted&page=${nowPage}&itemsPerPage=5`);
    setMaxPage(res.maxPage);
    if(refetch) setQuestions(res.question);
    else setQuestions(prevData => {
      return [
        ...prevData,
        ...res.question
      ];
    });
  }, [nowPage, maxPage, username]);

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, [nowPage]);
  useEffect(() => {
    (async () => {
      await fetchData(true);
    })();
  }, [username]);

  useBottomScrollListener(async () => {
    if(nowPage === maxPage) return;
    setNowPage(nowPage+1);
  });

  return (
    <Vexile gap={3.6} fillx>
      {questions.map((info, idx) => (
        <QCard mypage={mypage} question={info} fetchData={fetchData} key={idx+200} />
      ))}
    </Vexile>
  );
};