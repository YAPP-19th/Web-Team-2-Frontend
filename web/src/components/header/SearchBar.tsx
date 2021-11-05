import React, { ReactElement } from 'react';
import styled from 'styled-components';

const HeaderSearchBar = styled.div`
  background-color: green;
  width: 471px;
  margin-right: 27px;
  height: 100%;
`;

function SearchBar(): ReactElement {
  return <HeaderSearchBar />;
}

export default SearchBar;
