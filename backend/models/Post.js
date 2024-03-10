import {mongoose } from "mongoose";

const postSchema = new mongoose.Schema(
	{
		username: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
            required: true
		},
        title: {
			type: String,
			required: true,
		},
		body: {
			type: String,
		},
		upvotes: {
			type: Number,
			default: 0,
		},
		downvotes: {
			type: Number,
            default: 0,
		},
        votes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Vote",
            }
        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
            }
        ]
	},
	{ timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;