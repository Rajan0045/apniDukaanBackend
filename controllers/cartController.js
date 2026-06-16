const userModel = require("../models/user-model");

//------------------------- Add to cart ----------------------->
module.exports.addToCart = async (req, res) => {
    try {
        const { _id } = req.params;
        const user = await userModel.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const existingItem = user.cart.find((item) => item.productId.toString() === _id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            user.cart.push({
                productId: _id,
                quantity: 1
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

//------------------------- Decrease Quantity  ----------------------->
module.exports.decreaseQuantity = async (req, res) => {
    try {
        const { _id } = req.params;
        const user = await userModel.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const cartItemIndex = user.cart.findIndex((item) => item.productId.toString() === _id);
        if (cartItemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Product not in cart"
            });
        }
        const cartItem = user.cart[cartItemIndex];
        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
        } else {
            user.cart.splice(cartItemIndex, 1);
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