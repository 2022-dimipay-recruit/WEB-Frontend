import React, { useCallback, useState } from 'react';
import { Wrapper, Text, Box, InputBox, CancelIcn, VisibleIcn } from './style';

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
  const [customType, setCustomType] = useState<'password' | 'text' | 'email'>(type);

  const cancel = () => {
    setValue('');
  };

  const ToggleVisible = useCallback(() => {
    setCustomType(customType === 'password' ? 'text' : 'password')
  }, [customType]);
  
  return (
    <Wrapper fillx x='left' gap={.3}>
      <Text>{placeholder}</Text>
      <Box>
        <InputBox
          type={type === 'password' ? customType : type}
          value={value}
          onChange={({target: {value}}) => setValue(value)}
          password={type === 'password'}
        />
        {type === 'password' && (
          <VisibleIcn onClick={ToggleVisible} />
        )}
        <CancelIcn onClick={cancel} />
      </Box>
    </Wrapper>
  );
};