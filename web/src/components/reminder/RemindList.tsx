import { Back24Icon, Next24Icon } from 'assets/icons';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import RemindListItem from './RemindListItem';

const mockData = [
  {
    id: 1,
    title: 'Reminder 1',
  },
  {
    id: 2,
    title: 'Reminder 2asdasdasdas zdasdaasdasdasdsdasdasdasdasd',
  },
  {
    id: 3,
    title: 'Reminder 3',
  },
  {
    id: 4,
    title: 'Reminder 4',
  },
  {
    id: 5,
    title: 'Raseminder 4',
  },
  {
    id: 6,
    title: 'Reminder 4',
  },
  {
    id: 7,
    title: 'Reminder 4',
  },
  {
    id: 8,
    title: 'Reminder 4',
  },
  {
    id: 9,
    title: 'Reminder 4',
  },
];

const RemindListWrapper = styled.div`
  display: flex;
  margin-bottom: 17px;
`;

const RemindListContainer = styled.div`
  overflow: hidden;
  width: 795px;
`;

const RemindListBlock = styled.div`
  display: flex;
  width: 100%;
`;

const commonIconBlockStyle = css`
  position: relative;
  width: 24px;
`;

const BackIconBlock = styled.div<{ isShow: boolean }>`
  ${commonIconBlockStyle}
  visibility: ${(props) => !props.isShow && 'hidden'};
`;

const NextIconBlock = styled.div`
  ${commonIconBlockStyle}
  margin-left:24px;
`;

const commonButtonStyle = css`
  position: absolute;
  top: 50%;
  transform: translate(0%, -50%);
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const BackButton = styled(Back24Icon)`
  ${commonButtonStyle}
`;

const NextButton = styled(Next24Icon)`
  ${commonButtonStyle}
`;

function RemindList(): ReactElement {
  const TOTAL_SLIDES = mockData.length;
  const SHOW_SLIDE_LENGTH = 4;
  const [currentSlide, setCurrentSlide] = useState(SHOW_SLIDE_LENGTH);
  const slideRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + SHOW_SLIDE_LENGTH);
    }
  };
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - SHOW_SLIDE_LENGTH);
    }
  };

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transition = 'all 0.5s ease-in-out';
      slideRef.current.style.transform = `translateX(-${Math.floor(
        currentSlide / (SHOW_SLIDE_LENGTH + 1),
      )}00%)`; // +1로 준 이유는 첫화면에 리마인드 아이템을 4개를 보여줘야 해서 0%를 맞춰주기 위해 +1 을함
    }
  }, [currentSlide]);

  return (
    <RemindListWrapper>
      <BackIconBlock
        onClick={prevSlide}
        isShow={currentSlide !== SHOW_SLIDE_LENGTH}
      >
        <BackButton />
      </BackIconBlock>
      <RemindListContainer>
        <RemindListBlock ref={slideRef}>
          {mockData.map((data) => (
            <RemindListItem key={data.id} title={data.title} />
          ))}
        </RemindListBlock>
      </RemindListContainer>
      {currentSlide <= TOTAL_SLIDES && (
        <NextIconBlock onClick={nextSlide}>
          <NextButton />
        </NextIconBlock>
      )}
    </RemindListWrapper>
  );
}

export default RemindList;
