import { UnselectedTrashIcon } from 'assets/icons';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

const TrashWrapper = styled.div`
  display: flex;
  height: 21px;
  width: 166px;
`;

const TrashIconBox = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  width: 30px;
  svg {
    margin-left: 6px;
  }
`;

/**
TODO - recoil state로 폴더 select 상태 정의 필요
*/

const UnselectedTrash = styled(UnselectedTrashIcon)``;

// const SelectedTrash = styled(SelectedTrashIcon)``;

const TrashName = styled.span`
  height: 100%;
  color: ${(props) => props.theme.color.gray0};
  font-size: 14px;
  width: 133px;
  line-height: 21px;
`;

function TrashBox(): ReactElement {
  return (
    <TrashWrapper>
      <TrashIconBox>
        <UnselectedTrash />
      </TrashIconBox>
      <TrashName>휴지통</TrashName>
    </TrashWrapper>
  );
}

export default TrashBox;
