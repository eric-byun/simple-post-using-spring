import React, { useState } from 'react';
import styled from 'styled-components';

const PostSearch = ({ onChangeSearchFilter }) => {
  const [type, setType] = useState('title');
  const [value, setValue] = useState('');

  const formHandle = (e) => {
    const { name, value } = e.target;

    if (name === 'type') {
      setType(value);
    }

    if (name === 'value') {
      setValue(value);
    }
  };

  const onSubmit = (e) => {
    onChangeSearchFilter({ type, value });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <>
      <SelectBox name="type" onChange={formHandle} value={type}>
        <option value="title">제목</option>
        <option value="writer">작성자</option>
      </SelectBox>
      <Input type="text" name="value" onChange={formHandle} onKeyPress={handleKeyPress} value={value} />
      <Button onClick={onSubmit}>검색</Button>
    </>
  );
};

const SelectBox = styled.select`
  width: 4rem;
  height: 2.3rem;
  margin: 0rem;
`;
const Input = styled.input`
  width: 8rem;
  height: 2rem;
  margin: 0rem 0.3rem;
`;

const Button = styled.button`
  width: 4rem;
  height: 2.3rem;
`;

export default PostSearch;
