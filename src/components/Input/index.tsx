import React from 'react';
import { Wrapper, Text, Box, InputBox, CancelIcn } from './style';

export const Input: React.FC<{
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  type: 'text' | 'password' | 'email';
  placeholder: string;
}> = ({
  value,
  setValue,
  type,
  placeholder,
}) => {
  const cancel = () => {
    setValue('');
  }
  
  return (
    <Wrapper fillx x='left' gap={.3}>
      <Text>{placeholder}</Text>
      <Box>
        <InputBox
          type={type}
          value={value}
          onChange={({target: {value}}) => setValue(value)}
        />
        <CancelIcn onClick={cancel} />
      </Box>
    </Wrapper>
  );
};