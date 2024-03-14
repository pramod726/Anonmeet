import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { CardMedia } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red, grey } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { TbArrowBigUp } from "react-icons/tb";
import { TbArrowBigDown } from "react-icons/tb";
import { FaRegCommentAlt } from "react-icons/fa";
import { LuBookmark } from "react-icons/lu";


export default function RecipeReviewCard({post}) {

  const utcdate = new Date(post.createdAt);

  const istDate = new Date(utcdate.getTime() + (5.5 * 60 * 60 * 1000)); // Adding 5 hours and 30 minutes

  const istDateString = istDate.toISOString();

  return (
    <Card sx={{ maxWidth: 760, backgroundColor: '#202020' }}> {/* Setting dark background color */}
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            <img src={post.username.profilePic} onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-image-url.jpg' }} />
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={<Typography variant="h8" color="white">{post.username.username}</Typography>}
        subheader={<Typography variant="subtitle2" color="white">{post.createdAt}</Typography>}
      />
      <CardContent className='pt-2'>
        <Typography variant="h8" color="white" >{post.title}</Typography>
        <Typography variant="body2" color="grey">
          {post.body}
        </Typography>
      </CardContent>
      {/* <CardMedia
        component="img"
        height="194"
        image="https://picsum.photos/200/"
        alt="Paella dish"
      /> */}
      <CardActions className='flex justify-between mx-1' >
        <div className='flex gap-1'>
          <div className='bg-[#2b2b2e] flex justify-around rounded-2xl p-0'>
            <IconButton aria-label="Upvote">
              <TbArrowBigUp  color='#fff' size={18}/>
            </IconButton>
            <div className='items-center py-1 text-cyan-50'>{post.upvotes - post.downvotes}</div>
            <IconButton aria-label="Downvote">
              <TbArrowBigDown color='#fff' size={18}/>
            </IconButton>
          </div>
          <div className='bg-[#2b2b2e] flex justify-evenly rounded-2xl p-0'>
            <IconButton aria-label="Comment">
              <FaRegCommentAlt color='#fff' size={18} />
            </IconButton>
            <div className='pr-2 items-center py-1 text-cyan-50'> 45</div>
          </div>
        </div>
        <div  className=''>
          <IconButton aria-label="Save">
            <LuBookmark color='#fff' size={18} />
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
}
