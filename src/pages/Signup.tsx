import React, { useCallback, useState } from 'react';
import { styled } from '#/stitches.config';
import { Hexile, Vexile } from '@haechi/flexile';
import { Input, Button, Checkbox } from '@/components';
import { makeAlert } from '@/funtions';

const Signup: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [verify, setVerify] = useState<string>('');

  const SignupSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    if(!name || !userName || !email || !password || !verify) return makeAlert.error('필드를 확인해주세요');
    if(!(password === verify)) return makeAlert.error('비밀번호를 확인해주세요');
    if(!(e.target as any).policyAllow.checked) return makeAlert.error('개인정보 처리방침에 동의해주세요');
  }, [
    name,
    userName,
    email,
    password,
    verify,
  ]);

  return (
    <Wrapper x='center' gap={5.4}>
      <Title>회원가입</Title>
      <Form onSubmit={SignupSubmit}>
        <Vexile gap={3.6} fillx>
          <Box y='top' gap={6.4}>
            <Container gap={2.4}>
              <Input
              placeholder='성명 *'
              value={name}
              setValue={setName}
              type='text'/>
              <Input
              placeholder='아이디 *'
              value={userName}
              setValue={setUserName}
              type='text'/>
              <Input
              placeholder='이메일 *'
              value={email}
              setValue={setEmail}
              type='email'/>
              <Input
              placeholder='비밀번호 *'
              value={password}
              setValue={setPassword}
              type='password'/>
              <Input
              placeholder='비밀번호 재입력 *'
              value={verify}
              setValue={setVerify}
              type='password'/>
            </Container>
            <ProfileContainer x='center' gap={1}>
              <ProfileTitle>프로필 사진</ProfileTitle>
              <ProfileImg />
              <Button color='black'>업로드</Button>
            </ProfileContainer>
          </Box>
          <PolicyBox y='center' x='space'>
            <Checkbox
            id='policyAllow'
            label={<Policy><Link href='/privacyPolicy.html' target='_blank'>개인정보 처리방침</Link>에 동의합니다.</Policy>}
            value='policyAllow' />
            <Button color='black' type='submit'>가입</Button>
          </PolicyBox>
        </Vexile>
      </Form>
    </Wrapper>
  );
};

export default Signup;

const Wrapper = styled(Vexile, {
  '@desktop': {
    width: '50%',
  },
  '@pad': {
    width: '75%',
  },
  '@mobile': {
    width: '90%',
    height: '100%',
    padding: '10rem 0',
  }
});
const Title = styled('span', {
  color: '$blackGreen',
  fontSize: '3.6rem',
  fontWeight: 700,
});

const Form = styled('form', {
  width: '100%',
});
const Box = styled(Hexile, {
  '@mobile': {
    flexDirection: 'column',
  },
});
const Container = styled(Vexile, {
  width: '70%',
  '@mobile': {
    width: '100%',
  }
});

const ProfileContainer = styled(Vexile, {
  '@mobile': {
    width: '100%',
    alignItems: 'center',
  }
});
const ProfileTitle = styled('span', {
  color: '$blackGreen',
  fontWeight: 500,
});
const ProfileImg = styled('div', {
  width: '8.2rem',
  height: '8.2rem',
  borderRadius: '50%',
  background: '$brightGreen',
});

const PolicyBox = styled(Hexile, {
  width: '70%',
  '@mobile': {
    marginBottom: '10rem',
    width: '100%',
    flexDirection: 'column',
    gap: '2rem',
  }
});
const Link = styled('a', {
  borderBottom: '1px solid $blackGreen',
});
const Policy = styled('span', {
  color: '$blackGreen',
});