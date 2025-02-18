import { createGlobalStyle } from 'styled-components';
import {colors} from "styles/vars";

export const GlobalStyles = createGlobalStyle`
    * {
        padding: 0px;
        margin: 0px;
        border: 0px;
    }
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }
    *::before,
    *::after {
        display: inline-block;
    }
    :focus,
    :active {
        // outline: none;
    }
    a:focus,
    a:active {
        // outline: none;
    }
    html,
    body {
        height: 100%;
        min-width: $minWidth + px;
    }
    body {
        color: ${colors.blue};
        line-height: 1;
        font-family: Jura, Arial, Helvetica, sans-serif;
        font-size: 16px;
        font-weight: 900;
        line-height: 150%;
        //text-rendering: optimizeLegibility;
        -ms-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    input,
    button,
    textarea {
        font-family: Jura, Arial, Helvetica, sans-serif;
        font-size: inherit;
        line-height: inherit;
        color: inherit;
        background-color: transparent;
    }

    input,
    textarea {
        width: 100%;
    }

    button,
    select,
    option {
        cursor: pointer;
    }
    a {
        display: inline-block;
        color: inherit;
        text-decoration: none;
    }
    ul li {
        list-style: none;
    }
    img {
        vertical-align: top;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-weight: inherit;
        font-size: inherit;
    }

    ::selection {
        background-color: ${colors.accentGreen};
        color: ${colors.light};
    }
`;