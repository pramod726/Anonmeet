import { React, useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar';
import PostDetails from './PostDetails';
import CommentList from './CommentList';
import CreateCommentForm from './CreateCommentForm';
import { useParams } from 'react-router-dom';

const PostPage = () => {
  const {postId} = useParams();
  const [selectedItem, setSelectedItem] = useState('hot');
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [CreateComment,setCreateComment] = useState(false);

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  };

  const handleCreateComment = ()=>{
    setCreateComment(!CreateComment);
  }

  useEffect(() => {
        async function fetchData() {
          try {
            const chatUser = JSON.parse(localStorage.getItem('chat-user'));
            const token = chatUser.token;
            // console.log(chatUser.token);
            
            const response = await fetch(`http://localhost:8000/api/post/${postId}`, {
              method: 'GET',
              headers: {
                'Authorisation': `Bearer ${token}`,
              }
            });
            
            const data = await response.json();
            console.log(data);
            setPost(data);
            setComments(data.comments);
          } catch (error) {
            console.error('Error fetching posts:', error);
          }
        }
        
        fetchData();
      }, [postId]);
      const chatUser = JSON.parse(localStorage.getItem('chat-user'));
      const username = chatUser.username;

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex justify-between overflow-hidden bg-black">
        <div>
          <Sidebar handleItemClick={handleItemClick} />
        </div>
        <div className="flex flex-1 overflow-y-auto">
          <div className='w-2/3'>
          <PostDetails post={post}/>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-20 mt-3" onClick={handleCreateComment}>Add Comment</button>
          {CreateComment && <CreateCommentForm />}
          <CommentList comments={comments}/>
          </div>
        <div className='flex flex-col items-center w-[25vw] h-screen sticky top-0'>
           {/* <div className='pic bg-red-500 border-1 border-[#9c9c9c40] w-40 h-40 rounded-[50%] mt-16 mb-4'> */}
           <img src={chatUser.profilePic} alt="Profile" className="pic border-1 border-[#9c9c9c40] w-40 h-40 rounded-[50%] mt-16 mb-4" />
           {/* </div> */}
           <div className="text-white font-semibold">{username}</div>
         </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
