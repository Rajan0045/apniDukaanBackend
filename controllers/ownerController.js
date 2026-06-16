const productModel = require("../models/product-model");

//------------------------- PRODUCT CREATE ----------------------->
module.exports.createProduct = async (req, res) => {
    try {
        const { title, description, price, discount } = req.body;
        let product = await productModel.create({
            title,
            price,
            discount,
            description,
            image: req.file.buffer
        })
        return res.status(201).json({
            status: 200,
            message: "Product created successfully",
            product
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

//------------------------------ GET ALL PRODUCTS ----------------------->
module.exports.getAllProducts = async (req, res) => {
    try {
        const limit = Number(req.query.limit) || 12;
        const skip = Number(req.query.skip) || 0;
        const search = req.query.search || "";

        const query = search
            ? {
                title: {
                    $regex: search,
                    $options: "i",
                },
            }
            : {};

        const total = await productModel.countDocuments(query);
        const products = await productModel
            .find(query)
            .skip(skip)
            .limit(limit);
        const formattedProducts = products.map((product) => ({
            ...product.toObject(),
            image: product.image
                ? Buffer.from(product.image).toString("base64")
                : null,
        }));
        return res.status(200).json({
            success: true,
            total,
            limit,
            skip,
            products: formattedProducts,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//------------------------------  PRODUCT DETAILS ----------------------->
module.exports.productDetails = async (req, res) => {
    try {
        const { _id } = req.params;
        const product = await productModel.findById(_id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        const formattedProduct = {
            ...product.toObject(),
            image: product.image
                ? Buffer.from(product.image).toString("base64")
                : null
        };
        return res.status(200).json({
            success: true,
            message: "Product details fetched successfully",
            product: formattedProduct
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};