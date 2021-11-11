import { ArrowSideIcon } from 'assets/icons';
import CheckBox from 'components/common/CheckBox';
import DividerLine from 'components/common/DividerLine';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { authState } from 'recoil/atoms/authState';
import styled from 'styled-components';

interface IEssentialState {
  [index: string]: boolean;
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

function Agreement(): ReactElement {
  const [essentialState, setEssentialState] = useState<IEssentialState>({
    termsAndConditions: false,
    privacyPolicy: false,
  });
  const [remindState, setRemindState] = useState(false);
  const { termsAndConditions, privacyPolicy } = essentialState;
  const [auth, setAuth] = useRecoilState(authState);

  // 전체 상태 변화
  const onChangeAllState = useCallback(
    (state: boolean) => {
      setEssentialState({
        termsAndConditions: state,
        privacyPolicy: state,
      });
      setRemindState(state);
    },
    [setEssentialState, setRemindState],
  );

  // 전체 체크되어있는지 확인
  const onCheckIsAllSelect = useCallback(() => {
    return termsAndConditions && privacyPolicy && remindState;
  }, [termsAndConditions, privacyPolicy, remindState]);

  // 전체 동의 토글 (전체 체크되어있으면 false(해제), 아니면 true(선택))
  const onToggleAllAgree = () => {
    return onChangeAllState(!onCheckIsAllSelect());
  };

  const onToggleEssentialState = useCallback(
    (name: string) => {
      setEssentialState({
        ...essentialState,
        [name]: !essentialState[name],
      });
    },
    [essentialState],
  );

  const onToggleRemindState = useCallback(() => {
    setRemindState(!remindState);
  }, [remindState]);

  useEffect(() => {
    if (termsAndConditions && privacyPolicy) {
      setAuth({
        ...auth,
        isAgree: true,
      });
    }
  }, [termsAndConditions, privacyPolicy]);

  return (
    <AgreementWrapper>
      <AgreeListRow>
        <AgreeListItem>
          <AgreeCheckBox
            type="button"
            variant="secondary"
            isChecked={onCheckIsAllSelect()}
            onClick={onToggleAllAgree}
          />
          <AgreeText>전체 동의</AgreeText>
        </AgreeListItem>
      </AgreeListRow>
      <Divider />

      <AgreeListRow>
        <AgreeListItem>
          <AgreeCheckBox
            type="button"
            variant="secondary"
            isChecked={termsAndConditions}
            onClick={() => onToggleEssentialState('termsAndConditions')}
          />
          <AgreeOption isEssential>[필수]</AgreeOption>
          <AgreeText>이용약관에 동의합니다</AgreeText>
        </AgreeListItem>
        <AgreeItemButton type="button">
          <ArrowSideIcon />
        </AgreeItemButton>
      </AgreeListRow>

      <AgreeListRow>
        <AgreeListItem>
          <AgreeCheckBox
            type="button"
            variant="secondary"
            isChecked={privacyPolicy}
            onClick={() => onToggleEssentialState('privacyPolicy')}
          />
          <AgreeOption isEssential>[필수]</AgreeOption>
          <AgreeText>개인정보 수집/이용에 동의합니다</AgreeText>
        </AgreeListItem>
        <AgreeItemButton type="button">
          <ArrowSideIcon />
        </AgreeItemButton>
      </AgreeListRow>

      <AgreeListRow>
        <AgreeListItem>
          <AgreeCheckBox
            type="button"
            variant="secondary"
            name="remindState"
            isChecked={remindState}
            onClick={onToggleRemindState}
          />
          <AgreeOption isEssential={false}>[선택]</AgreeOption>
          <AgreeText>리마인드 알람 수신에 동의합니다.</AgreeText>
        </AgreeListItem>
      </AgreeListRow>
    </AgreementWrapper>
  );
}
export default Agreement;
