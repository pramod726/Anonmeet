const express = require("express");
const dbconnect = require('./db/db_connect');
import cookieParser from "cookie-parser";
const app = express();

import authRoutes from "./routes/Auth.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

// it is used to import data from .env file
require('dotenv').config();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// connnecting database
dbconnect();

app.get("/", (req,res)=>{
    return res.json({
        success:true,
        message:"Your server is up and running"
    })
})

app.listen(PORT,()=>{
    console.log(`App is running at port ${PORT}`)
})


