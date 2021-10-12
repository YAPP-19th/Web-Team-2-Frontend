import React, { ReactElement } from 'react';
import FolderItem from './FolderItem';
import { IData } from './SideBar';

interface FolderSubItemProps {
  folders: IData[];
  parentId: string;
}

function FolderSubItem({
  folders,
  parentId,
}: FolderSubItemProps): ReactElement {
  return (
    <>
      {folders.map((folder, index) => (
        <React.Fragment key={index}>
          {folder.parentId === parentId && (
            <div style={{ width: '80%', marginLeft: '32px' }}>
              <FolderItem folder={folder} index={index} />
              <FolderSubItem folders={folders} parentId={folder.id} />
            </div>
          )}
        </React.Fragment>
      ))}
    </>
  );
}

export default FolderSubItem;
