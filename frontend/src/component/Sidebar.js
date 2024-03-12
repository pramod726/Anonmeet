import React from 'react';

const Sidebar = () => {
  return (
    <div className="bg-black h-screen w-56">
      <ul className="text-white">
        <li className="p-4 hover:bg-grey-800 cursor-pointer">Home</li>
        <li className="p-4 hover:bg-grey-800 cursor-pointer">About</li>
      </ul>
    </div>
  );
};

export default Sidebar;
