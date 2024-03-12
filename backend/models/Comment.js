import {mongoose} from "mongoose";

const commentSchema = new mongoose.Schema(
	{   
        post: {
            type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
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
        replies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Reply",
            }
        ]
		
	},
	{ timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;