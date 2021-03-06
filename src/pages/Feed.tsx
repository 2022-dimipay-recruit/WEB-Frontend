import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '#/stitches.config';
import { Hexile, Vexile } from '@haechi/flexile';
import { config, defaultProfile, Feed } from '@/constants/types';
import { api } from '@/api';
import { Answer, ContentBox, Name, NonSpan, ProfileImg, QuestionTitle } from '@/components/Questions/style';
import { Heart } from '@/components';
import { useRecoilValue } from 'recoil';
import { MyInfoState } from '@/state';
import { makeAlert } from '@/funtions';

const FeedPage: React.FC = () => {
  const history = useNavigate();
  const myInfo = useRecoilValue(MyInfoState);

  const [feeds, setFeeds] = useState<Feed>({
    followingFeed: [],
    randomFeed: []
  });

  const fetchData = async () => {
    setFeeds(await api<'getFeed'>('GET', '/user/feed'));
  };

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);

  const questionLike = async (id: string) => {
    if(!myInfo) return makeAlert.error('로그인 후에 이용해주세요');
    await api<'questionLike'>('POST', '/post/like', {
      questionId: id, 
    });
    await fetchData();
  };

  return (
    <Wrapper gap={3.6} fillx>
      <Title>뉴스피드</Title>
      {((!feeds.followingFeed || feeds.followingFeed.length == 0) && feeds.randomFeed.length == 0) && (
        <NonSpan>최근 3일동안의 기록이 없어요..</NonSpan>
      )}
      {feeds.followingFeed &&(
        feeds.followingFeed.map((info, idx) => {
          return info.follower.received.map((question, idx1) => (
            <Hexile x='space' y='center' fillx key={idx+idx1+400}>
              <ContentBox x='left' y='space' gap={2.4}>
                <QBox x='left' gap={.6}>
                  <Name onClick={() => {
                    if(question.authorName) history(`/${question.authorName}`);
                  }}>{question.authorName || '익명'}</Name>
                  <QuestionTitle>{question.question}</QuestionTitle>
                </QBox>
                <Hexile y='center' gap={2.4} fillx>
                  <ProfileImg
                  src={info.follower.image === config.defaultProfile
                  ? defaultProfile
                  : info.follower.image}
                  crossOrigin='anonymous' />
                  <Vexile gap={.6} fillx>
                    <Name onClick={() => history(`/${info.follower.userName}`)}>{info.follower.name}</Name>
                    <Answer>{question.answer}</Answer>
                  </Vexile>
                </Hexile>
              </ContentBox>
              <Vexile x='center' y='center'>
                <Heart heart={question.likeCount} active={question.liked} onClick={async () => await questionLike(question.id)} />
              </Vexile>
            </Hexile>
          ))
        }
      ))}
      {feeds.randomFeed.map((info, idx) => (
        <Hexile x='space' y='center' fillx key={idx+400}>
          <ContentBox x='left' y='space' gap={2.4}>
            <QBox x='left' gap={.6}>
              <Name onClick={() => {
                if(info.authorName) history(`/${info.authorName}`);
              }}>{info.authorName || '익명'}</Name>
              <QuestionTitle>{info.question}</QuestionTitle>
            </QBox>
            <Hexile y='center' gap={2.4} fillx>
              <ProfileImg
              src={info.receiver.image === config.defaultProfile
              ? defaultProfile
              : info.receiver.image}
              crossOrigin='anonymous' />
              <Vexile gap={.6} fillx>
                <Name onClick={() => history(`/${info.receiver.userName}`)}>{info.receiver.name}</Name>
                <Answer>{info.answer}</Answer>
              </Vexile>
            </Hexile>
          </ContentBox>
          <Vexile x='center' y='center'>
            <Heart heart={info.likeCount} active={info.liked} onClick={async () => await questionLike(info.id)} />
          </Vexile>
        </Hexile>
      ))}
    </Wrapper>
  );
};

export default FeedPage;

const Wrapper = styled(Vexile, {
  paddingTop: '14rem',
  marginBottom: '3.6rem',
  '@mobile': {
    paddingTop: '7rem',
  },
});

const Title = styled('span', {
  color: '$blackGreen',
  fontWeight: 700,
  fontSize: '3.6rem',
});

const QBox = styled(Vexile, {
  width: '100%',
  overflow: 'hidden',
});