import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar';
import ProfileNav from './ProfileNav';
import { useAuthContext } from '../../ContextApis/AuthContext';


export default function Profile() {

  const [selectedItem, setSelectedItem] = useState('hot');
  const {authUser} = useAuthContext();

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  };

 const username = authUser.username;

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex justify-between overflow-hidden bg-black">
        <div>
          <Sidebar handleItemClick={handleItemClick} />
        </div>
        <div className='h-screen w-full flex-1'>
          <ProfileNav/>
        </div>
        <div className='flex flex-col items-center w-[25vw] h-screen'>
          <div className='pic bg-red-500 border-1 border-[#9c9c9c40] w-40 h-40 rounded-[50%] mt-16 mb-4'></div>
          
          <div className="text-white font-semibold">{username}</div>
        </div>
      </div>
    </div>
  );
}
