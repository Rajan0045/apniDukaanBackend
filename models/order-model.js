const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product"
            },
            quantity: Number,
            price: Number
        }
    ],
    totalAmount: Number,
    paymentMethod: {
        type: String,
        default: "Razorpay"
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending"
    },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    orderStatus: {
        type: String,
        enum: [
            "Placed",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled"
        ],
        default: "Placed"
    },
    shippingAddress: {
        name: String,
        phone: String,
        address: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("order", orderSchema)