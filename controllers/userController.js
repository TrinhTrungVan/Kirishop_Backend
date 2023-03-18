import auth from "../middleware/auth.js";
import User from "../models/userModel.js";
import valid from "../utils/valid.js";
import bcrypt from "bcrypt";
import { createAccessToken, createRefreshToken } from "../utils/generateToken.js";

export const getUsers = async (req, res) => {
    try {
        const result = await auth(req, res);
        if (!result.isAdmin) return res.status(401).json({ error: "Authentication is not valid." });

        const users = await User.find().select("-password");

        res.json(users);
    } catch (e) {
        res.status(500).json({ error: "An error occurred!", message: e.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const result = await auth(req, res);
        const { username, phone, newPassword, cf_newPassword, avatar_url } = req.body;

        const user = await User.findById(result.id);
        if (!user) res.status(500).json({ error: "User does not exist." });

        if (!newPassword && !cf_newPassword) {
            // Case: User update only avatar
            await User.findOneAndUpdate({ _id: result.id }, { avatar_url: avatar_url });
        } else {
            // Case: User update all info
            const error = valid(username, user.email, phone, newPassword, cf_newPassword);
            if (error) return res.status(500).json({ error: error });

            const passwordHash = await bcrypt.hash(newPassword, 12);
            await User.findOneAndUpdate(
                { _id: result.id },
                { username: username, phone: phone, password: passwordHash, avatar_url: avatar_url }
            );
        }

        const updatedUser = await User.findById(result.id);
        res.status(201).json({
            username: updatedUser.username,
            email: updatedUser.email,
            phone: updatedUser.phone,
            isAdmin: updatedUser.isAdmin,
            avatar_url: updatedUser.avatar_url,
            access_token: createAccessToken({ id: updatedUser._id }),
            refesh_token: createRefreshToken({ id: updatedUser._id }),
        });
    } catch (e) {
        res.status(500).json({ error: "An error occurred!", message: e.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const result = await auth(req, res);
        if (!result.isAdmin) return res.status(401).json({ error: "Authentication is not valid." });

        const { id } = req.params;
        if (result.id.toString() === id)
            return res.status(400).json({ error: "Can not delete admin account." });
        await User.findByIdAndDelete(id);
        res.json({ id });
    } catch (e) {
        res.status(500).json({ error: "An error occurred!", message: e.message });
    }
};
