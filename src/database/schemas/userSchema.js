import { Schema } from "mongoose";
import validator from "validator";

// Defines a Schema to create users model  
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Please enter a username']
        },

        password: {
            type: String,
            required: [true, 'Please enter a password']
        },
        
        email: {
            type: String,
            required: [true, 'Please enter an email'],
            unique: true,
            validate: [validator.isEmail, 'Please enter a valid email']
        },

        emailVerifiedAt: {
            type: Date,
            default: null
        },

        subscriptions: {
            coingecko: { type: Boolean, default: false, required: [true, 'Please select coingecko option'] },
            mempool: { type: Boolean, default: false,  required: [true, 'Please select mempool option'] },
            realtime: { type: Boolean, default: false,  required: [true, 'Please select realtime option']},
        }
    },

    {
        timestamps: true,
        versionKey: false
    }
); 

export default userSchema; 