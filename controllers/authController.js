const bcrypt = require("bcrypt");
const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

//------------------------------ USER REGISTER ----------------------->
module.exports.userRegister = async (req, res) => {
    try {
        let {
            fullname,
            email,
            password,
            role = "user"
        } = req.body;

        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        let userCreated = await userModel.create({
            fullname,
            email,
            password: hashedPassword,
            role
        });
        let token = generateToken(userCreated);
        res.cookie("token", token);
        const userData = userCreated.toObject();
        delete userData.password;
        // Remove user-specific fields for owners
        if (userData.role === "owner") {
            delete userData.cart;
            delete userData.orders;
        }
        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            userData: {
                ...userData,
                token
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//------------------------------ USER LOGIN -------------------------->
module.exports.userLogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not exists"
            });
        }
        const verifyPassword = await bcrypt.compare(
            password,
            user.password
        );
        if (!verifyPassword) {
            return res.status(401).json({
                success: false,
                message: "Email or password is incorrect!"
            });
        }
        let token = generateToken(user);
        res.cookie("token", token);
        const userData = user.toObject();
        delete userData.password;
        // Remove user-specific fields for owners
        if (userData.role === "owner") {
            delete userData.cart;
            delete userData.orders;
        }
        return res.status(200).json({
            success: true,
            message: "Login successfully",
            userData: {
                ...userData,
                token
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//----------------------------- USER LOGOUT --------------------------->
module.exports.userLogout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports.getProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const userData = {
            ...user.toObject(),
            picture: user.picture
                ? user.picture.toString("base64")
                : null
        };
        return res.status(200).json({
            success: true,
            user: userData
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports.updateProfile = async (req, res) => {
    try {
        const { fullname,address, email, contact } = req.body;
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        user.fullname = fullname;
        user.email = email;
        user.contact = contact;
        user.address = address
        if (req.file) {
            user.image = req.file.buffer;
        }
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};