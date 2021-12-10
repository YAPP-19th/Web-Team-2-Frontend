import { SelectedTrashIcon, UnselectedTrashIcon } from 'assets/icons';
import React, { ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Path from 'routes/path';
import styled from 'styled-components';

const TrashWrapper = styled.div`
  display: flex;
  height: 21px;
  width: 166px;
  cursor: pointer;
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

const TrashName = styled.span<{ active: boolean }>`
  height: 100%;
  color: ${(props) =>
    props.active ? props.theme.color.primary : props.theme.color.grayDark};
  ${(props) => props.active && 'font-weight: 500;'}
  font-size: 14px;
  width: 133px;
  line-height: 21px;
`;

function TrashBox(): ReactElement {
  const navigate = useNavigate();
  const { folderId } = useParams();
  return (
    <TrashWrapper onClick={() => navigate(Path.TrashPage)}>
      <TrashIconBox>
        {folderId === 'trash' ? <SelectedTrashIcon /> : <UnselectedTrash />}
      </TrashIconBox>
      <TrashName active={folderId === 'trash'}>휴지통</TrashName>
    </TrashWrapper>
  );
}

export default TrashBox;
