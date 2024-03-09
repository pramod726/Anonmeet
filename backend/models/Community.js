import {mongoose } from "mongoose";

const communitySchema = new mongoose.Schema(
	{
		createdby: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
            required: true
		},
        communityname: {
			type: String,
			required: true,
		},
		accesstype: {
			type: String,
			required: true,
            enum: ["private", "restricted", "public"],
		},
        access: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ],
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post",
            }
        ],
	},
	{ timestamps: true }
);

const Community = mongoose.model("Community", communitySchema);

export default Community;