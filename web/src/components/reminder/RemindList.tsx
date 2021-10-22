import { Back24Icon, Next24Icon } from 'assets/icons';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import RemindListItem from './RemindListItem';
import mockData from './data/remindMock.json';

const RemindListWrapper = styled.div`
  display: flex;
  margin-bottom: 17px;
  position: relative;
`;

const RemindListContainer = styled.div`
  overflow: hidden;
  width: 100%;
`;

const RemindListBlock = styled.div`
  display: flex;
  width: 100%;
`;

const commonIconBlockStyle = css`
  width: 24px;
  z-index: 100;
`;

const BackIconBlock = styled.div<{ isShow: boolean }>`
  ${commonIconBlockStyle}
  position:absolute;
  height: 100%;
  left: 0px;
  margin-right: 24px;
  display: ${(props) => !props.isShow && 'none'};
`;

const NextIconBlock = styled.div`
  ${commonIconBlockStyle}
  position:absolute;
  height: 100%;
  right: 0px;
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
  const TOTAL_SLIDES = mockData.reminds.length;
  const SHOW_SLIDE_LENGTH = 2;
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
      // slideRef.current.style.transform = `translateX(-${Math.floor(
      //   currentSlide / (SHOW_SLIDE_LENGTH + 1),
      // )}00%)`; // +1로 준 이유는 첫화면에 리마인드 아이템을 4개를 보여줘야 해서 0%를 맞춰주기 위해 +1 을함
      slideRef.current.style.transform = `translateX(-${
        198 * (currentSlide - SHOW_SLIDE_LENGTH)
      }px)`;
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
          {mockData.reminds.map((data) => (
            <RemindListItem key={data.id} title={data.title} />
          ))}
        </RemindListBlock>
      </RemindListContainer>
      {TOTAL_SLIDES - currentSlide > SHOW_SLIDE_LENGTH && (
        <NextIconBlock onClick={nextSlide}>
          <NextButton />
        </NextIconBlock>
      )}
    </RemindListWrapper>
  );
}

export default RemindList;
