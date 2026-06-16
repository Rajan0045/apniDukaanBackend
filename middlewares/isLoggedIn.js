const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async (req, res, next) => {
    try {
        let token = req.cookies?.token;
        if (!token && req.headers.authorization?.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login first"
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await userModel.findById(decoded._id).select("-password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};