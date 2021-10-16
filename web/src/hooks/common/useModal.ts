import { useState } from 'react';

export default function useModal(): [boolean, () => void] {
  const [isModal, setIsModal] = useState(false);

  const onToggleModal = () => {
    setIsModal(!isModal);
  };

  return [isModal, onToggleModal] as [boolean, () => void];
}
