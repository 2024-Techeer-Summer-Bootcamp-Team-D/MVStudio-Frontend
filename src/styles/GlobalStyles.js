import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --desktop: 1024px;
    --widedesktop: 2024px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  p{
    margin: 0;
    padding: 0;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 1rem; // 기본 글꼴 크기
    vertical-align: baseline;

    @media (min-width: 576px) {
      font-size: 80%; // 1rem = 12.8px
    }
        
    @media(min-width: 768px) {
      font-size: 90%; // 1rem = 14.4px
    }
    
    @media (min-width: var(--desktop)) {
      font-size: 100%; // 1rem = 16px
    }
    
    @media (min-width: var(--widedesktop)) {
      font-size: 120%; // 1rem = 19.2px
    }
  }

  img {
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

  ol, ul {
    list-style: none;
  }

  button {
    border: 0;
    background: none;
    cursor: pointer;
  }

  input, textarea {
    -moz-user-select: auto;
    -webkit-user-select: auto;
    -ms-user-select: auto;
    user-select: auto;
  }

  input:focus {
    outline: none;
  }
`;

export default GlobalStyles;
