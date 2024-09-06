import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import { uploadImageToCloudinary } from "../utils/imageUpload.js";
import Reply from "../models/Reply.js";
import Vote from "../models/Vote.js";
import Save from "../models/Save.js";


function hotScore(upvotes, downvotes, time) {
    const diff = upvotes - downvotes;
    
    // Sign of the score
    const sig = Math.sign(diff);

    const order = Math.log10(Math.max(Math.abs(diff), 1));
    
    // Calculate seconds since the Unix epoch 1/1/1970
    const seconds = Math.floor((time / 1000) - 1134028003);
    
    // Calculate hotness score
    const score = order + ((sig * seconds) / 45000);
    
    return score;
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


export const hot = async (req, res) => {
    try{
        const userid = req.user._id;
        const posts = await Post.find().sort({score:-1}).limit(10)
        .populate("username", "username profilePic");

        const post = await data(posts, userid);

        console.log("Hot post sent");
        // console.log(post);
        res.status(201).json(post);

    } catch (error){
        console.log("Error : ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const newsort = async (req, res) => {
    try{
        const userid = req.user._id;
        const posts = await Post.find().sort({createdAt:-1}).limit(10)
        .populate("username", "username profilePic")
        .select("-score");

        const post = await data(posts, userid);

        console.log("New post sent");
        res.status(201).json(post);

    } catch (error){
        console.log("Error : ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const top = async (req, res) => {
    try{
        const userid = req.user._id;
        const posts = await Post.find().sort({upvotes:-1}).limit(10)
        .populate("username", "username profilePic")
        .select("-score");

        const post = await data(posts, userid);

        console.log("Top post sent");
        res.status(201).json(post);

    } catch (error){
        console.log("Error : ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


export const create = async (req, res) => {
    try {
        console.log(req.body)
        const { title, description,image } = req.body;
        
        const userid = req.user._id;

        // console.log(req);

        
        if (!title) {
            return res.status(400).json({ error: "Title cannot be empty!" });
        }

        
        const user = await User.findOne({ _id: userid });
        if (!user) {
            return res.status(400).json({ error: "User does not exist." });
        }

        const date = new Date();
        const score = hotScore(60, 40, date.getTime());

        const post = await Post.create({
            username: userid,
            title,
            body:description,
            score,
            image,
        });

        
        res.status(201).json({
            username: userid,
            title,
            body:description,
            image
        });

    } catch (error) {
        console.log("Error in creating post:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const deletepost = async (req, res) => {
    try{
        const id = req.params.id;
        const userid = req.user._id;        // id of username
        const post = await Post.deleteOne({_id: id, username:userid});
        if(!post){
            return res.status(400).json({ error: "Post doesn't exist." });
        }

        await Comment.deleteMany({post: id});
        await Reply.deleteMany({post: id});

        res.status(200).json({
            success:true,
            message:"Post deleted successfully."
        });

    }catch (error){
        console.log("Error in post controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getpost = async (req, res) => {
    try{
        const userid = req.user._id;
        const id = req.params.id;
        const post = await Post.findOne({_id: id})
        .populate("username", "username profilePic")
        .select("-score");
        if(!post){
            return res.status(400).json({ error: "Post doesn't exist." });
        }

        const comment = await Comment.find({post:post._id}).populate("username", "username profilePic");
        const vote = await Vote.findOne({username: userid, post: post._id});
        let uservote = 0, savestatus = 0;
        if(vote){
            uservote = vote.vote;
        }
        const save = await Save.findOne({username: userid, post: post._id});
        if(save){
            savestatus = 1;
        }
        const data = {
            _id: post._id,
            user_id: post.username._id,
            username: post.username.username,
            profilePic: post.username.profilePic,
            title: post.title,
            body: post.body,
            imgurl: post.image,
            votes: post.upvotes - post.downvotes,
            comment: comment.length,
            comments: comment,
            selfvote: uservote,
            saved: savestatus,
            createdAt: post.createdAt,
        }

        console.log(data);

        res.status(201).json(data);

    }catch (error){
        console.log("Error in post controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}


export const getuserpost = async (req, res) => {
    try {

        const userid = req.user._id;
        const username = req.params.id;
        const user = await User.findOne({username: username});
        if(!user){
            return res.status(400).json({message: "User doesn't exist"});
        }
        const posts = await Post.find({username: user._id})
        .populate("username", "username profilePic")
        .select("-score");

        if(!posts){
            return res.status(400).json({ error: "Post doesn't exist." });
        }

        const post = await data(posts, userid);

        console.log(data);

        res.status(201).json(post);

    }catch (error){
        console.log("Error in getuserpost controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}


export const comment = async (req, res) => {
    try{
        const id = req.params.id;
        const userid = req.user._id;
        const {text} = req.body;
        const post = await Post.findOne({_id: id});
        if(!post){
            return res.status(400).json({ error: "Post doesn't exist." });
        }

        const user = await User.findOne({_id: userid});
        if(!user){
            return res.status(400).json({ error: "User does not exist." });
        }

        const comment = await Comment.create({
            post: id,
            username: user,
            text: text,
        });

        res.status(201).json(comment);

    }catch (error){
        console.log("Error in post controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}

export const deletecomment = async (req, res) => {
    try{
        const postid = req.params.id1;
        const commentid = req.params.id2;
        const userid = req.user._id;
        const comment = await Comment.findOne({_id: commentid, post: postid, username: userid});
        if(!comment){
            return res.status(400).json({ error: "Comment doesn't exist." });
        }

        res.status(201).json({
            success:true,
            message:"Comment deleted successfully."
        });

    }catch (error){
        console.log("Error in deleting comment", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}

export const castvote = async (req, res) => {
    try{
        const postid = req.params.id;
        const userid = req.user._id;
        const {vote} = req.body;
        console.log(vote);
        const user = await User.findOne({_id: userid});
        if(!user){
            return res.status(400).json({ error: "User does not exist." });
        }
        const post = await Post.findOne({_id: postid});
        if(!post){
            return res.status(400).json({ error: "Post doesn't exist." });
        }


        const alreadyvoted = await Vote.findOne({username: userid, post: postid});

        if(alreadyvoted){
            if(alreadyvoted.vote === 1){
                post.upvotes -= 1;
            }else if(alreadyvoted.vote === -1){
                post.downvotes -= 1;
            }
            alreadyvoted.vote = vote;
            if(vote === 1){
                post.upvotes += 1;
            }else if(vote === -1){
                post.downvotes += 1;
            }
            await alreadyvoted.save();                           /// 

            post.score = hotScore(post.upvotes, post.downvotes, post.createdAt.getTime());
            await post.save();
            res.status(201).json(alreadyvoted);
        }else{

            const newvote = new Vote({
                username: userid,
                post: postid,
                vote: vote,
            });

            await newvote.save();

            if(vote === 1){
                post.upvotes += 1;
            }else if(vote === -1){
                post.downvotes += 1;
            }

            post.score = hotScore(post.upvotes, post.downvotes, post.createdAt.getTime());

            await post.save();

            res.status(201).json(newvote);

        }

    }catch (error){
        console.log("Error in castvote controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}


export const deletevote = async (req, res) => {
    try{
        const postid = req.params.id;
        const userid = req.user._id;
        const {vote} = req.body;
        const user = await User.findOne({_id: userid});
        if(!user){
            return res.status(400).json({ error: "User does not exist." });
        }
        const post = await Post.findOne({_id: postid});
        if(!post){
            return res.status(400).json({ error: "Post doesn't exist." });
        }
        const alreadyvoted = await Vote.deleteOne({username: userid, post: postid});
        if(alreadyvoted.deletedount == 0){
            return res.status(400).json({ error: "Vote doesn't exist." });
        }

        console.log(vote);

        if(vote === 1){
            post.upvotes = post.upvotes - 1;
        }else if(vote === -1){
            post.downvotes = post.downvotes - 1;
        }

        console.log(alreadyvoted);
        console.log(post.upvotes);
        console.log(post.downvotes);

        post.score = hotScore(post.upvotes, post.downvotes, post.createdAt.getTime());

        await post.save();

        res.status(201).json({
            success:true,
            message:"Vote deleted successfully."
        });

    }catch (error){
        console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}


export const createreply = async (req, res) => {
    try{
        const postid = req.params.id1;
        const commentid = req.params.id2;
        const userid = req.user._id;
        const {text} = req.body;
        const post = await Post.findOne({_id: postid});
        if(!post){
            return res.status(400).json({ error: "Post doesn't exist." });
        }

        const comment = await Comment.findOne({_id: commentid});
        if(!comment){
            return res.status(400).json({ error: "Comment does not exist." });
        }

        const reply = await Reply.create({
            post: postid,
            comment: commentid,
            username: userid,
            text: text,
        });

        res.status(201).json(reply);

    }catch (error){
        console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}


export const deletereply = async (req, res) => {
    try{
        const postid = req.params.id1;
        const commentid = req.params.id2;
        const replyid = req.params.id3;
        const userid = req.user._id;
        const post = await Post.findOne({_id: postid});
        if(!post){
            return res.status(400).json({ error: "Post doesn't exist." });
        }

        const comment = await Comment.findOne({_id: commentid});
        if(!comment){
            return res.status(400).json({ error: "Comment does not exist." });
        }

        const reply = await Reply.deleteOne({_id: replyid, post: postid, comment: commentid, username: userid});

        if(!reply){
            return res.status(400).json({ error: "Reply does not exist." });
        }

        res.status(201).json({
            success:true,
            message:"Reply deleted successfully."
        });

    }catch (error){
        console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}


export const savepost = async (req, res) => {
    try{
        const postid = req.params.id;
        const userid = req.user._id;
        // console.log(postid);
        const post = await Post.findOne({_id: postid});
        if(!post){
            return res.status(400).json({ error: "Post doesn't exist." });
        }

        const save = await Save.create({
            username: userid, 
            post: post._id,
        });

        res.status(201).json(save);

    }catch (error){
        console.log("Error : ", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}


export const deletesavepost = async (req, res) => {
    try{
        const postid = req.params.id;
        const userid = req.user._id;
        // console.log(postid);
        const post = await Post.findOne({_id: postid});
        if(!post){
            return res.status(400).json({ error: "Post doesn't exist." });
        }

        const save = await Save.deleteOne({username: userid, post: postid});

        if(!save){
            return res.status(400).json({ error: "Post is not saved." });
        }

        res.status(201).json(save);

    }catch (error){
        console.log("Error : ", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}