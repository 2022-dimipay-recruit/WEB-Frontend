import React, { useCallback, useEffect, useState } from 'react';
import { Vexile } from '@haechi/flexile';
import { api } from '@/api';
import { useRecoilValue } from 'recoil';
import { MyInfoState } from '@/state';
import { Question } from '@/constants/types';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { QCard } from './partial';

export const ReceivedQ: React.FC = () => {
  const myInfo = useRecoilValue(MyInfoState);
  const [questions, setQuestions] = useState<Array<Question>>([]);
  const [nowPage, setNowPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);

  const getData = useCallback(async () => {
    return await api<'questionList'>('GET', `/user/list?name=${myInfo?.userName}&type=received&page=${nowPage}&itemsPerPage=4`);
  }, [myInfo, nowPage]);

  const fetchData = useCallback(async (refetch?: boolean) => {
    if(refetch) setNowPage(1);
    const res = await getData();
    setMaxPage(res.maxPage);
    if(refetch) setQuestions(res.question);
    else setQuestions(prevData => {
      return [
        ...prevData,
        ...res.question
      ];
    });
  }, [nowPage, maxPage]);

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, [nowPage]);

  useBottomScrollListener(async () => {
    if(nowPage === maxPage) return;
    setNowPage(nowPage+1);
  });

  return (
    <Vexile gap={3.6} fillx>
      {questions.map((info, idx) => (
        <QCard question={info} fetchData={fetchData} key={idx+100} />
      ))}
    </Vexile>
  );
};