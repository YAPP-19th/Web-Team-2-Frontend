import { deleteSubFolders } from 'api/folderAPI';
import { folder } from 'models/folder';
import { useMutation } from 'react-query';
import {
  useCheckedSubFoldersIds,
  useSubFoldersAction,
} from 'recoil/selectors/folderSelector';

interface IUseChildFoldersHandle {
  onDeleteSubFolders: () => void;
}

export default function useChildFoldersHandle(): IUseChildFoldersHandle {
  const { onDelete } = useSubFoldersAction();
  const checkedSubFolderIds = useCheckedSubFoldersIds();

  const { mutate: mutateSubFoldersDelete } = useMutation(
    (requestData: folder.ISubFoldersDeleteRequest) =>
      deleteSubFolders(requestData),
    {
      onSuccess: () => {
        onDelete();
      },
      onError: () => {
        // eslint-disable-next-line no-console
        console.log('error');
      },
    },
  );

  // @TODO(dohyun) onMove 함수 추가 예정

  const onDeleteSubFolders = () => {
    mutateSubFoldersDelete({ deleteFolderIdList: checkedSubFolderIds });
  };

  return {
    onDeleteSubFolders,
  };
}
