import React from 'react';
import { Wrapper, RadioBtn, Label } from './style';

export const Radio: React.FC<{
  value: string;
  label: string;
  id: string;
  name: string;
}> = ({ value, label, id, name }) => {
  return (
    <Wrapper y='center'>
      <RadioBtn type='radio' value={value} id={id} name={name} />
      <Label htmlFor={id}>{label}</Label>
    </Wrapper>
  );
}
