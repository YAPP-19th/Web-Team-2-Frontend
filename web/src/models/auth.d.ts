import { RequiredKeys } from 'utility-types';

export namespace auth {
  export interface IAuthType {
    AuthType: 'login' | 'register';
  }
  export interface IErrorMessage {
    emailError: string | null;
    passwordError: string | null;
    authError: string | null;
  }

  export type ErrorMessageType = RequiredKeys<IErrorMessage>;

  export interface IEssentialAgreementName {
    termsAndConditions: boolean;
    privacyPolicy: boolean;
  }

  export type AgreementEssentialType =
    RequiredKeys<auth.IEssentialAgreementName>;

  export interface IAuthToken {
    accessToken: string | null;
    refreshToken: string | null;
  }

  export interface IAuthUserInfo extends IAuthToken {
    email: string;
    name: string;
    imageUrl: string;
  }

  export interface ILoginRequest
    extends Omit<IAuthUserInfo, 'accessToken' | 'refreshToken'> {
    socialType: string;
  }
}
