import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import reportWebVitals from './reportWebVitals';
import App from './App';
import InRoom from './InRoom';
import './index.css';

const theme = createTheme({
  palette: {
    background: {
      default: '#FFFFFF',
      paper: '#F6F9FC',
    },
    primary: {
      light: '#69b7ff',
      main: '#3299ff',
      dark: '#2e78dd',
      contrastText: '#FEFEFE',
    },
    secondary: {
      light: '#e6c0fe',
      main: '#c369ff',
      dark: '#a31ff4',
      contrastText: '#FEFEFE',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/:roomName" element={<InRoom />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
