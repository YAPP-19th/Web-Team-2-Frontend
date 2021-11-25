import { useState } from 'react';

type ToastsTypes =
  | 'remindSetting'
  | 'remindDisabled'
  | 'remindRecommendation'
  | 'copyLink'
  | 'createFolderError'
  | 'cabinetIsFull'
  | 'folderIsFull'
  | 'editProfile'
  | 'changePassword';

export default function useToasts() {
  const [isOpenToasts, setIsOpenToasts] = useState(false);
  const [type, setType] = useState<ToastsTypes>('remindSetting');

  const notify = (toastType: ToastsTypes) => {
    setType(toastType);
    setIsOpenToasts(true);
    setTimeout(() => {
      setIsOpenToasts(false);
    }, 3000);
  };

  return {
    notify,
    isOpenToasts,
    type,
  };
}
