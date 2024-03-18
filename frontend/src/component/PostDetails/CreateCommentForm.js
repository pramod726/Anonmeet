import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const CreateCommentForm = () => {
  const { postId } = useParams();
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const chatUser = JSON.parse(localStorage.getItem('chat-user'));
      const token = chatUser.token;

      const response = await fetch(`http://localhost:8000/api/post/${postId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          text,
        }),
      });

      if (response.ok) {
        console.log('Comment created successfully');
        window.location.reload();
        setText('');
      } else {
        console.error('Failed to create comment');
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <div className="ml-20 mt-3">
      <h2 className="text-xl font-semibold mb-2">Add Comment</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
          rows={4}
          placeholder="Enter your comment"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateCommentForm;
