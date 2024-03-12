import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();


const dbconnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then( () => console.log("Connection with db is successful"))
    .catch( (error) => {
        console.log("Error reported ", error);
        process.exit(1);
    });
}

export default dbconnect;