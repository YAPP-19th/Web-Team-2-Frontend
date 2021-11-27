import { AllFolderIcon } from 'assets/icons';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

const AllFolderWrapper = styled.div`
  display: flex;
  height: 21px;
  width: 166px;
  margin-bottom: 12px;
`;

const AllFolderIconBox = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const AllFolderFavicon = styled(AllFolderIcon)`
  margin-right: 6px;
`;

const AllFolderName = styled.span`
  height: 100%;
  color: ${(props) => props.theme.color.grayDarker};
  font-size: 14px;
  width: 133px;
  cursor: pointer;
  line-height: 1.5;
`;

function AllFolder(): ReactElement {
  return (
    <AllFolderWrapper>
      <AllFolderIconBox>
        <AllFolderFavicon />
      </AllFolderIconBox>
      <AllFolderName>모든 도토리</AllFolderName>
    </AllFolderWrapper>
  );
}

export default AllFolder;
