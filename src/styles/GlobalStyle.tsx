import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  button, input[type=button], input[type=submit], input[type=reset] {
    cursor: pointer;
    background-color: inherit;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
  a {
    text-decoration:none;
    color:inherit;
  }

  button, input, textarea, select {
    font-family: inherit;
  }
`;
export default GlobalStyle;
