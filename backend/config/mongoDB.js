import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

// Function for connecting to mongo db
const ConnectDB = async () => {
    try {
        // Event Listener
        mongoose.connection.on("connected", () => {
            console.log("DataBase is Connected Succesfully");
        });

        // Listerner For error
        mongoose.connection.on("error", (err) => {
            console.log("Mongo Db Connection error: ", err);
        });

        // Connection
        await mongoose.connect(process.env.MONGODB_URL);
    } catch (error) {
        console.log("Connection Error: ", error);
        process.exit(1);

    }
}

export default ConnectDB;