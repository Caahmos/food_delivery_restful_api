import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    email_verified: {
        required: true,
        type: Boolean,
        default: false
    },
    verification_token: {
        required: true,
        type: Number
    },
    verification_token_time: {
        required: true,
        type: Date
    },
    password: {
        required: true,
        type: String
    },
    type: {
        required: true,
        type: String
    },
    status: {
        required: true,
        type: String
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

export default User;