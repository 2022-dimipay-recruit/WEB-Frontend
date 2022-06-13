import React, { useState } from 'react';
import { styled } from '#/stitches.config';
import { Vexile, Hexile } from '@haechi/flexile';
import {
  Button,
  Radio,
  Selection,
  SearchBar,
  Input,
  Checkbox,
  Heart
} from '@/components';

const Components: React.FC = () => {
  const [searchStr, setSearchStr] = useState<string>("");
  const [inputStr, setInputStr] = useState<string>("");

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
      <div style={{width: '50%'}}>
        <Input placeholder='Text' value={inputStr} setValue={setInputStr} type='text' />
      </div>
      <Checkbox value='a' label='Content' id='check1' />
      <Checkbox value='b' label='Content' id='check2' check />
      <Heart heart={80} />
      <Heart heart={100} active />
    </Wrapper>
  );
};

export default Components;

const Wrapper = styled(Vexile, {
  width: '50vw',
  height: '90vh',
  border: '1px solid black',
  borderRadius: '1rem',
  padding: '2rem'
});
