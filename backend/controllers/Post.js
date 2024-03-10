import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";


export const create = async (req,res) => {
    try{
        const {username, title, body } = req.body;

        if(!title){
            return res.status(400).json({ error: "Title cannot be empty!" });
        }

        const user = await User.findOne({_id:username});

        if(!user){
            return res.status(400).json({ error: "User does not exist." });
        }

        const post = new Post({
            username,
            title,
            body,
        });

        await post.save();

        res.status(201).json({
            username: username,
            title: title,
            body: body
        });


    } catch (error){
        console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}


export const getpost = async (req, res) => {
    try{

        const id = req.params.id;

        const post = await Post.findOne({_id: id}).select("-votes").populate("username", "username").exec();

        if(!post){
            return res.status(400).json({ error: "Post doesn't exist." });
        }

        res.status(201).json(post);

    }catch (error){
        console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}


export const comment = async (req, res) => {
    try{
        const id = req.params.id;
        const {username, text} = req.body;

        const post = await Post.findOne({_id: id});
        if(!post){
            return res.status(400).json({ error: "Post doesn't exist." });
        }

        // only one comment allowed

        const user = await User.findOne({_id: username});
        if(!user){
            return res.status(400).json({ error: "User does not exist." });
        }

        const comment = await Comment.create({
            post: id,
            username: username,
            text: text,
        });

        const newpost = await Post.findByIdAndUpdate(
            id,
            {$push: {comments: comment._id} },
            {new: true}
        ).select("-votes")
        .populate("comments")
        .populate("username", "username")
        .exec();

        res.status(201).json(newpost);

    }catch (error){
        console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}