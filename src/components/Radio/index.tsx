import React from 'react';
import { Wrapper, RadioBtn, Label } from './style';

export const Radio: React.FC<{
  value: string;
  label: string;
  id: string;
  name: string;
  check?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}> = ({
  value,
  label,
  id,
  name,
  check=false,
  onChange
}) => {
  return (
    <Wrapper y='center'>
      <RadioBtn
      type='radio'
      value={value}
      id={id}
      name={name}
      defaultChecked={check}
      onChange={onChange} />
      <Label htmlFor={id}>{label}</Label>
    </Wrapper>
  );
};
