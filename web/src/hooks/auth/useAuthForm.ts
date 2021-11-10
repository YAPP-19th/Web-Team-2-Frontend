import { useEffect, useState } from 'react';
import useAuthentication from './useAuthentication';

interface AuthFormTypes {
  form: {
    email: string;
    password: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLogin: () => boolean;
  onRegister: () => void;
  emailError: string | null;
  passwordError: string | null;
  authError: string | null;
  agreementList: {
    id: number;
    name: string;
    checked: boolean;
    option: string;
    text: string;
    icon: boolean;
  }[];
  onToggleCheckBox: (id: number) => void;
  onCheckIsAllChecked: () => boolean;
  onToggleAllCheckBox: () => void;
  disabled: boolean;
}

export default function useAuthForm(): AuthFormTypes {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const { email, password } = form;
  const [disabled, setDisabled] = useState(true);
  const [agreementList, setAgreementList] = useState([
    {
      id: 1,
      name: 'Terms and conditions',
      checked: false,
      option: '필수',
      text: '이용약관에 동의합니다',
      icon: true,
    },
    {
      id: 2,
      name: 'Personal information',
      checked: false,
      option: '필수',
      text: '개인정보 수집/이용에 동의합니다',
      icon: true,
    },
    {
      id: 3,
      name: 'Remind',
      checked: false,
      option: '선택',
      text: '리마인드 알람 수신에 동의합니다.',
      icon: false,
    },
  ]);

  const {
    authError,
    emailError,
    onChangeAuthError,
    onCheckEmailEmpty,
    onCheckPasswordEmpty,
    passwordError,
  } = useAuthentication();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

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

  const onCheckEssential = () => {
    for (let i = 0; i < agreementList.length; i += 1) {
      if (agreementList[i].option === '필수' && !agreementList[i].checked) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    setDisabled(!onCheckEssential());
    console.log(!onCheckEssential());
  }, [agreementList]);

  const onLogin = () => {
    if (!onCheckEmailEmpty(email) || !onCheckPasswordEmpty(password))
      return false;
    // @TODO(dohyun): API 생기면 작성
    // 만약 실패했으면 onChangeAuthError("계정을 찾을 수 없습니다. 이메일 또는 비밀번호를 다시 확인해주세요") 호출
    // 아래는 테스트용
    onChangeAuthError(
      '계정을 찾을 수 없습니다. 이메일 또는 비밀번호를 다시 확인해주세요.',
    );
    // eslint-disable-next-line no-console
    console.log(form, 'login');
    return true;
  };

  const onRegister = () => {
    // eslint-disable-next-line no-console
    console.log(form, 'register');
    // @TODO(dohyun): API 생기면 작성
  };

  return {
    form,
    onChange,
    onLogin,
    onRegister,
    emailError,
    passwordError,
    authError,
    onToggleCheckBox,
    onToggleAllCheckBox,
    onCheckIsAllChecked,
    agreementList,
    disabled,
  };
}
