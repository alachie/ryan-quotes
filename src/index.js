import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: 400;
        src: url("/fonts/Inter-Regular.woff2") format("woff2"),
            url("/fonts/Inter-Regular.woff") format("woff");
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: 700;
        src: url("/fonts/Inter-Bold.woff2") format("woff2"),
            url("/fonts/Inter-Bold.woff") format("woff");
    }

    *,
    *::before,
    *::after {
        box-sizing: inherit;
    }

    html {
        --bg-color: #fff;
        --fg-color: #000;
        --border-color: #eee;
    }

    html {
        font-size: 10px;
        background: #fff;
        background: var(--bg-color);
        box-sizing: border-box;

    }

    html, body, h1, h2, h3, h4, h5, h6, p, blockquote {
        margin: 0;
        padding: 0;
    }

    a {
        color: black;
        color: var(--fg-color);
    }

    body {
        font-family: sans-serif;
        font-size: 3rem;
        // font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Roboto, sans-serif;
        font-family: 'Inter', sans-serif;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        color: var(--fg-color);
        letter-spacing: -0.01em;
    }

    html, body, #root {
        min-height: 100%;
        height: 100%;
    }
`

ReactDOM.render(
    <React.Fragment>
        <GlobalStyle/>
        <App />
    </React.Fragment>
, document.getElementById('root'));
