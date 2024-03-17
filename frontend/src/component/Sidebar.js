import {React, useState } from 'react';
import { FaHome, FaFire, FaRegThumbsUp, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = ({handleItemClick}) => {

  const [selectedItem, setSelectedItem] = useState('home');


  const handleItemClickInternal = (itemName) => {
    setSelectedItem(itemName);
    handleItemClick(itemName==='home'?'hot':itemName);
  };

  return (
    <div className="bg-black h-screen w-72 pl-8 pt-4  border-r-[1px] border-[#9c9c9c40]">
      <ul className="text-white">
        <li
          className={`p-3 mx-4 mb-1 hover:bg-[#202020] cursor-pointer rounded-xl ${
            selectedItem === 'home' && 'bg-[#2b2b2e] hover:bg-[#2b2b2e]'
          }`}
          onClick={() => handleItemClickInternal('home')}
        >
            <div className='flex items-center'>
          <FaHome className="mx-4" size={20} /> Home
          </div>
        </li>
        <li
          className={`p-3 mx-4 mb-1 hover:bg-[#202020] cursor-pointer  rounded-xl ${
            selectedItem === 'hot' && 'bg-[#2b2b2e] hover:bg-[#2b2b2e]'
          }`}
          onClick={() => handleItemClickInternal('hot')}
        >
        <div className='flex items-center'>
          <FaFire className="mx-4" size={20}/> Hot
        </div>
        </li>
        <li
          className={`p-3 mx-4 mb-1 hover:bg-[#202020] cursor-pointer  rounded-xl ${
            selectedItem === 'top' && 'bg-[#2b2b2e] hover:bg-[#2b2b2e]'
          }`}
          onClick={() => handleItemClickInternal('top')}
        > 
           <div className='flex items-center'>
          <FaRegThumbsUp className="mx-4" size={20}/> Top
          </div>
        </li>
        <li
          className={`p-3 mx-4 mb-1 hover:bg-[#202020] cursor-pointer rounded-xl ${
            selectedItem === 'new' && 'bg-[#2b2b2e] hover:bg-[#2b2b2e]'
          }`}
          onClick={() => handleItemClickInternal('new')}
        >
            <div className='flex items-center'>
          <FaClock className="mx-4" size={20} /> New
          </div>
        </li>
      </ul>
      <div className="mx-6 my-2">
        <Link to="/post">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
          Create New Post +
        </button>
        </Link>
      </div>

      {/* {selectedItem && <Main selectedItem={selectedItem} />} */}
    </div>
  );
};

export default Sidebar;
