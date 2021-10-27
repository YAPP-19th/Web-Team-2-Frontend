import { useEffect, useRef } from 'react';

interface ReturnTypes {
  targetEl: React.RefObject<HTMLDivElement>;
}

export default function useLayerClose(
  isOpen: boolean,
  onClose: () => void,
): ReturnTypes {
  const targetEl = useRef<HTMLDivElement>(null);

  const onClickOutSide = (e: MouseEvent) => {
    const { target } = e;

    if (isOpen && !targetEl.current?.contains(target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('click', onClickOutSide);
    return () => {
      window.removeEventListener('click', onClickOutSide);
    };
  }, []);

  return {
    targetEl,
  };
}
