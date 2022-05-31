import React from 'react';
import { styled } from '#/stitches.config';
import { Vexile } from '@haechi/flexile';
import {
  Button,
  Radio
} from '@/components';

const Components: React.FC = () => {
  return (
    <Wrapper x='center' y='space'>
      <Button value='Black Button' type='black' />
      <Button value='Bright Button' type='bright' />
      <Button value='Deep Button' type='deep' />
      <Button value='Black Large Button' type='black' large />
      <Button value='Bright Large Button' type='bright' large />
      <Button value='Deep Large Button' type='deep' large />
      <Radio value='test' label='content' id='test' name='radio' />
      <Radio value='test1' label='content1' id='test1' name='radio' />
    </Wrapper>
  );
}

export default Components;

const Wrapper = styled(Vexile, {
  width: '50vw',
  height: '80vh',
  border: '1px solid black',
  borderRadius: '1rem',
  padding: '2rem'
});