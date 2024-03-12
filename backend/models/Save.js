import {mongoose } from "mongoose";

const saveSchema = new mongoose.Schema(
	{
		username: {
			type: mongoose.Schema.Types.ObjectId,              
			ref: "User",
            required: true
		},
        post: {
			type: mongoose.Schema.Types.ObjectId,                
			ref: "User",
            required: true
		}
	},
	{ timestamps: true }
);

const Save = mongoose.model("Save", saveSchema);

export default Save;