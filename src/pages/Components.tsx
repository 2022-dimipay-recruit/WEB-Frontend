import React, { useState } from 'react';
import { styled } from '#/stitches.config';
import { Vexile, Hexile } from '@haechi/flexile';
import {
  Button,
  Radio,
  Selection,
  SearchBar,
} from '@/components';

const Components: React.FC = () => {
  const [searchStr, setSearchStr] = useState<string>("");

  return (
    <Wrapper x='center' y='space'>
      <Button type='black'>Black Button</Button>
      <Button type='bright'>Bright Button</Button>
      <Button type='deep'>Deep Button</Button>
      <Button type='black' large>Black Large Button</Button>
      <Button type='bright' large>Bright Large Button</Button>
      <Button type='deep' large>Deep Large Button</Button>
      <Radio value='test' label='content' id='test' name='radio' check />
      <Radio value='test1' label='content1' id='test1' name='radio' />
      <Hexile x='space' fillx>
        <Selection>Selection</Selection>
        <Selection active>Selection</Selection>
        <Selection>Selection</Selection>
        <Selection>Selection</Selection>
      </Hexile>
      <SearchBar placeholder='Search' value={searchStr} setValue={setSearchStr} />
    </Wrapper>
  );
};

export default Components;

const Wrapper = styled(Vexile, {
  width: '50vw',
  height: '80vh',
  border: '1px solid black',
  borderRadius: '1rem',
  padding: '2rem'
});
