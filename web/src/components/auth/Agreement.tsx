import { ArrowSideIcon } from 'assets/icons';
import CheckBox from 'components/common/CheckBox';
import DividerLine from 'components/common/DividerLine';
import useAuthForm from 'hooks/auth/useAuthForm';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface AgreementProps {
  agreementList: {
    id: number;
    name: string;
    checked: boolean;
    option: string;
    text: string;
    icon: boolean;
  }[];
  onToggleAllCheckBox: () => void;
  onCheckIsAllChecked: () => boolean;
  onToggleCheckBox: (id: number) => void;
}

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

function Agreement({
  onToggleCheckBox,
  onCheckIsAllChecked,
  onToggleAllCheckBox,
  agreementList,
}: AgreementProps): ReactElement {
  return (
    <AgreementWrapper>
      <AgreeListRow>
        <AgreeListItem>
          <AgreeCheckBox
            type="button"
            variant="secondary"
            onClick={onToggleAllCheckBox}
            isChecked={onCheckIsAllChecked()}
          />
          <AgreeText>전체 동의</AgreeText>
        </AgreeListItem>
      </AgreeListRow>
      <Divider />
      {agreementList.map((item) => (
        <AgreeListRow key={item.id}>
          <AgreeListItem>
            <AgreeCheckBox
              type="button"
              variant="secondary"
              isChecked={item.checked}
              onClick={() => onToggleCheckBox(item.id)}
            />
            <AgreeOption isEssential={item.option === '필수'}>
              [{item.option}]
            </AgreeOption>
            <AgreeText>{item.text}</AgreeText>
          </AgreeListItem>
          <AgreeItemButton type="button">
            {item.icon && <ArrowSideIcon />}
          </AgreeItemButton>
        </AgreeListRow>
      ))}
    </AgreementWrapper>
  );
}
export default Agreement;
