import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar/Navbar';
import SignUp from './component/Auth/SignUp';
import Login from './component/Auth/Login';
import Sidebar from './component/Sidebar';
import Main from './component/MainContent/Main';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex justify-between overflow-hidden bg-black">
          <div>
            <Sidebar />
          </div>
          <div className="overflow-y-auto flex-1">
            <Main />
          </div>
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}
