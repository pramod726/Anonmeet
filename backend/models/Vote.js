import {mongoose } from "mongoose";

const voteSchema = new mongoose.Schema(
	{
		username: {
			type: mongoose.Schema.Types.ObjectId,                // should be hashed
			ref: "User",
            required: true
		},
        post: {
			type: mongoose.Schema.Types.ObjectId,                // should be hashed
			ref: "User",
            required: true
		},
		vote: {
			type: Number,
			required: true,
            enum: [1,-1]
		},
	},
	{ timestamps: true }
);

const Vote = mongoose.model("Vote", voteSchema);

export default Vote;