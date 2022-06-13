import React from 'react';
import { Wrapper, RadioBtn, Label } from './style';

export const Radio: React.FC<{
  value: string;
  label: string;
  id: string;
  name: string;
  check?: boolean;
}> = ({
  value,
  label,
  id,
  name,
  check=false
}) => {
  return (
    <Wrapper y='center'>
      <RadioBtn type='radio' value={value} id={id} name={name} defaultChecked={check} />
      <Label htmlFor={id}>{label}</Label>
    </Wrapper>
  );
};
