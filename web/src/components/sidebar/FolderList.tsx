import React, { ReactElement } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import FolderItem from './FolderItem';
import FolderSubItem from './FolderSubItem';
import { IData } from './SideBar';

interface FolderListProps {
  folders: IData[];
  onDragEnd: () => void;
}

function FolderList({ folders, onDragEnd }: FolderListProps): ReactElement {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {folders.map(
              (folder, index) =>
                !folder.parentId && (
                  <div key={index}>
                    <FolderItem folder={folder} index={index} isParent />
                    <FolderSubItem folders={folders} parentId={folder.id} />
                  </div>
                ),
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default FolderList;
