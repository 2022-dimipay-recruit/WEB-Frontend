import React, { useCallback, useEffect, useState } from 'react';
import { Vexile } from '@haechi/flexile';
import { api } from '@/api';
import { useRecoilValue } from 'recoil';
import { MyInfoState } from '@/state';
import { Question } from '@/constants/types';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { QCard } from './partial';
import { LoadingIcn, LoadingSpan, NonSpan } from '../style';

export const RejectedQ: React.FC = () => {
  const myInfo = useRecoilValue(MyInfoState);
  const [questions, setQuestions] = useState<Array<Question>>([]);
  const [nowPage, setNowPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [processLoading, setProcessLoading] = useState<boolean>(true);

  const fetchData = useCallback(async (refetch?: boolean, next?: boolean) => {
    if(refetch) setNowPage(1);
    const res = await api<'questionList'>(
      'GET',
      `/user/list?name=${myInfo?.userName}&type=rejected&page=${next ? nowPage+1 : nowPage}&itemsPerPage=4`
    );
    if(next) setNowPage(nowPage+1);
    setMaxPage(res.maxPage);

    setIsLoading(false);
    setProcessLoading(false);

    if(refetch) setQuestions(res.question);
    else setQuestions(prevData => {
      return [
        ...prevData,
        ...res.question
      ];
    });
  }, [nowPage, maxPage, myInfo]);

  useEffect(() => setIsLoading(true), []);

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, [nowPage]);

  useBottomScrollListener(async () => {
    if(processLoading) return;
    if(nowPage === maxPage) return;
    await fetchData(false, true);
  });

  return (
    <Vexile gap={3.6} fillx>
      {isLoading && (
        <LoadingSpan x='center' y='center' gap={1} fillx><span>불러 오는 중</span><LoadingIcn /></LoadingSpan>
      )}
      {(!isLoading && questions.length === 0) && (
        <NonSpan x='center' y='center' fillx>거절한 질문이 없어요!</NonSpan>
      )}
      {questions.map((info, idx) => (
        <QCard question={info} fetchData={fetchData} key={idx+100} />
      ))}
    </Vexile>
  );
};