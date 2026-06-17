const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        if (!uri) {
            throw new Error("MONGO_URI is not defined in .env");
        }
        await mongoose.connect(uri);
        console.log("DB connected...");
    } catch (error) {
        console.log("DB connection failed:", error.message);
    }
};

module.exports = connectDB;