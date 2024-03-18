import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Avatar, IconButton, Typography } from '@mui/material';
import { TbArrowBigUp, TbArrowBigDown } from "react-icons/tb";
import { FaRegCommentAlt } from "react-icons/fa";
import { LuBookmark } from "react-icons/lu";
import { Link } from 'react-router-dom';

export default function RecipeReviewCard({ post }) {
  const [votes, setVotes] = useState(post.votes);

  const handleVote = async (voteType) => {
    try {
      const chatUser = JSON.parse(localStorage.getItem('chat-user'));
      const token = chatUser.token;

      const response = await fetch(`http://localhost:8000/api/post/${post._id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorisation': `Bearer ${token}`,
        },
        body: JSON.stringify({
          vote: voteType
        })
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }

      // Update the state or handle response accordingly
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  const utcdate = new Date(post.createdAt);
  const date = new Date(utcdate.getTime());
  const currentDate = new Date();

  const ageInMilliseconds = currentDate - date;
  const ageInHours = Math.floor(ageInMilliseconds / (1000 * 60 * 60));
  const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));

  const createdAgo = ageInHours < 24 ? ageInHours + " hr. ago" : ageInDays + ` ${ageInDays <= 1 ? "day" : "days"} ago`;

  return (
    <Card sx={{ maxWidth: 760, backgroundColor: '#202020' }}>
      <Link to={`/post/${post._id}`} style={{ textDecoration: 'none' }}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe">
              <img src={post.profilePic} onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-image-url.jpg' }} alt="Profile" />
            </Avatar>
          }
          title={<Typography variant="h8" color="white">{post.username}</Typography>}
          subheader={<Typography variant="subtitle2" color="white">{createdAgo}</Typography>}
        />
        <CardContent className='pt-2'>
          <Typography variant="h8" color="white">{post.title}</Typography>
          <Typography variant="body2" color="grey">
            {post.body}
          </Typography>
        </CardContent>
    </Link>
        <CardActions className='flex justify-between mx-1'>
          <div className='flex gap-1'>
            <div className='bg-[#2b2b2e] flex justify-around rounded-2xl p-0'>
              <IconButton aria-label="Upvote" onClick={(e) => handleVote(1)}>
                <TbArrowBigUp color={post.selfvote === 1 ? 'green' : '#fff'} size={16} />
              </IconButton>
              <div className='items-center py-1 text-cyan-50 text-[14px]'>{post.votes}</div>
              <IconButton aria-label="Downvote" onClick={(e) => handleVote(-1)}>
                <TbArrowBigDown color={post.selfvote === -1 ? 'red' : '#fff'} size={16} />
              </IconButton>
            </div>
          <Link to={`/post/${post._id}`} style={{ textDecoration: 'none' }}>
            <div className='bg-[#2b2b2e] flex justify-evenly rounded-2xl p-0'>
              <IconButton aria-label="Comment">
                <FaRegCommentAlt color='#fff' size={16} />
              </IconButton>
              <div className='pr-2 items-center py-1 text-cyan-50 text-[14px]'>{post.comment}</div>
            </div>
          </Link>
          </div>
          <div>
            <IconButton aria-label="Save">
              <LuBookmark color='#fff' size={18} />
            </IconButton>
          </div>
        </CardActions>
      </Card>
  );
}
