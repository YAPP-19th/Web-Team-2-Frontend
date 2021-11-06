import React, { ReactElement } from 'react';
import styled from 'styled-components';
import ModalTemplate from './ModalTemplate';
import SimpleButton from './SimpleButton';

interface SmallModalProps {
  isModal: boolean;
  onToggleModal: () => void;
  title: string;
  content: string;
  buttonName: string;
  onClick: () => void;
}

const SmallModalStyled = styled.div`
  padding: 26px 24px 24px;
`;

const SmallModalTitle = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => props.theme.color.black};
  height: 23px;
  line-height: normal;
  margin-bottom: 18px;
`;

const SmallModalContent = styled.div`
  height: 42px;
  font-size: 14px;
  line-height: 1.5;
  color: ${(props) => props.theme.color.grayDark};
  text-align: center;
  margin-bottom: 24px;
`;

const SmallModalButtonGroup = styled.div`
  display: flex;
`;

const CancelButton = styled(SimpleButton)`
  color: ${(props) => props.theme.color.grayDark};
  margin-right: 8px;
`;

function SmallModal({
  isModal,
  onToggleModal,
  title,
  content,
  buttonName,
  onClick,
}: SmallModalProps): ReactElement {
  return (
    <ModalTemplate
      width="328px"
      height="200px"
      isModal={isModal}
      onToggleModal={onToggleModal}
    >
      <SmallModalStyled>
        <SmallModalTitle>{title}</SmallModalTitle>
        <SmallModalContent>
          {content.split('<br/>').map((txt) => (
            <React.Fragment key={txt + Math.random()}>
              {txt}
              <br />
            </React.Fragment>
          ))}
        </SmallModalContent>
        <SmallModalButtonGroup>
          <CancelButton
            variant="tertiary"
            width="136px"
            height="42px"
            borderRadius="8px"
            label="취소"
            onClick={onToggleModal}
          />
          <SimpleButton
            variant="primary"
            width="136px"
            height="42px"
            borderRadius="8px"
            label={buttonName}
            onClick={onClick}
          />
        </SmallModalButtonGroup>
      </SmallModalStyled>
    </ModalTemplate>
  );
}

export default SmallModal;
