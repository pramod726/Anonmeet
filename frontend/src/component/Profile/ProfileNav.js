import React, { useState } from 'react';

export default function ProfileNav( {handlePropClick} ) {
  const [selectedItem, setSelectedItem] = useState('post');
  const [lineStyle, setLineStyle] = useState({ left: '6%' });

  const handleItemClick = (itemName, index) => {
    setSelectedItem(itemName);
    setLineStyle({ left: `${(index)}%` });
    handlePropClick(itemName);
  };

  return (
    <nav className="relative">
      <ul className="flex text-white text-xl justify-around items-end w-full h-20 pb-4 border-b-[1px] border-[#9c9c9c40] mx-2">
        <li
          className={`transition-colors cursor-pointer ${selectedItem === 'Posts' ? 'text-blue-500' : 'text-white'}`}
          onClick={() => handleItemClick('post', 6)}
        >
          Posts
        </li>
        <li
          className={`transition-colors cursor-pointer ${selectedItem === 'Comments' ? 'text-blue-500' : 'text-white'}`}
          onClick={() => handleItemClick('comment', 30)}
        >
          Comments
        </li>
        <li
          className={`transition-colors cursor-pointer ${selectedItem === 'Save' ? 'text-blue-500' : 'text-white'}`}
          onClick={() => handleItemClick('saved', 58)}
        >
          Save
        </li>
        <li
          className={`transition-colors cursor-pointer ${selectedItem === 'Upvote' ? 'text-blue-500' : 'text-white'}`}
          onClick={() => handleItemClick('upvote', 81)}
        >
          Upvote
        </li>
      </ul>
      <div className='w-1/10 flex justify-center'>
      <div className={`absolute bottom-0 left-0 w-40 ${selectedItem === 'Posts'|| selectedItem ===  'Save' ? 'w-28' : 'w-36'} h-0.5 bg-blue-500 transition-all`} style={{ left: `${lineStyle.left}` }}></div>
      </div>
    </nav>
  );
}
