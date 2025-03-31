import { createGlobalStyle } from "styled-components";

 const GlobalStyles = createGlobalStyle`

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
        font-style: normal;
    }
    body {
    background: linear-gradient(135deg, #000510 0%, #001b29 50%, #000510 100%);
    color: white;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

    button,a{
        cursor: pointer;
    }
`

export default GlobalStyles;
