import { Reset } from 'styled-reset';
import { ThemeProvider } from 'styled-components';

import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import Typography from './components/Typography';
import MardownStyle from './components/MardownStyle';

const Theme = {
    textColor: "#525252",
    textColorFaded: "#969696",
    primaryColor: "#0068b4",
    secondaryColor: "#0098ff",
    backgroundColor: "#FFFFFF",
    borderColor: "rgba(0, 0, 0, 0.1)",
    colorRed: "#ff4a4a",
    colorBlue: "#4c5fff",
    colorGreen: "#2ea169",
    cursorColor: "#1E1E1E"
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={Theme}>
            <Reset/>
            <MardownStyle/>
            <Typography/>
            <App />
        </ThemeProvider>    
    </React.StrictMode>,
)
