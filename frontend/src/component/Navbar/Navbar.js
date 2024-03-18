import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaPlus, FaComments } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from '../Auth/Login';
import SignUpModal from '../Auth/SignUp';
import { useAuthContext } from '../../ContextApis/AuthContext';
import useLogout from '../../hooks/useLogout';
import ProfileCard from './ProfileCard';
import useGetConversations from "../../hooks/useGetConversations";

const Navbar = () => {
  const { conversations } = useGetConversations();
  console.log(conversations)
  const navigate = useNavigate();
  const { authUser } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [profileCardOpen, setProfileCardOpen] = useState(false);
  const profileCardRef = useRef(null);
  const { logout } = useLogout();

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

  const handleToastClose = () => {
    localStorage.removeItem('successMessage');
    setSuccessMessage('');
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      localStorage.setItem('successMessage', 'Logout Successfully');
      window.location.reload();
    } catch (error) {
      localStorage.setItem('successMessage', 'Logout Failed');
      window.location.reload();
    }
  }
  var filteredConversations = []
  if (searchTerm.length > 0) {
    filteredConversations = conversations.filter(conversation =>
      conversation.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }


  useEffect(() => {
    const storedMessage = localStorage.getItem('successMessage');
    if (storedMessage) {
      setSuccessMessage(storedMessage);
      const timer = setTimeout(() => {
        handleToastClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileCardRef.current && !profileCardRef.current.contains(event.target)) {
        setProfileCardOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[60vh] px-4 py-2 rounded-3xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none pl-10"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400 pointer-events-none" />
          <label htmlFor="search" className="sr-only">Search</label>
          {/* Display filtered conversations */}
          <div className="absolute left-0 right-0 top-full bg-white shadow rounded-b-lg mt-1 overflow-hidden">
            {filteredConversations.map(conversation => (
              <Link to={`/profile/${conversation.username}`} key={conversation.id} className="text-gray-800">
                <div className="p-2 border-b border-gray-200 hover:bg-gray-100" onClick={() => setSearchTerm('')}>
                  {conversation.username}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {authUser ? (
          <div className='flex items-center relative'>
            <Link to="/create-post" className="text-white mx-2">
              <FaPlus className="inline-block mr-1" /> Create Post
            </Link>
            <Link to="/chat" className="text-white mx-2">
              <FaComments className="inline-block mr-1" /> Chat
            </Link>
            <div>
              <img src={authUser.profilePic} alt="Profile" className="w-10 h-10 rounded-full mx-4 cursor-pointer" onClick={() => setProfileCardOpen(!profileCardOpen)} ref={profileCardRef} />
              {profileCardOpen && <ProfileCard handleLogout={handleLogout} />}
            </div>
          </div>
        ) : (
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
        )}
      </nav>
      {loginOpen && <LoginModal open={loginOpen} handleClose={handleLoginClose} onSignupClick={handleSignupOpen} />}
      {signupOpen && <SignUpModal open={signupOpen} handleClose={handleSignupClose} onLoginClick={handleLoginOpen} />}
      {successMessage && (
        <div className='bg-green-500 text-white fixed bottom-10 right-10 p-4 rounded-md'>
          {successMessage}
        </div>
      )}
    </>
  );
};

export default Navbar;
