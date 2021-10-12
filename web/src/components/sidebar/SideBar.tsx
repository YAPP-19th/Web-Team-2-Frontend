import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import FolderList from './FolderList';

export interface IData {
  id: string;
  name: string;
  parentId?: string;
}

const fakeData: IData[] = [
  {
    id: '11231d1d',
    name: '첫번째',
  },
  {
    id: '212d12d12d',
    name: '첫번째 자식1',
    parentId: '11231d1d',
  },
  {
    id: '3asd21dasd',
    name: '첫번째 자식 2',
    parentId: '11231d1d',
  },
  {
    id: '4123dasd2',
    name: '첫번째 자식1의 자식 1 ',
    parentId: '212d12d12d',
  },
  {
    id: '5123sad2',
    name: '첫번째 자식 3',
    parentId: '11231d1d',
  },
  {
    id: '5123ssda2aad2',
    name: '두번째 ',
  },
  {
    id: '5123asd26sad2',
    name: '세번째 ',
  },
];

const SideBarWrapper = styled.div`
  width: 240px;
  padding: 20px 0;
  background-color: #e7e7e7;
`;

function SideBar(): ReactElement {
  const [folders, setFolders] = useState(fakeData);

  const onDragEnd = () => {
    console.log('drag end');
  };

  return (
    <SideBarWrapper>
      <FolderList folders={folders} onDragEnd={onDragEnd} />
    </SideBarWrapper>
  );
}

export default SideBar;
