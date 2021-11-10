import { ArrowSideIcon } from 'assets/icons';
import CheckBox from 'components/common/CheckBox';
import DividerLine from 'components/common/DividerLine';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

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

const ArrowIcon = styled(ArrowSideIcon)`
  float: right;
`;

const Divider = styled(DividerLine)`
  background-color: ${(props) => props.theme.color.grayLight};
  margin-bottom: 12px;
`;

function Agreement(): ReactElement {
  const AgreementList = [
    {
      id: 1,
      name: 'Terms and conditions',
      checked: false,
      option: '필수',
      text: '이용약관에 동의합니다',
      icon: <ArrowIcon />,
    },
    {
      id: 2,
      name: 'Personal information',
      checked: false,
      option: '필수',
      text: '개인정보 수집/이용에 동의합니다',
      icon: <ArrowIcon />,
    },
    {
      id: 3,
      name: 'Remind',
      checked: false,
      option: '선택',
      text: '리마인드 알람 수신에 동의합니다.',
    },
  ];

  return (
    <AgreementWrapper>
      <AgreeListRow>
        <AgreeListItem>
          <AgreeCheckBox type="button" variant="secondary" isChecked />
          <AgreeText>전체 동의</AgreeText>
        </AgreeListItem>
      </AgreeListRow>
      <Divider />
      {AgreementList.map((item) => (
        <AgreeListRow key={item.id}>
          <AgreeListItem>
            <AgreeCheckBox
              type="button"
              variant="secondary"
              isChecked={item.checked}
            />
            <AgreeOption isEssential={item.option === '필수'}>
              [{item.option}]
            </AgreeOption>
            <AgreeText>{item.text}</AgreeText>
          </AgreeListItem>
          <AgreeItemButton type="button">{item.icon}</AgreeItemButton>
        </AgreeListRow>
      ))}
    </AgreementWrapper>
  );
}
export default Agreement;
