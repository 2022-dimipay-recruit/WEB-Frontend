import React from "react";
import { styled } from "#/stitches.config";
import { Button } from "@/components";
import { Vexile } from "@haechi/flexile";

const Login: React.FC = () => {
  return (
    <Wrapper>
      <Vexile fillx filly x='center' y='center'>
        <Button value='Button' type='bright' />
        <Button value='Button' type='black' />
        <Button value='Button' type='deep' />
      </Vexile>
    </Wrapper>
  );
}

export default Login;

const Wrapper = styled('div', {
  width: '100vw',
  height: '100vh',
});