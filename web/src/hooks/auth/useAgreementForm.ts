import useToggle from 'hooks/common/useToggle';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { authState } from 'recoil/atoms/authState';

interface IEssentialState {
  [index: string]: boolean;
}

interface AgreementFormTypes {
  AgreementList: {
    text: string;
    name: string;
    isChecked: boolean;
    onClick: () => void;
    option?: string;
    icon?: boolean;
  }[];
  onToggleModal: (name: string) => void;
  isTermsAndConditionsModal: boolean;
  isPrivacyPolicyModal: boolean;
}

export default function useAgreementForm(): AgreementFormTypes {
  const [essentialState, setEssentialState] = useState<IEssentialState>({
    termsAndConditions: false,
    privacyPolicy: false,
  });
  const [remindState, setRemindState] = useState(false);
  const { termsAndConditions, privacyPolicy } = essentialState;
  const [auth, setAuth] = useRecoilState(authState);
  const [isTermsAndConditionsModal, onToggleTermsAndConditionsModal] =
    useToggle();
  const [isPrivacyPolicyModal, onTogglePrivacyPolicyModal] = useToggle();

  // 모달 상태 토글
  const onToggleModal = useCallback(
    (name: string) => {
      return name === 'termsAndConditions'
        ? onToggleTermsAndConditionsModal()
        : onTogglePrivacyPolicyModal();
    },
    [isTermsAndConditionsModal, isPrivacyPolicyModal],
  );

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

  // 동의 필수 요소 토글
  const onToggleEssentialState = useCallback(
    (name: string) => {
      setEssentialState({
        ...essentialState,
        [name]: !essentialState[name],
      });
    },
    [essentialState],
  );

  // 리마인드 여부 토글
  const onToggleRemindState = useCallback(() => {
    setRemindState(!remindState);
  }, [remindState]);

  useEffect(() => {
    setAuth({
      ...auth,
      isAgree: termsAndConditions && privacyPolicy,
    });
  }, [termsAndConditions, privacyPolicy]);

  const AgreementList = [
    {
      text: '전체 동의',
      name: 'allAgree',
      isChecked: onCheckIsAllSelect(),
      onClick: onToggleAllAgree,
    },
    {
      text: '이용약관에 동의합니다.',
      name: 'termsAndConditions',
      isChecked: termsAndConditions,
      onClick: () => onToggleEssentialState('termsAndConditions'),
      option: '필수',
      icon: true,
    },
    {
      text: '개인정보 수집/이용에 동의합니다.',
      name: 'privacyPolicy',
      isChecked: privacyPolicy,
      onClick: () => onToggleEssentialState('privacyPolicy'),
      option: '필수',
      icon: true,
    },
    {
      text: '리마인드 알람 수신에 동의합니다.',
      name: 'remindAlert',
      isChecked: remindState,
      onClick: onToggleRemindState,
      option: '선택',
    },
  ];

  return {
    AgreementList,
    isPrivacyPolicyModal,
    isTermsAndConditionsModal,
    onToggleModal,
  };
}
