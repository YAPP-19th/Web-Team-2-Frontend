import { remind } from 'models/remind';
import { useEffect, useRef, useState } from 'react';
import { useRemindQuery } from './useRemindQueries';

interface ReturnTypes {
  reminds: remind.IRemindInfo[];
  currentSlide: number;
  onNextSlide: () => void;
  onBackSlide: () => void;
  slideRef: React.RefObject<HTMLDivElement>;
  SHOW_SLIDE_LENGTH: number;
  TOTAL_SLIDES: number;
}

export default function useReminderHandleEffect(): ReturnTypes {
  const { data } = useRemindQuery();
  const reminds = data?.remindBookmarkList || [];

  const TOTAL_SLIDES = reminds.length;
  const SHOW_SLIDE_LENGTH = 2;
  const [currentSlide, setCurrentSlide] = useState(SHOW_SLIDE_LENGTH);
  const slideRef = useRef<HTMLDivElement>(null);

  const onNextSlide = () => {
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
