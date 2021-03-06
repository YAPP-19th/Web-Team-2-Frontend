import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    basicWidth: string;
    color: {
      primary: string;
      primaryDark: string;
      primaryLight: string;
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
      link0: string;
      shadow0: string;
      shadow1: string;
      shadow2: string;
      shadow3: string;
      hover0: string;
    };
  }
}
