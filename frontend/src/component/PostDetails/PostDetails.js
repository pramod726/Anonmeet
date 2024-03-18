import React from 'react';
import Card from '../MainContent/Card';

const PostDetails = ({ post }) => {
  return (
    <div className="ml-20 mt-3">
      {post && <Card post={post} />}
    </div>
  );
};

export default PostDetails;
