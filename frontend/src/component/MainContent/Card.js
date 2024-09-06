import React, { useState,useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import { Avatar, IconButton, Typography } from '@mui/material';
import { TbArrowBigUp, TbArrowBigDown } from "react-icons/tb";
import { FaRegCommentAlt } from "react-icons/fa";
import { LuBookmark } from "react-icons/lu";
import { Link } from 'react-router-dom';

export default function RecipeReviewCard({ post }) {
  const [vote, setVote] = useState(post.selfvote);
  const [isSaved, setIsSaved] = useState(post.saved);
  const [votesCount, setVotesCount] = useState(post.votes || 0);

  useEffect(() => {
    setVote(post.selfvote);
    setIsSaved(post.saved);
    setVotesCount(post.votes || 0);
  }, [post]);

  const handleVote = async (voteType) => {
    try {
      const newVote = vote === voteType ? 0 : voteType;
      const chatUser = JSON.parse(localStorage.getItem('chat-user'));
      const token = chatUser.token;

      const url = voteType !== vote
        ? `http://localhost:8000/api/post/${post._id}/vote`
        : `http://localhost:8000/api/post/${post._id}/deletevote`;

      const method = voteType !== vote ? 'POST' : 'DELETE';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorisation': `Bearer ${token}`,
        },
        body: JSON.stringify({ vote: voteType }),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }

      setVote(newVote);
      setVotesCount(votesCount + (newVote - vote));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaved(prevState => !prevState);
      const chatUser = JSON.parse(localStorage.getItem('chat-user'));
      const token = chatUser.token;

      const url = !isSaved
        ? `http://localhost:8000/api/post/${post._id}/save`
        : `http://localhost:8000/api/post/${post._id}/deletesave`;

      const method = !isSaved ? 'POST' : 'DELETE';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorisation': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const formatDate = (dateString) => {
    const utcDate = new Date(dateString);
    const date = new Date(utcDate.getTime());
    const currentDate = new Date();

    const ageInMilliseconds = currentDate - date;
    const ageInHours = Math.floor(ageInMilliseconds / (1000 * 60 * 60));
    const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));

    return ageInHours < 24
      ? `${ageInHours} hr. ago`
      : `${ageInDays} ${ageInDays <= 1 ? "day" : "days"} ago`;
  };

  return (
    <Card sx={{ maxWidth: 760, backgroundColor: '#202020' }}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            <img
              src={post.profilePic}
              onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-image-url.jpg'; }}
              alt="Profile"
            />
          </Avatar>
        }
        title={
          <Typography variant="h8" color="white">
            <Link to={`/profile/${post.username}`} style={{ color: 'inherit', textDecoration: 'none' }}>
              {post.username}
            </Link>
          </Typography>
        }
        subheader={<Typography variant="subtitle2" color="white">{formatDate(post.createdAt)}</Typography>}
      />
      <Link to={`/post/${post._id}`} style={{ textDecoration: 'none' }}>
        <CardContent className='pt-2'>
          <Typography variant="h8" color="white">{post.title}</Typography>
          <Typography variant="body2" color="grey">{post.body}</Typography>
        </CardContent>
        {post.imgurl && <CardMedia component="img" height="194" image={post.imgurl} />}
      </Link>
      <CardActions className='flex justify-between mx-1'>
        <div className='flex gap-1'>
          <div className='bg-[#2b2b2e] flex justify-around rounded-2xl p-0'>
            <IconButton aria-label="Upvote" onClick={() => handleVote(1)}>
              <TbArrowBigUp color={vote === 1 ? 'green' : '#fff'} size={16} />
            </IconButton>
            <div className='items-center py-1 text-cyan-50 text-[14px]'>{votesCount}</div>
            <IconButton aria-label="Downvote" onClick={() => handleVote(-1)}>
              <TbArrowBigDown color={vote === -1 ? 'red' : '#fff'} size={16} />
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
        <IconButton aria-label="Save" onClick={handleSave}>
          <LuBookmark color={isSaved ? 'blue' : '#fff'} size={18} />
        </IconButton>
      </CardActions>
    </Card>
  );
}