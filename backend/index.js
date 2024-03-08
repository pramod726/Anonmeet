const express = require("express");
const app = express();


const database = require("./db/db_connect")
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 4000;

database.connect();
app.use(express.json());

app.get("/", (req,res)=>{
    return res.json({
        success:true,
        message:"Your server is up and running"
    })
})
app.listen(PORT,()=>{
    console.log(`App is running at port ${PORT}`)
})