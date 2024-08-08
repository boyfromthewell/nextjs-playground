import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;

    &::-webkit-scrollbar {
			width: 12px;
		}
		&::-webkit-scrollbar-thumb {
			border-radius: 10px;
			background: #EEEEEE;
			background-clip: padding-box;
			border: 4px solid transparent;
		}

  }
  button {
    cursor: pointer;
    background-color: inherit;
  }
  a {
    text-decoration:none;
    color:inherit;
  }
`;
export default GlobalStyle;
