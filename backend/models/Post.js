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
		score: {
			type: Number,
			required: true,
		},
		upvotes: {
			type: Number,
			default: 0,
		},
		downvotes: {
			type: Number,
            default: 0,
		},
		image: {
			type: String,
			default: ""
		},
	},
	{ timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;