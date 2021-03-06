import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components/macro';
import App from './components/App';
import { theme } from './components/styles/theme';
import GlobalStyle from './components/styles/GlobalStyle';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      <App />
    </>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
