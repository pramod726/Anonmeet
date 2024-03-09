import {mongoose } from "mongoose";

const replySchema = new mongoose.Schema(
	{   
        post: {
            type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
            required: true
        },
        comment: {
            type: mongoose.Schema.Types.ObjectId,
			ref: "Comment",
            required: true
        },
		username: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
            required: true
		},
		text: {
			type: String,
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
	},
	{ timestamps: true }
);

const Reply = mongoose.model("Reply", replySchema);

export default Reply;