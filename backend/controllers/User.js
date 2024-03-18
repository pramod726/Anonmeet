import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import Reply from "../models/Reply.js";
import Vote from "../models/Vote.js";
import Save from "../models/Save.js";
import Message from "../models/Message.js";




export const getUsersForSidebar = async (req, res) => {
  try {
    const filteredUsers = await User.find({}).select("-password");

    // Fetch the most recent message for each user
    const usersWithRecentMessages = await Promise.all(filteredUsers.map(async user => {
      const recentMessage = await Message.findOne({
        $or: [
          { senderId: user._id },
          { receiverId: user._id }
        ]
      }).sort({ createdAt: -1 }).limit(1);
      
      return {
        user,
        recentMessage
      };
    }));
    
    // Sort users based on the timestamp of their most recent message
    usersWithRecentMessages.sort((a, b) => {
      if (!a.recentMessage && !b.recentMessage) return 0;
      if (!a.recentMessage) return 1;
      if (!b.recentMessage) return -1;
      return b.recentMessage.createdAt - a.recentMessage.createdAt;
    });
    
    const sortedUsers = usersWithRecentMessages.map(item => item.user);
    
    res.status(200).json(sortedUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

const data = async (posts, userid) =>{
  const data = [];
  for(var i = 0; i< posts.length ; i++){
      const comment = await Comment.find({post:posts[i]._id});
      const vote = await Vote.findOne({username: userid, post: posts[i]._id});
      let uservote = 0, savestatus = 0;
      if(vote){
          uservote = vote.vote;
      }
      const save = await Save.findOne({username: userid, post: posts[i]._id});
      if(save){
          savestatus = 1;
      }
      const post = {
          _id: posts[i]._id,
          user_id: posts[i].username._id,
          username: posts[i].username.username,
          profilePic: posts[i].username.profilePic,
          title: posts[i].title,
          body: posts[i].body,
          imgurl: posts[i].image,
          votes: posts[i].upvotes - posts[i].downvotes,
          comment: comment.length,
          selfvote: uservote,
          saved: savestatus,
          createdAt: posts[i].createdAt,
      }

      data.push(post);
  }

  return data;
}

export const getallposts = async (req, res) => {
  try {
    const userid = req.user._id;
    const posts = await Post.find({username: userid}).sort({createdAt:-1})
    .populate("username", "username profilePic")
    .select("-score");
    
    const post = await data(posts, userid);
    
    console.log("All user post sent");
    // console.log(post);
    res.status(200).json(post);

  } catch (error) {
    console.error("Error in getallpost: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}




export const getallcomments = async (req, res) => {
  try {
    const userid = req.user._id;

    const comments = await Comment.find({username: userid}).sort({createdAt:-1});

    const uniquePostIds = new Set();

    comments.forEach(comment => {
      uniquePostIds.add(comment.post.toString()); 
    });

    
    const posts = await Post.find({ _id: { $in: [...uniquePostIds] } })
    .populate("username", "username profilePic");
    
    const post = await data(posts, userid);
    
    console.log("All commented posts sent");
    
    res.status(200).json(post);
    
  } catch (error) {
    console.error("Error in getallpost: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

const data1 = async (posts, userid) =>{
  const data = [];
  for(var i = 0; i< posts.length ; i++){
      const comment = await Comment.find({post:posts[i].post._id});
      const vote = await Vote.findOne({username: userid, post: posts[i].post._id});
      let uservote = 0, savestatus = 0;
      if(vote){
          uservote = vote.vote;
      }
      const save = await Save.findOne({username: userid, post: posts[i].post._id});
      if(save){
          savestatus = 1;
      }
      const post = {
          _id: posts[i].post._id,
          user_id: posts[i].username._id,
          username: posts[i].username.username,
          profilePic: posts[i].username.profilePic,
          title: posts[i].post.title,
          body: posts[i].post.body,
          imgurl: posts[i].post.image,
          votes: posts[i].post.upvotes - posts[i].post.downvotes,
          comment: comment.length,
          selfvote: uservote,
          saved: savestatus,
          createdAt: posts[i].post.createdAt,
      }

      data.push(post);
  }

  return data;
}


export const getallsaved = async (req, res) => {
  try {
    const userid = req.user._id;

    const posts = await Save.find({username: userid}).sort({createdAt:-1})
    .populate("username", "username profilePic")
    .populate("post");
    
    const post = await data1(posts, userid);
    
    console.log("All saved posts sent");

    res.status(200).json(post);
  } catch (error) {
    console.error("Error in getallpost: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}


export const getallupvotes = async (req, res) => {
  try {
    const userid = req.user._id;

    const posts = await Vote.find({username: userid, vote: 1}).sort({createdAt:-1})
    .populate("username", "username profilePic")
    .populate("post");
    
    const post = await data1(posts, userid);
    
    console.log("All upvoted posts sent");

    res.status(200).json(post);

  } catch (error) {
    console.error("Error in getallpost: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getalldownvotes = async (req, res) => {
  try {
    const userid = req.user._id;

    const posts = await Vote.find({username: userid, vote: -1}).sort({createdAt:-1});

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error in getallpost: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}


export const follow = async(req, res) => {
  try {
    const userid = req.user._id;
    const follower = req.params.id1;

    const user1 = await User.findOne({userid});
    const user2 = await User.findOne({follower});

    if(!user1 || !user2){
      res.status(401).json({ error: "User is invalid" });
    }

    await user1.following.push(user2._id).save();
    await user2.followers.push(user1._id).save();

    res.status(200).json({message: "User followed successfully" });

  } catch (error) {
    console.error("Error in getallpost: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}
