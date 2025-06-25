import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
    username: String;
    password: String;
    role: 'user' | 'admin';
    profile_url: String,
}

const userSchema  = new Schema<IUser>({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true
    },
    profile_url: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', userSchema);

export default User;