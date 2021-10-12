import React, { ReactElement } from 'react';
import styled from 'styled-components';

const SideBarWrapper = styled.div`
  width: 240px;
  padding: 20px 0;
  background-color: #e7e7e7;
`;

function SideBar(): ReactElement {
  return <SideBarWrapper>사이드바</SideBarWrapper>;
}

export default SideBar;
