import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            require: true,
            default: false,
        },
        avatar_url: {
            type: String,
            default:
                "https://res.cloudinary.com/trungvan1904/image/upload/v1666843620/image/default_avatar_pzvbqf.jpg",
        },
        access_token: {
            type: String,
            require: true,
        },
        refresh_token: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    }
);

let User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
