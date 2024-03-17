import { React, useState, useEffect } from "react";
import Card from "./Card.js";
import { Link } from "react-router-dom";

export default function Main({ selectedItem }) {
  const [posts, setPosts] = useState([]);

  // console.log(selectedItem);

  useEffect(() => {
    async function fetchData() {
      try {
        const chatUser = JSON.parse(localStorage.getItem('chat-user'));
        const token = chatUser.token;
        
        // console.log(chatUser.token);
        const response = await fetch(
          `http://localhost:8000/api/post/${selectedItem}`,
          {
            method: "GET",
            headers: {
              Authorisation: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchData();
  }, [selectedItem]);

  return (
    <>
      
      <div className="ml-20 mt-3">
        {posts && posts.map(post => (
        <div className='mt-3' key={post._id}>
          <Card post={post} />
        </div>
      ))}
      </div>
    </>
  );
}
