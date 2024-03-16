import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './ContextApis/AuthContext';
import { AuthContextProvider } from './ContextApis/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AuthContextProvider>
      <App />
    </AuthContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);