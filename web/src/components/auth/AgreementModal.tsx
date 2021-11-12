import React, { ReactElement } from 'react';
import ModalTemplate from 'components/common/ModalTemplate';
import styled from 'styled-components';
import {
  AGREEMENT_PRIVACY_POLICY,
  AGREEMENT_TERMS_AND_CONDITIONS,
} from 'utils/config';
import SimpleButton from 'components/common/SimpleButton';
import { auth } from 'models/auth';

interface AgreementModalProps {
  isModal: boolean;
  name: auth.AgreementNameType;
  onToggleModal: (name: auth.AgreementNameType) => void;
  onEditEssentialState: (name: auth.AgreementNameType, value: boolean) => void;
}

const AgreementModalStyled = styled.div`
  padding: 36px 40px;
`;

const AgreementTitle = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  margin-bottom: 16px;
  color: ${(props) => props.theme.color.black};
`;

const AgreementContent = styled.div<{ isScroll: boolean }>`
  height: 636px;
  font-size: 14px;
  margin-bottom: 24px;
  ${(props) => props.isScroll && 'overflow-y: scroll;'}
`;

const AgreementButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

function AgreementModal({
  isModal,
  onToggleModal,
  name,
  onEditEssentialState,
}: AgreementModalProps): ReactElement {
  const title =
    name === 'termsAndConditions'
      ? '이용 약관 동의'
      : '개인정보 수집/이용 동의';

  const content =
    name === 'termsAndConditions'
      ? AGREEMENT_TERMS_AND_CONDITIONS
      : AGREEMENT_PRIVACY_POLICY;

  const onClickAgree = (
    agreementName: auth.AgreementNameType,
    value: boolean,
  ) => {
    onEditEssentialState(agreementName, value);
    onToggleModal(agreementName);
  };

  return (
    <ModalTemplate
      width="471px"
      height="814px"
      isModal={isModal}
      onToggleModal={() => onToggleModal(name)}
    >
      <AgreementModalStyled>
        <AgreementTitle>{title}</AgreementTitle>
        <AgreementContent
          isScroll={name === 'termsAndConditions'}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <AgreementButtonGroup>
          <SimpleButton
            variant="secondary"
            width="184px"
            height="40px"
            label="동의 안함"
            onClick={() => onClickAgree(name, false)}
          />
          <SimpleButton
            variant="secondary"
            width="184px"
            height="40px"
            label="동의"
            onClick={() => onClickAgree(name, true)}
          />
        </AgreementButtonGroup>
      </AgreementModalStyled>
    </ModalTemplate>
  );
}

export default AgreementModal;
