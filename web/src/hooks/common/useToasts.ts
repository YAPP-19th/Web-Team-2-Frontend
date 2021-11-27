import { ToastsTypes } from 'components/common/Toasts';
import { useState } from 'react';

interface IUseToasts {
  notify: (toastType: ToastsTypes) => void;
  isOpenToasts: boolean;
  type: ToastsTypes;
}

export default function useToasts(): IUseToasts {
  const [isOpenToasts, setIsOpenToasts] = useState(false);
  const [type, setType] = useState<ToastsTypes>('remindSetting');

  const notify = (toastType: ToastsTypes) => {
    setType(toastType);
    setIsOpenToasts(true);
    setTimeout(() => {
      setIsOpenToasts(false);
    }, 1000);
  };

  return {
    notify,
    isOpenToasts,
    type,
  };
}
