import { useEffect, useRef, useState } from 'react';
import useRemindEffect, { ImockData } from './useRemindEffect';

interface ReturnTypes {
  reminds: ImockData[];
  currentSlide: number;
  onNextSlide: () => void;
  onBackSlide: () => void;
  slideRef: React.RefObject<HTMLDivElement>;
  SHOW_SLIDE_LENGTH: number;
  TOTAL_SLIDES: number;
}

export default function useReminderHandleEffect(): ReturnTypes {
  const { reminds } = useRemindEffect();

  const TOTAL_SLIDES = reminds.length;
  const SHOW_SLIDE_LENGTH = 2;
  const [currentSlide, setCurrentSlide] = useState(SHOW_SLIDE_LENGTH);
  const slideRef = useRef<HTMLDivElement>(null);

  const onNextSlide = () => {
    // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화
    setCurrentSlide(currentSlide + SHOW_SLIDE_LENGTH);
  };
  const onBackSlide = () => {
    setCurrentSlide(currentSlide - SHOW_SLIDE_LENGTH);
  };

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transition = 'all 0.5s ease-in-out';
      slideRef.current.style.transform = `translateX(-${
        198 * (currentSlide - SHOW_SLIDE_LENGTH)
      }px)`;
    }
  }, [currentSlide]);

  return {
    reminds,
    currentSlide,
    onNextSlide,
    onBackSlide,
    slideRef,
    SHOW_SLIDE_LENGTH,
    TOTAL_SLIDES,
  };
}
