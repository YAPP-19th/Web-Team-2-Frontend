import { ArrowSideIcon } from 'assets/icons';
import CheckBox from 'components/common/CheckBox';
import DividerLine from 'components/common/DividerLine';
import React, { ReactElement, useState } from 'react';
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
  const [agreementList, setAgreementList] = useState([
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
  ]);

  // 체크 박스 토글
  const onToggleCheckBox = (id: number) => {
    setAgreementList(
      agreementList.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  // 전체 체크가 되어있는지 확인
  const onCheckIsAllChecked = () => {
    return agreementList.every((item) => item.checked);
  };

  // 전체 선택
  const onSelectAllCheckBox = () => {
    setAgreementList(
      agreementList.map((item) => ({
        ...item,
        checked: true,
      })),
    );
  };

  // 전체 취소
  const onCancelAllCheckBox = () => {
    setAgreementList(
      agreementList.map((item) => ({
        ...item,
        checked: false,
      })),
    );
  };

  // 전체선택 토글
  const onToggleAllCheckBox = () => {
    return onCheckIsAllChecked()
      ? onCancelAllCheckBox()
      : onSelectAllCheckBox();
  };

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
          <AgreeItemButton type="button">{item.icon}</AgreeItemButton>
        </AgreeListRow>
      ))}
    </AgreementWrapper>
  );
}
export default Agreement;
