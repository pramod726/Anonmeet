import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

const generatetoken = (userId) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

	return token;
}

export const signup = async (req, res) => {
	try {
		const { username, email, password, confirmPassword} = req.body;
		// console.log(req.body);

		
		const checkuser = await User.findOne({email});
		
		if(checkuser){
			return res.status(400).json({ error: "User already exists" });
		}
		
		const user = await User.findOne({ username });
		
		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}
		
		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		// HASH PASSWORD HERE
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

	

		const profilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;

		const newUser = new User({
			username,
			email,
			password: hashedPassword,
			profilePic,
		});

		if (newUser) {
			generateTokenAndSetCookie(newUser._id, res);
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				username: newUser.username,
				profilePic: newUser.profilePic,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller:", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;
		console.log(req.body);
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		// generateTokenAndSetCookie(user._id, res);

		// console.log(user);
		const token = generatetoken(user._id);

		const options = {
			maxAge: 15 * 24 * 60 * 60 * 1000, // MS
			httpOnly: true
		}

		res.cookie("token", token, options).status(200).json({
			_id: user._id,
			username: user.username,
			profilePic: user.profilePic,
			token: token,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};