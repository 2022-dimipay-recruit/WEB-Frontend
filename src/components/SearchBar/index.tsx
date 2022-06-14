import React, { useState } from 'react';
import { Modal } from '@/components';
import { Wrapper, SearchIcn, Input } from './style';

export const SearchBar: React.FC<{
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}> = ({
  value,
  setValue,
  placeholder,
}) => {
  const [isFocus, setFocus] = useState<boolean>(false);
  
  return (
    <Wrapper gap={.6} y='center'>
      <SearchIcn />
      <Input
        type='text'
        onChange={({target: {value}}) => setValue(value)}
        value={value}
        placeholder={placeholder}
        onFocus={setFocus ? () => setFocus(true) : ()=>{}}
        onBlur={setFocus ? () => setFocus(false) : ()=>{}}
      />
      <Modal type='search' active={isFocus} />
    </Wrapper>
  );
};