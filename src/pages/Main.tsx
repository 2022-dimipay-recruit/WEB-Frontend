import React from 'react';
import { Vexile, Hexile } from '@haechi/flexile';
import { styled } from '#/stitches.config';
import { Button } from '@/components';
import { useRecoilValue } from 'recoil';
import { MyInfoState } from '@/state';
import { useNavigate } from 'react-router-dom';
import Intro1 from '@/assets/icons/intro1.svg';
import Intro2 from '@/assets/icons/intro2.svg';

const Main: React.FC = () => {
  const MyData = useRecoilValue(MyInfoState);
  const history = useNavigate();

  return (
    <Wrapper x='space' y='center' fillx>
      <ContentBox y='space' x='left' gap={3}>
        <Vexile gap={2.4} fillx>
          <Title>더욱 빠르고 쉬운 익명질문, Pasked.</Title>
          <Content>Packed은 직관적인 모습과 빠른 속도로 더 즐겁게 익명질문을 할 수 있습니다. 또한, 욕설와 비속어로부터 사용자를 보호하여 더 깨끗한 익명질문 문화를 선도하고 있습니다!</Content>
        </Vexile>
        <Button color='black' onClick={() => history(MyData ? '/myPage' : '/signup')}>시작하기</Button>
      </ContentBox>
      <IntroBox gap={3.3}>
        <IntroIcn src={Intro1} />
        <IntroIcn src={Intro2} />
      </IntroBox>
    </Wrapper>
  );
};

export default Main;

const Wrapper = styled(Hexile, {
  height: '100%',
  '@mobile': {
    flexDirection: 'column',
    padding: '10.4rem 0 10rem 0',
    height: 'auto',
    gap: '6rem',
  }
});
const ContentBox = styled(Vexile, {
  width: '50%',
  height: '50%',
  '@mobile': {
    width: '90%',
  }
});
const Title = styled('span', {
  color: '$blackGreen',
  fontSize: '4.8rem',
  fontWeight: 700,
  lineHeight: '6rem',
  wordBreak: 'keep-all',
});
const Content = styled('span', {
  color: '$blackGreen',
  fontSize: '2rem',
  lineHeight: '3.2rem',
  wordBreak: 'keep-all',
});

const IntroBox = styled(Vexile, {
  width: '35%',
  '@mobile': {
    width: '80%',
  }
});
const IntroIcn = styled('img', {
  width: '100%',
});