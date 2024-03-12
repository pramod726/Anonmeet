import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar/Navbar';
import SignUp from './component/Auth/SignUp';
import Login from './component/Auth/Login';
import Sidebar from './component/Sidebar';

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className='bg-red-500'>
          <Sidebar/>
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}
