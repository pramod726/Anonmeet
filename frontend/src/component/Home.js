import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar';
import Main from './MainContent/Main';

export default function Home() {
  const [selectedItem, setSelectedItem] = useState('hot');

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex justify-between overflow-hidden bg-black">
        <Sidebar handleItemClick={handleItemClick}/>
        <div className="overflow-y-auto flex-1">
          <Routes>
            <Route path="/" element={<Main selectedItem={selectedItem}/>} />
            <Route path="/hot" element={<Main selectedItem={selectedItem} />} />
            <Route path="/top" element={<Main selectedItem={selectedItem} />} />
            <Route path="/new" element={<Main selectedItem={selectedItem} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
