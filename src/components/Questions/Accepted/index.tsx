import React, { useCallback, useEffect, useState } from 'react';
import { Vexile } from '@haechi/flexile';
import { api } from '@/api';
import { useRecoilValue } from 'recoil';
import { UserParamState } from '@/state';
import { Question } from '@/constants/types';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { QCard } from './partial';
import { LoadingIcn, LoadingSpan, NonSpan } from '../style';

export const AcceptedQ: React.FC<{
  mypage: boolean;
}> = ({ mypage }) => {
  const username = useRecoilValue(UserParamState);

  const [nowPage, setNowPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [questions, setQuestions] = useState<Array<Question>>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [processLoading, setProcessLoading] = useState<boolean>(true);

  const fetchData = useCallback(async (refetch?: boolean, next?: boolean) => {
    setProcessLoading(true);
    if(refetch) setNowPage(1);
    const res = await api<'questionList'>(
      'GET',
      `/user/list?name=${username}&type=accepted&page=${next ? nowPage+1 : nowPage}&itemsPerPage=5`
    );
    if(next) setNowPage(nowPage+1);
    setMaxPage(res.maxPage);

    setProcessLoading(false);
    setIsLoading(false);

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
      await fetchData(true);
    })();
  }, [username]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

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
        <NonSpan x='center' y='center' fillx>답변한 질문이 없어요!</NonSpan>
      )}
      {questions.map((info, idx) => (
        <QCard mypage={mypage} question={info} fetchData={fetchData} key={idx+200} />
      ))}
    </Vexile>
  );
};