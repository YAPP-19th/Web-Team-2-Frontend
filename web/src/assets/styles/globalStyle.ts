import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import NotoSansKRMedium from '../fonts/NotoSansKR-Medium.otf';
import NotoSansKRRegular from '../fonts/NotoSansKR-Regular.otf';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Noto Sans KR Regular';
    src: url(${NotoSansKRRegular});
  }
  @font-face {
    font-family: 'Noto Sans KR Medium';
    src: url(${NotoSansKRMedium});
  }
  
  ${normalize}
  html,
  body {
    overflow: auto;
    height: 100%;
    padding: 0;
    margin: 0;
    font-family: 'Noto Sans KR Regular', 'Noto Sans KR Medium', sans-serif;
    font-size: 10px;
  }
  * {
    box-sizing: border-box;
  }

  /** 버튼회색배경, 보더 없애기, 커서 포인터 주기**/
  button {
    border: 0 none;
    background-color: transparent;
    cursor: pointer;
    padding: 0;
  }
`;

export default GlobalStyle;
