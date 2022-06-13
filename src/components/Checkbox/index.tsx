import React from 'react';
import { Wrapper, Input, Label } from './style';

export const Checkbox: React.FC<{
  value: string;
  label: string;
  id: string;
  check?: boolean;
}> = ({
  value,
  label,
  id,
  check = false,
}) => {
  return (
    <Wrapper>
      <Input type='checkbox' defaultChecked={check} id={id} value={value} />
      <Label htmlFor={id}>{label}</Label>
    </Wrapper>
  );
};