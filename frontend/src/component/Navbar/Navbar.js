import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LoginModal from '../Auth/Login';
import SignUpModal from '../Auth/SignUp';
import { useAuthContext } from '../../ContextApis/AuthContext';

const Navbar = () => {
  const { authUser } = useAuthContext();
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [user, setUser] = useState('');
  const [curr, setCurr] = useState('Login');

  const handleLoginOpen = () => {
    setSignupOpen(false);
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleSignupOpen = () => {
    setLoginOpen(false);
    setSignupOpen(true);
  };

  const handleSignupClose = () => {
    setSignupOpen(false);
  };

  const handleSignupSuccess = (message) => {
    setSuccessMessage(message);
  };

  const handleToastClose = () => {
    setSuccessMessage('');
  };

  useEffect(() => {
    if (authUser && authUser.username) {
      setUser(authUser.username);
      setCurr('Logout');
    } else {
      setUser('');
      setCurr('Login');
    }
  }, [authUser]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        handleToastClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <>
      <nav className="bg-black p-2 flex justify-between items-center sticky top-0 z-50 border-b-[1px] border-[#9c9c9c40]">
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
              {curr}
            </button>
          </div>
          <div className='text-white font-bold px-4 py-2'>
            <p>{user}</p>
          </div>
          {authUser && authUser.profilePic && (
            <div className='h-10 w-10 rounded-full overflow-hidden mx-2'>
              <img src={authUser.profilePic} alt="Profile" className='w-full h-full object-cover' />
            </div>
          )}
          {/* <div className='w-10 bg-red-400 rounded-3xl mx-6'></div> */}
        </div>
      </nav>
      {loginOpen && <LoginModal open={loginOpen} handleClose={handleLoginClose} onSignupClick={handleSignupOpen} handleSuccess={handleSignupSuccess}/>}
      {signupOpen && <SignUpModal open={signupOpen} handleClose={handleSignupClose} onLoginClick={handleLoginOpen} handleSuccess={handleSignupSuccess}/>}
      {successMessage && (
        <div className='bg-green-500 text-white fixed bottom-10 right-10 p-4 rounded-md'>
          {successMessage}
        </div>
      )}
    </>
  );
};

export default Navbar;
