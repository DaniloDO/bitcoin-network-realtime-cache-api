import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

// MongoConnection class responsible for creating the connection with MongoDB using mongoose
class MongoConnection {
    constructor() {
        // Check if an instance of MongoConnection already exists
        if(!MongoConnection.instance) {
            this._connect(); 
            MongoConnection.instance = this; 
        }

        return MongoConnection.instance; 
    }

    // Create an mongoose connection with predefined configuration
    async _connect() {
        try {
            await mongoose.connect(process.env.MONGO_URI);
            console.log('MongoDB connected');
        }
        catch(error) {
            console.error('MongoDB connection failed:', error.message);
            process.exit(1);
        }
    }
}

// Creates a new instance from MongoConfig class
const mongoConnection = new MongoConnection();

// Freeze the instance to prevent any modifications to the instance
Object.freeze(mongoConnection); 

export default mongoConnection; 