const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    cart: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product"
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    orders: {
        type: Array,
        default: []
    },
    contact: Number,
    address: String,
    image: Buffer,
    role: {
        type: String,
        enum: ["user", "owner"],
        default: "user"
    }
});

module.exports = mongoose.model("user", userSchema)