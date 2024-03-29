import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import { getReceiverSocketId, io ,userSocketMap} from "../Socket/Socket.js";

export const sendMessage = async (req, res) => {
	try {
		const { message , senderId } = req.body;
		const { id: receiverId } = req.params;
		// const senderId = req.user._id;
		// console.log(req.params);
		// console.log(req.body);

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		// await conversation.save();
		// await newMessage.save();

		// this will run in parallel
		await Promise.all([conversation.save(), newMessage.save()]);

		// SOCKET IO FUNCTIONALITY WILL GO HERE
		const receiverSocketId = userSocketMap[receiverId];
		console.log(receiverSocketId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.query.senderId;
		// const {senderId} = req.body;
		console.log(userToChatId)
		console.log(senderId)

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;
		console.log("hello")
		console.log(messages);

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};



export const getallconversations = async (req, res) => {
	try {
	  const userid = req.user._id;
  
	  const conversations = await Conversation.find({participants: userid});
  
	  res.status(200).json(conversations);
	} catch (error) {
	  console.error("Error in getallconversation: ", error.message);
	  res.status(500).json({ error: "Internal server error" });
	}
  }