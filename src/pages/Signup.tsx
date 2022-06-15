import React, { useCallback, useEffect, useState } from 'react';
import { styled } from '#/stitches.config';
import { Hexile, Vexile } from '@haechi/flexile';
import { Input, Button, Checkbox } from '@/components';
import { makeAlert } from '@/funtions';
import { clearToken } from '@/api';
import { useSetRecoilState } from 'recoil';
import { MyInfoState } from '@/state';

const Signup: React.FC = () => {
  const setInfo = useSetRecoilState(MyInfoState);

  const [name, setName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [verify, setVerify] = useState<string>('');

  const [imgFile, setFile] = useState<File>();
  const [preview, setPreview] = useState<string>();

  useEffect(() => {
    clearToken();
    setInfo(undefined);
  }, []);

  const SignupSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    if(!name || !userName || !email || !password || !verify) return makeAlert.error('필드를 확인해주세요');
    if(userName.length > 10) return makeAlert.error('아이디는 10자 이내로 해주세요');
    if(!(password === verify)) return makeAlert.error('비밀번호를 확인해주세요');
    if(!(e.target as any).policyAllow.checked) return makeAlert.error('개인정보 처리방침에 동의해주세요');
  }, [
    name,
    userName,
    email,
    password,
    verify,
  ]);

  const ImageChange = (e: React.ChangeEvent<any>) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Wrapper x='center' gap={5.4}>
      <Title>회원가입</Title>
      <Form onSubmit={SignupSubmit}>
        <Vexile gap={3.6} fillx>
          <Hexile y='top' gap={6.4} linebreak>
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
            <ProfileContainer x='center' gap={1}>
              <ProfileTitle>프로필 사진</ProfileTitle>
              <ProfileImg src={preview} />
              <InputFile
                type='file'
                name='profile'
                id='profile'
                accept='image/*'
                onChange={ImageChange} />
              <Label htmlFor='profile'>업로드</Label>
            </ProfileContainer>
          </Hexile>
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
const ProfileImg = styled('img', {
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

const InputFile = styled('input', {
  display: 'none',
});
const Label = styled('label', {
  borderRadius: '2.6rem',
  padding: '1rem 2.8rem',
  cursor: 'pointer',
  fontSize: '2rem',
  fontWeight: 700,
  border: 'none',
  outline: 'none',
  background: '$blackGreen',
  color: '$brightGreen',
});