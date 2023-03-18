import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const auth = async (req, res) => {
    let token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: "Invalid Authentication." });
    token = token.split(" ")[1];

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded) return res.status(401).json({ error: "Invalid Authentication." });

    const user = await User.findOne({ _id: decoded.id });

    return { id: user._id, isAdmin: user.isAdmin };
};

export default auth;
