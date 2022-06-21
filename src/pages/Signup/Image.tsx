import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '#/stitches.config';
import { Vexile } from '@haechi/flexile';
import { Button, Checkbox } from '@/components';
import { defaultProfile } from '@/constants/types';
import { api } from '@/api';
import { makeAlert } from '@/funtions';

const SignupImage: React.FC = () => {
  const history = useNavigate();
  const [imgFile, setFile] = useState<File>();
  const [preview, setPreview] = useState<string>(defaultProfile);

  const ImageChange = (e: React.ChangeEvent<any>) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const imageSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if(!(e.target as any).policyAllow.checked) return makeAlert.error('개인정보 처리방침에 동의해주세요');

    if(!imgFile) {
      const dp = confirm('기본 프로필로 설정하시겠습니까?');
      if(dp) return history('/');
      else return;
    }
    
    const data = new FormData();
    data.append('image', imgFile);

    await api<'imgUpload'>('POST', '/upload', data);
    return history('/');
  }, [imgFile]);

  return (
    <Vexile x='center' y='center' gap={10} fillx filly>
      <Title>회원가입</Title>
      <Form onSubmit={imageSubmit}>
        <Vexile x='center' gap={3.6}>
          <Vexile x='center' gap={2} fillx>
            <Vexile x='center' gap={1.2} fillx>
              <ProfileImg src={preview} crossOrigin='anonymous' />
            </Vexile>
            <Explanation>프로필 사진으로는 5MB 이하의<br/>PNG, JPG, WEBP만 가능합니다.</Explanation>
            <InputFile 
            type='file'
            name='profile'
            id='profile'
            accept='image/*'
            onChange={ImageChange} />
            <Label htmlFor='profile'>업로드</Label>
          </Vexile>
          <Checkbox
          id='policyAllow'
          label={<Policy><Link href='/src/assets/privacyPolicy.html' target='_blank'>개인정보처리방침</Link>에 동의합니다.</Policy>}
          value='policyAllow' />
          <Button color='black' type='submit'>가입</Button>
        </Vexile>
      </Form>
    </Vexile>
  );
};

export default SignupImage;

const Title = styled('span', {
  color: '$blackGreen',
  fontSize: '3.6rem',
  fontWeight: 700,
});

const Form = styled('form', {
  width: '100%',
});

const Explanation = styled('span', {
  color: '$darkGreen',
  lineHeight: '2.4rem',
});

const ProfileImg = styled('img', {
  width: '14rem',
  height: '14rem',
  borderRadius: '50%',
  background: '$brightGreen',
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

const Link = styled('a', {
  borderBottom: '1px solid $blackGreen',
});
const Policy = styled('span', {
  color: '$blackGreen',
});