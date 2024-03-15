import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import ChatPage from './component/Chat/ChatPage';

export default function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/chat" element={<ChatPage/>} />
        </Routes>
    </Router>
  );
}
