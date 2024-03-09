import {mongoose } from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		gender: {
			type: String,
			required: true,
			enum: ["male", "female"],
		},
		profilePic: {
			type: String,
			default: "",
		},
		followers: [
			{
				type: String,
			}
		],
		following: [
			{
				type: String,
			}
		],
		communities: [
			{
				type: mongoose.Schema.Types.ObjectId,
                ref: "Community",
			}
		],
		saved: [
			{
				type: mongoose.Schema.Types.ObjectId,
                ref: "Post",
			}
		]
		
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;