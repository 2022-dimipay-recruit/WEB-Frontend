import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '#/stitches.config';
import { Vexile } from '@haechi/flexile';
import { clearToken, loginWithInfo } from '@/api';
import { makeAlert } from '@/funtions';
import { useSetRecoilState } from 'recoil';
import { MyInfoState } from '@/state';
import { UserInfoType } from '@/constants/types';
import { Button, Input } from '@/components';

import { ReactComponent as LogoIcn } from '@/assets/icons/logo.svg';

const Login: React.FC = () => {
  const history = useNavigate();
  const setInfo = useSetRecoilState(MyInfoState);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    clearToken();
    setInfo(undefined);
  }, []);

  const login = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if(!email || !password) return makeAlert.error('필드를 확인해주세요');

    const token = await loginWithInfo({
      email,
      password,
    });
    if (token) {
      setInfo(token as UserInfoType);
      history(`/${(token as UserInfoType).userName}`);
    }
  }, [email, password]);

  return (
    <Wrapper x='center' gap={5.2}>
      <Vexile x='center' gap={4} fillx>
        <Logo onClick={() => history('/')} />
        <Title>환영합니다!</Title>
      </Vexile>
      <Form onSubmit={login}>
        <Vexile x='center' gap={4} fillx>
          <Vexile gap={2.4} fillx>
            <Input
            placeholder='이메일'
            value={email}
            setValue={setEmail}
            type='email' />
            <Input
            placeholder='비밀번호'
            value={password}
            setValue={setPassword}
            type='password' />
          </Vexile>
          <Vexile x='center' gap={2.4}>
            <Button color='black' type='submit'>로그인</Button>
            <SignUp onClick={() => history('/signup')}>회원가입</SignUp>
          </Vexile>
        </Vexile>
      </Form>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled(Vexile, {
  '@desktop': {
    width: '30%',
  },
  '@pad': {
    width: '55%',
  },
  '@mobile': {
    width: '90%',
    padding: '10rem 0',
  }
});
const Logo = styled(LogoIcn, {
  width: '27rem',
  cursor: 'pointer',
});
const Title = styled('span', {
  color: '$blackGreen',
  fontSize: '3.6rem',
  fontWeight: 700,
});

const Form = styled('form', {
  width: '100%',
});
const SignUp = styled('span', {
  color: '$blackGreen',
  fontWeight: 700,
  cursor: 'pointer',
});