import { Back24Icon, Next24Icon } from 'assets/icons';
import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';
import useReminderHandleEffect from 'hooks/reminder/useReminderHandleEffect';
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
        <BackButton onClick={onBackSlide} />
      </BackIconBlock>
      <RemindListContainer>
        <RemindListBlock ref={slideRef}>
          {reminds.map((data) => (
            <RemindListItem key={data.id} title={data.title} />
          ))}
        </RemindListBlock>
      </RemindListContainer>
      <NextIconBlock isShow={TOTAL_SLIDES - currentSlide > SHOW_SLIDE_LENGTH}>
        <NextButton onClick={onNextSlide} />
      </NextIconBlock>
    </RemindListWrapper>
  );
}

export default RemindList;
