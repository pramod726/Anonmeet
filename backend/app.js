import path from "path";
import express from "express";
import dbconnect from "./db/db_connect.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { app, server } from "./Socket/Socket.js";
import authRoutes from "./routes/Auth.js";
// import messageRoutes from "./routes/message.routes.js";
// import userRoutes from "./routes/user.routes.js";
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);
// app.use("/api/users", userRoutes);



const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/frontend/build")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

server.listen(PORT, () => {
	dbconnect();
	console.log(`Server Running on port ${PORT}`);
});

