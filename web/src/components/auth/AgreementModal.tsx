import React, { ReactElement } from 'react';
import ModalTemplate from 'components/common/ModalTemplate';
import styled from 'styled-components';
import {
  AGREEMENT_PRIVACY_POLICY,
  AGREEMENT_TERMS_AND_CONDITIONS,
} from 'utils/config';

interface AgreementModalProps {
  isModal: boolean;
  onToggleModal: () => void;
  name: 'termsAndConditions' | 'privacyPolicy';
}

const AgreementModalStyled = styled.div`
  padding: 36px 40px;
`;

const AgreementTitle = styled.h2`
  font-size: 18px;
  color: ${(props) => props.theme.color.black};
  font-weight: 500;
  margin: 0;
  margin-bottom: 16px;
`;

const AgreementContent = styled.div`
  height: 636px;
  overflow-y: scroll;
  font-size: 14px;
  margin-bottom: 24px;
`;

function AgreementModal({
  isModal,
  onToggleModal,
  name,
}: AgreementModalProps): ReactElement {
  const title =
    name === 'termsAndConditions'
      ? '이용 약관 동의'
      : '개인정보 수집/이용 동의';

  const content =
    name === 'termsAndConditions'
      ? AGREEMENT_TERMS_AND_CONDITIONS
      : AGREEMENT_PRIVACY_POLICY;

  return (
    <ModalTemplate
      width="471px"
      height="814px"
      isModal={isModal}
      onToggleModal={onToggleModal}
    >
      <AgreementModalStyled>
        <AgreementTitle>{title}</AgreementTitle>
        <AgreementContent dangerouslySetInnerHTML={{ __html: content }} />
      </AgreementModalStyled>
    </ModalTemplate>
  );
}

export default AgreementModal;
