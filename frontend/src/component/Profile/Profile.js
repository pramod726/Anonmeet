import { React, useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar';
import ProfileNav from './ProfileNav';
import Card from '../MainContent/Card.js';

export default function Profile() {

  const [selectedItem, setSelectedItem] = useState('hot');
  const [selectedProp, setSelectedProp] = useState('post');
  const [posts, setPosts] = useState([]);

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  };

  const handlePropClick = (itemName) => {
    setSelectedProp(itemName);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const chatUser = JSON.parse(localStorage.getItem('chat-user'));
        const token = chatUser.token;
        // console.log(chatUser.token);
        
        const response = await fetch(`http://localhost:8000/api/users/${selectedProp}`, {
          method: 'GET',
          headers: {
            'Authorisation': `Bearer ${token}`,
          }
        });

        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchData();
  }, [selectedProp]);


  const chatUser = JSON.parse(localStorage.getItem('chat-user'));
  const username = chatUser.username;

  return (
    <div className="flex flex-col h-screen ">
      <Navbar />
      <div className="flex justify-between overflow-hidden bg-black">
        <div>
          <Sidebar handleItemClick={handleItemClick} />
        </div>
        <div className='h-screen w-full flex-1'>
          <ProfileNav handlePropClick={handlePropClick} />
          <div className='h-screen overflow-y-auto'>
          <div className="flex flex-col items-center pl-12"> 
            {Array.isArray(posts) && posts.length > 0 ?(posts.map(post => (
              <div className='mt-3 ' key={post._id}style={{ width: '100%' }} >
                <Card post={post} />
              </div>
            ))):(
            <p>No posts found</p>
          )}
          </div>
          </div>
        </div>
        <div className='flex flex-col items-center w-[25vw] h-screen'>
          {/* <div className='pic bg-red-500 border-1 border-[#9c9c9c40] w-40 h-40 rounded-[50%] mt-16 mb-4'> */}
          <img src={chatUser.profilePic} alt="Profile" className="pic border-1 border-[#9c9c9c40] w-40 h-40 rounded-[50%] mt-16 mb-4" />
          {/* </div> */}
          <div className="text-white font-semibold">{username}</div>
        </div>
      </div>
    </div>
  );
}
