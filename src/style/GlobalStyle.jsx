import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

@font-face {
    font-family: 'NanumSquareRound';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NanumSquareRound.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'SpoqaHanSansNeo-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Regular.woff') format('woff');
}
  *, *::before, *::after {
font-family: 'NanumSquareRound';    box-sizing: border-box;
  }

  body { 
    margin:0;
    overflow-x: hidden;
    font-family: 'NanumSquareRound';    font-weight: normal;
    font-size: 17px;
    line-height: 24px;
    color: var(--gray-900);
    display: block;
  }

  input {
    font-size: 14px;
  }
  :root {
    --primary: #C72363;
    --gray: #343434;
    --white: #FFFFFF;
    --black: #212121;
    --shadow-low: 0 2px 8px 0 rgba(0,0,0,0.1);
    --shadow-medium: 0 4px 16px 0 rgba(0,0,0,0.12);
    --shadow-high: 0 8px 36px 0 rgba(0,0,0,0.15);
    -webkit-tap-highlight-color: transparent; 
 }
`;

export default GlobalStyle;
