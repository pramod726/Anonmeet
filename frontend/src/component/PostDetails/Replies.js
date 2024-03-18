import React from 'react';
import Comment from './Comment';

const Replies = ({ comments }) => {
  return (
    <div className="ml-20 mt-3">
      <h2 className="text-xl font-semibold mb-2">Comments</h2>
      {Array.isArray(comments) && comments.length > 0 ? (
        comments.slice(0).reverse().map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))
      ) : (
        "No replies"
      )}
    </div>
  );
};

export default Replies;
