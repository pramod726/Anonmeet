const express = require("express");
const dbconnect = require('./db/db_connect');

const app = express();

// it is used to import data from .env file
require('dotenv').config();
const PORT = process.env.PORT || 3000;


// start server on Port
app.listen(PORT, () => {
    console.log(`Server successfully started at ${PORT}`);
});

// connnecting database
dbconnect();

// default route
app.use("/", (req, res) => {
    res.send('<h1> This is homepage baby</h1>');
});


