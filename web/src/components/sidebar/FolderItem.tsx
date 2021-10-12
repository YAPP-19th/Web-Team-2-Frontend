import { FolderIcon } from 'assets/icons';
import React, { ReactElement } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled, { css } from 'styled-components';
import { IData } from './SideBar';

interface FolderItemProps {
  folder: IData;
  index: number;
  isParent?: boolean;
}

const FolderStyled = styled.div<{ isParent?: boolean }>`
  ${(props) =>
    props.isParent &&
    css`
      font-weight: 600;
    `}
  font-size: 12px;
  padding: 8px 0;
  display: flex;
  align-items: center;
  svg {
    margin: 0 8px;
  }
`;

function FolderItem({
  folder,
  index,
  isParent,
}: FolderItemProps): ReactElement {
  return (
    <Draggable draggableId={folder.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <FolderStyled isParent={isParent}>
            {isParent && <FolderIcon />}
            <span>{folder.name}</span>
          </FolderStyled>
        </div>
      )}
    </Draggable>
  );
}

export default FolderItem;
