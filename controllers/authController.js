import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { createAccessToken, createRefreshToken } from "../utils/generateToken.js";
import valid from "../utils/valid.js";

export const userSignin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: "Email does not exist." });

        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) return res.status(401).json({ error: "Invalid password." });

        const access_token = createAccessToken({ id: user._id });
        const refresh_token = createRefreshToken({ id: user._id });

        res.status(200).json({
            username: user.username,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin,
            avatar_url: user.avatar_url,
            access_token,
            refresh_token,
        });
    } catch (e) {
        res.status(500).json({ error: "An error occurred!", message: e.message });
    }
};

export const userSignup = async (req, res) => {
    try {
        const { username, email, phone, password, cf_password } = req.body;

        const errorMsg = valid(username, email, phone, password, cf_password);
        if (errorMsg) return res.status(400).json({ error: errorMsg });

        const emailExist = await User.findOne({ email });
        if (emailExist) return res.status(400).json({ error: "User already exists." });

        const phoneExist = await User.findOne({ phone });
        if (phoneExist) return res.status(400).json({ error: "Phone number already exists." });

        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            username,
            email,
            phone,
            password: hashPassword,
        });
        if (!newUser) return res.status(400).json({ error: "Invalid user data." });

        res.status(201).json({
            username: newUser.username,
            email: newUser.email,
            phone: newUser.phone,
            isAdmin: newUser.isAdmin,
            avatar_url: newUser.avatar_url,
            access_token: createAccessToken({ id: newUser._id }),
            refesh_token: createRefreshToken({ id: newUser._id }),
        });
    } catch (e) {
        res.status(500).json({ error: "An error occurred!", message: e.message });
    }
};
