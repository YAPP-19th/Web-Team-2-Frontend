import { useState } from 'react';

type ReturnTypes = [boolean, () => void];

export default function useModal(): ReturnTypes {
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  return [isOpen, onToggle];
}
