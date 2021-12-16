import { ItemId } from '@atlaskit/tree';
import { deleteSubFolders } from 'api/folderAPI';
import LoadingSpinner from 'components/common/LoadingSpinner';
import useChildFoldersEffect from 'hooks/folder/useChildFoldersQueries';
import { folder } from 'models/folder';
import React, {
  ReactElement,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import SubFolderList from './SubFolderList';
import SubFolderSelectBox from './SubFolderSelectBox';

export interface FolderIdParams {
  folderId: string;
}

const SubFoldersWrapper = styled.div`
  margin-bottom: 19px;
`;

const SubFoldersNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  margin-bottom: 16px;
  font-size: 12px;
  color: ${(props) => props.theme.color.grayDarkest};
`;

function SubFolders(): ReactElement | null {
  const { folderId } = useParams<keyof FolderIdParams>() as FolderIdParams; // Note(dohyun) react-router v6 부터는 useParams의 타입 지정이 불가능 해서 이런식으로 하라고 함 -> https://stackoverflow.com/questions/69992370/why-react-router-v6-useparams-returns-object-with-properties-possibly-undefined
  const { data } = useChildFoldersEffect(folderId);
  const [subFolderList, setSubFolderList] = useState<
    folder.ICheckedChildFolderItem[]
  >([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

  useEffect(() => {
    if (data) {
      setSubFolderList(
        data.map((subFolder) => ({ ...subFolder, checked: false })),
      );
    }
    setIsAllChecked(false);
  }, [data]);

  useEffect(() => {
    if (subFolderList.length === 0) {
      return;
    }
    setIsAllChecked(subFolderList.every((subFolder) => subFolder.checked));
  }, [subFolderList]);

  const onToggleChecked = (subFolderId: ItemId) => {
    setSubFolderList(
      subFolderList.map((subFolder) =>
        subFolder.folderId === subFolderId
          ? { ...subFolder, checked: !subFolder.checked }
          : subFolder,
      ),
    );
  };

  const onToggleAllChecked = () => {
    setSubFolderList(
      subFolderList.map((subFolder) => ({
        ...subFolder,
        checked: !isAllChecked,
      })),
    );
    setIsAllChecked(!isAllChecked);
  };

  const IsActiveSubFolder = useMemo(() => {
    return subFolderList.some((subFolder) => subFolder.checked);
  }, [subFolderList]);

  const { mutate: mutateSubFoldersDelete } = useMutation(
    (requestData: folder.ISubFoldersDeleteRequest) =>
      deleteSubFolders(requestData),
    {
      onSuccess: () => {
        setSubFolderList(
          subFolderList.filter((subFolder) => !subFolder.checked),
        );
        setIsAllChecked(false);
      },
      onError: () => {
        // eslint-disable-next-line no-console
        console.log('error');
      },
    },
  );

  const onDeleteSubFolders = () => {
    const checkedSubFolderIds = subFolderList
      .filter((subFolder) => subFolder.checked)
      .map((subFolder) => subFolder.folderId);
    mutateSubFoldersDelete({ deleteFolderIdList: checkedSubFolderIds });
  };

  if (!data || data.length === 0) return null;
  return (
    <SubFoldersWrapper>
      <SubFoldersNav>
        <SubFolderSelectBox
          onToggleAllChecked={onToggleAllChecked}
          isAllChecked={isAllChecked}
          IsActiveSubFolder={IsActiveSubFolder}
          onDeleteSubFolders={onDeleteSubFolders}
        />
      </SubFoldersNav>
      <Suspense fallback={<LoadingSpinner />}>
        <SubFolderList
          subFolders={subFolderList}
          onToggleChecked={onToggleChecked}
          IsActiveSubFolder={IsActiveSubFolder}
        />
      </Suspense>
    </SubFoldersWrapper>
  );
}

export default SubFolders;
