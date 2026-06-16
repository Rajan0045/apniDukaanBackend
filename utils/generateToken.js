const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY;

const generateToken = (user) => {
    if (user) {
        return jwt.sign({ email: user.email, _id: user._id }, jwtKey, { expiresIn: "30d" });
    }
};

module.exports.generateToken = generateToken