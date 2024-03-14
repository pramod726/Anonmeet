import {React, useState} from 'react';
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
          <div>
            <Sidebar handleItemClick={handleItemClick} />
          </div>
          <div className="overflow-y-auto flex-1">
            <Main selectedItem={selectedItem} />
          </div>
        </div>
      </div>
  );
}
