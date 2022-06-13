import React from 'react';
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
  return (
    <Wrapper gap={.6} y='center'>
      <SearchIcn />
      <Input
        type='text'
        onChange={({target: {value}}) => setValue(value)}
        value={value}
        placeholder={placeholder}
      />
    </Wrapper>
  );
};