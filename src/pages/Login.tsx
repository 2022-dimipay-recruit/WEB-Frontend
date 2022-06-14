import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '#/stitches.config';
import { Vexile } from '@haechi/flexile';
import { loginWithInfo } from '@/api';
import makeAlert from '@/funtions/makeAlert';

const Login: React.FC = () => {
  const history = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const login = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      await loginWithInfo({
        email,
        password,
      })
    ) {
      history('/');
    } else {
      makeAlert.error('사용자 이름 또는 비밀번호를 확인해주세요.');
    }
  }, [email, password]);

  return (
    <Wrapper>
      <Vexile fillx filly x='center' y='center'>
        <form onSubmit={login}>
          <input type="email" onChange={({target: {value}}) => setEmail(value)} value={email} />
          <input type="password" onChange={({target: {value}}) => setPassword(value)} value={password} />
          <input type="submit" value="로그인" />
        </form>
      </Vexile>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled('div', {
  width: '100%',
  height: '100%',
});