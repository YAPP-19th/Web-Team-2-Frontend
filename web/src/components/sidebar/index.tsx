import useFoldersHandle from 'hooks/folder/useFoldersHandle';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import QuestionButton from 'components/tutorial/QuestionButton';
import SimpleButton from 'components/common/SimpleButton';
import useToggle from 'hooks/common/useToggle';
import useFoldersLoad from 'hooks/folder/useFoldersLoad';
import Toasts from 'components/common/Toasts';
import AllFolder from './AllFolder';
import CabinetBox from './CabinetBox';
import FolderList from './FolderList';
import TrashBox from './TrashBox';
import TestModal from './TestModal';

const SideBarWrapper = styled.div`
  width: 170px;
  padding: 20px 0;
  position: relative;
  background-color: ${(props) => props.theme.color.white};
  /* overflow: auto; */
`;

const FolderBox = styled.div`
  max-height: 541px;
  overflow: hidden auto; // hidden auto => overflow가 없을땐 안보이고 있을땐 스크롤
  overflow-x: auto;

  margin-bottom: 24px;
  &::-webkit-scrollbar {
    width: 10px; // 세로 스크롤바 가로 길이
    height: 10px; // 가로 스크롤바 세로 길이
  }
  &::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.color.white};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.color.grayLight};
    border-radius: 10px;
    background-clip: padding-box;
    border: 1px solid transparent;
  }
`;

function SideBar(): ReactElement {
  const {
    onCreateCabinet,
    onCreateFolder,
    folders,
    onCollapseFolder,
    onDragEndFolder,
    onDragStartFolder,
    onExpandFolder,
    onDeleteFolder,
    onChangeFolderInfo,
    toasts,
  } = useFoldersHandle();

  useFoldersLoad();
  const [isTestOpen, onToggleModal] = useToggle();

  const { isOpenFolderIsFullToast, isOpenCabinetIsFullToast } = toasts;

  return (
    <SideBarWrapper>
      <FolderBox>
        <AllFolder />
        <FolderList
          folders={folders}
          onCreateFolder={onCreateFolder}
          onCollapseFolder={onCollapseFolder}
          onDragEndFolder={onDragEndFolder}
          onDragStartFolder={onDragStartFolder}
          onExpandFolder={onExpandFolder}
          onDeleteFolder={onDeleteFolder}
          onChangeFolderInfo={onChangeFolderInfo}
        />
      </FolderBox>

      <CabinetBox folders={folders} onCreateCabinet={onCreateCabinet} />

      <TrashBox />

      {/* qa 테스트용@ 북마크 추가 버튼  */}
      <SimpleButton
        label="북마크 추가"
        variant="primary"
        width="170px"
        height="40px"
        style={{ marginTop: '20px' }}
        onClick={onToggleModal}
      />

      {isTestOpen && (
        <TestModal isModal={isTestOpen} onToggleModal={onToggleModal} />
      )}

      <QuestionButton />
      <Toasts isOpen={isOpenFolderIsFullToast} type="folderIsFull" />
      <Toasts isOpen={isOpenCabinetIsFullToast} type="cabinetIsFull" />
    </SideBarWrapper>
  );
}

export default SideBar;
