import React, { useState, useEffect } from "react";
import Card from "./Card";

export default function Main({ selectedItem }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const chatUser = JSON.parse(localStorage.getItem("chat-user"));
        if (!chatUser || !chatUser.token) {
          throw new Error("Please login to view posts");
        }
        const token = chatUser.token;

        const response = await fetch(
          `http://localhost:8000/api/post/${selectedItem}`,
          {
            method: "GET",
            headers: {
              Authorisation: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(error.message);
      }
    }

    fetchData();
  }, [selectedItem]);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-bold text-white">{error}</p>
      </div>
    );
  }

  return (
    <div className="ml-20 mt-3 mb-3">
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map((post) => (
          <div className="mt-3" key={post._id}>
            <div className="cursor-pointer">
              <Card post={post} />
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p className="text-2xl font-bold text-white">No posts found</p>
        </div>
      )}
    </div>
  );
}