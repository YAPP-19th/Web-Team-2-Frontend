import {
  SelectedTrashIcon,
  TrashBallonIcon,
  UnselectedTrashIcon,
} from 'assets/icons';
import transitions from 'assets/styles/transitions';
import React, { ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Path from 'routes/path';
import styled from 'styled-components';

const TrashBallonBox = styled.div`
  position: relative;
  display: none;
  animation: ${transitions.fadeIn} 0.4s ease-in-out;
`;

const TrashBallonText = styled.span`
  position: absolute;
  top: 17px;
  left: 13px;
  line-height: normal;
  color: ${(props) => props.theme.color.grayDarkest};
`;

const TrashBoxWrapper = styled.div`
  &:hover ${TrashBallonBox} {
    display: block;
  }
`;

const TrashContent = styled.div`
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
  const isActive = folderId === 'trash';
  return (
    <TrashBoxWrapper>
      <TrashContent onClick={() => navigate(Path.TrashPage)}>
        <TrashIconBox>
          {isActive ? <SelectedTrashIcon /> : <UnselectedTrashIcon />}
        </TrashIconBox>
        <TrashName active={isActive}>휴지통</TrashName>
      </TrashContent>

      <TrashBallonBox>
        <TrashBallonIcon />
        <TrashBallonText>
          휴지통의 도토리는
          <br /> 30일 뒤 완전히 사라져요!
        </TrashBallonText>
      </TrashBallonBox>
    </TrashBoxWrapper>
  );
}

export default TrashBox;
