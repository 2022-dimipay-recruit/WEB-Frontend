import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sha256 from 'sha256';
import { styled } from '#/stitches.config';
import { Vexile } from '@haechi/flexile';
import { Input, Button } from '@/components';
import { makeAlert } from '@/funtions';
import { api, clearToken, setTokens } from '@/api';
import { useSetRecoilState } from 'recoil';
import { MyInfoState } from '@/state';

const Signup: React.FC = () => {
  const history = useNavigate();
  const setInfo = useSetRecoilState(MyInfoState);

  const [name, setName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [verify, setVerify] = useState<string>('');

  useEffect(() => {
    clearToken();
    setInfo(null);
  }, []);

  const SignupSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if(!name || !userName || !email || !password || !verify) return makeAlert.error('필드를 확인해주세요');
    if(userName.length > 10) return makeAlert.error('아이디는 10자 이내로 해주세요');
    if(!(password === verify)) return makeAlert.error('비밀번호를 확인해주세요');

    const res = await api<'signup'>('POST', '/auth/signup', {
      name,
      userName,
      email,
      password: sha256(password),
    });

    setTokens(res);
    history('/imgUpload');
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
        <Vexile x='center' gap={3.6} fillx>
          <Container gap={2.4}>
            <Input
            placeholder='성명 *'
            value={name}
            setValue={setName}
            type='text' />
            <Input
            placeholder='아이디 *'
            value={userName}
            setValue={setUserName}
            type='text' />
            <Input
            placeholder='이메일 *'
            value={email}
            setValue={setEmail}
            type='email' />
            <Input
            placeholder='비밀번호 *'
            value={password}
            setValue={setPassword}
            type='password' />
            <Input
            placeholder='비밀번호 재입력 *'
            value={verify}
            setValue={setVerify}
            type='password' />
          </Container>
          <Button color='black' type='submit'>다음</Button>
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
const Container = styled(Vexile, {
  width: '70%',
  '@mobile': {
    width: '100%',
  }
});
