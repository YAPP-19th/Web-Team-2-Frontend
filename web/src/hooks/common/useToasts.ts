import { useState } from 'react';

type UseToastsTypes = [isOpenToast: boolean, onToast: () => void];

export default function useToasts(): UseToastsTypes {
  const [isOpenToast, setIsOpenToast] = useState(false);

  const onToast = () => {
    setIsOpenToast(true);
    setTimeout(() => {
      setIsOpenToast(false);
    }, 1500);
  };

  return [isOpenToast, onToast];
}
