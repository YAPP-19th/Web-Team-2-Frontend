import React, { ReactElement } from 'react';
import styled from 'styled-components';

const HeaderSearchBar = styled.div`
  background-color: green;
  width: 372px;
  height: 100%;
`;

function SearchBar(): ReactElement {
  return <HeaderSearchBar />;
}

export default SearchBar;
