import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LoginModal from '../Auth/Login';

const Navbar = () => {
  const [loginOpen, setLoginOpen] = useState(false);

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  return (
    <>
      <nav className="bg-black p-4 flex justify-between items-center sticky top-0 z-50 border-b-[1px] border-[#9c9c9c40]">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center mx-8">
            <span className="text-white text-2xl font-semibold">Anonmeet</span>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="mx-4 relative">
          <input
            type="text"
            placeholder="Search"
            className="w-[60vh] px-4 py-2 rounded-3xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none pl-10"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400 pointer-events-none" />
          <label htmlFor="search" className="sr-only">Search</label>
        </div>

        {/* Login Button */}
        <div className='flex'>
          <div>
            <button
              onClick={handleLoginOpen}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Login
            </button>
          </div>
          <div className='w-10 bg-red-400 rounded-3xl mx-6'></div>
        </div>
      </nav>
      {(<LoginModal open={loginOpen} handleClose={handleLoginClose} />)}
    </>
  );
};

export default Navbar;
