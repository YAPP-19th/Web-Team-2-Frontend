import useToggle from 'hooks/common/useToggle';
import { auth } from 'models/auth';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { authState } from 'recoil/atoms/authState';

interface IAgreementItem {
  text: string;
  essentialName?: auth.AgreementEssentialType;
  isChecked: boolean;
  onClick: () => void;
  option?: string;
}

interface AgreementFormTypes {
  AgreementList: IAgreementItem[];
  onToggleModal: (essentialName: auth.AgreementEssentialType) => void;
  isTermsAndConditionsModal: boolean;
  isPrivacyPolicyModal: boolean;
  onEditEssentialState: (
    essentialName: auth.AgreementEssentialType,
    value: boolean,
  ) => void;
}

export default function useAgreementForm(): AgreementFormTypes {
  const [essentialState, setEssentialState] =
    useState<auth.IEssentialAgreementName>({
      termsAndConditions: false,
      privacyPolicy: false,
    });
  const [remindState, setRemindState] = useState(false);
  const { termsAndConditions, privacyPolicy } = essentialState;
  const [AuthState, setAuthState] = useRecoilState(authState);
  const [isTermsAndConditionsModal, onToggleTermsAndConditionsModal] =
    useToggle();
  const [isPrivacyPolicyModal, onTogglePrivacyPolicyModal] = useToggle();

  // 모달 상태 토글
  const onToggleModal = useCallback(
    (essentialName: auth.AgreementEssentialType) => {
      return essentialName === 'termsAndConditions'
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
    (essentialName: auth.AgreementEssentialType) => {
      setEssentialState({
        ...essentialState,
        [essentialName]: !essentialState[essentialName],
      });
    },
    [essentialState],
  );

  // 동의 필수 요소 직접 수정
  const onEditEssentialState = useCallback(
    (name: auth.AgreementEssentialType, value: boolean) => {
      setEssentialState({
        ...essentialState,
        [name]: value,
      });
    },
    [essentialState],
  );

  // 리마인드 여부 토글
  const onToggleRemindState = useCallback(() => {
    setRemindState(!remindState);
  }, [remindState]);

  useEffect(() => {
    setAuthState({
      ...AuthState,
      isAgree: termsAndConditions && privacyPolicy,
    });
  }, [termsAndConditions, privacyPolicy]);

  const AgreementList: IAgreementItem[] = [
    {
      text: '전체 동의',
      isChecked: onCheckIsAllSelect(),
      onClick: onToggleAllAgree,
    },
    {
      text: '이용약관에 동의합니다.',
      essentialName: 'termsAndConditions',
      isChecked: termsAndConditions,
      onClick: () => onToggleEssentialState('termsAndConditions'),
      option: '필수',
    },
    {
      text: '개인정보 수집/이용에 동의합니다.',
      essentialName: 'privacyPolicy',
      isChecked: privacyPolicy,
      onClick: () => onToggleEssentialState('privacyPolicy'),
      option: '필수',
    },
    {
      text: '리마인드 알람 수신에 동의합니다.',
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
    onEditEssentialState,
  };
}
