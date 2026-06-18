const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    contact: Number,
    contact: Number,
    image: Buffer,
    gstin: String,
    isOwner: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("owner", ownerSchema)