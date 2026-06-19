const orderModel = require("../models/order-model");
const userModel = require("../models/user-model");

module.exports.orderPlace = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await userModel.findById(userId).populate("cart.productId");
        if (!user || user.cart.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }
        let totalAmount = 0;
        const orderItems = user.cart.map(item => {
            totalAmount += item.productId.price * item.quantity;
            return {
                product: item.productId._id,
                quantity: item.quantity,
                price: item.productId.price
            };
        });
        const order = await orderModel.create({
            user: userId,
            items: orderItems,
            totalAmount,
            paymentMethod: "Razorpay",
            paymentStatus: "Paid",
            orderStatus: "Placed",
            shippingAddress: req.body.shippingAddress
        });
        // Clear cart
        user.cart = [];
        await user.save();
        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//------------------------- GET MY ORDERS ----------------------->
module.exports.getMyOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ user: req.user._id }).populate("items.product").sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//------------------------- ORDER DETAILS ----------------------->
module.exports.orderDetails = async (req, res) => {
    try {
        const { _id } = req.params;
        const order = await orderModel.findById(_id).populate("items.product");
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // Check ownership
        if (order.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized access"
            });
        }
        res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


//------------------------- GET ALL ORDERS ----------------------->
module.exports.getAllOrders = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const totalOrders = await orderModel.countDocuments();
        const orders = await orderModel
            .find()
            .populate("user", "fullname email contact")
            .populate("items.product")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
            success: true,
            orders,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalOrders / limit),
                totalOrders,
                limit
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

