import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import CreatePost from './component/CreatePost';

export default function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/post" element={<CreatePost/>} />
        </Routes>
    </Router>
  );
}
