import React, { useState } from 'react';
import { FaHome, FaFire, FaRegThumbsUp, FaClock } from 'react-icons/fa';

const Sidebar = () => {
  // State to manage the selected sidebar item
  const [selectedItem, setSelectedItem] = useState('Home');

  // Function to handle click on sidebar items
  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
    // Perform any additional actions here, such as navigation or updating state
  };

  return (
    <div className="bg-black h-screen w-72 pl-8 pt-4  border-r-[1px] border-[#9c9c9c40]">
      <ul className="text-white">
        <li
          className={`p-3 mx-4 mb-1 hover:bg-[#202020] cursor-pointer rounded-xl ${
            selectedItem === 'Home' && 'bg-[#2b2b2e]'
          }`}
          onClick={() => handleItemClick('Home')}
        >
            <div className='flex items-center'>
          <FaHome className="mx-4" size={20} /> Home
          </div>
        </li>
        <li
          className={`p-3 mx-4 mb-1 hover:bg-[#202020] cursor-pointer  rounded-xl ${
            selectedItem === 'Hot' && 'bg-[#2b2b2e]'
          }`}
          onClick={() => handleItemClick('Hot')}
        >
        <div className='flex items-center'>
          <FaFire className="mx-4" size={20}/> Hot
        </div>
        </li>
        <li
          className={`p-3 mx-4 mb-1 hover:bg-[#202020] cursor-pointer  rounded-xl ${
            selectedItem === 'Top' && 'bg-[#2b2b2e]'
          }`}
          onClick={() => handleItemClick('Top')}
        > 
           <div className='flex items-center'>
          <FaRegThumbsUp className="mx-4" size={20}/> Top
          </div>
        </li>
        <li
          className={`p-3 mx-4 mb-1 hover:bg-[#202020] cursor-pointer rounded-xl ${
            selectedItem === 'New' && 'bg-[#2b2b2e]'
          }`}
          onClick={() => handleItemClick('New')}
        >
            <div className='flex items-center'>
          <FaClock className="mx-4" size={20} /> New
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
