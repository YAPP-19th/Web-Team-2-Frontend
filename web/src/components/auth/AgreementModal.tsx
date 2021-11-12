import React, { ReactElement } from 'react';
import ModalTemplate from 'components/common/ModalTemplate';
import styled from 'styled-components';

interface AgreementModalProps {
  isModal: boolean;
  onToggleModal: () => void;
  name: 'termsAndConditions' | 'privacyPolicy';
}

const AgreementModalStyled = styled.div`
  padding: 36px 40px;
`;

function AgreementModal({
  isModal,
  onToggleModal,
  name,
}: AgreementModalProps): ReactElement {
  return (
    <ModalTemplate
      width="471px"
      height="814px"
      isModal={isModal}
      onToggleModal={onToggleModal}
    >
      <AgreementModalStyled>{name}</AgreementModalStyled>
    </ModalTemplate>
  );
}

export default AgreementModal;
