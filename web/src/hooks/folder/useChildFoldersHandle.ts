import { deleteSubFolders } from 'api/folderAPI';
import { folder } from 'models/folder';
import { useMutation, useQueryClient } from 'react-query';
import {
  useCheckedSubFoldersIds,
  useSubFoldersAction,
} from 'recoil/selectors/folderSelector';
import { ReactQueryKey } from 'utils/const';

interface IUseChildFoldersHandle {
  onDeleteSubFolders: () => void;
}

export default function useChildFoldersHandle(): IUseChildFoldersHandle {
  const { onDelete } = useSubFoldersAction();
  const checkedSubFolderIds = useCheckedSubFoldersIds();
  const queryClient = useQueryClient();

  const { mutate: mutateSubFoldersDelete } = useMutation(
    (requestData: folder.ISubFoldersDeleteRequest) =>
      deleteSubFolders(requestData),
    {
      onSuccess: () => {
        onDelete();
        queryClient.invalidateQueries(ReactQueryKey.folderContents());
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
