import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar';
import Card from '../MainContent/Card.js';
import { useParams } from 'react-router-dom';
import useGetConversations from '../../hooks/useGetConversations.jsx';

export default function OtherProfile() {
  const [selectedItem, setSelectedItem] = useState('hot'); 
  const { conversations } = useGetConversations();
  const [posts, setPosts] = useState([]);
  const { username } = useParams();

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const chatUser = JSON.parse(localStorage.getItem('chat-user'));
        const token = chatUser.token;
        const response = await fetch(`http://localhost:8000/api/post/${username}/posts`, {
          method: 'GET',
          headers: {
            "Authorisation": `Bearer ${token}`,
          }
        });

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchData();
  }, [username]);

  // Find conversation with matching username
  const conversation = conversations.find(conv => conv.username === username);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex justify-between overflow-hidden bg-black">
        <div>
          <Sidebar handleItemClick={handleItemClick} />
        </div>
        <div className='h-screen w-full flex-1'>
          <div className='h-screen overflow-y-auto flex-col items-center'>
            {Array.isArray(posts) && posts.length > 0 ? (
              posts.map(post => (
                <div className='mt-3 pl-12' key={post._id}>
                  <Card post={post} />
                </div>
              ))
            ) : (
              <p>No posts found</p>
            )}
          </div>
        </div>
        <div className='flex flex-col items-center w-[25vw] h-screen'>
          {conversation && (
            <img src={conversation.profilePic} alt="Profile" className="pic border-1 border-[#9c9c9c40] w-40 h-40 rounded-[50%] mt-16 mb-4" />
          )}
          <div className="text-white font-semibold">{username}</div>
        </div>
      </div>
    </div>
  );
}
