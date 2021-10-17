import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    basicWidth: string;

    color: {
      test1: string;
      test2: string;
      test3: string;
      test4: string;
      primary: string;
      gray0: string;
      gray1: string;
      white0: string;
      black0: string;
    };
  }
}
