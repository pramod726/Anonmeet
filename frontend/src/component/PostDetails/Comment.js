import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { TbArrowBigUp, TbArrowBigDown } from "react-icons/tb";
import { LuReply } from "react-icons/lu";
import CreateReply from './CreateReply';

export default function RecipeReviewCard({ comment }) {
    const [votes, setVotes] = useState(comment.upvotes - comment.downvotes);
    const [reply,setReply] = useState(false);

    const handleVote = async (voteType) => {
        try {
            const chatUser = JSON.parse(localStorage.getItem('chat-user'));
            const token = chatUser.token;

            const response = await fetch(`http://localhost:8000/api/post/${comment._id}/vote`, {
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

            setVotes(prevVotes => prevVotes + voteType);
        } catch (error) {
            console.error("Error : ", error);
        }
    };

    const handleReply = ()=>{
        setReply(!reply)
    }

    const utcdate = new Date(comment.createdAt);
    const date = new Date(utcdate.getTime());
    const currentDate = new Date();

    const ageInMilliseconds = currentDate - date;
    const ageInHours = Math.floor(ageInMilliseconds / (1000 * 60 * 60));
    const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));

    const createdAgo = ageInHours < 24 ? ageInHours + " hr. ago" : ageInDays + ` ${ageInDays <= 1 ? "day" : "days"} ago`;

    return (
        <Card sx={{ maxWidth: 760, backgroundColor: 'black' }} className='mt-2'>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe">
                        <img src={comment.username.profilePic} onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-image-url.jpg' }} />
                    </Avatar>
                }
                title={<Typography variant="h8" color="white">{comment.username.username}</Typography>}
                subheader={<Typography variant="subtitle2" color="white">{createdAgo}</Typography>}
            />
            <CardContent className='pt-2'>
                <Typography variant="h8" color="white" >{comment.text}</Typography>
                <Typography variant="body2" color="grey">
                    {comment.body}
                </Typography>
            </CardContent>
            <CardActions className='flex justify-between mx-1' >
                <div className='flex gap-1'>
                    <div className='bg-[#2b2b2e] flex justify-around rounded-2xl p-0'>
                        <IconButton aria-label="Upvote" onClick={() => handleVote(1)}>
                            <TbArrowBigUp color={comment.selfvote === 1 ? 'green' : '#fff'} size={16} />
                        </IconButton>
                        <div className='items-center py-1 text-cyan-50 text-[14px]'>{votes}</div>
                        <IconButton aria-label="Downvote" onClick={() => handleVote(-1)}>
                            <TbArrowBigDown color={comment.selfvote === -1 ? 'red' : '#fff'} size={16} />
                        </IconButton>
                    </div>
                </div>
                <div className='bg-[#2b2b2e] flex justify-evenly rounded-2xl'>
                    <IconButton aria-label="Reply" onClick={handleReply}>
                        <LuReply color='#fff' size={18} />
                    <div className='pr-2 items-center text-cyan-50 text-[14px]'>reply</div>
                    </IconButton>
                </div>
            </CardActions>
            {reply && <CreateReply commentId={comment._id}/>}
        </Card>
    );
}
