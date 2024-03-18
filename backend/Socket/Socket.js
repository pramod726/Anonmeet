import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
	},
});

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}; // user id is key & socket id is value

io.on("connection", (socket) => {
	console.log("a user connected", socket.id);
  
	const userId = socket.handshake.query.userId;
	if (userId !== undefined) {
	  userSocketMap[userId] = socket.id; // Store the user ID and socket ID
	}
  
	io.emit("getOnlineUsers", Object.keys(userSocketMap));
  
	socket.on("disconnect", () => {
	  console.log("user disconnected", socket.id);
	  if (userId !== undefined) {
		delete userSocketMap[userId]; // Remove the user ID and socket ID mapping on disconnect
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	  }
	});
  });
  

export { app, io, server ,userSocketMap };