import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "./config";
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from './components/ErrorBoundary';

import reportWebVitals from './reportWebVitals';
import App from './pages/Home';
import InRoom from './pages/Room';
import Control from './pages/Control';
import './index.css';

const app = initializeApp(firebaseConfig);
getAnalytics(app);

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/:roomName" element={<InRoom firebaseApp={app} />} />
          <Route path="/c/:roomName" element={<Control firebaseApp={app} />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
