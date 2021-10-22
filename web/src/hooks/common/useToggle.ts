import { useState } from 'react';

type ReturnTypes = [boolean, () => void];

export default function useToggle(initialState = false): ReturnTypes {
  const [isOpen, setIsOpen] = useState(initialState);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  return [isOpen, onToggle];
}
