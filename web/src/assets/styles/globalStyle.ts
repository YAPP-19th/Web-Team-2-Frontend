import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}
  html,
  body {
    overflow: auto;
    height: 100%;
    padding: 0;
    margin: 0;
    font-family: Open-Sans, Helvetica, Sans-Serif;
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
  }
`;

export default GlobalStyle;
