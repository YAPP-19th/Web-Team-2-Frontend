import {
  Back24IMG,
  Back24IMG2x,
  Back24IMG3x,
  Next24IMG,
  Next24IMG2x,
  Next24IMG3x,
} from 'assets/images';
import useReminderHandleEffect from 'hooks/reminder/useReminderHandleEffect';
import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';
import RemindListItem from './RemindListItem';

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

const commonIconBlockStyle = css<{ isShow: boolean }>`
  width: 24px;
  height: 100%;
  z-index: 100;
  position: absolute;
  display: ${(props) => !props.isShow && 'none'};
`;

const BackIconBlock = styled.div`
  ${commonIconBlockStyle}
  left: 0px;
  margin-right: 24px;
`;

const NextIconBlock = styled.div`
  ${commonIconBlockStyle}
  right: 0px;
`;

const commonButtonStyle = css`
  position: absolute;
  top: 50%;
  transform: translate(0%, -50%);
  cursor: pointer;
  width: 32px;
  height: 32px;
`;

const BackButton = styled.img`
  ${commonButtonStyle}
`;

const NextButton = styled.img`
  ${commonButtonStyle}
`;

function RemindList(): ReactElement {
  const {
    reminds,
    currentSlide,
    slideRef,
    onNextSlide,
    onBackSlide,
    SHOW_SLIDE_LENGTH,
    TOTAL_SLIDES,
  } = useReminderHandleEffect();

  return (
    <RemindListWrapper>
      <BackIconBlock isShow={currentSlide !== SHOW_SLIDE_LENGTH}>
        <BackButton
          src={Back24IMG}
          srcSet={`${Back24IMG} 1x, ${Back24IMG2x} 2x, ${Back24IMG3x} 3x`}
          onClick={onBackSlide}
        />
      </BackIconBlock>
      <RemindListContainer>
        <RemindListBlock ref={slideRef}>
          {reminds.map((data) => (
            <RemindListItem key={data.id} remindData={data} />
          ))}
        </RemindListBlock>
      </RemindListContainer>
      <NextIconBlock isShow={TOTAL_SLIDES - currentSlide > SHOW_SLIDE_LENGTH}>
        <NextButton
          src={Next24IMG}
          srcSet={`${Next24IMG} 1x, ${Next24IMG2x} 2x, ${Next24IMG3x} 3x`}
          onClick={onNextSlide}
        />
      </NextIconBlock>
    </RemindListWrapper>
  );
}

export default RemindList;
