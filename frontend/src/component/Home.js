import React from 'react';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar';
import Main from './MainContent/Main';

export default function App() {
  return (
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
      </div>
  );
}
