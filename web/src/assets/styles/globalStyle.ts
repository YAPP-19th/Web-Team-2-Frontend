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
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 10px;
  }
  * {
    box-sizing: border-box;
  }


  #root {
    height: 100%;
  }


  /** 버튼회색배경, 보더 없애기, 커서 포인터 주기**/
  button {
    border: 0 none;
    background-color: transparent;
    cursor: pointer;
    padding: 0;
  }

  /** a태그, 링크태그 색깔 기본값으로 하기 */
  a:link { color: red; text-decoration: none;}
  a:visited { color: black; text-decoration: none;}
`;

export default GlobalStyle;
