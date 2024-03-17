import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import CreatePost from './component/CreatePost';
import ChatPage from './component/Chat/ChatPage';
import Profile from './component/Profile/Profile';


export default function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/post" element={<CreatePost/>} />
          <Route path="/chat" element={<ChatPage/>} />
          <Route path="/profile" element={<Profile/>} />
          {/* <Route exact path="/reset-password/:token" component={ResetPassword} /> */}
        </Routes>
    </Router>
  );
}
