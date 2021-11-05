import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    basicWidth: string;
    color: {
      black0: string;
      black1: string;
      primary: string;
      primaryDark: string;
      error: string;
      black: string;
      grayDarkest: string;
      grayDarker: string;
      grayDark: string;
      gray: string;
      grayLight: string;
      grayLightest: string;
      white: string;
      lightGreen: string;
      skyBlue: string;
      purpleDark: string;
      purple: string;
      shadow0: string;
      shadow1: string;
    };
  }
}
