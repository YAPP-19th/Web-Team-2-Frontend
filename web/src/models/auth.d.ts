export namespace auth {
  export interface IAuthType {
    AuthType: 'login' | 'register';
  }
  export interface IErrorMessage {
    emailError: string | null;
    passwordError: string | null;
    authError: string | null;
  }

  export type AgreementNameType = 'termsAndConditions' | 'privacyPolicy';
}
