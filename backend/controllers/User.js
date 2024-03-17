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


export const getallposts = async (req, res) => {
  try {
    const userid = req.user._id;

    const posts = await Post.find({username: userid}).sort({createdAt:-1});

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error in getallpost: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}


export const getallcomments = async (req, res) => {
  try {
    const userid = req.user._id;

    const comments = await Comment.find({username: userid}).sort({createdAt:-1});

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error in getallpost: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getallsaved = async (req, res) => {
  try {
    const userid = req.user._id;

    const posts = await Save.find({username: userid}).sort({createdAt:-1});

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error in getallpost: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}


export const getallupvotes = async (req, res) => {
  try {
    const userid = req.user._id;

    const posts = await Vote.find({username: userid, vote: 1}).sort({createdAt:-1});

    res.status(200).json(posts);
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
