import { ArrowSideIcon } from 'assets/icons';
import CheckBox from 'components/common/CheckBox';
import DividerLine from 'components/common/DividerLine';
import useAgreementForm from 'hooks/auth/useAgreementForm';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import AgreementModal from './AgreementModal';

const AgreementWrapper = styled.div`
  margin-bottom: 24px;
  margin-top: 8px;
`;

const AgreeListRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  &:first-child {
    margin-bottom: 5px;
  }
`;

const AgreeListItem = styled.div`
  color: ${(props) => props.theme.color.grayDarkest};
  line-height: 1.42;
  height: 24px;
  font-size: 12px;
  display: flex;
  align-items: center;
`;

const AgreeItemButton = styled.button``;

const AgreeCheckBox = styled(CheckBox)`
  margin-right: 12px;
  display: flex;
  align-items: center;
`;

const AgreeOption = styled.div<{ isEssential: boolean }>`
  font-weight: 500;
  margin-right: 8px;
  height: 24px;
  line-height: 21px;
  color: ${(props) => !props.isEssential && props.theme.color.grayDark};
`;

const AgreeText = styled.div`
  height: 24px;
  line-height: 21px;
`;

const Divider = styled(DividerLine)`
  background-color: ${(props) => props.theme.color.grayLight};
  margin-bottom: 12px;
`;

function Agreement(): ReactElement {
  const {
    AgreementList,
    isPrivacyPolicyModal,
    isTermsAndConditionsModal,
    onToggleModal,
    onEditEssentialState,
  } = useAgreementForm();

  return (
    <AgreementWrapper>
      {AgreementList.map((item, index) => {
        const { isChecked, text, onClick, icon, option, name } = item;
        return (
          <React.Fragment key={text}>
            <AgreeListRow>
              <AgreeListItem>
                <AgreeCheckBox
                  type="button"
                  variant="secondary"
                  isChecked={isChecked}
                  onClick={onClick}
                />
                {option && (
                  <AgreeOption isEssential={option === '필수'}>
                    [{option}]
                  </AgreeOption>
                )}
                <AgreeText>{text}</AgreeText>
              </AgreeListItem>
              {icon && (
                <AgreeItemButton
                  type="button"
                  onClick={() => onToggleModal(name)}
                >
                  <ArrowSideIcon />
                </AgreeItemButton>
              )}
            </AgreeListRow>
            {index === 0 && <Divider />}
          </React.Fragment>
        );
      })}

      {isTermsAndConditionsModal && (
        <AgreementModal
          name="termsAndConditions"
          isModal={isTermsAndConditionsModal}
          onToggleModal={onToggleModal}
          onEditEssentialState={onEditEssentialState}
        />
      )}

      {isPrivacyPolicyModal && (
        <AgreementModal
          name="privacyPolicy"
          isModal={isPrivacyPolicyModal}
          onToggleModal={onToggleModal}
          onEditEssentialState={onEditEssentialState}
        />
      )}
    </AgreementWrapper>
  );
}
export default Agreement;
