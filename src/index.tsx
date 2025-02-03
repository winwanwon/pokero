import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "./config";

import reportWebVitals from './reportWebVitals';
import App from './pages/Home';
import InRoom from './pages/Room';
import Control from './pages/Control';
import './index.css';

const theme = createTheme({
  palette: {
    background: {
      default: '#F9F9F9',
      paper: '#FFFFFF',
    },
    primary: {
      light: '#14B8A6',
      main: '#14B8A6',
      dark: '#14B8A6',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#1F2937',
      main: '#1F2937',
      dark: '#1F2937',
      contrastText: '#FFFFFF',
    },
  },
});

const app = initializeApp(firebaseConfig);
getAnalytics(app);

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/:roomName" element={<InRoom firebaseApp={app} />} />
          <Route path="/c/:roomName" element={<Control firebaseApp={app} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
