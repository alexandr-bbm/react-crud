import React from 'react';
import { render } from 'react-dom';
import App from 'containers/App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const wrappedApp =
    <MuiThemeProvider>
        <App />
    </MuiThemeProvider>;

render(wrappedApp, document.getElementById('content-entry'));