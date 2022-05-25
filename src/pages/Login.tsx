import React from "react";
import { styled } from "#/stitches.config";

const Login: React.FC = () => {
  return (
    <Wrapper>
      <span>로그인 페이지</span>
    </Wrapper>
  );
}

export default Login;

const Wrapper = styled('div', {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});