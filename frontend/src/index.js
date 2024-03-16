import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './ContextApis/AuthContext';
import { SocketContextProvider } from './ContextApis/SocketContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SocketContextProvider><App /></SocketContextProvider>
      
    </AuthContextProvider>
  </React.StrictMode>
);