import mongoose from "mongoose";
import userSchema from "../schemas/userSchema.js";

// Create model for user to interact with mongoDB
const userModel = mongoose.model('userModel', userSchema); 

export default userModel; 