import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import Reply from "../models/Reply.js";
import Vote from "../models/Vote.js";
import Save from "../models/Save.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getallposts = async (req, res) => {
  try {
    const userid = req.userid;

    const posts = await Post.find({username: userid}).sort({createdAt:-1});

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error in getallpost: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}


export const getallcomments = async (req, res) => {
  try {
    const userid = req.userid;

    const comments = await Comment.find({username: userid}).sort({createdAt:-1});

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error in getallpost: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getallsaved = async (req, res) => {
  try {
    const userid = req.userid;

    const posts = await Save.find({username: userid}).sort({createdAt:-1});

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error in getallpost: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}


export const getallupvotes = async (req, res) => {
  try {
    const userid = req.userid;

    const posts = await Vote.find({username: userid, vote: 1}).sort({createdAt:-1});

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error in getallpost: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getalldownvotes = async (req, res) => {
  try {
    const userid = req.userid;

    const posts = await Vote.find({username: userid, vote: -1}).sort({createdAt:-1});

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error in getallpost: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}
