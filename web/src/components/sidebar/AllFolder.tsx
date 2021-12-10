import { AllFolderIcon, AllFolderSelectedIcon } from 'assets/icons';
import React, { ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Path from 'routes/path';
import styled from 'styled-components';

const AllFolderWrapper = styled.div`
  display: flex;
  height: 21px;
  width: 166px;
  margin-bottom: 12px;
  cursor: pointer;
`;

const AllFolderIconBox = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 6px;
`;

const AllFolderName = styled.span<{ active: boolean }>`
  height: 100%;
  color: ${(props) =>
    props.active ? props.theme.color.primary : props.theme.color.grayDarker};
  ${(props) => props.active && 'font-weight: 500;'}
  font-size: 14px;
  width: 133px;
  line-height: 1.5;
`;

function AllFolder(): ReactElement {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname === Path.Home;
  return (
    <AllFolderWrapper onClick={() => navigate(Path.Home)}>
      <AllFolderIconBox>
        {isActive ? <AllFolderSelectedIcon /> : <AllFolderIcon />}
      </AllFolderIconBox>
      <AllFolderName active={isActive}>모든 도토리</AllFolderName>
    </AllFolderWrapper>
  );
}

export default AllFolder;
