import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './component/Auth/SignUp';
import Login from './component/Auth/Login';
import Home from './component/Home';

export default function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
    </Router>
  );
}
