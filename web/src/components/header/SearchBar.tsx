import { Search24Icon } from 'assets/icons';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';

const SearchBarBox = styled.div`
  background-color: rgba(72, 191, 145, 0.1);
  width: 570px;
  margin-right: 27px;
  margin-left: 308px;
  height: 32px;
  display: flex;
  align-items: center;
  border-radius: 6px;
`;

const SearchIconBox = styled(Search24Icon)`
  margin: 0 6px 0;
  &:hover {
    cursor: pointer;
  }
`;

const SearchBarInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 12px;
  line-height: 17px;
  ::placeholder {
    color: ${(props) => props.theme.color.grayDark};
    font-size: 12px;
    line-height: 17px;
  }
`;

function SearchBar(): ReactElement {
  const [searchMessage, setSearchMessage] = useState('');

  const onChangeSearchMessage = (e: { target: { value: string } }): void => {
    setSearchMessage(e.target.value);
  };

  const searchHandler = () => {
    // eslint-disable-next-line no-console
    console.log(searchMessage);
  };

  return (
    <SearchBarBox>
      <SearchIconBox onClick={searchHandler} />
      <SearchBarInput
        placeholder="나의 보관함 검색"
        onChange={onChangeSearchMessage}
        value={searchMessage}
      />
    </SearchBarBox>
  );
}

export default SearchBar;
