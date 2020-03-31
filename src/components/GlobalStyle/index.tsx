import { createGlobalStyle } from 'styled-components';
import THEMES from '../../constants/themes';

const GlobalStyle = createGlobalStyle`
  ${THEMES.ROOT}

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: none;
    
    &::-webkit-scrollbar {
      background: ${THEMES.BORDER_PRIMARY};
      width: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${THEMES.BACKGROUND_THIRD};
      filter: invert(30%);
    }
  }

  html, body {
    background: ${THEMES.BACKGROUND_PRIMARY};
    color: ${THEMES.TEXT_PRIMARY};
    font-family: Arial;
    font-size: 12px;
    min-height: 100vh;
  }

  input {
    background: transparent;
    border: solid 1px ${THEMES.BORDER_PRIMARY};
    color: ${THEMES.TEXT_PRIMARY};
    outline: none;
  }
  
  button {
    background: ${THEMES.BACKGROUND_PRIMARY};
    border: solid 1px ${THEMES.BORDER_PRIMARY};
    color: ${THEMES.TEXT_PRIMARY};
    cursor: pointer;
    height: 24px;
    padding: 0 3px;
  }
`;

export default GlobalStyle;
