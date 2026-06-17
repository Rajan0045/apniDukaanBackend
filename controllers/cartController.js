const userModel = require("../models/user-model");

//------------------------- Add to cart ----------------------->
module.exports.addToCart = async (req, res) => {
    try {
        const { _id, quantity } = req.body;
        if (!_id || quantity == null) {
            return res.status(400).json({
                success: false,
                message: "_id and quantity are required"
            });
        }
        const qty = Number(quantity);
        if (qty <= 0) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be greater than 0"
            });
        }
        const user = await userModel.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const existingItem = user.cart.find(
            (item) => item.productId.toString() === _id
        );
        if (existingItem) {
            existingItem.quantity = qty;
        } else {
            user.cart.push({
                productId: _id,
                quantity: qty
            });
        }
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            cart: user.cart
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//------------------------- Remove product   ----------------------->
module.exports.removeFromCart = async (req, res) => {
    try {
        const { _id } = req.params;
        const user = await userModel.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        user.cart = user.cart.filter((item) => item.productId.toString() !== _id);
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Product removed from cart",
            cart: user.cart
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//------------------- Get cart ------------------------------->
module.exports.getCart = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.user.email }).populate("cart.productId");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const formattedCart = user.cart.map((item) => {
            return ({
                productId: item.productId._id,
                title: item.productId.title,
                price: item.productId.price,
                image: item.productId.image ? Buffer.from(item.productId.image).toString("base64") : null,
                quantity: item.quantity
            })
        });
        return res.status(200).json({
            success: true,
            cart: formattedCart
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};